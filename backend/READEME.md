# na pasta backend
docker build -t desafio-auth-backend .
docker run --name desafio-auth-backend `
  --env-file .env `
  -p 3001:3001 `
  desafio-auth-backend
