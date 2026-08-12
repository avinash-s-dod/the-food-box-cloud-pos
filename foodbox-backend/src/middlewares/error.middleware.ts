import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../common/AppError.js";
import { logger } from "../logger/logger.js";

// Middleware: Global Error Handler
// Description: Intercepts all unhandled errors thrown during request pipeline, categorizes them, and structures standard responses.
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
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

  if (error instanceof Error) {
    logger.error("Unexpected application error", {
      message: error.message,
      stack: error.stack,
    });
  } else {
    logger.error("Unexpected application error", {
      error,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};
