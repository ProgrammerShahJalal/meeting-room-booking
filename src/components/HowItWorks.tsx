import { FaDoorOpen, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaDoorOpen className="text-4xl mx-auto text-blue-500 mb-2" />,
      title: "Select a Room",
      description: "Choose the perfect meeting room that suits your needs.",
    },
    {
      id: 2,
      icon: <FaCalendarAlt className="text-4xl mx-auto text-green-500 mb-2" />,
      title: "Choose Date & Time",
      description: "Pick the date and time that works best for your meeting.",
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-4xl mx-auto text-purple-500 mb-2" />,
      title: "Confirm Booking",
      description:
        "Review your selection and confirm your booking with a simple click.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="p-6 text-center bg-white rounded-xl shadow-md"
            >
              {step.icon}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
