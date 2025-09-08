# ---------- Build ----------
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts || npm install --ignore-scripts

COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- Runtime ----------
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev --ignore-scripts

COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/index.js"]
