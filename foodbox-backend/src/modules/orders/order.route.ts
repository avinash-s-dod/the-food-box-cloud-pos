import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { OrderController } from "./order.controller.js";    

const router = Router();

router.post("/", authMiddleware(["ADMIN", "USER"]), OrderController.createOrder);
router.get("/", authMiddleware(["ADMIN"]), OrderController.getOrders);
router.get("/:id", authMiddleware(["ADMIN", "USER"]), OrderController.getOrderById);
router.put("/:id/status", authMiddleware(["ADMIN"]), OrderController.updateOrderStatus);
router.put("/:id/cancel", authMiddleware(["ADMIN"]), OrderController.cancelOrder);

export { router as OrderRouter };