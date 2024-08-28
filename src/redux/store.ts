import { configureStore } from "@reduxjs/toolkit";
import { roomApi } from "./api/roomApi";
import { authApi } from "./api/authApi";
import authReduce from "./features/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReduce,
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomApi.middleware, authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
