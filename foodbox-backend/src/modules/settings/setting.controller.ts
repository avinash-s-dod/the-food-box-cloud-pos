import { catchAsync } from "../../common/catchAsync.js";
import { sendResponse } from "../../common/sendResponse.js";
import {
  type CreateSettingsInput,
  type UpdateSettingsInput,
} from "./setting.schema.js";
import { SettingsService } from "./setting.service.js";

// Handler: Get Settings
// Description: Fetches current restaurant settings (there is only one configuration document in DB)
const getSettings = catchAsync(async (_req, res) => {
  const settings = await SettingsService.getSettings();

  return sendResponse(res, 200, "Settings fetched successfully", settings);
});

// Handler: Create Settings
// Description: Initializes restaurant settings
const createSettings = catchAsync<
  Record<string, string>,
  unknown,
  CreateSettingsInput
>(async (req, res) => {
  const settings = await SettingsService.createSettings(req.body);

  return sendResponse(res, 201, "Settings created successfully", settings);
});

// Handler: Update Settings
// Description: Partially updates existing restaurant settings
const updateSettings = catchAsync<
  Record<string, string>,
  unknown,
  UpdateSettingsInput
>(async (req, res) => {
  const settings = await SettingsService.updateSettings(req.body);

  return sendResponse(res, 200, "Settings updated successfully", settings);
});

export const SettingsController = {
  getSettings,
  createSettings,
  updateSettings,
};
