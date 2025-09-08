import jwt from "jsonwebtoken";
import { TokenService } from "../../core/ports/TokenService";
import { env } from "../../config/env";

export class JwtTokenService implements TokenService {
  sign(userId: number, expiresIn: string): string {
    return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn });
  }
  verify(token: string): { sub: number } | null {
    try {
      const payload = jwt.verify(token, env.JWT_SECRET) as any;
      return { sub: payload.sub };
    } catch {
      return null;
    }
  }
}
