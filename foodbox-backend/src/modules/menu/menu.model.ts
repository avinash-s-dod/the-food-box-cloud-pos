import { Schema, model } from "mongoose";
import type { Menu } from "./menu.types.js";
import { PREPARATION_TIME } from "../../common/constants.js";

// Mongoose Schema for Menu Item entity
const menuSchema = new Schema<Menu>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference ID to Category collection
      required: [true, "Category is required"],
    },
    name: {
      type: String,
      required: [true, "Menu name is required"],
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Menu price is required"],
      default: 0,
    },
    preparationTime: {
      type: Number,
      default: PREPARATION_TIME, // Default item prep time (in minutes)
    },
    isAvailable: {
      type: Boolean,
      default: true, // Availability status of the item
    },
    isDeleted: {
      type: Boolean,
      default: false, // soft deletion flag
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  },
);

export const MenuModel = model<Menu>("Menu", menuSchema);
