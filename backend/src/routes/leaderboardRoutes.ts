import { Router } from "express";
import { getLeaderboard } from "@/controllers/leaderboardController";

const router = Router();

router.get("/:eventId", getLeaderboard);

export default router;
