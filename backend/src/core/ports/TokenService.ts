export interface TokenService {
  sign(userId: number, expiresIn: string): string;
  verify(token: string): { sub: number } | null;
}
