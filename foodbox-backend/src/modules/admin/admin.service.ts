import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import { AdminModel } from "./admin.model.js";
import type { AdminLoginInput } from "./admin.schema.js";
import { AppError } from "../../common/AppError.js";
import { logger } from "../../logger/logger.js";

// Service: Login Admin
// Description: Validates email, active status, and password hash. Generates and returns a JWT token.
const loginAdmin = async (payload: AdminLoginInput) => {
  const { email, password } = payload;

  // Find admin, explicitly requesting the password field (excluded by default in schema)
  const admin = await AdminModel.findOne({ email }).select("+password -__v");

  if (!admin) {
    throw AppError.badRequest("Invalid email or password");
  }

  // Account status check
  if (!admin.isActive) {
    throw AppError.badRequest("Admin account is inactive");
  }

  // Verify bcrypt hash comparison
  const isPasswordMatched = await bcrypt.compare(password, admin.password);

  if (!isPasswordMatched) {
    throw AppError.badRequest("Invalid email or password");
  }

  // Generate JWT auth token with user payload details
  const token = generateToken({
    id: admin.id,
    role: admin.role,
  });

  logger.info("Admin logged in successfully", { adminId: admin.id });

  const adminResponse = admin.toObject();
  const { password: _, ...adminData } = adminResponse; // Remove password field from returning object

  return {
    token,
    admin: adminData,
  };
};

// Service: Get Profile
// Description: Fetches profile data of admin by ID, omitting secure fields
const getProfile = async (adminId: string) => {
  const admin = await AdminModel.findById(adminId).select("-password -__v");

  if (!admin) {
    throw AppError.notFound("Admin not found");
  }

  return admin;
};

export const AdminService = {
  loginAdmin,
  getProfile,
};
