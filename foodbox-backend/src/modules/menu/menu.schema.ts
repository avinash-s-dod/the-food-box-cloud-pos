import { z } from "zod";
import mongoose from "mongoose";
import { baseQuerySchema } from "../../common/common.schema.js";

export const createMenuSchema = z.object({
  category: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid Category ID format",
  }),
  name: z
    .string()
    .trim()
    .min(2, "Item name must be at least 2 characters")
    .max(50, "Item name cannot exceed 50 characters"),
  description: z
    .string()
    .trim()
    .max(200, "Description cannot exceed 200 characters")
    .optional(),
  image: z.string().trim().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  preparationTime: z
    .number()
    .min(15, "Preparation time must be a positive number")
    .optional(),
});

export type CreateMenuInput = z.infer<typeof createMenuSchema>;

export const updateMenuSchema = createMenuSchema.extend({
  isAvailable: z.boolean().optional()
}).partial().strict();

export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;

export const menuQuerySchema = baseQuerySchema.extend({
  isAvailable: z.boolean().optional(),
});
