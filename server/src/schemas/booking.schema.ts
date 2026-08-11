import { z } from "zod";

export const bookingSchema = z.object({
  quantity: z.number().int().positive(),
  productId: z.number().int().positive(),
  userId: z.number().int().positive(),
});

export const updateBookingSchema = z.object({
  quantity: z.number().int().positive().optional(),
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"]).optional(),
});