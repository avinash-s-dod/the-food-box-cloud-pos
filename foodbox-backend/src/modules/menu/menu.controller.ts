import mongoose from "mongoose";
import { createMenuSchema, updateMenuSchema } from "./menu.schema.js";
import { MenuService } from "./menu.service.js";
import type { MenuParams } from "./menu.types.js";
import { AppError } from "../../common/AppError.js";
import { catchAsync } from "../../common/catchAsync.js";

const createMenu = catchAsync(async (req, res) => {
  const payload = createMenuSchema.parse(req.body);
  const menu = await MenuService.createMenu(payload);

  return res.status(201).json({
    success: true,
    message: "Menu item created successfully",
    data: menu,
  });
});

const getMenus = catchAsync(async (req, res) => {
  const menus = await MenuService.getMenus();
  return res.status(200).json({
    success: true,
    message: "Menus fetched successfully",
    data: menus,
  });
});

const getMenuById = catchAsync<MenuParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid menu id");
  }

  const menu = await MenuService.getMenuById(id);

  return res.status(200).json({
    success: true,
    message: "Menu item fetched successfully",
    data: menu,
  });
});

const updateMenuById = catchAsync<MenuParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid menu id");
  }

  const payload = updateMenuSchema.parse(req.body);
  const updatedMenu = await MenuService.updateMenuById(id, payload);

  return res.status(200).json({
    success: true,
    message: "Menu item updated successfully",
    data: updatedMenu,
  });
});

const deleteMenuById = catchAsync<MenuParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid menu id");
  }
  const deletedMenu = await MenuService.deleteMenuById(id);

  return res.status(200).json({
    success: true,
    message: "Menu item deleted successfully",
    data: deletedMenu,
  });
});

export const MenuController = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
