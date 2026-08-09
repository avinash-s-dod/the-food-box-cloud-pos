import { ApiFeatures } from "../../common/ApiFeatures.js";
import { AppError } from "../../common/AppError.js";
import { CategoryModel } from "../category/category.model.js";
import { MenuModel } from "./menu.model.js";
import type { CreateMenuInput, UpdateMenuInput } from "./menu.schema.js";
import type { MenuQueryParams } from "./menu.types.js";

const createMenu = async (payload: CreateMenuInput) => {
  const category = await CategoryModel.findOne({
    _id: payload.category,
    isDeleted: false,
  });

  if (!category) {
    throw AppError.notFound("Category not found");
  }

  const existingMenu = await MenuModel.findOne({
    name: payload.name,
    isDeleted: false,
  });

  if (existingMenu) {
    throw AppError.conflict("Menu item already exists");
  }

  const menu = await MenuModel.create(payload);
  return menu;
};

const getMenus = async (queryParams?: MenuQueryParams) => {
  const features = new ApiFeatures(
    MenuModel.find({ isDeleted: false }),
    queryParams ?? {},
  )
    .filter()
    .search(["name", "description"])
    .sort()
    .paginate();

  const menus = await features.query.select("-__v");
  return menus;
};

const getMenuById = async (id: string) => {
  const menu = await MenuModel.findOne({ _id: id, isDeleted: false }).select(
    "-__v",
  );
  if (!menu) {
    throw AppError.notFound("Menu item not found");
  }
  return menu;
};

const updateMenuById = async (id: string, payload: UpdateMenuInput) => {
  const currentMenu = await MenuModel.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!currentMenu) {
    throw AppError.notFound("Menu item not found");
  }

  if (payload.category) {
    const category = await CategoryModel.findOne({
      _id: payload.category,
      isDeleted: false,
    });

    if (!category) {
      throw AppError.notFound("Category not found");
    }
  }

  if (payload.name) {
    const categoryId = payload.category ?? currentMenu.category;

    const existingMenu = await MenuModel.findOne({
      name: payload.name,
      category: categoryId,
      _id: { $ne: id },
      isDeleted: false,
    });

    if (existingMenu) {
      throw AppError.conflict("Menu item already exists in this category");
    }
  }

  const updatedMenu = await MenuModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      returnDocument: "after",
    },
  ).select("-__v");

  return updatedMenu;
};

const deleteMenuById = async (id: string) => {
  const deletedMenu = await MenuModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, isAvailable: false },
    { returnDocument: "after" },
  ).select("-__v");

  if (!deletedMenu) {
    throw AppError.notFound("Menu item not found");
  }

  return deletedMenu;
};

export const MenuService = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
