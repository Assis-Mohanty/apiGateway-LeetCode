import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../utils/errors/app.error";
export enum RoleEnum{
    USER = "user",
    ADMIN = "admin"
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
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