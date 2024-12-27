import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "isLoggedIn",
  initialState:
    (typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("isLoggedIn") || "false")) ||
    false,
  reducers: {
    login: () => true,
    logout: () => false,
  },
});

export default slice.reducer;
export const { login, logout } = slice.actions;
