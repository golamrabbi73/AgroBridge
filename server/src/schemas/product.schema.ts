import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().positive(),
  quantity: z.number().int().nonnegative(),
  categoryId: z.number().int().positive(),
  userId: z.number().int().positive(),
});