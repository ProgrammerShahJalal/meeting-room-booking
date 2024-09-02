import React from "react";
import { useNavigate } from "react-router-dom";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToBookings = () => {
    navigate("/my-bookings");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <IoCheckmarkDoneCircleOutline size={64} className="text-green-600 mb-4" />
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your payment has been processed successfully.
      </p>
      <button
        onClick={handleNavigateToBookings}
        className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
      >
        View My Bookings
      </button>
    </div>
  );
};

export default PaymentSuccess;
