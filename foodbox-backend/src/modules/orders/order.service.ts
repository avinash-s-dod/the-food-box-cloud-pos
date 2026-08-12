import type { FilterQuery, HydratedDocument } from "mongoose";
import { OrderModel } from "./order.model.js";
import { MenuModel } from "../menu/menu.model.js";
import type { CreateOrderInput } from "./order.schema.js";
import type { Menu } from "../menu/menu.types.js";
import {
  OrderStatus,
  PaymentStatus,
  type Order,
  type OrderQueryParams,
} from "./orders.types.js";
import { DELIVERY_CHARGE } from "../../common/constants.js";
import { AppError } from "../../common/AppError.js";
import { ApiFeatures } from "../../common/ApiFeatures.js";
import { logger } from "../../logger/logger.js";

// Helper: Create Order Item Snapshots
// Description: Matches order items with active menu items, aggregates quantities, checks existence, and maps prices
const createOrderItemSnapshots = (
  payload: CreateOrderInput,
  menuMap: Map<string, HydratedDocument<Menu>>,
) => {
  const quantityMap = new Map<string, number>();

  for (const item of payload.items) {
    const menuId = item.menuId.toString();

    quantityMap.set(menuId, (quantityMap.get(menuId) ?? 0) + item.quantity);
  }

  const itemSnapshots = Array.from(quantityMap.entries()).map(
    ([menuId, quantity]) => {
      const menu = menuMap.get(menuId);

      if (!menu) {
        throw AppError.notFound(`Menu item with ID ${menuId} not found`);
      }

      return {
        menuId: menu._id,
        name: menu.name,
        price: menu.price,
        quantity,
        subtotal: menu.price * quantity,
      };
    },
  );

  return itemSnapshots;
};

// State Machine configuration for allowed order status transitions
const allowedNextStatus: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PLACED]: [OrderStatus.CONFIRMED],
  [OrderStatus.CONFIRMED]: [OrderStatus.OUT_FOR_DELIVERY],
  [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

// Service: Create Order
// Description: Validates items availability, builds calculations (subtotal, delivery, grandTotal), and stores order
const createOrder = async (payload: CreateOrderInput) => {
  const menuIds = payload.items.map((item) => item.menuId);

  const menus = await MenuModel.find({
    _id: { $in: menuIds },
    isDeleted: false,
    isAvailable: true,
  });

  const menuMap = new Map(menus.map((menu) => [menu.id.toString(), menu]));

  const itemSnapshots = createOrderItemSnapshots(payload, menuMap);

  const subtotal = itemSnapshots.reduce((acc, item) => acc + item.subtotal, 0);
  const grandTotal = subtotal + DELIVERY_CHARGE;

  const orderPayload = {
    ...payload,
    items: itemSnapshots,
    subtotal,
    deliveryCharge: DELIVERY_CHARGE,
    grandTotal,
  };

  const order = await OrderModel.create(orderPayload);

  logger.info("Order created", {
    orderId: order._id,
    customerId: order.userId,
    grandTotal: order.grandTotal,
  });

  return order;
};

// Service: Get Orders
// Description: Filters, searches customer details, and paginates orders
const getOrders = async (queryParams?: OrderQueryParams) => {
  const features = new ApiFeatures(OrderModel.find(), queryParams ?? {})
    .filter()
    .search(["customerName", "phone"])
    .sort();

  const paginationMeta = await features.getPaginationMeta();

  features.paginate();

  const orders = await features.query.select("-__v");

  return { orders, paginationMeta };
};

// Service: Get Order By ID
// Description: Fetches details of a specific order
const getOrderById = async (id: string) => {
  const order = await OrderModel.findById(id).select("-__v");

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  return order;
};

// Service: Update Order Status
// Description: Validates the request is not setting it to CANCELLED, checks transition validity, handles payments updates, and updates the db
const updateOrderStatus = async (id: string, status: OrderStatus) => {
  const existingOrder = await OrderModel.findById(id);

  if (!existingOrder) {
    throw AppError.notFound("Order not found");
  }

  if (status === OrderStatus.CANCELLED) {
    throw AppError.badRequest(
      "You cannot update the order status to CANCELLED",
    );
  }

  if (status === existingOrder.orderStatus) {
    throw AppError.badRequest(`Order is already ${status}`);
  }

  const allowedStatuses = allowedNextStatus[existingOrder.orderStatus];

  if (!allowedStatuses.includes(status)) {
    throw AppError.badRequest(
      `Order cannot be changed from ${existingOrder.orderStatus} to ${status}`,
    );
  }

  const updateData: {
    orderStatus: OrderStatus;
    paymentStatus?: PaymentStatus;
  } = {
    orderStatus: status,
  };

  // Automatically mark order as PAID if it moves to CONFIRMED status
  if (status === OrderStatus.CONFIRMED) {
    updateData.paymentStatus = PaymentStatus.PAID;
  }

  const order = await OrderModel.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  }).select("-__v");

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  logger.info("Order status changed", {
    orderId: order._id,
    previousStatus: existingOrder.orderStatus,
    newStatus: order.orderStatus,
  });

  return order;
};

// Service: Cancel Order
// Description: Cancels an order. Validates current status is PLACED or CONFIRMED before performing cancellation.
const cancelOrder = async (id: string) => {
  const existingOrder = await OrderModel.findById(id);

  if (!existingOrder) {
    throw AppError.notFound("Order not found");
  }

  switch (existingOrder.orderStatus) {
    case OrderStatus.CANCELLED:
      throw AppError.badRequest("Order is already cancelled");

    case OrderStatus.OUT_FOR_DELIVERY:
      throw AppError.badRequest("Out for delivery orders cannot be cancelled");

    case OrderStatus.DELIVERED:
      throw AppError.badRequest("Delivered orders cannot be cancelled");
  }

  const order = await OrderModel.findByIdAndUpdate(
    id,
    {
      orderStatus: OrderStatus.CANCELLED,
    },
    {
      returnDocument: "after",
    },
  ).select("-__v");

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  logger.info("Order cancelled", { orderId: order._id });

  return order;
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
