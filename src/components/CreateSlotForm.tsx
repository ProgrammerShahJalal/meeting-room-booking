import React, { useState } from "react";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useCreateSlotsMutation } from "../redux/api/slotsApi";

const CreateSlotForm: React.FC = () => {
  const [createSlots] = useCreateSlotsMutation();
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
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md">
      <div>
        <h2 className="text-lg font-semibold mb-4">Create Slot</h2>
        <label>Room ID</label>
        <input
          type="text"
          name="room"
          value={formData.room}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div>
        <label>Start Time</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <div>
        <label>End Time</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md mt-2"
      >
        Create Slots
      </button>
    </form>
  );
};

export default CreateSlotForm;
