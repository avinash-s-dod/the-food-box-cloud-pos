import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { CategoryController } from "./category.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  categoryQuerySchema,
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";
import { idParamSchema } from "../../common/common.schema.js";
import { AdminRole } from "../admin/admin.types.js";

// Initialize Router for Category module
const router = Router();

// Route: POST /api/categories
// Description: Create a new category (Admin access only)
router.post(
  "/",
  authMiddleware([AdminRole.ADMIN]), // Verify user is an authenticated Admin
  validate(createCategorySchema, "body"), // Validate body matches Zod creation schema
  CategoryController.createCategory, // Call controller handler
);

// Route: GET /api/categories
// Description: Retrieve a paginated list of all active categories (Public access)
router.get(
  "/",
  validate(categoryQuerySchema, "query"), // Validate query params (search, page, limit, sort)
  CategoryController.getCategories,
);

// Route: GET /api/categories/:id
// Description: Retrieve details of a specific category by ID (Admin access only)
router.get(
  "/:id",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"), // Validate URL parameter matches Mongo ObjectId format
  CategoryController.getCategoryById,
);

// Route: PUT /api/categories/:id
// Description: Update a category by ID (Admin access only)
router.put(
  "/:id",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  validate(updateCategorySchema, "body"), // Validate update body schema
  CategoryController.updateCategoryById,
);

// Route: DELETE /api/categories/:id
// Description: Soft delete a category by ID (Admin access only)
router.delete(
  "/:id",
  authMiddleware([AdminRole.ADMIN]),
  validate(idParamSchema, "params"),
  CategoryController.deleteCategoryById,
);

export { router as CategoryRouter };
