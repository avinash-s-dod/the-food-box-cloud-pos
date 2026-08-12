import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { JwtPayload } from "../types/auth.types.js";

// Helper: Generate JWT Token
// Description: Signs a JWT token containing User ID and Role, valid for 7 days
export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Helper: Verify JWT Token
// Description: Decrypts and verifies the JWT token using the configured secret key
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};