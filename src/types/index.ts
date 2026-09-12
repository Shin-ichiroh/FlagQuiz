export type Region = "all" | "asia" | "europe" | "africa" | "north_america" | "south_america" | "oceania";

export type GameMode = "random" | "flag_to_name" | "name_to_flag" | "trivia";

export interface TriviaQuestion {
  question: string;
  questionRuby?: string;
  options: [string, string, string, string];
  correctAnswer: string;
  explanation: string;
}

export interface Country {
  code: string;
  name: string;
  ruby: string;
  region: Region;
  trivia?: TriviaQuestion[];
}

export interface QuizQuestion {
  id: number;
  type: "flag_to_name" | "name_to_flag" | "trivia";
  country: Country;
  prompt: string;
  promptRuby?: string;
  options: {
    text?: string;
    ruby?: string;
    flagCode?: string;
    isCorrect: boolean;
  }[];
  explanation?: string;
}

export interface GameSettings {
  playerName: string;
  questionCount: number;
  timeLimit: number; // 秒単位 (0なら無制限)
  mode: GameMode;
  region: Region;
  showRuby: boolean;
  soundEnabled: boolean;
}

export interface QuizResultRecord {
  question: QuizQuestion;
  selectedOptionIndex: number | null; // nullは時間切れ
  isCorrect: boolean;
  timeTaken: number; // 回答にかかった秒数
  speedBonus: number; // スピード加点
  questionScore: number; // この問題の合計点
}

export interface RankingEntry {
  id: string;
  playerName: string;
  score: number;
  accuracy: number;
  correctCount: number;
  totalQuestions: number;
  mode: GameMode;
  timeLimit: number;
  date: string; // YYYY-MM-DD
  weekKey: string; // YYYY-Wxx (週の識別子)
}
