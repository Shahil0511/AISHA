import { z } from "zod";

export const requestOtpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),

  email: z.string().trim().email("Invalid email format").toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(64, "Password too long"),
});

export const verifyOtpSchema = z.object({
  email: z.string().trim().email("Invalid email format").toLowerCase(),

  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d{6}$/, "OTP must be numeric"),
});

// ✅ Login Validation Schema
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format")
    .toLowerCase(),

  password: z.string().min(1, "Password is required"),
});

export type RequestOtpInput = z.infer<typeof requestOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
