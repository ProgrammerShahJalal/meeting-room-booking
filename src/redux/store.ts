import { configureStore } from "@reduxjs/toolkit";
import { roomApi } from "./api/roomApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
