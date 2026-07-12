import type { Request, Response, NextFunction } from "express";
import { createMenuSchema, updateMenuSchema } from "./menu.schema.js";
import { MenuService } from "./menu.service.js";
import type { MenuParams } from "./menu.types.js";
import mongoose from "mongoose";

const createMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createMenuSchema.parse(req.body);
    const menu = await MenuService.createMenu(payload);

    return res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

const getMenus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menus = await MenuService.getMenus();
    return res.status(200).json({
      success: true,
      message: "Menus fetched successfully",
      data: menus,
    });
  } catch (error) {
    next(error);
  }
};

const getMenuById = async (
  req: Request<MenuParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid menu id");
    }

    const menu = await MenuService.getMenuById(id);

    return res.status(200).json({
      success: true,
      message: "Menu item fetched successfully",
      data: menu,
    });
  } catch (error) {
    next(error);
  }
};

const updateMenuById = async (
  req: Request<MenuParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid menu id");
    }

    const payload = updateMenuSchema.parse(req.body);
    const updatedMenu = await MenuService.updateMenuById(id, payload);

    return res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: updatedMenu,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenuById = async (
  req: Request<MenuParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid menu id");
    }
    const deletedMenu = await MenuService.deleteMenuById(id);

    return res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
      data: deletedMenu,
    });
  } catch (error) {
    next(error);
  }
};

export const MenuController = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenuById,
  deleteMenuById,
};
