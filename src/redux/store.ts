import { configureStore } from "@reduxjs/toolkit";
import { roomApi } from "./api/roomApi";
import { authApi } from "./api/authApi";
import authReduce from "./features/authSlice";
import { bookingApi } from "./api/bookingApi";
import { slotApi } from "./api/slotsApi";

export const store = configureStore({
  reducer: {
    auth: authReduce,
    [roomApi.reducerPath]: roomApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
    [slotApi.reducerPath]: slotApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      roomApi.middleware,
      authApi.middleware,
      bookingApi.middleware,
      slotApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
