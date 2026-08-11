import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  role: z.enum(["FARMER", "BUYER", "STORAGE_OWNER", "ADMIN"]).optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
});
