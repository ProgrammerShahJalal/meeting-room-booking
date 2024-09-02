import React, { useState } from "react";
import { useCreateBookingMutation } from "../redux/api/bookingApi";
import { useGetRoomByIdQuery } from "../redux/api/roomApi";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useGetSlotsByIds } from "../hooks/useGetSlotsByIds";
import { handleStripePayment } from "../utils/stripePaymentHandler";

export interface CreateBookingData {
  totalAmount: number;
  date: string;
  slots: string[]; // Array of slot IDs
  room: string; // Room ID as a string
  user: string; // User ID as a string
  paymentOption: string;
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
  paymentOption: string;
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
  paymentOption,
  onBookingSuccess,
}) => {
  const [createBooking, { isLoading, error }] = useCreateBookingMutation();
  const [warning, setWarning] = useState<string | null>(null);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch room details
  const { data: roomData } = useGetRoomByIdQuery(roomId);

  // Fetch all slots data using custom hook
  const slotTimes = useGetSlotsByIds(selectedSlotIds);

  const handleBooking = async () => {
    // Check if payment option is selected
    if (!paymentOption) {
      setWarning("Please select a payment method.");
      return;
    }

    setWarning(null); // Clear warning if validation passes

    const bookingData: CreateBookingData = {
      date: selectedDate.toISOString(),
      slots: selectedSlotIds,
      room: roomId,
      user: user._id,
      paymentOption,
      totalAmount: Number(
        roomData?.data?.pricePerSlot * selectedSlotIds?.length
      ),
    };

    try {
      if (paymentOption === "stripe") {
        setStripeLoading(true); // Set loading state before Stripe payment
        await handleStripePayment(bookingData);

        // After successful stripe payment, create the booking on the server
        const response = await createBooking(bookingData).unwrap();
        setStripeLoading(false); // Reset loading state after Stripe payment

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

        setIsModalOpen(true); // Open confirmation modal
      } else {
        // For cash payments, complete the booking directly
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

        setIsModalOpen(true); // Open confirmation modal
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setStripeLoading(false); // Reset loading state in case of error
      toast.error("Error creating booking.");
    }
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        disabled={isLoading || stripeLoading}
      >
        {isLoading || stripeLoading ? "Processing..." : "Confirm Booking"}
      </button>
      {warning && <p className="text-yellow-500 mt-2">{warning}</p>}
      {error && (
        <p className="text-red-500 mt-2">
          There was an error creating the booking.
        </p>
      )}
      {isModalOpen && (
        <div className="modal">
          {/* Modal content for booking confirmation */}
          <h2>Booking Confirmed</h2>
        </div>
      )}
    </div>
  );
};

export default SubmitBooking;
