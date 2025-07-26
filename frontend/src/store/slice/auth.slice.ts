import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Import interfaces
import type { AuthModel } from "@models/Auth.model";

// Define the shape of the auth slice state
interface AuthState {
  auth: AuthModel | null;
  isAuthenticated: boolean;
}

// Initial state: no user is logged in
const initialState: AuthState = {
  auth: null,
  isAuthenticated: false,
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set the logged-in user
    login: (state, action: PayloadAction<AuthModel>) => {
      state.auth = action.payload;
      state.isAuthenticated = true;
    },
    // Clear the auth state (logout)
    logout: (state) => {
      state.auth = null;
      state.isAuthenticated = false;
    },
  },
});

// Export action creators
export const { login, logout } = authSlice.actions;

// Export reducer for store configuration
export default authSlice.reducer;

//Import root state
import type { RootState } from "@store";

// Returns the current authenticated user object
export const selectAuth = (state: RootState) => state.auth.auth;

// Returns true if the user is authenticated
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
