import { AppError } from "../../common/AppError.js";
import { SettingsModel } from "./setting.model.js";
import type {
  CreateSettingsInput,
  UpdateSettingsInput,
} from "./setting.schema.js";

const getSettings = async () => {
  const settings = await SettingsModel.findOne().select("-__v");

  if (!settings) {
    throw AppError.notFound("Settings not configured");
  }

  return settings;
};

const createSettings = async (payload: CreateSettingsInput) => {
  const existingSettings = await SettingsModel.findOne();

  if (existingSettings) {
    throw AppError.conflict("Settings already configured");
  }

  const settings = await SettingsModel.create(payload);

  return settings;
};

const updateSettings = async (payload: UpdateSettingsInput) => {
  const settings = await SettingsModel.findOneAndUpdate({}, payload, {
    returnDocument: "after",
    runValidators: true,
  }).select("-__v");

  if (!settings) {
    throw AppError.notFound("Settings not configured");
  }

  return settings;
};

export const SettingsService = {
  getSettings,
  createSettings,
  updateSettings,
};
