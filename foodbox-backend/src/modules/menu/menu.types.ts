import { Document, Types } from "mongoose";

export interface Menu extends Document {
  category: Types.ObjectId;
  name: string;
  description?: string;
  image?: string;
  price: number;
  preparationTime?: number;
  isAvailable: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type MenuParams = {
  id: string;
};