import type { CreateMenuInput, UpdateMenuInput } from "./menu.schema.js";
import { MenuService } from "./menu.service.js";
import type { MenuQueryParams, MenuParams } from "./menu.types.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

// Handler: Create Menu
// Description: Receives request body to create a new menu item, invokes MenuService, and returns category details
const createMenu = catchAsync<Record<string, string>, unknown, CreateMenuInput>(
  async (req, res) => {
    const menu = await MenuService.createMenu(req.body);

    return sendResponse(res, 201, "Menu item created successfully", menu);
  },
);

// Handler: Get Menus
// Description: Retrieves a paginated/filtered list of active menu items
const getMenus = catchAsync<MenuQueryParams>(async (req, res) => {
  const result = await MenuService.getMenus(req.query);

  return sendResponse(
    res,
    200,
    "Menus fetched successfully",
    result.menus,
    result.paginationMeta,
  );
});

// Handler: Get Menu By ID
// Description: Retrieves details of a specific menu item using its MongoDB ID
const getMenuById = catchAsync<MenuParams>(async (req, res) => {
  const menu = await MenuService.getMenuById(req.params.id);

  return sendResponse(res, 200, "Menu item fetched successfully", menu);
});

// Handler: Update Menu By ID
// Description: Updates properties of a menu item by ID and returns the updated item
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

// Handler: Delete Menu By ID
// Description: Soft deletes a menu item by setting isDeleted to true and isAvailable to false
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
