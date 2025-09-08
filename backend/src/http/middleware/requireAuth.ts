import { NextFunction, Request, Response } from "express";
import { TokenService } from "../../core/ports/TokenService";

export function requireAuth(tokens: TokenService) {
  return (req: Request & { userId?: number }, res: Response, next: NextFunction) => {
    const header = req.headers.authorization ?? "";
    const [scheme, token] = header.split(" ");
    if (scheme?.toLowerCase() !== "bearer" || !token) {
      return res.status(401).json({ message: "Missing or invalid Authorization header" });
    }
    const payload = tokens.verify(token);
    if (!payload) return res.status(401).json({ message: "Invalid token" });
    req.userId = payload.sub;
    next();
  };
}
