import type { RequestHandler } from "express";
import type { ZodType } from "zod";

type ValidationTarget = "body" | "query" | "params";

export const validate = (
  schema: ZodType,
  target: ValidationTarget = "body",
): RequestHandler => {
  return (req, _res, next) => {
    try {
      schema.parse(req[target]);
      next();
    } catch (error) {
      next(error);
    }
  };
};