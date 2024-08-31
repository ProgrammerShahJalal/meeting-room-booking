import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Slot } from "../components/utils/types";
import { useGetSlotsByRoomAndDateQuery } from "../redux/api/slotsApi";

interface BookingFormProps {
  onSlotSelect: (
    slots: { slotId: string; startTime: string; endTime: string }[],
    date: Date
  ) => void;
  roomId: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ onSlotSelect, roomId }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [selectedSlots, setSelectedSlots] = useState<
    { slotId: string; startTime: string; endTime: string }[]
  >([]);

  const {
    data: availableSlots,
    error,
    isLoading,
  } = useGetSlotsByRoomAndDateQuery(
    { date: "", roomId }, // Fetch all slots for the room
    { skip: !roomId }
  );

  // Update highlightedDates whenever availableSlots changes
  React.useEffect(() => {
    if (availableSlots?.data) {
      const datesWithSlots = availableSlots.data.map(
        (slot: Slot) => new Date(slot.date)
      );
      setHighlightedDates(datesWithSlots);
    }
  }, [availableSlots]);

  const slotsLength = availableSlots?.data?.length || 0;

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setSelectedDate(value);
      setSelectedSlots([]); // Clear selected slots when the date changes
    } else if (Array.isArray(value)) {
      setSelectedDate(value[0]);
      setSelectedSlots([]); // Clear selected slots when the date changes
    } else {
      setSelectedDate(null);
      setSelectedSlots([]); // Clear selected slots when the date changes
    }
  };

  const handleSlotClick = (slot: Slot) => {
    console.log("slot in handle slot click", slot);

    const updatedSlots = [
      ...selectedSlots,
      {
        slotId: slot?._id,
        startTime: slot?.startTime,
        endTime: slot?.endTime,
      },
    ];

    setSelectedSlots(updatedSlots);

    onSlotSelect(updatedSlots, selectedDate as Date);
  };

  const tileClassName: CalendarProps["tileClassName"] = ({ date, view }) => {
    if (view === "month") {
      if (
        highlightedDates.some((d) => d.toDateString() === date.toDateString())
      ) {
        return "highlighted-date"; // Custom CSS class for highlighted dates
      }
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h2 className="text-2xl font-bold mb-4">Select Date and Time Slot</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="mb-4"
        tileClassName={tileClassName}
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error loading slots.</div>
      ) : (
        <>
          {selectedDate && slotsLength > 0 ? (
            <div className="w-full max-w-md">
              <h3 className="text-lg font-semibold mb-2">
                Available Time Slots:
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {availableSlots?.data?.map((slot: Slot) => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotClick(slot)}
                    className={`p-2 rounded text-white ${
                      selectedSlots.some((s) => s.slotId === slot._id)
                        ? "bg-green-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    disabled={selectedSlots.some((s) => s.slotId === slot._id)}
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
