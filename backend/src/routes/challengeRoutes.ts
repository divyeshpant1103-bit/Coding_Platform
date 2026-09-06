import { Router } from "express";
import { getChallengesByLevel, createChallenge } from "@/controllers/challengeController";
import { requireAuth } from "@/middleware/auth";

const router = Router();

router.get("/:eventId/:level", requireAuth, getChallengesByLevel);
router.post("/", requireAuth, createChallenge); // TODO: swap requireAuth -> requireAdmin

export default router;
