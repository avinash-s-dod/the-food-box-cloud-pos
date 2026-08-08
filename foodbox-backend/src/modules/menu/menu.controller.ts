import mongoose from "mongoose";
import { createMenuSchema, updateMenuSchema } from "./menu.schema.js";
import { MenuService } from "./menu.service.js";
import type { MenuParams } from "./menu.types.js";
import { AppError } from "../../common/AppError.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

const createMenu = catchAsync(async (req, res) => {
  const payload = createMenuSchema.parse(req.body);
  const menu = await MenuService.createMenu(payload);

  return sendResponse(res, 201, "Menu item created successfully", menu);
});

const getMenus = catchAsync(async (req, res) => {
  const menus = await MenuService.getMenus();

  return sendResponse(res, 200, "Menus fetched successfully", menus);
});

const getMenuById = catchAsync<MenuParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid menu id");
  }

  const menu = await MenuService.getMenuById(id);

  return sendResponse(res, 200, "Menu item fetched successfully", menu);
});

const updateMenuById = catchAsync<MenuParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid menu id");
  }

  const payload = updateMenuSchema.parse(req.body);
  const updatedMenu = await MenuService.updateMenuById(id, payload);

  return sendResponse(res, 200, "Menu item updated successfully", updatedMenu);
});

const deleteMenuById = catchAsync<MenuParams>(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw AppError.badRequest("Invalid menu id");
  }
  const deletedMenu = await MenuService.deleteMenuById(id);

  return sendResponse(res, 200, "Menu item deleted successfully", deletedMenu);
});

export const MenuController = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
