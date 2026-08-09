import mongoose from "mongoose";
import { z } from "zod";

export const baseQuerySchema = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional(),
  sort: z.string().trim().optional(),
});

export const idParamSchema = z.object({
  id: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "Invalid ID format",
  }),
});
