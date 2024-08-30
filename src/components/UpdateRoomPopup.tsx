import React, { useState } from "react";
import { Room } from "./utils/types";

interface UpdateRoomPopupProps {
  room: Room;
  onUpdate: (updatedFields: Partial<Room>) => void;
  onClose: () => void;
}

const UpdateRoomPopup: React.FC<UpdateRoomPopupProps> = ({
  room,
  onUpdate,
  onClose,
}) => {
  const [updatedFields, setUpdatedFields] = useState<Partial<Room>>({
    name: room.name,
    roomNo: room.roomNo,
    floorNo: room.floorNo,
    capacity: room.capacity,
    pricePerSlot: room.pricePerSlot,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedFields((prev) => ({
      ...prev,
      [name]:
        name === "roomNo" ||
        name === "floorNo" ||
        name === "capacity" ||
        name === "pricePerSlot"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(updatedFields);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Update Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium">Room Name</label>
            <input
              type="text"
              name="name"
              value={updatedFields.name}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Room No.</label>
            <input
              type="number"
              name="roomNo"
              value={updatedFields.roomNo}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Floor No.</label>
            <input
              type="number"
              name="floorNo"
              value={updatedFields.floorNo}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={updatedFields.capacity}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium">Price Per Slot</label>
            <input
              type="number"
              name="pricePerSlot"
              value={updatedFields.pricePerSlot}
              onChange={handleInputChange}
              className="border p-2 rounded-md w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomPopup;
