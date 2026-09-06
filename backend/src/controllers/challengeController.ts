import { Request, Response, NextFunction } from "express";
import { prisma } from "@/config/prisma";

// GET /api/challenges/:eventId/:level
// Returns challenge WITHOUT revealing `answer` or `isCorrect` on options —
// only the client-safe fields participants should see.
export async function getChallengesByLevel(req: Request, res: Response, next: NextFunction) {
  try {
    const { eventId, level } = req.params;

    const challenges = await prisma.challenge.findMany({
      where: { eventId, level: Number(level) },
      select: {
        id: true,
        title: true,
        type: true,
        difficulty: true,
        points: true,
        options: { select: { id: true, optionText: true } },
        hints: { select: { id: true, cost: true } }, // hint text withheld until requested
      },
    });

    res.json(challenges);
  } catch (err) {
    next(err);
  }
}

// Admin-only: create a challenge (wire up requireAdmin middleware on the route)
export async function createChallenge(req: Request, res: Response, next: NextFunction) {
  try {
    const challenge = await prisma.challenge.create({ data: req.body });
    res.status(201).json(challenge);
  } catch (err) {
    next(err);
  }
}
