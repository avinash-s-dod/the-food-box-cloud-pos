import type { Request, Response, NextFunction } from "express";

import { adminLoginSchema } from "./admin.schema.js";
import { AdminService } from "./admin.service.js";

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = adminLoginSchema.parse(req.body);

    const result = await AdminService.loginAdmin(payload);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.getProfile(req.user!.id);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AdminController = {
  login,
  profile,
};