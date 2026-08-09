import type { CreateMenuInput, UpdateMenuInput } from "./menu.schema.js";
import { MenuService } from "./menu.service.js";
import type { MenuQueryParams, MenuParams } from "./menu.types.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

const createMenu = catchAsync<Record<string, string>, unknown, CreateMenuInput>(
  async (req, res) => {
    const menu = await MenuService.createMenu(req.body);

    return sendResponse(res, 201, "Menu item created successfully", menu);
  },
);

const getMenus = catchAsync<MenuQueryParams>(async (req, res) => {
  const menus = await MenuService.getMenus(req.query);

  return sendResponse(res, 200, "Menus fetched successfully", menus);
});

const getMenuById = catchAsync<MenuParams>(async (req, res) => {
  const menu = await MenuService.getMenuById(req.params.id);

  return sendResponse(res, 200, "Menu item fetched successfully", menu);
});

const updateMenuById = catchAsync<MenuParams, unknown, UpdateMenuInput>(
  async (req, res) => {
    const updatedMenu = await MenuService.updateMenuById(
      req.params.id,
      req.body,
    );

    return sendResponse(
      res,
      200,
      "Menu item updated successfully",
      updatedMenu,
    );
  },
);

const deleteMenuById = catchAsync<MenuParams>(async (req, res) => {
  const deletedMenu = await MenuService.deleteMenuById(req.params.id);

  return sendResponse(res, 200, "Menu item deleted successfully", deletedMenu);
});

export const MenuController = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
