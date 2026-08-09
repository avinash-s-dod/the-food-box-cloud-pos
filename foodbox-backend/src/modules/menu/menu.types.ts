import { Document, Types } from "mongoose";
import type { BaseQueryParams } from "../../types/query.types.js";

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

export interface MenuQueryParams extends BaseQueryParams {
  isAvailable?: boolean;
}
