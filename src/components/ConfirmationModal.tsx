import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    roomName: string;
    date: string;
    time: string;
    cost: number;
  };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingDetails,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
        <p>
          <strong>Room:</strong> {bookingDetails.roomName}
        </p>
        <p>
          <strong>Date:</strong> {bookingDetails.date}
        </p>
        <p>
          <strong>Time:</strong> {bookingDetails.time}
        </p>
        <p>
          <strong>Cost:</strong> ${bookingDetails.cost}
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
