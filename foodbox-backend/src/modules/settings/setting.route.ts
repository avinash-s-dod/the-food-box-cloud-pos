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

// Initialize Router for Settings module
const router = Router();

// Route: GET /api/settings
// Description: Retrieve current restaurant settings (Admin and Customer access)
router.get(
  "/",
  authMiddleware([AdminRole.ADMIN, CustomerRole.USER]),
  SettingsController.getSettings,
);

// Route: POST /api/settings
// Description: Create/Initialize restaurant settings (Admin access only)
router.post(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(createSettingsSchema, "body"), // Validate setting body details (e.g. name, location, times)
  SettingsController.createSettings,
);

// Route: PATCH /api/settings
// Description: Partially update restaurant settings (Admin access only)
router.patch(
  "/",
  authMiddleware([AdminRole.ADMIN]),
  validate(updateSettingsSchema, "body"), // Validate update body schema
  SettingsController.updateSettings,
);

export { router as SettingsRouter };
