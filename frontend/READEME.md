# na pasta frontend
docker build -t desafio-auth-frontend --build-arg VITE_API_URL=http://localhost:3001 .
docker run --name desafio-auth-frontend -p 8080:80 desafio-auth-frontend
