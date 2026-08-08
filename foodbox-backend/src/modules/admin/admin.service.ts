import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import { AdminModel } from "./admin.model.js";
import type { AdminLoginInput } from "./admin.schema.js";
import { AppError } from "../../common/AppError.js";

const loginAdmin = async (payload: AdminLoginInput) => {
  const { email, password } = payload;

  const admin = await AdminModel.findOne({ email }).select("+password");

  if (!admin) {
    throw AppError.badRequest("Invalid email or password");
  }

  if (!admin.isActive) {
    throw AppError.badRequest("Admin account is inactive");
  }

  const isPasswordMatched = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatched) {
    throw AppError.badRequest("Invalid email or password");
  }

  const token = generateToken({
    id: admin.id,
    role: admin.role,
  });

  const adminResponse = admin.toObject();

  const { password: _, ...adminData } = adminResponse;

  return {
    token,
    admin: adminData,
  };
};

const getProfile = async (adminId: string) => {
  const admin = await AdminModel.findById(adminId).select("-password,-__v");

  if (!admin) {
    throw AppError.notFound("Admin not found");
  }

  return admin;
};

export const AdminService = {
  loginAdmin,
  getProfile,
};
