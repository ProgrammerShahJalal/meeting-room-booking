// SubmitBooking.tsx
import React, { useState } from "react";
import { useBookRoomMutation } from "../redux/api/bookingApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "sonner";
import { useGetRoomByIdQuery } from "../redux/api/roomApi";
import { useParams } from "react-router-dom";

interface SubmitBookingProps {
  selectedSlotId: string;
  selectedDate: Date;
}

const SubmitBooking: React.FC<SubmitBookingProps> = ({
  selectedSlotId,
  selectedDate,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [bookRoom, { isLoading }] = useBookRoomMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { data: room } = useGetRoomByIdQuery(id!);

  const handleBooking = async () => {
    setIsSubmitting(true);

    if (!user || !room) {
      toast.error("User or room data is missing");
      setIsSubmitting(false);
      return;
    }

    try {
      await bookRoom({
        room: room._id,
        slots: [selectedSlotId],
        user: user._id,
        date: selectedDate.toISOString().split("T")[0],
        totalAmount: room.pricePerSlot,
      }).unwrap();

      toast.success("Booking successful!");
    } catch (error) {
      console.log(error);
      toast.error("Booking failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleBooking}
        disabled={isLoading || isSubmitting}
        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        {isSubmitting ? "Submitting..." : "Confirm Booking"}
      </button>
    </div>
  );
};

export default SubmitBooking;
