import { ApiFeatures } from "../../common/ApiFeatures.js";
import { AppError } from "../../common/AppError.js";
import { CategoryModel } from "../category/category.model.js";
import { MenuModel } from "./menu.model.js";
import type { CreateMenuInput, UpdateMenuInput } from "./menu.schema.js";
import type { MenuQueryParams } from "./menu.types.js";
import { logger } from "../../logger/logger.js";

// Service: Create Menu
// Description: Verifies category exists, checks name uniqueness, and creates a menu item
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

  logger.info("Menu item created", {
    menuId: menu._id,
    name: menu.name,
    categoryId: menu.category,
  });

  return menu;
};

// Service: Get Menus
// Description: Queries active menu items using sorting, pagination, and matching queries
const getMenus = async (queryParams?: MenuQueryParams) => {
  const features = new ApiFeatures(
    MenuModel.find({ isDeleted: false }),
    queryParams ?? {},
  )
    .filter()
    .search(["name", "description"])
    .sort();

  const paginationMeta = await features.getPaginationMeta();
  features.paginate();

  const menus = await features.query.select("-__v");
  return { menus, paginationMeta };
};

// Service: Get Menu By ID
// Description: Retrieves details of a specific active menu item
const getMenuById = async (id: string) => {
  const menu = await MenuModel.findOne({ _id: id, isDeleted: false }).select(
    "-__v",
  );
  if (!menu) {
    throw AppError.notFound("Menu item not found");
  }
  return menu;
};

// Service: Update Menu By ID
// Description: Updates properties of a menu item by ID. Validates new category and name uniqueness if supplied.
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

  if (!updatedMenu) {
    throw AppError.notFound("Menu item not found");
  }

  logger.info("Menu item updated", {
    menuId: updatedMenu._id,
    name: updatedMenu.name,
  });

  if (
    payload.isAvailable !== undefined &&
    payload.isAvailable !== currentMenu.isAvailable
  ) {
    logger.info("Menu item availability status changed", {
      menuId: updatedMenu._id,
      isAvailable: updatedMenu.isAvailable,
    });
  }

  return updatedMenu;
};

// Service: Delete Menu By ID
// Description: Soft deletes a menu item, marking isDeleted as true and isAvailable as false
const deleteMenuById = async (id: string) => {
  const deletedMenu = await MenuModel.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true, isAvailable: false },
    { returnDocument: "after" },
  ).select("-__v");

  if (!deletedMenu) {
    throw AppError.notFound("Menu item not found");
  }

  logger.info("Menu item deleted", {
    menuId: deletedMenu._id,
    name: deletedMenu.name,
  });

  return deletedMenu;
};

export const MenuService = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
