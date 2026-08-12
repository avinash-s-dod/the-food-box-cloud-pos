import { Schema, model } from "mongoose";
import type { Category } from "./category.types.js";

// Mongoose Schema for Menu Category entity
const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true, // Controls category visibility
    },
    isDeleted: {
      type: Boolean,
      default: false, // soft deletion flag
    },
  },
  {
    timestamps: true, // Auto manages createdAt and updatedAt timestamps
  },
);

export const CategoryModel = model<Category>("Category", categorySchema);
