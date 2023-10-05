import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  loginRequest: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
    loginRequest: (state, action) => {
      state.loginRequest = action.payload;
    },
  },
});

export const { login, logout, loginRequest } = userSlice.actions;
export default userSlice.reducer;
