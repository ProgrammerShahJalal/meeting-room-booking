import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { Slot, SlotsResponse } from "../../components/utils/types";

export const slotApi = createApi({
  reducerPath: "slotApi",
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
  tagTypes: ["Slot"],
  endpoints: (builder) => ({
    getSlotsByRoomAndDate: builder.query<
      SlotsResponse,
      { date: string; roomId: string }
    >({
      query: ({ date, roomId }) =>
        `slots/availability?date=${date}&roomId=${roomId}`,
      providesTags: ["Slot"],
    }),
    getAllSlots: builder.query<SlotsResponse, void>({
      query: () => `slots/availability`,
      providesTags: ["Slot"],
    }),
    createSlots: builder.mutation<
      void,
      { room: string; date: string; startTime: string; endTime: string }
    >({
      query: (body) => ({
        url: "slots",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Slot"],
    }),
    updateSlot: builder.mutation<Slot, { id: string; body: Partial<Slot> }>({
      query: ({ id, body }) => ({
        url: `slots/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Slot", id }, "Slot"],
    }),
    deleteSlot: builder.mutation<void, string>({
      query: (id) => ({
        url: `slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slot"],
    }),
    getSlotById: builder.query<Slot, string>({
      query: (id) => `slots/${id}`,
      providesTags: (_, __, id) => [{ type: "Slot", id }],
    }),
  }),
});

export const {
  useGetSlotsByRoomAndDateQuery,
  useGetAllSlotsQuery,
  useCreateSlotsMutation,
  useUpdateSlotMutation,
  useDeleteSlotMutation,
  useGetSlotByIdQuery,
} = slotApi;
