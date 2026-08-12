import mongoose from "mongoose";
import { z } from "zod";

// Schema: Base Query
// Description: Shared schema validation for search, sorting, and offset pagination query parameters
export const baseQuerySchema = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sort: z.string().trim().optional(),
});

// Schema: ID Parameter
// Description: Validates that a route URL parameter parameter matches a standard 24-character hex MongoDB ObjectId format
export const idParamSchema = z.object({
  id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ID format",
  }),
});
