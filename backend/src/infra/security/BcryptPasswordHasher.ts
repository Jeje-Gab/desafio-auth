import bcrypt from "bcryptjs";
import { PasswordHasher } from "../../core/ports/PasswordHasher";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private rounds = 10) {}
  hash(plain: string) { return bcrypt.hash(plain, this.rounds); }
  verify(plain: string, hash: string) { return bcrypt.compare(plain, hash); }
}
