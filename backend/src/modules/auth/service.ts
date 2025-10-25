import UserModel, { type IUserDocument } from "./model.js";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import type { SignupInput, LoginInput } from "./schema.js";

const JWT_EXPIRES_IN = "7d";

export class AuthServices {
  static async signup(
    data: SignupInput
  ): Promise<{ token: string; user: IUserDocument }> {
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");

    const user = new UserModel(data);
    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      algorithm: config.jwtAlgorithm as jwt.Algorithm,
      expiresIn: JWT_EXPIRES_IN,
    });
    return { token, user };
  }

  static async login(
    data: LoginInput
  ): Promise<{ token: string; user: IUserDocument }> {
    const user = await UserModel.findByCredentials(data.email, data.password);
    if (!user) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, config.jwtSecret, {
      algorithm: config.jwtAlgorithm as jwt.Algorithm,
      expiresIn: JWT_EXPIRES_IN,
    });

    return { token, user };
  }
}
