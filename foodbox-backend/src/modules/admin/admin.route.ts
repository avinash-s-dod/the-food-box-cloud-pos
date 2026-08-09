import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { adminLoginSchema } from "./admin.schema.js";

const router = Router();

router.post(
  "/login",
  validate(adminLoginSchema, "body"),
  AdminController.login,
);

router.get("/profile", authMiddleware(["ADMIN"]), AdminController.profile);

export { router as AdminRouter };
