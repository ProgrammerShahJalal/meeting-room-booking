import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Jamil Uddin",
    role: "CEO, Company A",
    testimonial:
      "The booking process was smooth and the customer service was excellent!",
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1724812632~exp=1724816232~hmac=75f98741f279e256c06e18058ffddaaa8d1afb4ab7e6f63e8df94c6b8b92c35d&w=740",
  },
  {
    id: 2,
    name: "Rakibul Hasan",
    role: "Project Manager, Company B",
    testimonial:
      "I was able to find the perfect meeting room quickly and easily. Highly recommend!",
    image:
      "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?t=st=1724812764~exp=1724816364~hmac=7f4127abebc488a6e953d30aeab9a67be453ef1ba78450efb9b093f1d465df69&w=740",
  },
  {
    id: 3,
    name: "Muntasir Hasan",

    role: "Entrepreneur",
    testimonial:
      "Great experience from start to finish. The room was exactly as described.",
    image:
      "https://img.freepik.com/premium-photo/20s-man-with-emotion-gesture-product-presentation-introduction_1000823-244194.jpg?w=826",
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
    <section className="py-16 bg-gray-100 rounded-xl">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Customers Say</h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-white rounded-lg shadow-md"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-pink-500 border-4 mx-auto mb-4"
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
