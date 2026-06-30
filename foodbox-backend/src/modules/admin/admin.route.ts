import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", AdminController.login);

router.get("/profile", authMiddleware(["ADMIN"]), AdminController.profile);

export default router;