import React from "react";
import { useGetUserBookingsQuery } from "../redux/api/bookingApi";

const MyBookingPage: React.FC = () => {
  const { data, error, isLoading } = useGetUserBookingsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading bookings.</div>;

  const bookings = data?.data || [];

  return (
    <div className="bg-purple-100 px-16 py-12">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings?.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 md:gap-16">
          {bookings.map((booking, index) => (
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
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingPage;
