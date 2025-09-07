import { Router } from 'express';
import { pool } from './db';
import jwt from 'jsonwebtoken';
import { env } from './env';
import { signupSchema, loginSchema } from './auth.schemas';
import { hashPassword, verifyPassword } from './security/password';
import { requireAuth, AuthRequest } from './auth.middleware';

const router = Router();
const T_USERS = `\`${env.DB_NAME}\`.users`;

/** POST /auth/signup */
router.post('/signup', async (req, res) => {
  try {
    const data = signupSchema.parse(req.body);
    const email = data.email.trim().toLowerCase();

    const [rows] = await pool.query(
      `SELECT id FROM ${T_USERS} WHERE email = ? LIMIT 1`,
      [email]
    );
    if (Array.isArray(rows) && rows.length > 0) {
      return res.status(409).json({ message: 'E-mail já cadastrado' });
    }

    const pwHash = await hashPassword(data.password);
    const [result] = await pool.execute(
      `INSERT INTO ${T_USERS} (email, password_hash) VALUES (?, ?)`,
      [email, pwHash]
    );
    const id = (result as any).insertId as number;

    return res.status(201).json({ id, email });
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ message: 'Invalid data', issues: err.issues });
    if (err?.code === 'ER_DUP_ENTRY') return res.status(409).json({ message: 'E-mail já cadastrado' });
    console.error('signup error:', err);
    return res.status(500).json({ message: 'Internal error' });
  }
});

/** POST /auth/login -> retorna JWT */
router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const email = data.email.trim().toLowerCase();

    const [rows] = await pool.query(
      `SELECT id, password_hash FROM ${T_USERS} WHERE email = ? LIMIT 1`,
      [email]
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = rows[0] as { id: number; password_hash: string };
    const ok = await verifyPassword(data.password, user.password_hash);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    return res.json({ accessToken: token, tokenType: 'Bearer', expiresIn: env.JWT_EXPIRES_IN });
  } catch (err: any) {
    if (err?.issues) return res.status(400).json({ message: 'Invalid data', issues: err.issues });
    console.error('login error:', err);
    return res.status(500).json({ message: 'Internal error' });
  }
});

/** GET /me (protegido) */
router.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const [rows] = await pool.query(
      `SELECT id, email, created_at FROM ${T_USERS} WHERE id = ? LIMIT 1`,
      [userId]
    );
    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(rows[0]);
  } catch (err) {
    console.error('me error:', err);
    return res.status(500).json({ message: 'Internal error' });
  }
});

export default router;
