import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface BookingSummaryProps {
  roomName: string;
  selectedDate: Date;
  startTime: string;
  endTime: string;
  cost: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  roomName,
  selectedDate,
  startTime,
  endTime,
  cost,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="border p-4 rounded-md mb-4">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>
      <p>
        <strong>Room:</strong> {roomName}
      </p>
      <p>
        <strong>Date:</strong> {selectedDate.toDateString()}
      </p>
      <p>
        <strong>Time:</strong> {startTime} - {endTime}
      </p>
      <p>
        <strong>Cost:</strong> ${cost}
      </p>
      <h3 className="text-lg font-semibold mt-4">User Information</h3>
      <p>
        <strong>Name:</strong> {user?.name || ""}
      </p>
      <p>
        <strong>Email:</strong> {user?.email || ""}
      </p>
      <p>
        <strong>Phone:</strong> {user?.phone || ""}
      </p>
      <p>
        <strong>Address:</strong> {user?.address || ""}
      </p>
    </div>
  );
};

export default BookingSummary;
