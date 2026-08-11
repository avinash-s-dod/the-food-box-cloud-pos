import { Schema, model, type HydratedDocument } from "mongoose";
import type {
  OpeningDay,
  RestaurantInfo,
  SettingsEntity,
} from "./setting.types.js";

export type SettingsDocument = HydratedDocument<SettingsEntity>;

const openingDaySchema = new Schema<OpeningDay>(
  {
    isOpen: {
      type: Boolean,
      default: true,
    },
    openTime: {
      type: String,
    },
    closeTime: {
      type: String,
    },
  },
  { _id: false },
);

const restaurantInfoSchema = new Schema<RestaurantInfo>(
  {
    name: {
      type: String,
      required: [true, "Restaurant name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Restaurant phone is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Restaurant address is required"],
      trim: true,
    },
  },
  { _id: false },
);

const settingsSchema = new Schema<SettingsEntity>(
  {
    deliveryCharge: {
      type: Number,
      required: [true, "Delivery charge is required"],
      min: 0,
      default: 0,
    },

    restaurant: {
      type: restaurantInfoSchema,
      required: true,
    },

    openingHours: {
      type: Map,
      of: openingDaySchema,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SettingsModel = model<SettingsEntity>("Settings", settingsSchema);
