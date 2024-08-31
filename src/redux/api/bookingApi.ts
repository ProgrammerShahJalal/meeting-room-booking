import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

interface Booking {
  _id: string;
  date: string;
  slots: string[];
  room: string;
  user: string;
  totalAmount: number;
  isConfirmed: "confirmed" | "unconfirmed";
  isDeleted: boolean;
}

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
  tagTypes: ["Booking"],
  endpoints: (builder) => ({
    createBooking: builder.mutation<{ data: Booking }, Partial<Booking>>({
      query: (booking) => ({
        url: "/bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["Booking"],
    }),

    getAvailableSlots: builder.query({
      query: ({ date, roomId }: { date: string; roomId: string }) =>
        `slots/availability?date=${date}&roomId=${roomId}`,
    }),

    getAllBookings: builder.query<{ data: Booking[] }, void>({
      query: () => ({
        url: "/bookings",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    getUserBookings: builder.query({
      query: () => ({
        url: "/my-bookings",
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
    updateBooking: builder.mutation<
      { data: Booking },
      Partial<Booking> & Pick<Booking, "_id">
    >({
      query: ({ _id, ...patch }) => ({
        url: `/bookings/${_id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Booking"],
    }),
    deleteBooking: builder.mutation<{ data: Booking }, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetAvailableSlotsQuery,
  useCreateBookingMutation,
  useGetAllBookingsQuery,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;

export default bookingApi;
