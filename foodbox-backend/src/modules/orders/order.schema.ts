import { z } from "zod";
import mongoose from "mongoose";
import { OrderStatus, PaymentStatus } from "./orders.types.js";
import { baseQuerySchema } from "../../common/common.schema.js";

export const createOrderSchema = z.object({
  customerName: z
    .string()
    .trim()
    .min(2, "Customer name must be at least 2 characters")
    .max(50, "Customer name cannot exceed 50 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits"),
  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address cannot exceed 200 characters"),
  notes: z
    .string()
    .trim()
    .max(200, "Notes cannot exceed 200 characters")
    .optional(),
  items: z
    .array(
      z.object({
        menuId: z
          .string()
          .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: "Invalid Menu ID format",
          }),
        quantity: z
          .number()
          .int("Quantity must be a whole number")
          .min(1, "Quantity must be at least 1"),
      }),
    )
    .min(1, "Order must contain at least one item"),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const updateOrderStatusSchema = z.object({
  orderStatus: z.enum(OrderStatus),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;

export const orderQuerySchema = baseQuerySchema.extend({
  userId: z
    .string()
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid user ID format",
    })
    .optional(),
  orderStatus: z.enum(OrderStatus).optional(),
  paymentStatus: z.enum(PaymentStatus).optional(),
});
