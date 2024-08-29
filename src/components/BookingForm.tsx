import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useGetAvailableSlotsQuery } from "../redux/api/bookingApi";
import { Slot } from "../components/utils/types";

interface BookingFormProps {
  onSlotSelect: (
    slotId: string,
    date: Date,
    startTime: string,
    endTime: string
  ) => void;
  roomId: string;
}

interface BError {
  message: string;
  statusCode: number;
  success: boolean;
  data?: BError;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSlotSelect, roomId }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dateStr = selectedDate
    ? new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0]
    : null;

  const {
    data: availableSlots,
    error,
    isLoading,
  } = useGetAvailableSlotsQuery({ date: dateStr!, roomId }, { skip: !dateStr });

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]);
    } else {
      setSelectedDate(null);
    }
  };

  const handleSlotClick = (slot: Slot) => {
    if (selectedDate) {
      onSlotSelect(slot._id, selectedDate, slot.startTime, slot.endTime);
    }
  };

  const isBError = (error: unknown): error is BError => {
    return (error as BError).message !== undefined;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold mb-4">Select Date and Time Slot</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="mb-4"
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : error && isBError(error) ? (
        <div>{error?.data?.message}</div>
      ) : (
        <>
          {selectedDate && availableSlots?.data?.length > 0 ? (
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">
                Available Time Slots:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots.data.map((slot: Slot) => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotClick(slot)}
                    className="p-2 rounded bg-green-500 hover:bg-green-600 text-white"
                  >
                    {slot.startTime} - {slot.endTime}
                  </button>
                ))}
              </div>
            </div>
          ) : selectedDate ? (
            <p>No available slots for this date.</p>
          ) : (
            <p>Select a date to view available time slots.</p>
          )}
        </>
      )}
    </div>
  );
};

export default BookingForm;
