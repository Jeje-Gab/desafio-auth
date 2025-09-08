# entre na pasta do backend
cd C:\work\desafio-auth\backend

# garanta que o .env existe (PORT, JWT_*, DB_*)
# instale as dependências do package.json
npm install

# iniciar em modo desenvolvimento (hot reload com tsx)
npm run dev



# entre na pasta do frontend
cd C:\work\desafio-auth\frontend

# garanta que o arquivo .env tem: VITE_API_URL=http://localhost:3001
# instalar dependências
npm install

# iniciar o servidor de desenvolvimento (Vite)
npm run dev


docker compose down -v   # remove containers + volume (APAGA dados!)
docker compose up -d


--

# Servidor
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# JWT
JWT_SECRET=nodevalues
JWT_EXPIRES_IN=15m

# MySQL local
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASS=1212
DB_NAME=desafio_auth

--
VITE_API_URL=http://localhost:3001