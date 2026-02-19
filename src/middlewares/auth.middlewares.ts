import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors/app.error";
import { verifyJwt } from "../utils/auth/jwtVerify";

import { JwtPayload } from "../utils/auth/jwtVerify";

export interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}


export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Missing or invalid Authorization header"));
  }

  const token = authHeader.slice(7);

  try {
    const payload = await verifyJwt(token);

    req.user = payload;
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
