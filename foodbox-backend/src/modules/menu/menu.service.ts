import { CategoryModel } from "../category/category.model.js";
import { MenuModel } from "./menu.model.js";
import type { CreateMenuInput, UpdateMenuInput } from "./menu.schema.js";

const createMenu = async (payload: CreateMenuInput) => {
  const category = await CategoryModel.findOne({
    _id: payload.category,
    isDeleted: false,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const existingMenu = await MenuModel.findOne({
    name: payload.name,
    isDeleted: false,
  });

  if (existingMenu) {
    throw new Error("Menu item already exists");
  }

  const menu = await MenuModel.create(payload);
  return menu;
};

const getMenus = async () => {
  const menus = await MenuModel.find({ isDeleted: false })
    .select("-__v")
    .sort({ createdAt: -1 });
  return menus;
};

const getMenuById = async (id: string) => {
  const menu = await MenuModel.findOne({ _id: id, isDeleted: false }).select(
    "-__v",
  );
  if (!menu) {
    throw new Error("Menu item not found");
  }
  return menu;
};

const updateMenuById = async (id: string, payload: UpdateMenuInput) => {
  const currentMenu = await MenuModel.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!currentMenu) {
    throw new Error("Menu item not found");
  }

  if (payload.category) {
    const category = await CategoryModel.findOne({
      _id: payload.category,
      isDeleted: false,
    });

    if (!category) {
      throw new Error("Category not found");
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
      throw new Error("Menu item already exists in this category");
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
    throw new Error("Menu item not found");
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
