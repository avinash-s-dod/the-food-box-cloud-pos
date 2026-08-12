import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.js";
import { sendResponse } from "../common/sendResponse.js";
import type { UserRole } from "../types/auth.types.js";

// Middleware: Authentication & Authorization
// Description: Checks Authorization Bearer header, validates JWT, and matches decoded role against allowedRoles
export const authMiddleware = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      // Check if header starts with Bearer prefix
      if (!authHeader?.startsWith("Bearer ")) {
        return sendResponse(res, 401, "Unauthorized Access");
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return sendResponse(res, 401, "Unauthorized Access");
      }

      // Verify the JWT token signature and decode content
      const decoded = verifyToken(token);

      // Verify role authorization access permissions
      if (!allowedRoles.includes(decoded.role)) {
        return sendResponse(res, 403, "Forbidden");
      }

      // Populate decrypted user info into custom request attribute
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};