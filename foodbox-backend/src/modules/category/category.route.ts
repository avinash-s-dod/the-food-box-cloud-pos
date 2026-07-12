import {Router} from "express";

import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { CategoryController } from "./category.controller.js";

const router = Router();

router.post("/", authMiddleware(["ADMIN"]), CategoryController.createCategory);
router.get("/", CategoryController.getCategories);
router.get("/:id", CategoryController.getCategoryById);
router.put("/:id", authMiddleware(["ADMIN"]), CategoryController.updateCategoryById);
router.delete("/:id", authMiddleware(["ADMIN"]), CategoryController.deleteCategoryById);

export { router as CategoryRouter };