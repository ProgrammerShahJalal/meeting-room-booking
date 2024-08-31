import React from "react";
import { useCreateBookingMutation } from "../redux/api/bookingApi";
import { useGetRoomByIdQuery } from "../redux/api/roomApi";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useGetSlotsByIds } from "../hooks/useGetSlotsByIds"; // Import your custom hook

interface CreateBookingData {
  date: string;
  slots: string[]; // Array of slot IDs
  room: string; // Room ID as a string
  user: string; // User ID as a string
}

interface SubmitBookingProps {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  roomId: string; // Room ID as a string
  selectedSlotIds: string[];
  selectedDate: Date;
  onBookingSuccess: (
    roomName: string,
    date: string,
    timeSlots: { startTime: string; endTime: string }[],
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

  // Fetch room details
  const { data: roomData } = useGetRoomByIdQuery(roomId);

  // Fetch all slots data using custom hook
  const slotTimes = useGetSlotsByIds(selectedSlotIds);

  const handleBooking = async () => {
    const bookingData: CreateBookingData = {
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
        roomData?.data?.name || "Room",
        response?.data?.date,
        slotTimes,
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
