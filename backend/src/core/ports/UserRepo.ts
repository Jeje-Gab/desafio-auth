import { User } from "../domain/user";

export interface UserRepo {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(email: string, passwordHash: string): Promise<{ id: number }>;
}
