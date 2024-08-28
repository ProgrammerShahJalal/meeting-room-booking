import React, { useState } from "react";
import BookingForm from "../components/BookingForm";
import UserInformationForm from "../components/UserInformationForm";
import SubmitBooking from "../components/SubmitBooking";

const BookingPage: React.FC = () => {
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSlotSelect = (slotId: string, date: Date) => {
    setSelectedSlotId(slotId);
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Book a Room</h1>
      <BookingForm onSlotSelect={handleSlotSelect} />
      <UserInformationForm />
      {selectedSlotId && selectedDate && (
        <SubmitBooking
          selectedSlotId={selectedSlotId}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
};

export default BookingPage;
