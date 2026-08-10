import type { AdminRole } from "../modules/admin/admin.types.js";
import type { CustomerRole } from "../modules/customers/customer.types.js";

export type UserRole = AdminRole | CustomerRole;

export type JwtPayload = {
  id: string;
  role: UserRole;
};