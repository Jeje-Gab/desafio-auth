import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import { TokenService } from "../../core/ports/TokenService";
import { env } from "../../config/env";

export class JwtTokenService implements TokenService {
  sign(userId: number, expiresIn: string): string {
    const secret: Secret = env.JWT_SECRET as Secret;
    const opts: SignOptions = { expiresIn: expiresIn as SignOptions["expiresIn"] };
    return jwt.sign({ sub: userId }, secret, opts);
  }
  verify(token: string): { sub: number } | null {
    try {
      const secret: Secret = env.JWT_SECRET as Secret;
      const payload = jwt.verify(token, secret) as any;
      return { sub: Number(payload.sub) };
    } catch {
      return null;
    }
  }
}
