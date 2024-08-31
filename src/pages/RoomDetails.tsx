import { useParams, Link } from "react-router-dom";
import { useGetRoomByIdQuery } from "../redux/api/roomApi";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const RoomDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: room, error, isLoading } = useGetRoomByIdQuery(id!);
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

  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        Error loading room details.
      </div>
    );

  console.log("room", room);
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <img
                className="rounded-xl shadow-lg"
                src={room?.data?.imageUrl}
                alt={room?.data?.name}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-4xl font-bold mb-4">{room?.data?.name}</h1>
              <p className="text-gray-600 mb-2">
                <strong>Room No:</strong> {room?.data?.roomNo}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Floor No:</strong> {room?.data?.floorNo}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Capacity:</strong> {room?.data?.capacity} people
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Price per Slot:</strong> ${room?.data?.pricePerSlot}
              </p>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Amenities:</h3>
                <ul className="list-disc list-inside pl-5">
                  {room?.data?.amenities?.map(
                    (amenity: string, index: number) => (
                      <li key={index}>{amenity}</li>
                    )
                  )}
                </ul>
              </div>
              <Link
                to={`/book-room/${room?.data?._id}`}
                state={{ room: room?.data }}
              >
                <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors duration-300">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
