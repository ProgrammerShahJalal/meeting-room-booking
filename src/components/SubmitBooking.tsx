import React from "react";

interface SubmitBookingProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  roomName: string;
  selectedSlotId: string[];
  selectedDate: Date;
  startTime: string;
  endTime: string;
  paymentMethod: string;
  cost: number;
  onBookingSuccess: (
    roomName: string,
    date: string,
    time: string,
    cost: number
  ) => void;
}

const SubmitBooking: React.FC<SubmitBookingProps> = ({
  user,
  roomName,
  selectedSlotId,
  selectedDate,
  startTime,
  endTime,
  paymentMethod,
  cost,
  onBookingSuccess,
}) => {
  // const [bookRoom] = useBookRoomMutation(); // You may remove this if not needed

  const handleBooking = async () => {
    console.log("Confirm Booking button clicked");

    const bookingData = {
      user,
      slots: selectedSlotId,
      date: selectedDate.toISOString(),
      room: roomName,
      startTime,
      endTime,
      paymentMethod,
      cost,
      isConfirmed: "unconfirmed",
    };

    try {
      // Store booking data in local storage
      const existingBookings = JSON.parse(
        localStorage.getItem("bookings") || "[]"
      );
      localStorage.setItem(
        "bookings",
        JSON.stringify([...existingBookings, bookingData])
      );

      console.log("Booking stored in local storage");
      onBookingSuccess(
        roomName,
        selectedDate.toDateString(),
        `${startTime} - ${endTime}`,
        cost
      );
    } catch (error) {
      console.error("Error storing booking:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default SubmitBooking;
