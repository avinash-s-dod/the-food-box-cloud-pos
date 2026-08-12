import type { Response } from "express";

// Interface: ResponseMeta
// Description: Defines standard metadata structure for paginated search results
export interface ResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Utility: sendResponse
// Description: Formats and sends unified JSON API responses across all controllers
export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown,
  meta?: ResponseMeta,
) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300, // True for all 2xx success statuses
    message,
    data,
    ...(meta && { meta }),
  });
};