import React from "react";
import { useCreateBookingMutation } from "../redux/api/bookingApi";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

interface SubmitBookingProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  roomId: string;
  selectedSlotIds: string[];
  selectedDate: Date;

  onBookingSuccess: (
    roomName: string,
    date: string,
    time: string,
    cost: number
  ) => void;
}

const SubmitBooking: React.FC<SubmitBookingProps> = ({
  selectedDate,
  selectedSlotIds,
  roomId,
  user,
  onBookingSuccess,
}) => {
  const [createBooking, { isLoading, error }] = useCreateBookingMutation();

  const handleBooking = async () => {
    const bookingData = {
      date: selectedDate.toISOString(),
      slots: selectedSlotIds,
      room: roomId,
      user: user._id,
    };

    try {
      const response = await createBooking(bookingData).unwrap();

      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Booking created successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });

      // Trigger the success callback with relevant details
      onBookingSuccess(
        response?.data?.room?.name,
        response?.data?.date,
        `${response?.data?.slots[0]?.startTime} - ${response?.data?.slots[0]?.endTime}`,
        response?.data?.totalAmount
      );
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Confirm Booking"}
      </button>
      {error && (
        <p className="text-red-500 mt-2">
          There was an error creating the booking.
        </p>
      )}
    </div>
  );
};

export default SubmitBooking;
