export interface Room {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | undefined;
  data?: Room;
}

export interface RoomResponse {
  data: Room[];
}
