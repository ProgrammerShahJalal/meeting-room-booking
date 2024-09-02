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
import { Button, Table, Popconfirm } from "antd";

const SlotsListTable: React.FC = () => {
  const { data: slots, error, isLoading } = useGetAllSlotsQuery();
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

  const columns = [
    {
      title: "Room Name",
      dataIndex: ["room", "name"],
      key: "roomName",
    },
    {
      title: "Room No.",
      dataIndex: ["room", "roomNo"],
      key: "roomNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: Slot) => (
        <span>
          <Button
            type="primary"
            onClick={() => setSelectedSlot(record)}
            className="m-1"
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this slot?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <button className="px-4 m-1 py-1 rounded-xl bg-red-500 text-white">
              Delete
            </button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center my-6">Slots List</h2>
      <Table
        columns={columns}
        dataSource={slots?.data || []}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        loading={isLoading}
        className="mx-12"
      />

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
