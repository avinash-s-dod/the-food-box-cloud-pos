import type { RequestHandler } from "express";
import type { ZodType } from "zod";

// Enumerates valid targets within an Express Request object for validation
type ValidationTarget = "body" | "query" | "params";

// Middleware: Request Validation
// Description: Validates the request property (body, query, or params) against a Zod schema
export const validate = (
  schema: ZodType,
  target: ValidationTarget = "body",
): RequestHandler => {
  return (req, _res, next) => {
    try {
      // Parse data and throw ZodError if validation fails
      schema.parse(req[target]);
      next();
    } catch (error) {
      next(error);
    }
  };
};