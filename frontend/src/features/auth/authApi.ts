import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

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
    _id: string;
    name: string;
    email: string;
  };
}

// 🌍 Base Query setup (handles API base URL + token injection)
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
  validateStatus: (response) =>
    response.status === 200 || response.status === 201,
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
      }),

      // When login succeeds, store token + user globally
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        console.log("🚀 Login mutation triggered");
        try {
          const { data } = await queryFulfilled;
          console.log("✅ Login success:", data);
          dispatch(setCredentials(data)); // Save user/token in authSlice
        } catch (error) {
          console.error("❌ Login failed:", error);
        }
      },
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

      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        console.log("🚀 Verify OTP triggered");
        try {
          const { data } = await queryFulfilled;
          console.log("✅ Signup success:", data);
          dispatch(setCredentials(data)); // Save user/token globally
        } catch (error) {
          console.error("❌ Verify OTP failed:", error);
        }
      },
    }),
  }),
});

// Export hooks for usage in components
export const { useLoginMutation, useRequestOtpMutation, useVerifyOtpMutation } =
  authApi;
