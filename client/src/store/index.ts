import { configureStore } from "@reduxjs/toolkit";
import { API } from "../services/apiService";
import authSlice from "./auth/authSlice";

export const createStore = () =>
  configureStore({
    reducer: {
      [API.reducerPath]: API.reducer,
      auth: authSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(API.middleware),
  });

export type AppStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
