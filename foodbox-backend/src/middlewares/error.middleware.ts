import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../common/AppError.js";
import { logger } from "../logger/logger.js";

// Middleware: Global Error Handler
// Description: Intercepts all unhandled errors thrown during request pipeline,
// categorizes them, logs unexpected errors, and returns standard responses.
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Handle custom application errors
  if (error instanceof AppError) {
    // Internal errors should never expose internal details to clients
    if (!error.isOperational) {
      logger.error("Internal application error", {
        message: error.message,
        stack: error.stack,
      });

      return res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }

    // Handle expected operational errors
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      ...(error.errors !== undefined && {
        errors: error.errors,
      }),
    });
  }

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: error.issues[0]?.message || "Validation failed",
      errors: error.issues,
    });
  }

  // Handle unexpected JavaScript / runtime errors
  if (error instanceof Error) {
    logger.error("Unexpected application error", {
      message: error.message,
      stack: error.stack,
    });
  } else {
    // Handle unknown thrown values
    logger.error("Unexpected application error", {
      error,
    });
  }

  // Generic response for unexpected errors
  return res.status(500).json({
    success: false,
    message: "Something went wrong",
  });
};