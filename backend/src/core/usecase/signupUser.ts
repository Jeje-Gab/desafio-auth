import { UserRepo } from "../ports/UserRepo";
import { PasswordHasher } from "../ports/PasswordHasher";
import { EmailTakenError } from "../errors";

export class SignupUser {
  constructor(private users: UserRepo, private hasher: PasswordHasher) {}

  async execute(input: { email: string; password: string }) {
    const email = input.email.trim().toLowerCase();
    const exists = await this.users.findByEmail(email);
    if (exists) throw new EmailTakenError();
    const hash = await this.hasher.hash(input.password);
    const { id } = await this.users.create(email, hash);
    return { id, email };
  }
}
