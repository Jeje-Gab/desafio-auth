import "dotenv/config";
import express from "express";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./http/routes/auth.routes";
import { errorHandler } from "./http/middleware/errorHandler";
import { pool } from "./infra/db/pool";

const app = express();
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/auth", authRoutes);

// middleware global de erros (por último)
app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`API running at http://localhost:${env.PORT}`);
});

// graceful shutdown
async function shutdown(signal: string) {
  console.log(`\n${signal} recebido. Encerrando...`);
  server.close(async () => {
    try { await pool.end(); console.log("Pool MySQL fechado."); }
    catch (e) { console.error("Erro fechando pool:", e); }
    process.exit(0);
  });
}
process.on("SIGINT",  () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
