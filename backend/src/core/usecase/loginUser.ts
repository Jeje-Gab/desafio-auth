import { UserRepo } from "../ports/UserRepo";
import { PasswordHasher } from "../ports/PasswordHasher";
import { TokenService } from "../ports/TokenService";
import { InvalidCredentialsError } from "../errors";

export class LoginUser {
  constructor(private users: UserRepo, private hasher: PasswordHasher, private tokens: TokenService) {}

  async execute(input: { email: string; password: string; jwtExpiresIn: string }) {
    const email = input.email.trim().toLowerCase();
    const user = await this.users.findByEmail(email);
    if (!user) throw new InvalidCredentialsError();
    const ok = await this.hasher.verify(input.password, user.password_hash);
    if (!ok) throw new InvalidCredentialsError();
    const accessToken = this.tokens.sign(user.id, input.jwtExpiresIn);
    return { accessToken, tokenType: "Bearer", expiresIn: input.jwtExpiresIn };
  }
}
