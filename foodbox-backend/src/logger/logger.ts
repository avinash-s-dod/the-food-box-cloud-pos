import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const istTimestamp = () =>
  new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
  });

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: istTimestamp,
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
);

const applicationTransport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxSize: "20m",
  maxFiles: "14d",
});

const errorTransport = new DailyRotateFile({
  filename: "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level: "error",
  maxSize: "20m",
  maxFiles: "30d",
});

export const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: [
    applicationTransport,
    errorTransport,
    new winston.transports.Console(),
  ],
});
