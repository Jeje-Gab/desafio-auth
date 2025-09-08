import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email().transform(v => v.trim().toLowerCase()),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(d => d.password === d.confirmPassword, { message: "Passwords must match", path: ["confirmPassword"] });

export const loginSchema = z.object({
  email: z.string().email().transform(v => v.trim().toLowerCase()),
  password: z.string().min(6),
});
