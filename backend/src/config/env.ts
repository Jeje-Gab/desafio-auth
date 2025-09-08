import 'dotenv/config';

function req(name: string, def?: string) {
  const v = process.env[name] ?? def;
  if (v === undefined) throw new Error(`Missing env: ${name}`);
  return v;
}

export const env = {
  PORT: parseInt(req('PORT', '3001'), 10),
  NODE_ENV: req('NODE_ENV', 'development'),
  CORS_ORIGIN: req('CORS_ORIGIN', 'http://localhost:5173'),
  JWT_SECRET: req('JWT_SECRET'),
  JWT_EXPIRES_IN: req('JWT_EXPIRES_IN', '15m'),

  DB_HOST: req('DB_HOST', '127.0.0.1'),
  DB_PORT: parseInt(req('DB_PORT', '3306'), 10),
  DB_USER: req('DB_USER', 'root'),
  DB_PASS: req('DB_PASS', ''),
  DB_NAME: req('DB_NAME', 'desafio_auth')
};
