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
  image?: string; // if image is optional
}

export interface RoomResponse {
  data: Room[];
}
