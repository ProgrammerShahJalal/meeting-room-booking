import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Room } from "../../components/utils/types";

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
    getRooms: builder.query<Room[], void>({
      query: () => "rooms",
      providesTags: ["Room"],
    }),
    getRoomById: builder.query<Room, string>({
      query: (id) => `rooms/${id}`,
      providesTags: (result, error, id) => [{ type: "Room", id }],
    }),
    createRoomWithImage: builder.mutation<Room, FormData>({
      query: (formData) => ({
        url: "rooms",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Room"],
    }),
    updateRoom: builder.mutation<Room, { id: string; body: Partial<Room> }>({
      query: ({ id, body }) => ({
        url: `rooms/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
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
