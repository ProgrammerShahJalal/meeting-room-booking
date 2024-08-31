import React from "react";
import CreateSlotForm from "../components/CreateSlotForm";
import SlotsListTable from "../components/SlotsListTable";

const SlotsManagement: React.FC = () => {
  return (
    <div className="px-12 py-16 bg-purple-100">
      <h1 className="text-2xl font-bold text-center mb-6 mt-12">
        Slots Management
      </h1>
      <CreateSlotForm />
      <SlotsListTable />
    </div>
  );
};

export default SlotsManagement;
