import { z } from "zod";

export const bookingSchema = z.object({
  quantity: z.number().int().positive(),
  productId: z.number().int().positive(),
  userId: z.number().int().positive(),
});