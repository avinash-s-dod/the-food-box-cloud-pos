import type {
  CreateOrderInput,
  UpdateOrderStatusInput,
} from "./order.schema.js";
import { OrderService } from "./order.service.js";
import {
  type OrderParams,
  type OrderQueryParams,
} from "./orders.types.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

const createOrder = catchAsync<
  Record<string, string>,
  unknown,
  CreateOrderInput
>(async (req, res) => {
  const order = await OrderService.createOrder(req.body);

  return sendResponse(res, 201, "Order created successfully", order);
});

const getOrders = catchAsync<OrderQueryParams>(async (req, res) => {
  const orders = await OrderService.getOrders(req.query);

  return sendResponse(res, 200, "Orders fetched successfully", orders);
});

const getOrderById = catchAsync<OrderParams>(async (req, res) => {
  const order = await OrderService.getOrderById(req.params.id);

  return sendResponse(res, 200, "Order fetched successfully", order);
});

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
