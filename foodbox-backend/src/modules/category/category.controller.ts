import {
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "./category.schema.js";
import { CategoryService } from "./category.service.js";
import type { CategoryParams, CategoryQueryParams } from "./category.types.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

const createCategory = catchAsync<
  Record<string, string>,
  unknown,
  CreateCategoryInput
>(async (req, res) => {
  const category = await CategoryService.createCategory(req.body);

  return sendResponse(res, 201, "Category created successfully", category);
});

const getCategories = catchAsync<CategoryQueryParams>(async (req, res) => {
  const categories = await CategoryService.getCategories(req.query);

  return sendResponse(res, 200, "Categories fetched successfully", categories);
});

const getCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const category = await CategoryService.getCategoryById(req.params.id);

  return sendResponse(res, 200, "Category fetched successfully", category);
});

const updateCategoryById = catchAsync<
  CategoryParams,
  unknown,
  UpdateCategoryInput
>(async (req, res) => {
  const updatedCategory = await CategoryService.updateCategoryById(
    req.params.id,
    req.body,
  );

  return sendResponse(
    res,
    200,
    "Category updated successfully",
    updatedCategory,
  );
});

const deleteCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const deletedCategory = await CategoryService.deleteCategoryById(
    req.params.id,
  );

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
