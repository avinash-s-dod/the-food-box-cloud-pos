// Declarations to extend standard Express request objects
declare global {
  namespace Express {
    // Decoded user format attached by auth middleware
    interface UserPayload {
      id: string;
      role: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}

export {};