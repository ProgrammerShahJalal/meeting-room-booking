import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useBookRoomMutation } from "../redux/api/bookingApi";

// Load Stripe with your publishable API key
const stripePromise = loadStripe(
  "pk_test_51JwIBsFBTfTsSwmz8bqtyXmnIOlnITi40PZxeH94CVw4gw41R2R6chUyOdKef9J0CCNKuB22rOlGeVlfUcS2L9Nf008TuoJ83R"
);

interface SubmitBookingProps {
  roomName: string;
  selectedSlotId: string;
  selectedDate: Date;
  startTime: string;
  endTime: string;
  paymentMethod: string;
  cost: number;
  onBookingSuccess: (
    roomName: string,
    date: string,
    time: string,
    cost: number
  ) => void;
}

const SubmitBooking: React.FC<SubmitBookingProps> = ({
  roomName,
  selectedSlotId,
  selectedDate,
  startTime,
  endTime,
  paymentMethod,
  cost,
  onBookingSuccess,
}) => {
  const [bookRoom] = useBookRoomMutation();

  const handleBooking = async () => {
    console.log("Confirm Booking button clicked");

    const bookingData = {
      slotId: selectedSlotId,
      date: selectedDate.toISOString(),
      startTime,
      endTime,
      paymentMethod,
      cost,
    };

    if (paymentMethod === "cash") {
      console.log("Processing cash payment");
      try {
        await bookRoom(bookingData).unwrap();
        console.log("Booking successful");
        onBookingSuccess(
          roomName,
          selectedDate.toDateString(),
          `${startTime} - ${endTime}`,
          cost
        );
      } catch (error) {
        console.error("Booking error:", error);
      }
    } else if (paymentMethod === "stripe") {
      const stripe = await stripePromise;

      if (!stripe) {
        console.error("Stripe.js has not loaded yet.");
        return;
      }

      console.log("Creating Stripe checkout session");
      try {
        const response = await fetch("/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: cost * 100, // amount in cents
            bookingData, // Send the booking data to be associated with the Stripe session
          }),
        });

        const session = await response.json();
        console.log("Stripe session created", session);

        // Redirect to Stripe Checkout
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Stripe Checkout error:", error.message);
        }
      } catch (error) {
        console.error("Error creating Stripe checkout session:", error);
      }
    }
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default SubmitBooking;
