import type { IUserDocument } from "./IUser.js";

// Used in login/signup services
export interface IAuthResponse {
  token: string;
  user: IUserDocument;
}

// Used for JWT payload
export interface IJwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

// Optional — if you want to strongly type AuthService methods
export interface IAuthService {
  sendOtp(data: {
    name: string;
    email: string;
    password: string;
  }): Promise<void>;
  verifyOtpAndSignup(data: {
    email: string;
    otp: string;
  }): Promise<IAuthResponse>;
  login(data: { email: string; password: string }): Promise<IAuthResponse>;
}
