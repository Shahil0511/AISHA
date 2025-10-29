import jwt from "jsonwebtoken";
import config from "../config/index.js";
import type { Request, Response, NextFunction } from "express";
import type { IJwtPayload } from "../interfaces/IAuth.js";
import UserModel from "../modules/user/user.model.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    const decoded = jwt.verify(
      token,
      config.jwtSecret as string
    ) as jwt.JwtPayload;

    if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    const { id } = decoded as IJwtPayload;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(401).json({ message: "User not found or deactivated" });
    }

    (req as any).user = user;
    next();
  } catch (err: any) {
    console.error("❌ Auth Middleware Error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
