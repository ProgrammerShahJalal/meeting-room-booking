import React, { useState } from "react";

interface PaymentOptionsProps {
  onPaymentMethodSelect: (method: string) => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  onPaymentMethodSelect,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleSelect = (method: string) => {
    setSelectedMethod(method);
    onPaymentMethodSelect(method);
  };

  return (
    <div className="border p-4 rounded-md mb-4">
      <h2 className="text-xl font-bold mb-4">Payment Options</h2>
      <div>
        <label className="block mb-2">
          <input
            type="radio"
            name="paymentMethod"
            value="stripe"
            checked={selectedMethod === "stripe"}
            onChange={() => handleSelect("stripe")}
            className="mr-2"
          />
          Stripe
        </label>

        <label className="block mb-2">
          <input
            type="radio"
            name="paymentMethod"
            value="cash"
            checked={selectedMethod === "cash"}
            onChange={() => handleSelect("cash")}
            className="mr-2"
          />
          Cash
        </label>
      </div>
    </div>
  );
};

export default PaymentOptions;
