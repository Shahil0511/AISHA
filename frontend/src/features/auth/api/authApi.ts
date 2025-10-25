import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "@/store"; // adjust path as per your setup

// 🧩 Types
interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// 🌍 Use process.env for Next.js
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`,
  prepareHeaders: (headers, { getState }) => {
    // const token = (getState() as RootState)?.auth?.token;
    // if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: AuthResponse) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Login response:", response);
        }
        return response;
      },
    }),

    requestOtp: builder.mutation<{ message: string }, SignupPayload>({
      query: (data) => ({
        url: "/signup/request-otp",
        method: "POST",
        body: data,
      }),
    }),

    verifyOtp: builder.mutation<AuthResponse, { email: string; otp: string }>({
      query: (data) => ({
        url: "/signup/verify-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRequestOtpMutation, useVerifyOtpMutation } =
  authApi;
