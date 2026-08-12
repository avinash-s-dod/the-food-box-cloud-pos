import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../common/AppError.js";

// Middleware: Global Error Handler
// Description: Intercepts all unhandled errors thrown during request pipeline, categorizes them, and structures standard responses.
export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error("ERROR:", error);

  // Handle customized AppError instances
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.errors !== undefined && {
        errors: error.errors,
      }),
    });
  }

  // Handle request validation schema errors from Zod
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues[0]?.message || "Validation failed",
      errors: error.issues,
    });
  }

  // Fallback for internal server/uncaught runtime errors
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};
