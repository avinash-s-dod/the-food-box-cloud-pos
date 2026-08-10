import type { Response } from "express";

export interface ResponseMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: unknown,
  meta?: ResponseMeta,
) => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    ...(meta && { meta }),
  });
};