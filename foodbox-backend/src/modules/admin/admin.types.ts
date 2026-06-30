export enum AdminRole {
  ADMIN = "ADMIN",
}

export interface AdminEntity {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  isActive: boolean;
}
