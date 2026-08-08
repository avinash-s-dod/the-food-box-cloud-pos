import { adminLoginSchema } from "./admin.schema.js";
import { AdminService } from "./admin.service.js";
import { catchAsync } from "../../common/catchAsync.js";

const login = catchAsync(async (req, res) => {
  const payload = adminLoginSchema.parse(req.body);

  const result = await AdminService.loginAdmin(payload);

  return res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
});

const profile = catchAsync(async (req, res) => {
  const result = await AdminService.getProfile(req.user!.id);

  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    data: result,
  });
});

export const AdminController = {
  login,
  profile,
};
