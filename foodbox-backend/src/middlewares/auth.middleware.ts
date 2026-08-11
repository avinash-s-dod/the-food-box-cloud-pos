import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import { sendResponse } from "../common/sendResponse.js";
import type { UserRole } from "../types/auth.types.js";

export const authMiddleware = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return sendResponse(res, 401, "Unauthorized Access");
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return sendResponse(res, 401, "Unauthorized Access");
      }

      const decoded = verifyToken(token);

      if (!allowedRoles.includes(decoded.role)) {
        return sendResponse(res, 403, "Forbidden");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};