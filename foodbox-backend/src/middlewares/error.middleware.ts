import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../common/AppError.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.errors !== undefined && {
        errors: error.errors,
      }),
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues[0]?.message || "Validation failed",
      errors: error.issues,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};
