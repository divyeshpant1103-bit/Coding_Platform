# Utopia — Break the Code

Gamified online coding challenge platform. Predict outputs, debug code, complete
missing code, solve logic puzzles, and crack the Final Lock.

## Structure

```
.
├── frontend/     Next.js + TypeScript + Tailwind (participant + admin UI)
├── backend/      Node.js + Express + TypeScript + Prisma (API, scoring, sockets)
└── .github/      CI workflows
```

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env   # fill in DATABASE_URL etc.
npm install
npx prisma migrate dev --name init
npm run dev
```

Backend runs on `http://localhost:4000` by default.

### 2. Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs on `http://localhost:3000` by default.

## Recommended stack (from PRD)

| Layer      | Technology                      |
|------------|----------------------------------|
| Frontend   | Next.js + TypeScript             |
| UI         | Tailwind CSS + React             |
| Backend    | Node.js + Express + TypeScript   |
| Database   | PostgreSQL (Prisma ORM)          |
| Real-time  | Socket.IO                        |
| Cache      | Redis (optional)                 |
| Deployment | Vercel (frontend) + Render/Railway/AWS (backend) |
| DB Hosting | Supabase / Neon                  |

## 7-Day build plan

1. Architecture, GitHub, DB schema
2. Landing, registration, auth
3. Challenge dashboard and UI
4. Submission, scoring, level unlocking
5. Leaderboard, timer, Socket.IO
6. Admin panel and testing
7. Deployment, stress test, bug fixing
