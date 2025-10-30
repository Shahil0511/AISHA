import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {AuthResponse, LoginPayload, SignupPayload} from "../../types/auth.types"


// 🌍 Base Query setup (handles API base URL + token injection)
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

// ⚡ Create RTK Query API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],

  endpoints: (builder) => ({
    // 🔹 LOGIN
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      })
    }),

    // 🔹 REQUEST OTP (signup step 1)
    requestOtp: builder.mutation<{ message: string }, SignupPayload>({
      query: (data) => ({
        url: "/signup/request-otp",
        method: "POST",
        body: data,
      }),
    }),

    // 🔹 VERIFY OTP (signup step 2)
    verifyOtp: builder.mutation<AuthResponse, { email: string; otp: string }>({
      query: (data) => ({
        url: "/signup/verify-otp",
        method: "POST",
        body: data,
      }),

     
    }),
  }),
});

// Export hooks for usage in components
export const { useLoginMutation, useRequestOtpMutation, useVerifyOtpMutation } =
  authApi;
