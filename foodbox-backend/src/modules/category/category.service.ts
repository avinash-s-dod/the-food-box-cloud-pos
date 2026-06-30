import { CategoryModel } from "./category.model.js";
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./category.schema.js";

const createCategory = async (payload: CreateCategoryInput) => {
  const existingCategory = await CategoryModel.findOne({
    name: payload.name,
    isDeleted: false,
  });

  if (existingCategory) {
    throw new Error("Category already exists");
  }

  const category = await CategoryModel.create(payload);

  return category;
};

const getCategories = async () => {
  const categories = await CategoryModel.find({ isDeleted: false })
    .select("-__v")
    .sort({ createdAt: -1 });

  return categories;
};

const getCategoryById = async (id: string) => {
  const category = await CategoryModel.findOne({
    _id: id,
    isDeleted: false,
  }).select("-__v");

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

const updateCategoryById = async (id: string, payload: UpdateCategoryInput) => {
  if (payload.name) {
    const existingCategory = await CategoryModel.findOne({
      name: payload.name,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingCategory) {
      throw new Error("Category already exists");
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
    throw new Error("Category not found");
  }

  return updatedCategory;
};

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
    throw new Error("Category not found");
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
