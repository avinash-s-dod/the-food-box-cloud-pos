import { Document, Types } from "mongoose";
import type { BaseQueryParams } from "../../types/query.types.js";

export enum OrderStatus {
  PLACED = "PLACED",
  CONFIRMED = "CONFIRMED",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
}

export interface OrderItem {
  menuId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Order extends Document {
  userId?: Types.ObjectId;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderParams = {
  id: string;
};

export type OrderUpdateParams = {
  id: string;
  status: OrderStatus;
};

export interface OrderQueryParams extends BaseQueryParams {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
}
