import { CategoryModel } from "./category.model.js";
import type { CreateCategoryInput } from "./category.schema.js";

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

export const CategoryService = {
  createCategory,
};
