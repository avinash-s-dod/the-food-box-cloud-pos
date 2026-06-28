import type { Request, Response, NextFunction } from "express";

import { createCategorySchema } from "./category.schema.js";
import { CategoryService } from "./category.service.js";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const payload = createCategorySchema.parse(req.body);
    const category = await CategoryService.createCategory(payload);

    return res.status(201).json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  createCategory,
};
