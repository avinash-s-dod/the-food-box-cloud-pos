import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { AdminRole } from "../admin/admin.types.js";
import {
  createSettingsSchema,
  updateSettingsSchema,
} from "./setting.schema.js";
import { SettingsController } from "./setting.controller.js";
import { CustomerRole } from "../customers/customer.types.js";

const router = Router();

router.get(
  "/",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  SettingsController.getSettings,
);

router.post(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(createSettingsSchema, "body"),
  SettingsController.createSettings,
);

router.patch(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(updateSettingsSchema, "body"),
  SettingsController.updateSettings,
);

export { router as SettingsRouter };
