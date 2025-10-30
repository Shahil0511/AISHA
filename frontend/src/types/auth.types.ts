export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  otp: string;
}

export interface OtpStepProps {
  register: any;
}

// 🧩 Types
export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role:string;
  };
}

// Define what the "user" looks like
export interface User {
  _id: string;
  name: string;
  email: string;
   role: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define the state shape
export interface AuthState {
  user: User | null;
  token: string | null;
   isAuthenticated: boolean; 
}

