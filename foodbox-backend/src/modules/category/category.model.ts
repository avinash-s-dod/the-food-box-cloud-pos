import {Schema,model} from "mongoose";
import type { Category } from "./category.types.js";

const categorySchema = new Schema<Category>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model<Category>("Category", categorySchema);