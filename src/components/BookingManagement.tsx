/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button, Table, Modal, notification, Card } from "antd";
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

  const formatDateAndTime = (dateString: string, slots: any[]) => {
    const date = new Date(dateString).toDateString();
    const timeSlots = slots
      .map((slot: any) => `${slot.startTime} - ${slot.endTime}`)
      .join(", ");

    return `${date}, ${timeSlots}`;
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
      render: (date: string, record: any) =>
        formatDateAndTime(date, record.slots || []),
    },
    {
      title: "Status",
      dataIndex: "isConfirmed",
      key: "status",
      render: (status: string) => (
        <span
          style={{
            color: status === "confirmed" ? "green" : "red",
            fontWeight: "500",
          }}
        >
          {status === "confirmed" ? "Confirmed" : "Unconfirmed"}
        </span>
      ),
    },

    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: any) => (
        <span>
          <Button
            type="primary"
            onClick={() => handleApprove(record._id)}
            disabled={record.isConfirmed === "confirmed"}
            className="m-1"
          >
            Approve
          </Button>
          <Button
            type="default"
            onClick={() => handleReject(record._id)}
            disabled={record.isConfirmed === "unconfirmed"}
            className="m-1"
          >
            Reject
          </Button>
          <button
            className="px-4 m-1 py-1 rounded-xl bg-red-500 text-white"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  return (
    <Card title="Booking Management" bordered={false} style={{ marginTop: 16 }}>
      <h2 className="text-2xl font-bold text-center mb-6 mt-1">Booking List</h2>
      <Table
        scroll={{ x: true }}
        pagination={{ pageSize: 10 }}
        dataSource={bookingsData?.data || []}
        columns={columns}
        rowKey={(record) => record._id}
        loading={isLoading}
        className="mx-12"
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
    </Card>
  );
};

export default BookingManagement;
