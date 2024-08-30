import React, { useState } from "react";
import { Slot } from "./utils/types";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import {
  useDeleteSlotMutation,
  useGetAllSlotsQuery,
  useUpdateSlotMutation,
} from "../redux/api/slotsApi";
import UpdateSlotPopup from "./UpdateSlotPopup";

interface SlotsListTableProps {
  date: string;
  roomId: string;
}

const SlotsListTable: React.FC<SlotsListTableProps> = () => {
  const { data: slots, error } = useGetAllSlotsQuery();
  const [deleteSlot] = useDeleteSlotMutation();
  const [updateSlot] = useUpdateSlotMutation();
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const handleDelete = async (slotId: string) => {
    try {
      await deleteSlot(slotId).unwrap();
      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Slot deleted successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });
    } catch (error) {
      console.error("Failed to delete slot:", error);
    }
  };

  const handleUpdate = async (slotId: string, updatedFields: Partial<Slot>) => {
    try {
      await updateSlot({ id: slotId, body: updatedFields }).unwrap();
      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Slot updated successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });
    } catch (error) {
      console.error("Failed to update slot:", error);
    }
  };

  if (error) return <div>Error loading slots.</div>;

  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Room Name</th>
            <th className="py-2">Room No.</th>
            <th className="py-2">Date</th>
            <th className="py-2">Start Time</th>
            <th className="py-2">End Time</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots?.data?.map((slot: Slot) => (
            <tr key={slot._id}>
              <td className="border px-4 py-2">{slot?.room?.name}</td>
              <td className="border px-4 py-2">{slot?.room?.roomNo}</td>
              <td className="border px-4 py-2">{slot?.date}</td>
              <td className="border px-4 py-2">{slot?.startTime}</td>
              <td className="border px-4 py-2">{slot?.endTime}</td>
              <td className="border px-4 py-2 flex justify-around">
                <button
                  onClick={() => setSelectedSlot(slot)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(slot._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show the Update Popup if a slot is selected */}
      {selectedSlot && (
        <UpdateSlotPopup
          slot={selectedSlot}
          onUpdate={(updatedFields) =>
            handleUpdate(selectedSlot._id, updatedFields)
          }
          onClose={() => setSelectedSlot(null)} // Close popup
        />
      )}
    </div>
  );
};

export default SlotsListTable;
