import mongoose from "mongoose";
import { createOrderSchema, updateOrderStatusSchema } from "./order.schema.js";
import { OrderService } from "./order.service.js";
import {
  type OrderParams,
  type OrderUpdateParams,
  type QueryParams,
} from "./orders.types.js";
import { AppError } from "../../common/AppError.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

const createOrder = catchAsync(async (req, res) => {
  const payload = createOrderSchema.parse(req.body);
  const order = await OrderService.createOrder(payload);

  return sendResponse(res, 201, "Order created successfully", order);
});

const getOrders = catchAsync<QueryParams>(async (req, res) => {
  const queryParams = req.query;
  const orders = await OrderService.getOrders(queryParams);

  return sendResponse(res, 200, "Orders fetched successfully", orders);
});

const getOrderById = catchAsync<OrderParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid order id");
  }

  const order = await OrderService.getOrderById(id);

  return sendResponse(res, 200, "Order fetched successfully", order);
});

const updateOrderStatus = catchAsync<OrderUpdateParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid order id");
  }

  const { orderStatus } = updateOrderStatusSchema.parse(req.body);

  const order = await OrderService.updateOrderStatus(id, orderStatus);

  return sendResponse(res, 200, "Order status updated successfully", order);
});

const cancelOrder = catchAsync<OrderParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid order id");
  }

  const order = await OrderService.cancelOrder(id);

  return sendResponse(res, 200, "Order cancelled successfully", order);
});

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
