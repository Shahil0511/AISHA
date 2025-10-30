import { AuthState, User } from "@/types/auth.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const getInitialAuthState = ():AuthState=>{
  if(typeof window !=="undefined"){
    return{
 user: localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")!) 
    : null,
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"), 
    };
  }
  return{
  user: null,
  token: null,
  isAuthenticated: false
}
}

const initialState: AuthState = getInitialAuthState();

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
      state.isAuthenticated = true;

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    
    },

    // Remove everything (on logout)
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

// Export actions for components or RTK Query
export const { setCredentials, logout, updateProfile } = authSlice.actions;

// Export reducer for store
export default authSlice.reducer;
