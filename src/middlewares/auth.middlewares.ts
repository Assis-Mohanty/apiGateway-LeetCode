import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors/app.error";
import { verifyJwt } from "../utils/auth/jwtVerify";

export async function authMiddleware(
  req: Request,
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

    req.headers["x-user-id"] = String(payload.userId);
    req.headers["x-user-role"] = String(payload.role);

    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
