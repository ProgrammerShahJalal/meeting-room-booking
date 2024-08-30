import React, { useEffect, useState } from "react";

interface Booking {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  slots: string[];
  date: string;
  room: string;
  startTime: string;
  endTime: string;
  paymentMethod: string;
  cost: number;
  isConfirmed: string;
}

const MyBookingPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(storedBookings);
  }, []);

  return (
    <div className="bg-purple-100 px-16 py-12">
      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-3 justify-center items-center gap-4 md:gap-16">
          {bookings.map((booking, index) => (
            <li
              key={index}
              className="mb-4 p-4 border rounded-xl shadow-sm bg-white "
            >
              <h2 className="text-lg font-semibold">{booking.room}</h2>
              <p>
                Date: {new Date(booking.date).toDateString()}
                <br />
                Time: {booking.startTime} - {booking.endTime}
                <br />
                Status:{" "}
                <span
                  className={
                    booking.isConfirmed === "confirmed"
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
