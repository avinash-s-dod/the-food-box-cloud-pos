import { z } from "zod";

const timeSchema = z
  .string()
  .regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "Time must be in HH:mm format",
  );

const openingDaySchema = z
  .object({
    isOpen: z.boolean(),
    openTime: timeSchema.optional(),
    closeTime: timeSchema.optional(),
  })
  .refine(
    (data) => {
      if (!data.isOpen) return true;

      return !!data.openTime && !!data.closeTime;
    },
    {
      message: "Open time and close time are required when the day is open",
      path: ["openTime"],
    },
  );

const restaurantInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Restaurant name must be at least 2 characters")
    .max(100, "Restaurant name cannot exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters"),
});

const openingHoursSchema = z.object({
  MONDAY: openingDaySchema,
  TUESDAY: openingDaySchema,
  WEDNESDAY: openingDaySchema,
  THURSDAY: openingDaySchema,
  FRIDAY: openingDaySchema,
  SATURDAY: openingDaySchema,
  SUNDAY: openingDaySchema,
});

export const createSettingsSchema = z.object({
  deliveryCharge: z
    .number()
    .nonnegative("Delivery charge cannot be negative"),

  restaurant: restaurantInfoSchema,

  openingHours: openingHoursSchema,
});

export type CreateSettingsInput = z.infer<typeof createSettingsSchema>;

export const updateSettingsSchema = createSettingsSchema
  .partial()
  .strict();

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;