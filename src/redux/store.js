import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {thunk} from "redux-thunk";
import { signupSlice } from "../slice/signup";
import { dashboardSlice } from "../slice/dashboard";

const persistState = {
  key: "user",
  storage,
};
export const store = configureStore({
  reducer: {
    auth: persistReducer(persistState, signupSlice.reducer),
    dashboard: dashboardSlice.reducer,
  },
  middleware: (() => [thunk]),
});

export const persistor = persistStore(store);