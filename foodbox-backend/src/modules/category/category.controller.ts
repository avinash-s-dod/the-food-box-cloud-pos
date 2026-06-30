import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";

import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";
import { CategoryService } from "./category.service.js";
import type { CategoryParams } from "./category.types.js";

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

const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const categories = await CategoryService.getCategories();

    return res.status(200).json({
      status: "success",
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (
  req: Request<CategoryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category id");
    }

    const category = await CategoryService.getCategoryById(id);

    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategoryById = async (
  req: Request<CategoryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category id");
    }

    const payload = updateCategorySchema.parse(req.body);

    const updatedCategory = await CategoryService.updateCategoryById(
      id,
      payload,
    );

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategoryById = async (
  req: Request<CategoryParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category id");
    }

    const deletedCategory = await CategoryService.deleteCategoryById(id);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const CategoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
