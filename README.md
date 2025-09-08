# desafio-auth

Aplicação full-stack de **autenticação** (signup, login, logout e rota `/me` protegida).

---

## 🛠 Tecnologias

- **Backend:** Node.js + TypeScript + Express + JWT + bcrypt + MySQL — *Clean Architecture (ports & adapters)*
- **Frontend:** React + TypeScript (Vite) + Axios + CSS puro
- **Infra:** Docker + Docker Compose

---

## 📂 Estrutura do Projeto

```
desafio-auth
├─ backend
│  ├─ src
│  │  ├─ config
│  │  │  └─ env.ts               # Variáveis de ambiente (validação e defaults)
│  │  ├─ core
│  │  │  ├─ domain
│  │  │  │  └─ user.ts           # Modelo de domínio `User`
│  │  │  ├─ ports
│  │  │  │  ├─ PasswordHasher.ts # Interface para hashing
│  │  │  │  ├─ TokenService.ts   # Interface para tokens
│  │  │  │  └─ UserRepo.ts       # Interface repositório de usuários
│  │  │  └─ usecase
│  │  │     ├─ getMe.ts          # Caso de uso: obter dados do usuário autenticado
│  │  │     ├─ loginUser.ts      # Caso de uso: autenticar usuário
│  │  │     └─ signupUser.ts     # Caso de uso: criar usuário
│  │  ├─ http
│  │  │  ├─ controllers
│  │  │  │  └─ AuthController.ts # Controller /auth
│  │  │  ├─ middleware
│  │  │  │  └─ requireAuth.ts    # Middleware de proteção (JWT)
│  │  │  └─ routes
│  │  │     └─ auth.routes.ts    # Rotas de autenticação
│  │  ├─ infra
│  │  │  ├─ db
│  │  │  │  ├─ MySQLUserRepo.ts  # Adapter MySQL (UserRepo)
│  │  │  │  └─ pool.ts           # Pool de conexões MySQL
│  │  │  └─ security
│  │  │     ├─ BcryptPasswordHasher.ts # Adapter bcrypt
│  │  │     └─ JwtTokenService.ts      # Adapter JWT
│  │  └─ index.ts                # Bootstrap Express
│  ├─ scripts
│  │  └─ sql
│  │     └─ 001_init.sql         # Criação do schema/tabela
│  ├─ .dockerignore │ .env │ .env.example │ .gitignore │ Dockerfile │ package.json │ tsconfig.json
│
├─ frontend
│  ├─ src
│  │  ├─ components
│  │  │  ├─ LoginForm.tsx        # Formulário de login (UI)
│  │  │  ├─ SignupForm.tsx       # Formulário de cadastro (UI)
│  │  │  └─ Navbar.tsx           # Barra de navegação (dinâmica por auth)
│  │  ├─ pages
│  │  │  ├─ LoginPage.tsx        # Página de login
│  │  │  ├─ SignupPage.tsx       # Página de cadastro
│  │  │  └─ DashboardPage.tsx    # Página do usuário (/profile)
│  │  ├─ services
│  │  │  └─ api.ts               # Axios configurado (Bearer automático)
│  │  ├─ App.tsx │ main.tsx
│  │  └─ index.css               # Tema CSS (verde-água + cantos 10px)
│  ├─ public/index.html
│  ├─ .env │ .env.example │ .gitignore │ Dockerfile │ package.json │ tsconfig.json │ vite.config.ts
│
├─ docker-compose.yml            # MySQL + Adminer (banco e UI)
└─ README.md
```

---

## 🚀 Como Rodar (Docker Compose — Caminho Mais Prático)

### 1️⃣ Pré-requisitos

- **Docker** e **Docker Compose** instalados.

---

### 2️⃣ Crie os Arquivos de Ambiente

#### **`backend/.env`**
```env
PORT=3001
CORS_ORIGIN=http://localhost:8080

JWT_SECRET=dev_super_secret_change_me
JWT_EXPIRES_IN=15m
DB_HOST=db
DB_PORT=3306
DB_USER=app
DB_PASS=app
DB_NAME=desafio_auth
```

#### **`frontend/.env`**
```env
VITE_API_URL=http://localhost:3001
```

> 💡 **Dica:** Existem os arquivos `backend/.env.example` e `frontend/.env.example` para referência.

---

### 3️⃣ Suba os Serviços

Na **raiz** do projeto, execute:

```bash
docker compose up -d
```

---

### 4️⃣ Acesse

- **Frontend:** [http://localhost:8080](http://localhost:8080)
- **API (health):** [http://localhost:3001/health](http://localhost:3001/health)

---

### 5️⃣ Parar Tudo

Para encerrar os serviços, execute:

```bash
docker compose down
```
