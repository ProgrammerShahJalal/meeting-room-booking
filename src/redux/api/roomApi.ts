import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Room, RoomsResponse } from "../../components/utils/types";

export const roomApi = createApi({
  reducerPath: "roomApi",
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
  tagTypes: ["Room"],
  endpoints: (builder) => ({
    getRooms: builder.query<RoomsResponse, void>({
      query: () => "rooms",
      providesTags: ["Room"],
    }),
    getRoomById: builder.query({
      query: (id) => `rooms/${id}`,
      providesTags: (_, __, id) => [{ type: "Room", id }],
    }),

    createRoomWithImage: builder.mutation<
      Room,
      {
        name: string;
        roomNo: number;
        floorNo: number;
        capacity: number;
        pricePerSlot: number;
        amenities: string[];
        imageUrl: string;
      }
    >({
      query: (roomData) => ({
        url: "rooms",
        method: "POST",
        body: roomData,
      }),
      invalidatesTags: ["Room"],
    }),

    updateRoom: builder.mutation<Room, { id: string; body: Partial<Room> }>({
      query: ({ id, body }) => ({
        url: `rooms/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Room", id }, // Invalidate the specific room tag
        "Room", // Invalidate the room list tag to trigger a re-fetch
      ],
    }),

    deleteRoom: builder.mutation<void, string>({
      query: (id) => ({
        url: `rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Room"],
    }),
  }),
});

export const {
  useGetRoomsQuery,
  useGetRoomByIdQuery,
  useCreateRoomWithImageMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
