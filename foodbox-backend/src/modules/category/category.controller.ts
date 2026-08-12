import {
  type CreateCategoryInput,
  type UpdateCategoryInput,
} from "./category.schema.js";
import { CategoryService } from "./category.service.js";
import type { CategoryParams, CategoryQueryParams } from "./category.types.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

// Handler: Create Category
// Description: Accepts request body for creating a category and calls the CategoryService
const createCategory = catchAsync<
  Record<string, string>,
  unknown,
  CreateCategoryInput
>(async (req, res) => {
  const category = await CategoryService.createCategory(req.body);

  return sendResponse(res, 201, "Category created successfully", category);
});

// Handler: Get Categories
// Description: Retrieves all active categories matching request query filters (pagination, sort, search)
const getCategories = catchAsync<CategoryQueryParams>(async (req, res) => {
  const result = await CategoryService.getCategories(req.query);

  return sendResponse(
    res,
    200,
    "Categories fetched successfully",
    result.categories,
    result.paginationMeta,
  );
});

// Handler: Get Category By ID
// Description: Retrieves details of a specific category using its MongoDB ID
const getCategoryById = catchAsync<CategoryParams>(async (req, res) => {
  const category = await CategoryService.getCategoryById(req.params.id);

  return sendResponse(res, 200, "Category fetched successfully", category);
});

// Handler: Update Category By ID
// Description: Updates properties of a category by ID and returns the updated category
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

// Handler: Delete Category By ID
// Description: Soft deletes a category by marking isDeleted as true
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
