import { pool } from "./pool";
import { UserRepo } from "../../core/ports/UserRepo";
import { User } from "../../core/domain/user";

export class MySQLUserRepo implements UserRepo {
  private T_USERS = `\`${process.env.DB_NAME}\`.users`;

  async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query(`SELECT id, email, password_hash, created_at FROM ${this.T_USERS} WHERE email = ? LIMIT 1`, [email]);
    if (!Array.isArray(rows) || rows.length === 0) return null;
    const r = rows[0] as any;
    return { id: r.id, email: r.email, password_hash: r.password_hash, created_at: new Date(r.created_at) };
  }

  async findById(id: number): Promise<User | null> {
    const [rows] = await pool.query(`SELECT id, email, password_hash, created_at FROM ${this.T_USERS} WHERE id = ? LIMIT 1`, [id]);
    if (!Array.isArray(rows) || rows.length === 0) return null;
    const r = rows[0] as any;
    return { id: r.id, email: r.email, password_hash: r.password_hash, created_at: new Date(r.created_at) };
  }

  async create(email: string, passwordHash: string): Promise<{ id: number }> {
    const [result] = await pool.execute(
      `INSERT INTO ${this.T_USERS} (email, password_hash) VALUES (?, ?)`,
      [email, passwordHash]
    );
    return { id: (result as any).insertId as number };
  }
}
