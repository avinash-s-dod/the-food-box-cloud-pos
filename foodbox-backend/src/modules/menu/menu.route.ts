import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { MenuController } from "./menu.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createMenuSchema,
  menuQuerySchema,
  updateMenuSchema,
} from "./menu.schema.js";
import { idParamSchema } from "../../common/common.schema.js";
import { AdminRole } from "../admin/admin.types.js";

// Initialize Router for Menu module
const router = Router();

// Route: POST /api/menu
// Description: Create a new menu item (Admin access only)
router.post(
  "/",
  authMiddleware([AdminRole.ADMIN]), // Authenticate as Admin
  validate(createMenuSchema, "body"), // Validate body schema
  MenuController.createMenu, // Call controller handler
);

// Route: GET /api/menu
// Description: Retrieve a paginated list of all menu items matching query filters (Public access)
router.get("/", validate(menuQuerySchema, "query"), MenuController.getMenus);

// Route: GET /api/menu/:id
// Description: Retrieve details of a specific menu item by ID (Public access)
router.get(
  "/:id",
  validate(idParamSchema, "params"), // Validate parameter format as ObjectId
  MenuController.getMenuById,
);

// Route: PUT /api/menu/:id
// Description: Update an existing menu item by ID (Admin access only)
router.put(
  "/:id",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  validate(updateMenuSchema, "body"), // Validate update body schema
  MenuController.updateMenuById,
);

// Route: DELETE /api/menu/:id
// Description: Soft delete a menu item by ID (Admin access only)
router.delete(
  "/:id",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  MenuController.deleteMenuById,
);

export { router as MenuRouter };
