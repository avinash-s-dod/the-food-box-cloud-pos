import { z } from "zod";
import { baseQuerySchema } from "../../common/common.schema.js";

export const createCustomerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Category name cannot exceed 50 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits"),
  email: z.email("Invalid email address").trim().toLowerCase().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type CreateCustomerInput = z.infer<typeof createCustomerSchema>;

export const customerLoginSchema = z
  .object({
    phone: z
      .string()
      .trim()
      .regex(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits")
      .optional(),
    email: z.email("Invalid email address").trim().toLowerCase().optional(),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => Boolean(data.phone) !== Boolean(data.email), {
    message: "Provide either email or phone, not both",
    path: ["email"],
  });
export type CustomerLoginInput = z.infer<typeof customerLoginSchema>;

export const updateCustomerSchema = createCustomerSchema
  .omit({
    password: true,
  })
  .partial();

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;

export type UpdateCustomerInput = z.infer<typeof updateCustomerSchema>;

export const customerQuerySchema = baseQuerySchema;
