import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetRoomsQuery } from "../redux/api/roomApi";
import Lottie from "lottie-react";
import { useDebounce } from "../hooks/useDebounce";
import { Room } from "../components/utils/types";

// URL to fetch Lottie animation JSON data
const LOTTIE_URL =
  "https://lottie.host/0fea4ce6-8b86-47f0-89dd-fabfdeda9fbc/P8PHWLK1QD.json";

const MeetingRoomsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCapacity, setFilterCapacity] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCapacity(Number(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  const filteredRooms = rooms?.data
    ?.filter((room: Room) =>
      room.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    .filter((room: Room) =>
      filterCapacity ? room.capacity >= filterCapacity : true
    )
    .sort((a: Room, b: Room) =>
      sortOrder === "asc"
        ? a.pricePerSlot - b.pricePerSlot
        : b.pricePerSlot - a.pricePerSlot
    );

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

  return (
    <section className="py-12 bg-pink-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Meeting Rooms</h2>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
          />
          <div className="md:mx-24 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-4 mt-4">
            <select
              onChange={handleCapacityChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Filter by Capacity</option>
              <option value="10">10+ People</option>
              <option value="20">20+ People</option>
              <option value="30">30+ People</option>
            </select>
            <select
              onChange={handleSortChange}
              className="px-4 py-2 border border-gray-300 rounded-md"
            >
              <option value="asc">Sort by Price: Low to High</option>
              <option value="desc">Sort by Price: High to Low</option>
            </select>
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterCapacity(null);
              setSortOrder("asc");
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Clear Filters
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms?.map((room: Room) => (
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
      </div>
      {error && (
        <p className="font-bold text-center my-5">Something went wrong!</p>
      )}
    </section>
  );
};

export default MeetingRoomsPage;
