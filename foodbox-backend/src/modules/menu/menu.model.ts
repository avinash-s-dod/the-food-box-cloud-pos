import { Schema, model } from "mongoose";
import type { Menu } from "./menu.types.js";
import { PREPARATION_TIME } from "../../common/constants.js";

const menuSchema = new Schema<Menu>(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
      default: PREPARATION_TIME,
    },
    isAvailable: {
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

export const MenuModel = model<Menu>("Menu", menuSchema);
