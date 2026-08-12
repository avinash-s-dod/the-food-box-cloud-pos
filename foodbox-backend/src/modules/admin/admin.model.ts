import bcrypt from "bcrypt";

import { Schema, model } from "mongoose";
import type { HydratedDocument } from "mongoose";

import { AdminRole, type AdminEntity } from "./admin.types.js";

export type AdminDocument = HydratedDocument<AdminEntity>;

// Mongoose Schema for Admin entity
const adminSchema = new Schema<AdminEntity>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Omit this field by default in database queries for safety
    },

    role: {
      type: String,
      enum: Object.values(AdminRole),
      default: AdminRole.ADMIN,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Auto-manage createdAt and updatedAt fields
  },
);

// Mongoose Pre-Save Middleware
// Description: Automatically hash the password using bcrypt before saving if it is new or modified
adminSchema.pre("save", async function (this: AdminDocument) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const AdminModel = model<AdminEntity>("Admin", adminSchema);
