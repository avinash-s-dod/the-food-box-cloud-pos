import type { BaseQueryParams } from "../../types/query.types.js";

export enum CustomerRole {
  USER = "USER",
}

export interface CustomerEntity {
  name: string;
  email?: string;
  phone: string;
  password: string;
  role: CustomerRole;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CustomerParams = {
  id: string;
};

export interface CustomerQueryParams extends BaseQueryParams {
  isDeleted?: boolean;
}
