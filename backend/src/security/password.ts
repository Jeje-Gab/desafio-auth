import bcrypt from 'bcryptjs';

const ROUNDS = 10; // pode aumentar (12~14) em produção

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
