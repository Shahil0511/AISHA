import UserModel, { type IUserDocument } from "./authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../../config/index.js";
import type { LoginInput, RequestOtpInput, VerifyOtpInput } from "./schema.js";

const JWT_EXPIRES_IN = "7d";
const OTP_EXPIRES_IN_MIN = 5;

// In-memory OTP store (replace with Redis in production)
const otpStore = new Map<
  string,
  { otp: string; name: string; password: string; expiresAt: Date }
>();

export class AuthServices {
  // Send OTP for signup
  static async sendOtp(data: RequestOtpInput) {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Save OTP in memory with expiration
    otpStore.set(data.email, {
      otp,
      name: data.name,
      password: data.password,
      expiresAt: new Date(Date.now() + OTP_EXPIRES_IN_MIN * 60 * 1000),
    });

    // Optional: Clean up expired OTPs automatically (every minute)
    setTimeout(() => {
      const record = otpStore.get(data.email);
      if (record && record.expiresAt < new Date()) otpStore.delete(data.email);
    }, OTP_EXPIRES_IN_MIN * 60 * 1000);

    // TODO: Send OTP via email/SMS
    console.log(`Send OTP ${otp} to ${data.email}`);
  }

  // Verify OTP and create user
  static async verifyOtpAndSignup(
    data: VerifyOtpInput
  ): Promise<{ token: string; user: IUserDocument }> {
    const record = otpStore.get(data.email);
    if (!record) throw new Error("No OTP requested for this email");

    if (record.expiresAt < new Date()) {
      otpStore.delete(data.email);
      throw new Error("OTP expired");
    }

    if (record.otp !== data.otp) throw new Error("Invalid OTP");

    if (!record.password) throw new Error("Password missing for this OTP");

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(record.password, 12);
    const user = new UserModel({
      name: record.name,
      email: data.email,
      password: hashedPassword,
    });
    await user.save();

    // Remove OTP from memory
    otpStore.delete(data.email);

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      algorithm: config.jwtAlgorithm as jwt.Algorithm,
      expiresIn: JWT_EXPIRES_IN,
    });

    return { token, user };
  }

  // Login
  static async login(
    data: LoginInput
  ): Promise<{ token: string; user: IUserDocument }> {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      algorithm: config.jwtAlgorithm as jwt.Algorithm,
      expiresIn: JWT_EXPIRES_IN,
    });

    return { token, user };
  }
}
