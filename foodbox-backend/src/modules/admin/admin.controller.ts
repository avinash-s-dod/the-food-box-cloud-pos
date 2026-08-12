import { type AdminLoginInput } from "./admin.schema.js";
import { AdminService } from "./admin.service.js";
import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";

// Handler: Login
// Description: Receives login credentials, invokes AdminService.loginAdmin, and returns response with token
const login = catchAsync<Record<string, string>, unknown, AdminLoginInput>(
  async (req, res) => {
    const result = await AdminService.loginAdmin(req.body);
    return sendResponse(res, 200, "Login successful", result);
  },
);

// Handler: Get Profile
// Description: Fetches the current logged in admin's profile details using the user ID from auth token
const profile = catchAsync(async (req, res) => {
  const result = await AdminService.getProfile(req.user!.id);
  return sendResponse(res, 200, "Profile fetched successfully", result);
});

export const AdminController = {
  login,
  profile,
};
