import {
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";

const ServiceAdvertisement = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Why Choose Our Service?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaClock className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">
              Real-Time Availability
            </h3>
            <p className="text-gray-600">
              See which rooms are available in real-time, ensuring you book
              exactly when you need it.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaCheckCircle className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">
              Instant Booking Confirmation
            </h3>
            <p className="text-gray-600">
              Receive immediate confirmation of your booking, with all the
              details at your fingertips.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaCalendarAlt className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
            <p className="text-gray-600">
              Easily manage your booking times with our flexible scheduling
              options, tailored to your needs.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <FaHeadset className="text-green-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our team is available around the clock to assist with any
              questions or concerns you may have.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAdvertisement;
