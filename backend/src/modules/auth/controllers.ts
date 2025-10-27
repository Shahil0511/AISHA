import type { Request, Response } from "express";
import { loginSchema, requestOtpSchema, verifyOtpSchema } from "./schema.js";
import { AuthServices } from "./service.js";
import Logger from "../../loaders/logger.js";

export class AuthController {
  // Signup request -> send OTP (using Redis, no DB)
  static async requestOtp(req: Request, res: Response) {
    try {
      const data = requestOtpSchema.parse(req.body);
      await AuthServices.sendOtp(data); // Redis handles OTP storage
      Logger.info(`OTP sent to: ${data.email}`);
      return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error: any) {
      Logger.error("Request OTP error:", error.message);
      return res.status(400).json({ message: error.errors || error.message });
    }
  }

  // Verify OTP & create user (no DB OTP)
  static async verifyOtp(req: Request, res: Response) {
    try {
      const data = verifyOtpSchema.parse(req.body);
      const { token, user } = await AuthServices.verifyOtpAndSignup(data);
      Logger.info(`User registered: ${user.email}`);

      return res.status(201).json({ token, user });
    } catch (error: any) {
      Logger.error("Verify OTP error:", error.message);
      return res.status(400).json({ message: error.errors || error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const data = loginSchema.parse(req.body);

      const { token, user } = await AuthServices.login(data);
      return res.status(200).json({ token, user });
    } catch (zodError: any) {
      console.error("❌ Zod validation failed:", zodError);
      return res
        .status(400)
        .json({ message: zodError.errors || zodError.message });
    }
  }
}
