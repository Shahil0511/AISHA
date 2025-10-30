import UserModel from "../user/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import type {
  LoginInput,
  RequestOtpInput,
  VerifyOtpInput,
} from "./auth.schema.js";
import { sendOtpEmail } from "../../utils/mailer.js";
import redisClient from "../../config/redis.js";

import type { IAuthResponse } from "../../interfaces/IAuth.js";

const JWT_EXPIRES_IN = "7d";
const OTP_EXPIRES_IN_MIN = Number(process.env.OTP_EXPIRES_IN_MIN || 10);

export class AuthServices {
  // Send OTP for signup
  static async sendOtp(data: RequestOtpInput): Promise<void> {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const redisKey = `otp:${data.email}`;

    await redisClient.setEx(
      redisKey,
      OTP_EXPIRES_IN_MIN * 60,
      JSON.stringify({
        otp,
        name: data.name,
        password: data.password,
      })
    );

    await sendOtpEmail(data.email, otp);
  }

  // Verify OTP and create user
  static async verifyOtpAndSignup(
    data: VerifyOtpInput
  ): Promise<IAuthResponse> {
    const redisKey = `otp:${data.email}`;
    const recordStr = await redisClient.get(redisKey);

    if (!recordStr) throw new Error("OTP expired or not found");

    const record = JSON.parse(recordStr);
    if (record.otp !== data.otp) throw new Error("Invalid OTP");

    const user = await UserModel.create({
      name: record.name,
      email: data.email,
      password: record.password,
      
    });

    await redisClient.del(redisKey);

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      algorithm: config.jwtAlgorithm as jwt.Algorithm,
      expiresIn: JWT_EXPIRES_IN,
    });

    return { token, user };
  }

  // Login
  static async login(data: LoginInput): Promise<IAuthResponse> {
    const user = await UserModel.findOne({ email: data.email }).select(
      "+password"
    );
    if (!user || !user.password) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      algorithm: config.jwtAlgorithm as jwt.Algorithm,
      expiresIn: JWT_EXPIRES_IN,
    });

    return { token, user };
  }
}
