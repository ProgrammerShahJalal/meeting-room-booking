import React, { useEffect, useState } from "react";
import { useGetUserBookingsQuery } from "../redux/api/bookingApi";
import { Booking } from "../components/utils/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Lottie from "lottie-react";

// URL to fetch Lottie animation JSON data
const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const MyBookingPage: React.FC = () => {
  const [animationData, setAnimationData] = useState(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const { data, error, isLoading } = useGetUserBookingsQuery(undefined);

  const bookings = data?.data || [];

  console.log("bookings", bookings);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(LOTTIE_URL);
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error("Failed to load Lottie animation data:", err);
      }
    };

    fetchAnimationData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        )}
      </div>
    );

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
                <p>Date: {new Date(booking?.date).toDateString()}</p>
                <div>
                  <p>Time Slots:</p>
                  <ul>
                    {booking?.slots?.map((slot, slotIndex) => (
                      <li key={slotIndex}>
                        {slot.startTime} - {slot.endTime}
                      </li>
                    ))}
                  </ul>
                </div>
                <p>
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
      {error && bookings?.length !== 0 && (
        <h3 className="font-bold text-center my-5">Something went wrong.</h3>
      )}
    </div>
  );
};

export default MyBookingPage;
