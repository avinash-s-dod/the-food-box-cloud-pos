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

  static badRequest(message: string, errors?: unknown) {
    return new AppError(message, 400, errors);
  }

  static unauthorized(message: string = "Unauthorized access") {
    return new AppError(message, 401);
  }

  static forbidden(message: string = "Permission denied") {
    return new AppError(message, 403);
  }

  static notFound(message: string = "Resource not found") {
    return new AppError(message, 404);
  }

  static conflict(message: string, errors?: unknown) {
    return new AppError(message, 409, errors);
  }

  static internal(message: string = "Internal server error") {
    return new AppError(message, 500, undefined, false);
  }
}
