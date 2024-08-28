const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Seamless Booking Experience",
      description:
        "Book your meeting room effortlessly with our intuitive interface and real-time availability.",
    },
    {
      id: 2,
      title: "Secure Transactions",
      description:
        "Your payments and personal information are protected with top-notch security measures.",
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description:
        "Get assistance whenever you need it with our round-the-clock customer support.",
    },
  ];

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="p-6 bg-white shadow-md rounded-xl">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
