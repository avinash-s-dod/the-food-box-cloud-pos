import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { adminLoginSchema } from "./admin.schema.js";
import { AdminRole } from "./admin.types.js";

const router = Router();

router.post(
  "/login",
  validate(adminLoginSchema, "body"),
  AdminController.login,
);

router.get(
  "/profile",
  authMiddleware([AdminRole.ADMIN]),
  AdminController.profile,
);

export { router as AdminRouter };
