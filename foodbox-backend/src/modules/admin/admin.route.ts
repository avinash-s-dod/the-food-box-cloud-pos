import { Router } from "express";
import { AdminController } from "./admin.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { adminLoginSchema } from "./admin.schema.js";
import { AdminRole } from "./admin.types.js";
import { authRateLimiter } from "../../middlewares/rateLimit.middleware.js";

// Initialize Router for Admin module
const router = Router();

// Route: POST /api/admin/login
// Description: Handle admin authentication/login
router.post(
  "/login",
  validate(adminLoginSchema, "body"), // Validate request body structure using Zod schema
  authRateLimiter,
  AdminController.login, // Call login handler in controller
);

// Route: GET /api/admin/profile
// Description: Retrieve the profile details of the logged-in admin
router.get(
  "/profile",
  authMiddleware([AdminRole.ADMIN]), // Authenticate and ensure user has ADMIN role
  AdminController.profile, // Call profile handler in controller
);

export { router as AdminRouter };
