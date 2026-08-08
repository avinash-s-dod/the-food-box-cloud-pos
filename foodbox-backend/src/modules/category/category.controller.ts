import mongoose from "mongoose";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";
import { CategoryService } from "./category.service.js";
import type { CategoryParams } from "./category.types.js";
import { AppError } from "../../common/AppError.js";
import { catchAsync } from "../../common/catchAsync.js";

const createCategory = catchAsync(async (req, res) => {
  const payload = createCategorySchema.parse(req.body);
  const category = await CategoryService.createCategory(payload);

  return res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getCategories();

  return res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data: categories,
  });
});

const getCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid category id");
  }

  const category = await CategoryService.getCategoryById(id);

  return res.status(200).json({
    success: true,
    message: "Category fetched successfully",
    data: category,
  });
});

const updateCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid category id");
  }

  const payload = updateCategorySchema.parse(req.body);

  const updatedCategory = await CategoryService.updateCategoryById(id, payload);

  return res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

const deleteCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid category id");
  }

  const deletedCategory = await CategoryService.deleteCategoryById(id);

  return res.status(200).json({
    success: true,
    message: "Category deleted successfully",
    data: deletedCategory,
  });
});

export const CategoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
