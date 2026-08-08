import type { FilterQuery, HydratedDocument } from "mongoose";
import { OrderModel } from "./order.model.js";
import { MenuModel } from "../menu/menu.model.js";
import type { CreateOrderInput } from "./order.schema.js";
import type { Menu } from "../menu/menu.types.js";
import {
  OrderStatus,
  PaymentStatus,
  type Order,
  type QueryParams,
} from "./orders.types.js";
import { DELIVERY_CHARGE } from "../../common/constants.js";
import { AppError } from "../../common/AppError.js";

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

const allowedNextStatus: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.PLACED]: [OrderStatus.CONFIRMED],
  [OrderStatus.CONFIRMED]: [OrderStatus.OUT_FOR_DELIVERY],
  [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
};

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
  return order;
};

const getOrders = async (queryParams?: QueryParams) => {
  const query: FilterQuery<Order> = {};

  if (queryParams?.orderStatus) {
    query.orderStatus = queryParams.orderStatus;
  }

  let orderQuery = OrderModel.find(query).sort({
    createdAt: queryParams?.sortOrder === "asc" ? 1 : -1,
  });

  if (queryParams?.page && queryParams?.limit) {
    const skip = (queryParams.page - 1) * queryParams.limit;

    orderQuery = orderQuery.skip(skip).limit(queryParams.limit);
  }

  const orders = await orderQuery.select("-__v");

  return orders;
};

const getOrderById = async (id: string) => {
  const order = await OrderModel.findById(id).select("-__v");

  if (!order) {
    throw AppError.notFound("Order not found");
  }

  return order;
};

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

  if (status === OrderStatus.CONFIRMED) {
    updateData.paymentStatus = PaymentStatus.PAID;
  }

  const order = await OrderModel.findByIdAndUpdate(id, updateData, {
    returnDocument: "after",
  }).select("-__v");

  return order;
};

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

  return order;
};

export const OrderService = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
