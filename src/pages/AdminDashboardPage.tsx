import React, { useState } from "react";
import {
  useGetRoomsQuery,
  useCreateRoomWithImageMutation,
} from "../redux/api/roomApi";
import RoomListTable from "../components/RoomListTable";

const AdminDashboardPage: React.FC = () => {
  const { data: rooms, isLoading } = useGetRoomsQuery();
  const [newRoom, setNewRoom] = useState({
    name: "",
    roomNo: 0,
    floorNo: 0,
    capacity: 0,
    pricePerSlot: 0,
    amenities: [] as string[],
    imageUrl: "",
  });

  const [createRoom] = useCreateRoomWithImageMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]:
        name === "amenities"
          ? value.split(",")
          : name === "roomNo" ||
            name === "floorNo" ||
            name === "capacity" ||
            name === "pricePerSlot"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const roomData = {
        name: newRoom.name,
        roomNo: newRoom.roomNo,
        floorNo: newRoom.floorNo,
        capacity: newRoom.capacity,
        pricePerSlot: newRoom.pricePerSlot,
        amenities: newRoom.amenities,
        imageUrl: newRoom.imageUrl,
      };

      const response = await createRoom(roomData).unwrap();
      console.log("Room created successfully:", response);

      // Reset form
      setNewRoom({
        name: "",
        roomNo: 0,
        floorNo: 0,
        capacity: 0,
        pricePerSlot: 0,
        amenities: [],
        imageUrl: "",
      });
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Room Management</h1>

      {/* Create Room Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            {/* Form Fields */}
            <div>
              <label className="block mb-1 font-medium">Room Name</label>
              <input
                type="text"
                name="name"
                placeholder="Room Name"
                value={newRoom.name}
                onChange={handleInputChange}
                className="border p-2 rounded-md w-full"
              />
            </div>
            {/* Other fields ... */}
            {/* Omitted for brevity */}
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Room
          </button>
        </form>
      </div>

      {/* Room List Table */}
      {!isLoading && rooms && <RoomListTable rooms={rooms} />}
    </div>
  );
};

export default AdminDashboardPage;
