import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  refresh: null,
  role: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, refresh, role, user } = action.payload;
      state.token = token;
      state.refresh = refresh;
      state.role = role;
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.refresh = null;
      state.role = null;
      state.user = null;

      // Clear both standard and persisted states if used
      localStorage.removeItem("user");
      localStorage.removeItem("reduxState");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
