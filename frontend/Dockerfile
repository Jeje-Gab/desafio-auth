# ---------- Build (Vite) ----------
FROM node:20-alpine AS build
WORKDIR /app

ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
# usa o lock se existir; se não, instala normal
RUN npm ci --ignore-scripts || npm install --ignore-scripts

COPY . .
RUN npm run build

# ---------- Runtime (nginx) ----------
FROM nginx:alpine AS runtime
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
