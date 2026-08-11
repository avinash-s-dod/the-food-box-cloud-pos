import bcrypt from "bcrypt";
import { Schema, type HydratedDocument, model } from "mongoose";
import { CustomerRole, type CustomerEntity } from "./customer.types.js";

export type CustomerDocument = HydratedDocument<CustomerEntity>;

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
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      sparse: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    role: {
      type: String,
      enum: Object.values(CustomerRole),
      default: CustomerRole.USER,
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

customerSchema.pre("save", async function (this: CustomerDocument) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

export const CustomerModel = model<CustomerEntity>("Customer", customerSchema);
