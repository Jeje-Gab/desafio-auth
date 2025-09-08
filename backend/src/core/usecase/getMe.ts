import { UserRepo } from "../ports/UserRepo";
import { NotFoundError } from "../errors";

export class GetMe {
  constructor(private users: UserRepo) {}
  async execute(userId: number) {
    const user = await this.users.findById(userId);
    if (!user) throw new NotFoundError("Usuário");
    return { id: user.id, email: user.email, created_at: user.created_at };
  }
}
