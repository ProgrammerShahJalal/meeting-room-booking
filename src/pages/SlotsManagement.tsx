import React from "react";
import { Card } from "antd";
import CreateSlotForm from "../components/CreateSlotForm";
import SlotsListTable from "../components/SlotsListTable";

const SlotsManagement: React.FC = () => {
  return (
    <Card
      title="Slots Management"
      bordered={false}
      style={{ marginTop: 16 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold text-center mb-6 mt-1">Create Slot</h2>
      <CreateSlotForm />
      <SlotsListTable />
    </Card>
  );
};

export default SlotsManagement;
