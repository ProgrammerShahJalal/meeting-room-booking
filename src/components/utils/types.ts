export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Room {
  _id: string;
  name: string;
  roomNo: number;
  floorNo: number;
  capacity: number;
  pricePerSlot: number;
  amenities: string[];
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  data?: Room;
}
