import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate("/meeting-rooms");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <IoCloseCircleOutline size={64} className="text-red-600 mb-4" />
      <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Canceled</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your payment was not completed. Please try again.
      </p>
      <button
        onClick={handleRetryPayment}
        className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600"
      >
        Go to Meeting Rooms
      </button>
    </div>
  );
};

export default PaymentCancel;
