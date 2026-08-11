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
import { AdminRole } from "../admin/admin.types.js";
import { CustomerRole } from "../customers/customer.types.js";

const router = Router();

router.post(
  "/",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(createOrderSchema, "body"),
  OrderController.createOrder,
);

router.get(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(orderQuerySchema, "query"),
  OrderController.getOrders,
);

router.get(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  OrderController.getOrderById,
);

router.put(
  "/:id/status",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  validate(updateOrderStatusSchema, "body"),
  OrderController.updateOrderStatus,
);

router.put(
  "/:id/cancel",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  OrderController.cancelOrder,
);

export { router as OrderRouter };
