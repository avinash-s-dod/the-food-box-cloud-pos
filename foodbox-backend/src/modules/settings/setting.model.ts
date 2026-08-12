import { Schema, model, type HydratedDocument } from "mongoose";
import type {
  OpeningDay,
  RestaurantInfo,
  SettingsEntity,
} from "./setting.types.js";

export type SettingsDocument = HydratedDocument<SettingsEntity>;

// Sub-schema for Restaurant Daily Opening Status & Hours
const openingDaySchema = new Schema<OpeningDay>(
  {
    isOpen: {
      type: Boolean,
      default: true,
    },
    openTime: {
      type: String, // format: "HH:MM" e.g., "09:00"
    },
    closeTime: {
      type: String, // format: "HH:MM" e.g., "22:00"
    },
  },
  { _id: false }, // Avoid creating separate _id keys for sub-documents
);

// Sub-schema for Restaurant Contact and Location Information
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

// Mongoose Schema for singleton Restaurant Settings entity
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
      of: openingDaySchema, // Map of days (e.g. "Monday", "Tuesday") to openingDaySchema
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  },
);

export const SettingsModel = model<SettingsEntity>("Settings", settingsSchema);
