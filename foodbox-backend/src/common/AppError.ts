// Class: AppError
// Description: Custom Error subclass representing operational HTTP application errors
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors?: unknown;

  constructor(
    message: string,
    statusCode: number = 500,
    errors?: unknown,
    isOperational: boolean = true,
  ) {
    super(message);

    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    // Restore prototype chain for TypeScript
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace excluding constructor
    Error.captureStackTrace(this, this.constructor);
  }

  // Factory: Bad Request (400)
  static badRequest(message: string, errors?: unknown) {
    return new AppError(message, 400, errors);
  }

  // Factory: Unauthorized (401)
  static unauthorized(message: string = "Unauthorized access") {
    return new AppError(message, 401);
  }

  // Factory: Forbidden (403)
  static forbidden(message: string = "Permission denied") {
    return new AppError(message, 403);
  }

  // Factory: Not Found (404)
  static notFound(message: string = "Resource not found") {
    return new AppError(message, 404);
  }

  // Factory: Conflict (409)
  static conflict(message: string, errors?: unknown) {
    return new AppError(message, 409, errors);
  }

  // Factory: Internal Server Error (500)
  static internal(message: string = "Internal server error") {
    return new AppError(message, 500, undefined, false);
  }
}
