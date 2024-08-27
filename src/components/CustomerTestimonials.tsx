import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Company A",
    testimonial:
      "The booking process was smooth and the customer service was excellent!",
    image: "https://example.com/john-doe.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Project Manager, Company B",
    testimonial:
      "I was able to find the perfect meeting room quickly and easily. Highly recommend!",
    image: "https://example.com/jane-smith.jpg",
  },
  {
    id: 3,
    name: "Michael Lee",
    role: "Entrepreneur",
    testimonial:
      "Great experience from start to finish. The room was exactly as described.",
    image: "https://example.com/michael-lee.jpg",
  },
];

const CustomerTestimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-gray-100 rounded-lg shadow-md"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <p className="text-gray-700 italic mb-4">
                "{testimonial.testimonial}"
              </p>
              <h3 className="text-xl font-semibold">{testimonial.name}</h3>
              <p className="text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
