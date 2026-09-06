import { Request, Response, NextFunction } from "express";
import { prisma } from "@/config/prisma";

// GET /api/leaderboard/:eventId
// Sort: higher score first; if tied, shorter completion time ranks higher (PRD section 5/7).
export async function getLeaderboard(req: Request, res: Response, next: NextFunction) {
  try {
    const { eventId } = req.params;

    const scores = await prisma.score.findMany({
      where: { eventId },
      include: { user: { select: { name: true } }, team: { select: { name: true } } },
    });

    const ranked = scores
      .sort((a, b) => {
        if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
        const aTime = a.completionTime ?? Number.MAX_SAFE_INTEGER;
        const bTime = b.completionTime ?? Number.MAX_SAFE_INTEGER;
        return aTime - bTime;
      })
      .map((s, index) => ({
        rank: index + 1,
        name: s.user?.name ?? s.team?.name ?? "Unknown",
        score: s.totalScore,
        completionTime: s.completionTime,
      }));

    res.json(ranked);
  } catch (err) {
    next(err);
  }
}
