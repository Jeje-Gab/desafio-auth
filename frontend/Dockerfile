# ---------- Build (Vite) ----------
FROM node:20-alpine AS build
WORKDIR /app

# args/vars para API URL em tempo de build
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm ci --ignore-scripts
COPY . .
# gera /dist
RUN npm run build

# ---------- Runtime (nginx) ----------
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

# copia build
COPY --from=build /app/dist ./

# nginx.conf com fallback para SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
