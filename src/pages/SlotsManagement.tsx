import React from "react";
import CreateSlotForm from "../components/CreateSlotForm";
import SlotsListTable from "../components/SlotsListTable";
import { useGetAllSlotsQuery } from "../redux/api/slotsApi";

const SlotsManagement: React.FC = () => {
  const roomId = "your-room-id"; // Replace with actual roomId
  const date = "2024-06-15"; // Replace with actual date

  // Fetch slots by room and date
  const { data: slots, isLoading, isError } = useGetAllSlotsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching slots</div>;

  return (
    <div className="px-12 py-16 bg-purple-100">
      <h1 className="text-2xl font-bold text-center mb-6 mt-12">
        Slots Management
      </h1>
      <CreateSlotForm roomId={roomId} date={date} />
      <SlotsListTable slots={slots || []} />
    </div>
  );
};

export default SlotsManagement;
