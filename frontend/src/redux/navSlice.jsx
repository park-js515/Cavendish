import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: true };

const navSlice = createSlice({
  name: "nav",
  initialState,
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
