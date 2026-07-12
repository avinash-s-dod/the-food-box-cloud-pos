import { z } from "zod";
import mongoose from "mongoose";

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
    .min(15, "Preparation time must be a positive number"),
});

export type CreateMenuInput = z.infer<typeof createMenuSchema>;

export const updateMenuSchema = createMenuSchema.partial();

export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;
