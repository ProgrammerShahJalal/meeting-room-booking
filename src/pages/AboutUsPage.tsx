const AboutUsPage = () => {
  return (
    <div className="about-us-page pb-12 bg-gray-100">
      {/* Our Mission Section */}
      <section
        style={{
          backgroundImage: `url("/cloudy.svg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="our-mission text-white text-center mb-12 py-44"
      >
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-100 text-lg max-w-3xl mx-auto">
          At MRBS, our mission is to provide seamless and efficient meeting room
          booking services, ensuring that our clients have access to the best
          spaces for their business needs. We are committed to enhancing
          productivity and collaboration through innovative solutions and
          excellent customer service.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="meet-the-team mb-12">
        <h2 className="text-4xl font-bold text-center mb-8">Meet the Team</h2>
        <div className="mx-20 grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="team-member bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="our-story text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Story</h2>
        <p className="text-gray-600 text-lg max-w-3xl px-3 mx-auto">
          MRBS was founded in 4years with the vision of making it easier for
          businesses to find and book meeting rooms. Over the years, we have
          grown from a small startup to a trusted name in the industry, serving
          thousands of clients around the globe. Our journey has been driven by
          a passion for innovation and a commitment to excellence, and we
          continue to evolve and expand to meet the changing needs of our
          customers.
        </p>
      </section>
    </div>
  );
};

const teamMembers = [
  {
    id: 1,
    name: "Shah Jalal",
    role: "CEO & Founder",
    image: "https://avatars.githubusercontent.com/u/79104097?v=4",
    bio: "Shah Jalal is the visionary behind Meeting Room Booking System. With over 20 years of experience in the industry, he leads the team with passion and dedication.",
  },
  {
    id: 2,
    name: "Sultan Imran",
    role: "Chief Operating Officer",
    image:
      "https://img.freepik.com/free-photo/handsome-bearded-guy-posing-against-white-wall_273609-20597.jpg?t=st=1724812764~exp=1724816364~hmac=7f4127abebc488a6e953d30aeab9a67be453ef1ba78450efb9b093f1d465df69&w=740",
    bio: "Sultan oversees the daily operations and ensures that everything runs smoothly. She has a knack for solving problems and making things happen.",
  },
  {
    id: 3,
    name: "Jalal Uddin Rumi",
    role: "Chief Technology Officer",
    image:
      "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1724812632~exp=1724816232~hmac=75f98741f279e256c06e18058ffddaaa8d1afb4ab7e6f63e8df94c6b8b92c35d&w=740",
    bio: "Jalal Uddin Rumi is the tech genius behind our platform. He is responsible for the development and maintenance of our cutting-edge booking system.",
  },
];

export default AboutUsPage;
