import { loadStripe } from "@stripe/stripe-js";
import { CreateBookingData } from "../components/SubmitBooking";
// Initialize Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51JwIBsFBTfTsSwmz8bqtyXmnIOlnITi40PZxeH94CVw4gw41R2R6chUyOdKef9J0CCNKuB22rOlGeVlfUcS2L9Nf008TuoJ83R"
);

interface StripePaymentResult {
  sessionId: string;
}

// Function to handle Stripe payment
export const handleStripePayment = async (
  bookingData: CreateBookingData
): Promise<void> => {
  const { totalAmount } = bookingData;

  const stripe = await stripePromise;

  if (!stripe) {
    throw new Error("Stripe.js failed to load.");
  }

  try {
    // Ensure totalAmount is valid
    if (
      typeof totalAmount !== "number" ||
      isNaN(totalAmount) ||
      totalAmount <= 0
    ) {
      throw new Error("Invalid totalAmount: Must be a positive number.");
    }

    const response = await fetch(
      "https://meeting-room-booking-gilt.vercel.app/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: bookingData.date,
          slots: bookingData.slots,
          room: bookingData.room,
          user: bookingData.user,
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "Booking",
                },
                unit_amount: totalAmount,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cancel`,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout session.");
    }

    const { sessionId }: StripePaymentResult = await response.json();

    if (!sessionId) {
      throw new Error("No session ID returned from the backend.");
    }

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    console.error("Stripe payment error:", error);
    throw error;
  }
};
