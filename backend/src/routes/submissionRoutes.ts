import { Router } from "express";
import { submitAnswer, useHint } from "@/controllers/submissionController";
import { requireAuth } from "@/middleware/auth";

const router = Router();

router.post("/", requireAuth, submitAnswer);
router.post("/hint", requireAuth, useHint);

export default router;
