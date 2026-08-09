import type { Document } from "mongoose";
import type { BaseQueryParams } from "../../types/query.types.js";

export interface Category extends Document {
  name: string;
  description?: string | undefined;
  image?: string | undefined;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryParams = {
  id: string;
};

export interface CategoryQueryParams extends BaseQueryParams {
  isActive?: boolean;
}
