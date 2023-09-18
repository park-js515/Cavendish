import { configureStore } from '@reduxjs/toolkit';
import navSlice from './navSlice';
import userSlice from './userSlice';

export const store = configureStore({
  reducer: {
    nav: navSlice,
		user: userSlice,
  },
});
