import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: { isOpen: true },
  reducers: {
    navOpen: (state) => {
      state.isOpen = true;
    },
    navClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { navOpen, navClose } = navSlice.actions;
export default navSlice.reducer;
