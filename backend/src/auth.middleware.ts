import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from './env';

export interface AuthRequest extends Request { userId?: number; }

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization ?? '';
  const [scheme, token] = header.split(' ');
  if (scheme?.toLowerCase() !== 'bearer' || !token) {
    return res.status(401).json({ message: 'Missing or invalid Authorization header' });
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: number };
    req.userId = payload.sub;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
