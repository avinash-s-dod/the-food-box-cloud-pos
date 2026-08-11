import { z } from "zod";
import { baseQuerySchema } from "../../common/common.schema.js";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters"),

  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),

  image: z.string().trim().optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial().strict();

export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const categoryQuerySchema = baseQuerySchema;