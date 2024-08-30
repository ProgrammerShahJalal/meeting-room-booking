import React from "react";

import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../redux/api/roomApi";
import { Room } from "./utils/types";

interface RoomListTableProps {
  rooms: Room[];
}

const RoomListTable: React.FC<RoomListTableProps> = ({ rooms }) => {
  const [deleteRoom] = useDeleteRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();

  const handleDelete = async (roomId: string) => {
    try {
      await deleteRoom(roomId).unwrap();
      console.log("Room deleted successfully");
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  const handleUpdate = async (roomId: string, updatedFields: Partial<Room>) => {
    try {
      await updateRoom({ id: roomId, ...updatedFields }).unwrap();
      console.log("Room updated successfully");
    } catch (error) {
      console.error("Failed to update room:", error);
    }
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Room Name</th>
          <th className="py-2">Room No.</th>
          <th className="py-2">Floor No.</th>
          <th className="py-2">Capacity</th>
          <th className="py-2">Price Per Slot</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms?.data?.map((room) => (
          <tr key={room._id}>
            <td className="border px-4 py-2">{room.name}</td>
            <td className="border px-4 py-2">{room.roomNo}</td>
            <td className="border px-4 py-2">{room.floorNo}</td>
            <td className="border px-4 py-2">{room.capacity}</td>
            <td className="border px-4 py-2">{room.pricePerSlot}</td>
            <td className="border px-4 py-2 flex justify-around">
              <button
                onClick={() =>
                  handleUpdate(room._id, { name: "Updated Room Name" })
                }
                className="bg-yellow-500 text-white px-2 py-1 rounded-md"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(room._id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RoomListTable;
