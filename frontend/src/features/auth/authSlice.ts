import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define what the "user" looks like
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

// Define the state shape
interface AuthState {
  user: User | null;
  token: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
};

// Create the slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Save user + token (on login/signup success)
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    // Remove everything (on logout)
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions for components or RTK Query
export const { setCredentials, logout } = authSlice.actions;

// Export reducer for store
export default authSlice.reducer;
