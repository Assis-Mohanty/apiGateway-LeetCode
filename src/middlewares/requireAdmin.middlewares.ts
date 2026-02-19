import { NextFunction, Response } from "express";
import { ForbiddenError } from "../utils/errors/app.error";
import { AuthenticatedRequest } from "./auth.middlewares";
export enum RoleEnum{
    USER = "user",
    ADMIN = "admin"
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  if (!req.user) {
    next(new ForbiddenError("Authentication required"));
    return;
  }
  if (req.user.role !== RoleEnum.ADMIN) {
    next(new ForbiddenError("Admin access required"));
    return;
  }
  next();
}