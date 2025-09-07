import express from 'express';
import cors from 'cors';
import { env } from './env';
import authRoutes from './auth.routes';

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', authRoutes);

app.listen(env.PORT, () => {
  console.log(`API running at http://localhost:${env.PORT}`);
});
