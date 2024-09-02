import React, { useState } from "react";
import {
  useDeleteRoomMutation,
  useGetRoomsQuery,
  useUpdateRoomMutation,
} from "../redux/api/roomApi";
import { Room } from "./utils/types";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import { Button, Table, Popconfirm } from "antd";
import UpdateRoomPopup from "./UpdateRoomPopup";

const RoomListTable: React.FC = () => {
  const { data: rooms, isLoading } = useGetRoomsQuery();
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

  const columns = [
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Floor No.",
      dataIndex: "floorNo",
      key: "floorNo",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      key: "pricePerSlot",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: Room) => (
        <span>
          <Button
            type="primary"
            onClick={() => setSelectedRoom(record)}
            className="m-1"
          >
            Update
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this room?"
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
      <h2 className="text-2xl font-bold text-center my-6">Room List</h2>
      <Table
        columns={columns}
        dataSource={rooms?.data || []}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        loading={isLoading}
        className="mx-12"
      />

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
