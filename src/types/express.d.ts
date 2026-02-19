import { JwtPayload } from "../utils/auth/jwtVerify";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export{}