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

const router = Router();

router.post(
  "/",
  authMiddleware(["ADMIN"]),
  validate(createCategorySchema, "body"),
  CategoryController.createCategory,
);

router.get(
  "/",
  validate(categoryQuerySchema, "query"),
  CategoryController.getCategories,
);

router.get(
  "/:id",
  validate(idParamSchema, "params"),
  CategoryController.getCategoryById,
);

router.put(
  "/:id",
  authMiddleware(["ADMIN"]),
  validate(idParamSchema, "params"),
  validate(updateCategorySchema, "body"),
  CategoryController.updateCategoryById,
);

router.delete(
  "/:id",
  authMiddleware(["ADMIN"]),
  validate(idParamSchema, "params"),
  CategoryController.deleteCategoryById,
);

export { router as CategoryRouter };
