import React, { useState, useEffect } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Slot } from "../components/utils/types";
import { useGetSlotsByRoomAndDateQuery } from "../redux/api/slotsApi";
import { useDebounce } from "../hooks/useDebounce";

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
  const [isFetchingNewData, setIsFetchingNewData] = useState(false);

  const formattedDate = selectedDate
    ? selectedDate.toISOString().split("T")[0]
    : "";

  const debouncedDate = useDebounce(formattedDate, 300);

  const {
    data: availableSlots,
    error,
    isLoading,
  } = useGetSlotsByRoomAndDateQuery(
    { date: debouncedDate, roomId }, // Use the debounced date
    { skip: !roomId || !debouncedDate }
  );

  useEffect(() => {
    if (isLoading) {
      setIsFetchingNewData(true);
    }
    if (availableSlots?.data) {
      setIsFetchingNewData(false);
      const datesWithSlots = availableSlots.data.map(
        (slot: Slot) => new Date(slot.date)
      );
      setHighlightedDates(datesWithSlots);
    }
  }, [isLoading, availableSlots]);

  // Handle date change and debounce the fetch
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    setSelectedSlots([]); // Clear selected slots when the date changes
    setIsFetchingNewData(true); // Set flag to true to show loading state

    if (value instanceof Date) {
      const utcDate = new Date(
        Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())
      );
      setSelectedDate(utcDate);
    } else if (
      Array.isArray(value) &&
      value[0] !== null &&
      value[0] !== undefined
    ) {
      const utcDate = new Date(
        Date.UTC(
          value[0].getFullYear(),
          value[0].getMonth(),
          value[0].getDate()
        )
      );
      setSelectedDate(utcDate);
    } else {
      setSelectedDate(null);
    }
  };

  const slotsLength = availableSlots?.data?.length || 0;

  const handleSlotClick = (slot: Slot) => {
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
      {(isFetchingNewData || isLoading) && !error ? (
        <div>Loading...</div>
      ) : error ? (
        <div>No available slots for this date.</div>
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
