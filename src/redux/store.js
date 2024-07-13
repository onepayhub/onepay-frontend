import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";
import { signupSlice } from "../slice/signup";

const persistState = {
  key: "user",
  storage,
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(persistState, signupSlice.reducer),
  },
  middleware: (() => [thunk]),
});

export const persistor = persistStore(store);