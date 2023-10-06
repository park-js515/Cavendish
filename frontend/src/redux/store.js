import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
// localStorage
import storage from "redux-persist/lib/storage";
// session
// import storageSession from "redux-persist/lib/storage/session"

// Slice(Reducer)
import userSlice from "./userSlice";
import recommendSlice from "./recommendSlice";

const rootReducer = combineReducers({
  user: userSlice,
  recommend: recommendSlice,
});

const persistConfig = {
  key: "Cavendish",
  // storage 타입: localStorage
  storage,
  // whitelist: 포함시킬 것
  whitelist: ["user", "recommend"],
};

// 조건이 설정된 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    });
  },
});

export default store;
