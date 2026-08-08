import mongoose from "mongoose";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema.js";
import { CategoryService } from "./category.service.js";
import type { CategoryParams } from "./category.types.js";
import { AppError } from "../../common/AppError.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

const createCategory = catchAsync(async (req, res) => {
  const payload = createCategorySchema.parse(req.body);
  const category = await CategoryService.createCategory(payload);

  return sendResponse(res, 201, "Category created successfully", category);
});

const getCategories = catchAsync(async (req, res) => {
  const categories = await CategoryService.getCategories();

  return sendResponse(res, 200, "Categories fetched successfully", categories);
});

const getCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid category id");
  }

  const category = await CategoryService.getCategoryById(id);

  return sendResponse(res, 200, "Category fetched successfully", category);
});

const updateCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid category id");
  }

  const payload = updateCategorySchema.parse(req.body);

  const updatedCategory = await CategoryService.updateCategoryById(id, payload);

  return sendResponse(
    res,
    200,
    "Category updated successfully",
    updatedCategory,
  );
});

const deleteCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid category id");
  }

  const deletedCategory = await CategoryService.deleteCategoryById(id);

  return sendResponse(
    res,
    200,
    "Category deleted successfully",
    deletedCategory,
  );
});

export const CategoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
