# ---------------- Deps ----------------
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts

# ---------------- Build ----------------
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY tsconfig.json ./
COPY src ./src
# compila TS
RUN npm run build

# ---------------- Runtime ----------------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

# Copia artefatos necessários
COPY --from=build /app/dist ./dist
COPY package*.json ./

# Instala só prod
RUN npm ci --omit=dev --ignore-scripts

# Porta da API
EXPOSE 3001

# (Opcional) healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "fetch('http://localhost:3001/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "dist/index.js"]
