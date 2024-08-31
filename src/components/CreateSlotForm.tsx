import React, { useState } from "react";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useCreateSlotsMutation } from "../redux/api/slotsApi";

const CreateSlotForm: React.FC = () => {
  const [createSlots, { isLoading, error }] = useCreateSlotsMutation();
  const [formData, setFormData] = useState({
    room: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createSlots(formData).unwrap();
      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Slots created successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });
    } catch (error) {
      console.error("Failed to create slots:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-md max-w-lg mx-auto mb-5"
      >
        <h2 className="text-xl font-semibold mb-4">Create Slot</h2>
        <div className="mb-4">
          <label className="block mb-1">Room ID</label>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="border p-2 rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full mt-2"
        >
          {isLoading ? "Processing..." : "Create Slots"}
        </button>
      </form>
      {error && (
        <h2 className="text-center font-bold mb-5">Something went wrong</h2>
      )}
    </div>
  );
};

export default CreateSlotForm;
