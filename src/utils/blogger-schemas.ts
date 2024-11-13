import { z } from "zod";

export const authenticateSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  password: z.string(),
  avatarUrl: z.string().nullable(),
  role: z.enum(["ADMIN", "COMMON"]).default("COMMON"),
});