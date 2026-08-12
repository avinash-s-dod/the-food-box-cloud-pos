import type {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

// Utility: catchAsync
// Description: Wraps asynchronous Express route handlers to automatically catch any rejected promises and forward them to the error middleware
export const catchAsync = <
  P = Record<string, string>,
  ResBody = unknown,
  ReqBody = unknown,
  ReqQuery = Record<string, string>,
>(
  fn: (
    req: Request<P, ResBody, ReqBody, ReqQuery>,
    res: Response<ResBody>,
    next: NextFunction,
  ) => Promise<unknown>,
): RequestHandler<P, ResBody, ReqBody, ReqQuery> => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // catches any errors and invokes next(error)
  };
};
