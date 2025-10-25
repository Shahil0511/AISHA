import type { Request, Response } from "express";
import { loginSchema, signupSchema } from "./schema.js";

import { AuthServices } from "./service.js";
import Logger from "../../loaders/logger.js";

export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      console.log("route hit");
      const validateData = signupSchema.parse(req.body);
      const { token, user } = await AuthServices.signup(validateData);
      Logger.info(`User registered :${user.email}`);
      return res.status(201).json({ token, user });
    } catch (error: any) {
      Logger.error("Signup error:", error.message);
      const message = error.errors ? error.errors : error.message;
      return res.status(400).json({ message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validateData = loginSchema.parse(req.body);
      const { token, user } = await AuthServices.login(validateData);
      Logger.info(`User Logged in ${user.email}`);
      return res.status(200).json({ token, user });
    } catch (error: any) {
      Logger.error("Login error:", error.message);
      const message = error.errors ? error.errors : error.message;
      return res.status(400).json({ message });
    }
  }
}
