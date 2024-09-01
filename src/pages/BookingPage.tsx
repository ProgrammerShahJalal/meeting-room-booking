import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserInformationForm from "../components/UserInformationForm";
import SubmitBooking from "../components/SubmitBooking";
import BookingSummary from "../components/BookingSummary";
import PaymentOptions from "../components/PaymentOptions";
import ConfirmationModal from "../components/ConfirmationModal";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import BookingForm from "../components/BookingForm";

const BookingPage: React.FC = () => {
  const location = useLocation();
  const room = location.state?.room;

  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeSlots, setTimeSlots] = useState<
    { startTime: string; endTime: string }[]
  >([]);
  const [, setPaymentMethod] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{
    roomName: string;
    date: string;
    timeSlots: { startTime: string; endTime: string }[];
    cost: number;
  } | null>(null);

  const handleSlotSelect = (
    slots: { slotId: string; startTime: string; endTime: string }[],
    date: Date
  ) => {
    const slotIds = slots.map((slot) => slot.slotId);
    setSelectedSlotIds(slotIds);
    setSelectedDate(date);
    setTimeSlots(
      slots.map((slot) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
      }))
    );
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleBookingSuccess = (
    roomName: string,
    date: string,
    cost: number
  ) => {
    setBookingDetails({ roomName, date, timeSlots, cost });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto p-4 py-10 bg-pink-100">
      <h1 className="text-4xl font-bold text-center mb-8">Book a Room</h1>
      {room ? (
        <>
          <BookingForm onSlotSelect={handleSlotSelect} roomId={room?._id} />
          <UserInformationForm />
          {selectedSlotIds.length > 0 && selectedDate && (
            <>
              <BookingSummary
                roomName={room.name}
                selectedDate={selectedDate}
                timeSlots={timeSlots}
                cost={room.pricePerSlot}
              />
              <PaymentOptions
                onPaymentMethodSelect={handlePaymentMethodSelect}
              />
              {user && (
                <SubmitBooking
                  user={user}
                  selectedDate={selectedDate}
                  selectedSlotIds={selectedSlotIds}
                  roomId={room._id}
                  onBookingSuccess={() =>
                    handleBookingSuccess(
                      room.name,
                      selectedDate.toISOString(),
                      room.pricePerSlot * selectedSlotIds.length
                    )
                  }
                />
              )}
            </>
          )}
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            bookingDetails={bookingDetails!}
          />
        </>
      ) : (
        <div className="text-center font-semibold text-red-500">
          Room information not available.
        </div>
      )}
    </div>
  );
};

export default BookingPage;
