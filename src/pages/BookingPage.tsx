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

  const [selectedSlotId, setSelectedSlotId] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [, setPaymentMethod] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookingDetails, setBookingDetails] = useState<{
    roomName: string;
    date: string;
    time: string;
    cost: number;
  } | null>(null);

  const handleSlotSelect = (
    slotId: string[],
    date: Date,
    startTime: string,
    endTime: string
  ) => {
    setSelectedSlotId(slotId);
    setSelectedDate(date);
    setStartTime(startTime);
    setEndTime(endTime);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
  };

  const handleBookingSuccess = (
    roomName: string,
    date: string,
    time: string,
    cost: number
  ) => {
    setBookingDetails({ roomName, date, time, cost });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Book a Room</h1>
      {room ? (
        <>
          <BookingForm onSlotSelect={handleSlotSelect} roomId={room?._id} />
          <UserInformationForm />
          {selectedSlotId && selectedDate && startTime && endTime && (
            <>
              <BookingSummary
                roomName={room.name}
                selectedDate={selectedDate}
                startTime={startTime}
                endTime={endTime}
                cost={room.pricePerSlot}
              />
              <PaymentOptions
                onPaymentMethodSelect={handlePaymentMethodSelect}
              />
              <SubmitBooking
                user={user}
                selectedDate={selectedDate}
                selectedSlotIds={selectedSlotId}
                roomId={room._id}
                onBookingSuccess={handleBookingSuccess}
              />
            </>
          )}
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={closeModal}
            bookingDetails={bookingDetails!}
          />
        </>
      ) : (
        <div className="text-center text-red-500">
          Room information not available.
        </div>
      )}
    </div>
  );
};

export default BookingPage;
