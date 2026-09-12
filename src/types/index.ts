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
  code: string; // ISO 3166-1 alpha-2 (小文字, flagcdn等用)
  name: string; // 日本語国名
  ruby: string; // ふりがな
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
  timeTaken: number;
}
