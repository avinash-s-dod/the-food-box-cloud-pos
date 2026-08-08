import { Schema, model, Document } from "mongoose";
import { OrderStatus, PaymentStatus, type Order } from "./orders.types.js";

const orderSchema = new Schema<Order>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
    },
    phone: {
      type: String,
      required: [true, "Customer phone is required"],
    },
    address: {
      type: String,
      required: [true, "Customer address is required"],
    },
    notes: {
      type: String,
    },
    items: {
      type: [
        {
          menuId: {
            type: Schema.Types.ObjectId,
            ref: "Menu",
            required: [true, "Menu ID is required"],
          },
          name: { type: String, required: [true, "Item name is required"] },
          price: { type: Number, required: [true, "Item price is required"] },
          quantity: {
            type: Number,
            required: [true, "Item quantity is required"],
          },
          subtotal: {
            type: Number,
            required: [true, "Item subtotal is required"],
          },
        },
      ],
      required: [true, "Order items are required"],
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required"],
    },
    deliveryCharge: {
      type: Number,
      required: [true, "Delivery charge is required"],
    },
    grandTotal: {
      type: Number,
      required: [true, "Grand total is required"],
    },
    orderStatus: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PLACED,
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PaymentStatus),
      default: PaymentStatus.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

export const OrderModel = model<Order>("Order", orderSchema);
