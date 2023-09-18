import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  accessToken: "",
  refreshToken: "",
  nickname: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const data = action.payload;

      state.isLogin = true;
      state.accessToken = data.accessToken;
      state.refreshToken = data.refreshToken;
      state.nickname = data.nickname;
    },
    logout: (state) => {
      state = { ...initialState };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
