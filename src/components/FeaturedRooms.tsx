import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetRoomsQuery } from "../redux/api/roomApi";
import Lottie from "lottie-react";

// URL to fetch Lottie animation JSON data
const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const FeaturedRooms = () => {
  const { data: rooms, isLoading, error } = useGetRoomsQuery(undefined);

  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(LOTTIE_URL);
        const data = await response.json();
        setAnimationData(data);
      } catch (err) {
        console.error("Failed to load Lottie animation data:", err);
      }
    };

    fetchAnimationData();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        {animationData && (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: 200, height: 200 }}
          />
        )}
      </div>
    );

  if (rooms?.data?.length === 0) return <p>No Rooms available right now!</p>;

  // Limit to 3 rooms
  const featuredRooms = rooms?.data?.slice(0, 3);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRooms?.map((room) => (
            <div
              key={room._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={room.imageUrl}
                alt={room.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
              <p className="text-gray-600 mb-1">
                Capacity: {room.capacity} People
              </p>
              <p className="text-gray-600 mb-4">
                Price: ${room.pricePerSlot} per slot
              </p>
              <Link
                to={`/rooms/${room._id}`}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
        <Link
          to="/meeting-rooms"
          className="mt-8 inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          See More
        </Link>
      </div>
      {error && (
        <p className="font-bold text-center my-5">Something went wrong!</p>
      )}
    </section>
  );
};

export default FeaturedRooms;
