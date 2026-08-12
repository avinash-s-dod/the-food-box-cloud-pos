import { ApiFeatures } from "../../common/ApiFeatures.js";
import { AppError } from "../../common/AppError.js";
import { CategoryModel } from "./category.model.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.schema.js";
import type { CategoryQueryParams } from "./category.types.js";

// Service: Create Category
// Description: Checks for duplicates by name, then creates a new Category in database
const createCategory = async (payload: CreateCategoryInput) => {
  const existingCategory = await CategoryModel.findOne({
    name: payload.name,
    isDeleted: false,
  });

  if (existingCategory) {
    throw AppError.conflict("Category already exists");
  }

  const category = await CategoryModel.create(payload);

  return category;
};

// Service: Get Categories
// Description: Filters and queries active categories. Resolves search terms, sorting, and pagination
const getCategories = async (queryParams?: CategoryQueryParams) => {
  const features = new ApiFeatures(
    CategoryModel.find({ isDeleted: false }),
    queryParams ?? {},
  )
    .filter()
    .search(["name", "description"])
    .sort();

  const paginationMeta = await features.getPaginationMeta();

  features.paginate();

  const categories = await features.query.select("-__v");

  return { categories, paginationMeta };
};

// Service: Get Category By ID
// Description: Retrieves a single active category using its primary ID key
const getCategoryById = async (id: string) => {
  const category = await CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  }).select("-__v");

  if (!category) {
    throw AppError.notFound("Category not found");
  }

  return category;
};

// Service: Update Category By ID
// Description: Updates properties of a category by ID. If updating name, checks that it is unique.
const updateCategoryById = async (id: string, payload: UpdateCategoryInput) => {
  if (payload.name) {
    const existingCategory = await CategoryModel.findOne({
      name: payload.name,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingCategory) {
      throw AppError.conflict("Category already exists");
    }
  }

  const updatedCategory = await CategoryModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      returnDocument: "after",
    },
  ).select("-__v");

  if (!updatedCategory) {
    throw AppError.notFound("Category not found");
  }

  return updatedCategory;
};

// Service: Delete Category By ID
// Description: Marks a category as soft-deleted (`isDeleted: true`) and makes it inactive
const deleteCategoryById = async (id: string) => {
  const deletedCategory = await CategoryModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    {
      isDeleted: true,
      isActive: false,
    },
    {
      returnDocument: "after",
    },
  ).select("-__v");

  if (!deletedCategory) {
    throw AppError.notFound("Category not found");
  }

  return deletedCategory;
};

export const CategoryService = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
