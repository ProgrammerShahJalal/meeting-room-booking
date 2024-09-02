import React, { useState } from "react";
import {
  useCreateRoomWithImageMutation,
  useGetRoomsQuery,
} from "../redux/api/roomApi";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "sonner";
import RoomListTable from "../components/RoomListTable";
import { Button, Card, Input, Form, Row, Col } from "antd";

const RoomManagement: React.FC = () => {
  const { data: rooms, isLoading } = useGetRoomsQuery();
  const [createRoom] = useCreateRoomWithImageMutation();

  const [newRoom, setNewRoom] = useState({
    name: "",
    roomNo: 0,
    floorNo: 0,
    capacity: 0,
    pricePerSlot: 0,
    amenities: [] as string[],
    imageUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]:
        name === "amenities"
          ? value.split(",")
          : ["roomNo", "floorNo", "capacity", "pricePerSlot"].includes(name)
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await createRoom(newRoom).unwrap();
      console.log("response", response);
      toast("Success!", {
        className: "border-green-500 text-base",
        description: "Room created successfully",
        duration: 3000,
        icon: <IoCheckmarkDoneCircleOutline />,
      });
      setNewRoom({
        name: "",
        roomNo: 0,
        floorNo: 0,
        capacity: 0,
        pricePerSlot: 0,
        amenities: [],
        imageUrl: "",
      });
    } catch (error) {
      console.error("Failed to create room:", error);
    }
  };

  return (
    <Card
      title="Room Management"
      bordered={false}
      style={{ marginTop: 16 }}
      className="mb-16"
    >
      <h2 className="text-2xl font-bold text-center mb-6 mt-1">Create Room</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Room Name">
              <Input
                name="name"
                placeholder="Room Name"
                value={newRoom.name}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Room No.">
              <Input
                type="number"
                name="roomNo"
                placeholder="Room No."
                value={newRoom.roomNo}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Floor No.">
              <Input
                type="number"
                name="floorNo"
                placeholder="Floor No."
                value={newRoom.floorNo}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Capacity">
              <Input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={newRoom.capacity}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Price Per Slot">
              <Input
                type="number"
                name="pricePerSlot"
                placeholder="Price Per Slot"
                value={newRoom.pricePerSlot}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Amenities">
              <Input
                name="amenities"
                placeholder="Amenities (comma separated)"
                value={newRoom.amenities.join(",")}
                onChange={handleInputChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Room Image URL">
          <Input
            name="imageUrl"
            placeholder="Room Image URL"
            value={newRoom.imageUrl}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create Room
        </Button>
      </Form>
      {!isLoading && rooms && <RoomListTable rooms={rooms} />}
    </Card>
  );
};

export default RoomManagement;
