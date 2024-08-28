import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAvailableSlotsQuery } from "../redux/api/bookingApi";

// Define a type for the slot based on your MongoDB schema
interface Slot {
  _id: string;
  startTime: string;
  endTime: string;
}

interface BookingFormProps {
  onSlotSelect: (slotId: string, date: Date) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);

  const { data: slots, refetch } = useGetAvailableSlotsQuery(
    selectedDate ? selectedDate.toISOString().split("T")[0] : "",
    {
      skip: !selectedDate,
    }
  );

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate, refetch]);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);
    if (selectedDate) {
      onSlotSelect(slotId, selectedDate);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Select a Date</h2>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy-MM-dd"
        minDate={new Date()}
        className="w-full p-2 border border-gray-300 rounded-lg"
      />
      <div className="mt-4">
        {slots?.length > 0 ? (
          slots.map((slot: Slot) => (
            <button
              key={slot._id}
              onClick={() => handleSlotSelect(slot._id)}
              className={`p-2 border rounded-lg mb-2 ${
                selectedSlotId === slot._id
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {slot.startTime} - {slot.endTime}
            </button>
          ))
        ) : (
          <p>No slots available for the selected date.</p>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
