import type { NextFunction, Request, Response } from "express";

import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("Unauthorized");
      }

      const token = authHeader.split(" ")[1];

      if (!token) {
        throw new Error("Unauthorized");
      }

      const decoded = verifyToken(token);

      if (!allowedRoles.includes(decoded.role)) {
        throw new Error("Forbidden");
      }

      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };
};