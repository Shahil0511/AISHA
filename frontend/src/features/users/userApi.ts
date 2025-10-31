import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/store/store";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
}

export interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
  status: string;
  department: string;
}

// 🌍 Base Query setup (with token support)
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState)?.auth?.token;
    if (token) headers.set("authorization", `Bearer ${token}`);
    return headers;
  },
});

// ⚡ Create the API slice
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // 🟩 Fetch All Users
    getUsers: builder.query<User[], void>({
      query: () => "/",
      providesTags: ["User"],
    }),

    // 🟦 Add New User
    addUser: builder.mutation<User, CreateUserPayload>({
      query: (newUser) => ({
        url: "/",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    // 🟨 Delete User
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Hooks for components
export const { useGetUsersQuery, useAddUserMutation, useDeleteUserMutation } = userApi;
