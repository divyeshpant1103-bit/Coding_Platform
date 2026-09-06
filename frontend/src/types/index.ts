export interface Challenge {
  id: string;
  title: string;
  type: "MCQ" | "OUTPUT_PREDICTION" | "BUG_IDENTIFICATION" | "FILL_IN_BLANK" | "FLAG_SUBMISSION";
  difficulty: "EASY" | "MEDIUM" | "HARD";
  points: number;
  options: { id: string; optionText: string }[];
  hints: { id: string; cost: number }[];
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  completionTime: number | null;
}
