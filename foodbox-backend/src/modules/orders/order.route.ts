import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { OrderController } from "./order.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createOrderSchema,
  orderParamsSchema,
  orderQuerySchema,
  updateOrderStatusSchema,
} from "./order.schema.js";

const router = Router();

router.post(
  "/",
  authMiddleware(["ADMIN", "USER"]),
  validate(createOrderSchema, "body"),
  OrderController.createOrder,
);

router.get(
  "/",
  authMiddleware(["ADMIN"]),
  validate(orderQuerySchema, "query"),
  OrderController.getOrders,
);

router.get(
  "/:id",
  authMiddleware(["ADMIN", "USER"]),
  validate(orderParamsSchema, "params"),
  OrderController.getOrderById,
);

router.put(
  "/:id/status",
  authMiddleware(["ADMIN"]),
  validate(orderParamsSchema, "params"),
  validate(updateOrderStatusSchema, "body"),
  OrderController.updateOrderStatus,
);

router.put(
  "/:id/cancel",
  authMiddleware(["ADMIN"]),
  validate(orderParamsSchema, "params"),
  OrderController.cancelOrder,
);

export { router as OrderRouter };
