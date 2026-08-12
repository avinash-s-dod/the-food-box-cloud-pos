import bcrypt from "bcrypt";
import { Schema, type HydratedDocument, model } from "mongoose";
import { CustomerRole, type CustomerEntity } from "./customer.types.js";

export type CustomerDocument = HydratedDocument<CustomerEntity>;

// Mongoose Schema for Customer entity
const customerSchema = new Schema<CustomerEntity>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true, // Phone must be unique across non-deleted customers
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true, // Allow multiple null values for optional email field
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Exclude from query results by default
    },
    role: {
      type: String,
      enum: Object.values(CustomerRole),
      default: CustomerRole.USER,
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

// Mongoose Pre-Save Middleware
// Description: Automatically hashes password before saving if it has been modified or newly created
customerSchema.pre("save", async function (this: CustomerDocument) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const CustomerModel = model<CustomerEntity>("Customer", customerSchema);
