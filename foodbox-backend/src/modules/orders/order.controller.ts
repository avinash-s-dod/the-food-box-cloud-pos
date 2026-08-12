import type {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "./order.schema.js";
import { OrderService } from "./order.service.js";
import { type OrderParams, type OrderQueryParams } from "./orders.types.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

// Handler: Create Order
// Description: Places a new order using requested payload and returns the placed order
const createOrder = catchAsync<
  Record<string, string>,
  unknown,
  CreateOrderInput
>(async (req, res) => {
  const order = await OrderService.createOrder(req.body);

  return sendResponse(res, 201, "Order created successfully", order);
});

// Handler: Get Orders
// Description: Retrieves a filtered/paginated list of orders matching queries
const getOrders = catchAsync<OrderQueryParams>(async (req, res) => {
  const result = await OrderService.getOrders(req.query);

  return sendResponse(
    res,
    200,
    "Orders fetched successfully",
    result.orders,
    result.paginationMeta,
  );
});

// Handler: Get Order By ID
// Description: Retrieves details of an order using its Mongo ObjectId
const getOrderById = catchAsync<OrderParams>(async (req, res) => {
  const order = await OrderService.getOrderById(req.params.id);

  return sendResponse(res, 200, "Order fetched successfully", order);
});

// Handler: Update Order Status
// Description: Updates order status using requested parameters
const updateOrderStatus = catchAsync<
  OrderParams,
  unknown,
  UpdateOrderStatusInput
>(async (req, res) => {
  const order = await OrderService.updateOrderStatus(
    req.params.id,
    req.body.orderStatus,
  );

  return sendResponse(res, 200, "Order status updated successfully", order);
});

// Handler: Cancel Order
// Description: Cancels an order (sets status to CANCELLED)
const cancelOrder = catchAsync<OrderParams>(async (req, res) => {
  const order = await OrderService.cancelOrder(req.params.id);

  return sendResponse(res, 200, "Order cancelled successfully", order);
});

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
