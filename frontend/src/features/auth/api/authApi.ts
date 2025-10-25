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
    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: AuthResponse) => {
        if (process.env.NODE_ENV === "development") {
          console.log("Signup response:", response);
        }
        return response;
      },
    }),

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
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
