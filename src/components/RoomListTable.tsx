import React, { useState } from "react";
import {
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} from "../redux/api/roomApi";
import { Room } from "./utils/types";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import UpdateRoomPopup from "./UpdateRoomPopup";

interface RoomListTableProps {
  rooms: Room[];
}

const RoomListTable: React.FC<RoomListTableProps> = ({ rooms }) => {
  const [deleteRoom] = useDeleteRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const handleDelete = async (roomId: string) => {
    try {
      await deleteRoom(roomId).unwrap();
      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Room deleted successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });
    } catch (error) {
      console.error("Failed to delete room:", error);
    }
  };

  const handleUpdate = async (roomId: string, updatedFields: Partial<Room>) => {
    try {
      await updateRoom({ id: roomId, body: updatedFields }).unwrap();
      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Room updated successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });
    } catch (error) {
      console.error("Failed to update room:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl">
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
          {rooms?.data?.map((room: Room) => (
            <tr key={room._id}>
              <td className="border px-4 py-2">{room.name}</td>
              <td className="border px-4 py-2">{room.roomNo}</td>
              <td className="border px-4 py-2">{room.floorNo}</td>
              <td className="border px-4 py-2">{room.capacity}</td>
              <td className="border px-4 py-2">{room.pricePerSlot}</td>
              <td className="border px-4 py-2 flex justify-around gap-3">
                <button
                  onClick={() => setSelectedRoom(room)} // Set selected room
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

      {/* Show the Update Popup if a room is selected */}
      {selectedRoom && (
        <UpdateRoomPopup
          room={selectedRoom}
          onUpdate={(updatedFields) =>
            handleUpdate(selectedRoom._id, updatedFields)
          }
          onClose={() => setSelectedRoom(null)} // Close popup
        />
      )}
    </div>
  );
};

export default RoomListTable;
