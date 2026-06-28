import type { Document } from "mongoose";

export interface Category extends Document {
  name: string;
  description?: string | undefined;
  image?: string | undefined;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
