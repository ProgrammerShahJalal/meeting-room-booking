import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://meeting-room-booking-gilt.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getRooms: builder.query({
      query: () => "rooms",
    }),
    getRoomById: builder.query({
      query: (id) => `rooms/${id}`,
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomByIdQuery } = roomApi;
