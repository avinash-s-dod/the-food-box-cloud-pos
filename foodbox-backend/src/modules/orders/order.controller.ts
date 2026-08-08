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

const createOrder = catchAsync(async (req, res) => {
  const payload = createOrderSchema.parse(req.body);
  const order = await OrderService.createOrder(payload);

  return res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
});

const getOrders = catchAsync<QueryParams>(async (req, res) => {
  const queryParams = req.query;
  const orders = await OrderService.getOrders(queryParams);
  return res.status(200).json({
    success: true,
    message: "Orders fetched successfully",
    data: orders,
  });
});

const getOrderById = catchAsync<OrderParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid order id");
  }

  const order = await OrderService.getOrderById(id);

  return res.status(200).json({
    success: true,
    message: "Order fetched successfully",
    data: order,
  });
});

const updateOrderStatus = catchAsync<OrderUpdateParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid order id");
  }

  const { orderStatus } = updateOrderStatusSchema.parse(req.body);

  const order = await OrderService.updateOrderStatus(id, orderStatus);

  return res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
});

const cancelOrder = catchAsync<OrderParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid order id");
  }

  const order = await OrderService.cancelOrder(id);

  return res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
    data: order,
  });
});

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
