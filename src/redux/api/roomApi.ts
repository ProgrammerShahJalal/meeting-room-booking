// roomApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Room } from "../../components/utils/types";

export const roomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://meeting-room-booking-gilt.vercel.app/api/",
  }),
  endpoints: (builder) => ({
    getRooms: builder.query<Room[], void>({
      query: () => "rooms",
    }),
    getRoomById: builder.query<Room, string>({
      query: (id) => `rooms/${id}`,
    }),
  }),
});

export const { useGetRoomsQuery, useGetRoomByIdQuery } = roomApi;
