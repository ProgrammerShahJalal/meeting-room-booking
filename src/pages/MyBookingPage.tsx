import React from "react";
import { useGetUserBookingsQuery } from "../redux/api/bookingApi";
import { Booking } from "../components/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const MyBookingPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, error, isLoading } = useGetUserBookingsQuery(undefined);

  if (isLoading) return <div>Loading...</div>;

  const bookings = data?.data || [];

  return (
    <div className="bg-purple-100 px-16 py-12">
      <h1 className="text-2xl font-bold mb-3 text-center">
        Welcome back <span className="text-purple-600">{user?.name}</span>
      </h1>
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings?.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 md:gap-16">
          {bookings?.map(
            (booking: Booking, index: React.Key | null | undefined) => (
              <li
                key={index}
                className="mb-4 p-4 border rounded-xl shadow-sm bg-white"
              >
                <h2 className="text-lg font-semibold">{booking?.room?.name}</h2>
                <p>
                  Room No: {booking?.room?.roomNo} - Floor:{" "}
                  {booking?.room?.floorNo}
                </p>
                <p>
                  Date: {new Date(booking?.date).toDateString()}
                  <br />
                  Time: {booking?.slots[0]?.startTime} -{" "}
                  {booking?.slots[0]?.endTime}
                  <br />
                  Status:{" "}
                  <span
                    className={
                      booking?.isConfirmed === "confirmed"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {booking.isConfirmed}
                  </span>
                </p>
              </li>
            )
          )}
        </ul>
      )}
      {error && bookings?.length !== 0 && <h3>Something went wrong.</h3>}
    </div>
  );
};

export default MyBookingPage;
