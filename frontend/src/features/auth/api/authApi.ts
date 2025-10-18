import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupPayload>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any, meta, arg) => {
        console.log("Server response (global):", response);
        console.log("Data sent to server (global):", arg);
        return response;
      },
    }),
    login: builder.mutation<AuthResponse, LoginPayload>({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any, meta, arg) => {
        console.log("Server response (global):", response);
        console.log("Data sent to server (global):", arg);
        return response;
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
