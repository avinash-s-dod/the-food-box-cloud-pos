import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized Access",
        });
      }

      const decoded = verifyToken(token);

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};
