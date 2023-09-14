import { configureStore } from '@reduxjs/toolkit';
import navSlice from './navSlice';

export const store = configureStore({
  reducer: {
    nav: navSlice
  },
});
