import type { AdminRole } from "../modules/admin/admin.types.js";
import type { CustomerRole } from "../modules/customers/customer.types.js";

// Union of all available user roles in the application
export type UserRole = AdminRole | CustomerRole;

// Payload structure encoded into the JWT token
export type JwtPayload = {
  id: string;   // User/Admin MongoDB ObjectId
  role: UserRole;
};