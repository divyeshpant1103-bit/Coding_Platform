import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { prisma } from "@/config/prisma";
import { ApiError } from "@/middleware/errorHandler";
import { getIO } from "@/sockets";

const submitSchema = z.object({
  challengeId: z.string().uuid(),
  eventId: z.string().uuid(),
  answer: z.string(),
});

// POST /api/submissions
// Core scoring flow:
// 1. Look up challenge, compare answer (case-insensitive, trimmed).
// 2. Award challenge.points if correct, 0 if not.
// 3. Upsert the participant's running Score for this event.
// 4. Broadcast the updated leaderboard over Socket.IO.
export async function submitAnswer(req: Request, res: Response, next: NextFunction) {
  try {
    const { challengeId, eventId, answer } = submitSchema.parse(req.body);
    const userId = req.auth?.userId;
    if (!userId) throw new ApiError(401, "Unauthenticated");

    const challenge = await prisma.challenge.findUnique({ where: { id: challengeId } });
    if (!challenge) throw new ApiError(404, "Challenge not found");

    // Prevent re-scoring an already-solved challenge
    const existing = await prisma.submission.findFirst({
      where: { userId, challengeId, isCorrect: true },
    });
    if (existing) throw new ApiError(409, "Challenge already solved");

    const isCorrect =
      answer.trim().toLowerCase() === challenge.answer.trim().toLowerCase();
    const pointsAwarded = isCorrect ? challenge.points : 0;

    const submission = await prisma.submission.create({
      data: { userId, challengeId, answer, isCorrect, points: pointsAwarded },
    });

    if (isCorrect) {
      await prisma.score.upsert({
        where: { userId_eventId: { userId, eventId } },
        create: { userId, eventId, totalScore: pointsAwarded },
        update: { totalScore: { increment: pointsAwarded } },
      });

      // Broadcast live leaderboard update (see src/sockets/index.ts)
      getIO()?.to(`event:${eventId}`).emit("leaderboard:update", { eventId });
    }

    res.status(201).json({ isCorrect, pointsAwarded, submission });
  } catch (err) {
    next(err);
  }
}

// POST /api/submissions/hint  — deduct hint cost from running score
const hintSchema = z.object({
  hintId: z.string().uuid(),
  eventId: z.string().uuid(),
});

export async function useHint(req: Request, res: Response, next: NextFunction) {
  try {
    const { hintId, eventId } = hintSchema.parse(req.body);
    const userId = req.auth?.userId;
    if (!userId) throw new ApiError(401, "Unauthenticated");

    const hint = await prisma.hint.findUnique({ where: { id: hintId } });
    if (!hint) throw new ApiError(404, "Hint not found");

    await prisma.score.upsert({
      where: { userId_eventId: { userId, eventId } },
      create: { userId, eventId, totalScore: -hint.cost },
      update: { totalScore: { decrement: hint.cost } },
    });

    res.json({ hintText: hint.hintText, costDeducted: hint.cost });
  } catch (err) {
    next(err);
  }
}
