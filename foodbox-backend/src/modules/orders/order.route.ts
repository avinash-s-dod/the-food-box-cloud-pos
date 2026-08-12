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

// Initialize Router for Order module
const router = Router();

// Route: POST /api/orders
// Description: Place a new order (Admin and Customer access)
router.post(
  "/",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]), // Validate role
  validate(createOrderSchema, "body"), // Validate order creation body fields
  OrderController.createOrder, // Handle placement
);

// Route: GET /api/orders
// Description: Get all orders filtered by parameters (Admin access only)
router.get(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(orderQuerySchema, "query"), // Validate search, pagination, status query parameters
  OrderController.getOrders,
);

// Route: GET /api/orders/:id
// Description: Retrieve details of an order by ID (Admin and Customer access)
router.get(
  "/:id",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  validate(idParamSchema, "params"),
  OrderController.getOrderById,
);

// Route: PUT /api/orders/:id/status
// Description: Update the status of an order (Admin access only)
router.put(
  "/:id/status",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  validate(updateOrderStatusSchema, "body"), // Validate status request body
  OrderController.updateOrderStatus,
);

// Route: PUT /api/orders/:id/cancel
// Description: Cancel an order (Admin access only)
router.put(
  "/:id/cancel",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  OrderController.cancelOrder,
);

export { router as OrderRouter };
