import React from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  if (!isOpen) return null; // Conditional return remains

  const handleClose = () => {
    onClose(); // Close the modal first
    navigate("/my-bookings"); // Then navigate to /my-bookings
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Confirmed!</h2>
        <h3 className="text-lg font-bold mb-4">Thank you for booking!</h3>
        <p>
          <strong>Room:</strong> {bookingDetails.roomName}
        </p>
        <p>
          <strong>Date:</strong> {new Date(bookingDetails.date).toDateString()}
        </p>

        <p>
          <strong>Total Amount:</strong> ${bookingDetails.cost}
        </p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
