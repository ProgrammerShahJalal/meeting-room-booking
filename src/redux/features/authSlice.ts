import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../components/utils/types";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

const loadAuthState = (): AuthState => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  return {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
    token: token || null,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        user: User;
        token: string;
      }>
    ) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      // Save to local storage
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("token", state.token);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      // Remove from local storage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
