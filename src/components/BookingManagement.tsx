import React, { useState } from "react";
import { Button, Table, Modal, notification } from "antd";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
  useUpdateBookingMutation,
} from "../redux/api/bookingApi";

const BookingManagement: React.FC = () => {
  const { data: bookingsData, isLoading } = useGetAllBookingsQuery();
  const [updateBooking] = useUpdateBookingMutation();
  const [deleteBooking] = useDeleteBookingMutation();
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const handleApprove = async (id: string) => {
    try {
      await updateBooking({ _id: id, isConfirmed: "confirmed" });
      notification.success({ message: "Booking approved successfully" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Failed to approve booking" });
    }
  };

  const handleReject = async (id: string) => {
    try {
      await updateBooking({ _id: id, isConfirmed: "unconfirmed" });
      notification.success({ message: "Booking rejected successfully" });
    } catch (error) {
      console.log(error);
      notification.error({ message: "Failed to reject booking" });
    }
  };

  const handleDelete = (id: string) => {
    setSelectedBookingId(id);
    setConfirmModalVisible(true);
  };

  const confirmDelete = async () => {
    if (!selectedBookingId) return;
    try {
      await deleteBooking(selectedBookingId);
      notification.success({ message: "Booking deleted successfully" });
      setConfirmModalVisible(false);
      setSelectedBookingId(null);
    } catch (error) {
      console.log(error);
      notification.error({ message: "Failed to delete booking" });
    }
  };

  const columns = [
    {
      title: "Room Name",
      dataIndex: ["room", "name"],
      key: "roomName",
    },
    {
      title: "User Name",
      dataIndex: ["user", "name"],
      key: "userName",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: any) =>
        `${text} (${record.slots.join(", ")})`,
    },
    {
      title: "Status",
      dataIndex: "isConfirmed",
      key: "status",
      render: (text: string) =>
        text === "confirmed" ? "Confirmed" : "Unconfirmed",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            disabled={record.isConfirmed === "confirmed"}
          >
            Approve
          </Button>
          <Button
            type="default"
            onClick={() => handleReject(record._id)}
            disabled={record.isConfirmed === "unconfirmed"}
          >
            Reject
          </Button>
          <button
            className="px-4 py-1 bg-red-500"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">
        Booking Management
      </h2>
      <Table
        dataSource={bookingsData?.data || []}
        columns={columns}
        rowKey={(record) => record._id}
        loading={isLoading}
      />

      <Modal
        title="Confirm Delete"
        visible={confirmModalVisible}
        onOk={confirmDelete}
        onCancel={() => setConfirmModalVisible(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this booking?</p>
      </Modal>
    </>
  );
};

export default BookingManagement;
