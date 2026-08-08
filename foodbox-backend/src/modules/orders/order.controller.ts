import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import { createOrderSchema, updateOrderStatusSchema } from "./order.schema.js";
import { OrderService } from "./order.service.js";
import {
  OrderStatus,
  type OrderParams,
  type OrderUpdateParams,
  type QueryParams,
} from "./orders.types.js";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createOrderSchema.parse(req.body);
    const order = await OrderService.createOrder(payload);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryParams = req.query as QueryParams;
    const orders = await OrderService.getOrders(queryParams);
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (
  req: Request<OrderParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order id");
    }

    const order = await OrderService.getOrderById(id);

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (
  req: Request<OrderUpdateParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order id");
    }

    const { orderStatus } = updateOrderStatusSchema.parse(req.body);

    const order = await OrderService.updateOrderStatus(id, orderStatus);

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

const cancelOrder = async (
  req: Request<OrderParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid order id");
    }

    const order = await OrderService.cancelOrder(id);

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};
