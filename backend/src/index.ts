import express from "express";
import cors from "cors";
import { createServer } from "http";
import { env } from "@/config/env";
import { initSockets } from "@/sockets";
import { errorHandler } from "@/middleware/errorHandler";

import authRoutes from "@/routes/authRoutes";
import challengeRoutes from "@/routes/challengeRoutes";
import submissionRoutes from "@/routes/submissionRoutes";
import leaderboardRoutes from "@/routes/leaderboardRoutes";

const app = express();
const httpServer = createServer(app);

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Keep last
app.use(errorHandler);

initSockets(httpServer);

httpServer.listen(env.port, () => {
  console.log(`🚀 Backend listening on http://localhost:${env.port}`);
});
