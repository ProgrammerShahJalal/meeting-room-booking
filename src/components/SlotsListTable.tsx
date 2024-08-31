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

const SlotsListTable: React.FC = () => {
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
  if (slots?.data?.length === 0) return <h2>No slots available</h2>;

  console.log("slots", slots);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl">
        <thead>
          <tr>
            <th className="py-2 px-4 text-center">Room Name</th>
            <th className="py-2 px-4 text-center">Room No.</th>
            <th className="py-2 px-4 text-center">Date</th>
            <th className="py-2 px-4 text-center">Start Time</th>
            <th className="py-2 px-4 text-center">End Time</th>
            <th className="py-2 px-4 text-center">Actions</th>
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
              <td className="border px-4 py-2 flex justify-around gap-3">
                <button
                  onClick={() => setSelectedSlot(slot)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(slot?._id)}
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
