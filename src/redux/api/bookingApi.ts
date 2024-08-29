import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://meeting-room-booking-gilt.vercel.app/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAvailableSlots: builder.query({
      query: ({ date, roomId }: { date: string; roomId: string }) =>
        `slots/availability?date=${date}&roomId=${roomId}`,
    }),
    bookRoom: builder.mutation({
      query: (bookingData) => ({
        url: "bookings",
        method: "POST",
        body: bookingData,
      }),
    }),
  }),
});

export const { useGetAvailableSlotsQuery, useBookRoomMutation } = bookingApi;
