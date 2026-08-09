import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { OrderController } from "./order.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createOrderSchema,
  orderQuerySchema,
  updateOrderStatusSchema,
} from "./order.schema.js";
import { idParamSchema } from "../../common/common.schema.js";

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
  validate(idParamSchema, "params"),
  OrderController.getOrderById,
);

router.put(
  "/:id/status",
  authMiddleware(["ADMIN"]),
  validate(idParamSchema, "params"),
  validate(updateOrderStatusSchema, "body"),
  OrderController.updateOrderStatus,
);

router.put(
  "/:id/cancel",
  authMiddleware(["ADMIN"]),
  validate(idParamSchema, "params"),
  OrderController.cancelOrder,
);

export { router as OrderRouter };
