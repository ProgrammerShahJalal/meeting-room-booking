import { useParams } from "react-router-dom";
import { useGetRoomByIdQuery } from "../redux/api/roomApi";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

// URL to fetch Lottie animation JSON data
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
  if (error) return <div>Error loading room details.</div>;
  console.log("room", room);
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <div className="w-2/4 mx-auto p-6">
          <img src={room?.data?.image} alt="image of the room" />
          <h1 className="text-3xl font-bold mb-4">{room?.data?.name}</h1>
          <p className="text-gray-600 mb-2">Room No: {room?.data?.roomNo}</p>
          <p className="text-gray-600 mb-2">Floor No: {room?.data?.floorNo}</p>
          <p className="text-gray-600 mb-2">
            Capacity: {room?.data?.capacity} people
          </p>
          <p className="text-gray-600 mb-4">
            Price per Slot: ${room?.data?.pricePerSlot}
          </p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Amenities:</h3>
            <ul className="list-disc list-inside">
              {room?.data?.amenities?.map((amenity: string, index: number) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default RoomDetails;
