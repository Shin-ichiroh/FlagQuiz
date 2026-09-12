import type { RankingEntry } from "../types";

const RANKING_STORAGE_KEY = "flagquiz_weekly_rankings";
const PLAYER_NAME_STORAGE_KEY = "flagquiz_saved_player_name";

// 現在の「年-週番号」（ISO 8601準拠、月曜始まり）を取得
export function getISOWeekKey(d: Date = new Date()): string {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  // 木曜日を基準にして週番号を決定
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  const weekNumber = 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
  return `${date.getFullYear()}-W${weekNumber.toString().padStart(2, "0")}`;
}

// 今週の日付範囲の文字列（例: "9/7(月) 〜 9/13(日)"）
export function getWeeklyRangeLabel(d: Date = new Date()): string {
  const current = new Date(d.getTime());
  const day = current.getDay();
  const diffToMonday = current.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(current.setDate(diffToMonday));
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return `${monday.getMonth() + 1}/${monday.getDate()}(月) 〜 ${sunday.getMonth() + 1}/${sunday.getDate()}(日)`;
}

// 週間ランキングの読み出し
export function getWeeklyRankings(): RankingEntry[] {
  try {
    const raw = localStorage.getItem(RANKING_STORAGE_KEY);
    if (!raw) return [];
    const all: RankingEntry[] = JSON.parse(raw);
    const currentWeekKey = getISOWeekKey();
    // 今週のデータのみ抽出してスコア降順ソート
    return all
      .filter((entry) => entry.weekKey === currentWeekKey)
      .sort((a, b) => b.score - a.score);
  } catch (e) {
    console.error("Failed to load rankings", e);
    return [];
  }
}

// ランキングへの保存
export function saveRankingEntry(entry: Omit<RankingEntry, "id" | "date" | "weekKey">): RankingEntry {
  try {
    const now = new Date();
    const fullEntry: RankingEntry = {
      ...entry,
      id: Date.now().toString() + Math.random().toString(36).substring(2, 6),
      date: `${now.getMonth() + 1}/${now.getDate()}`,
      weekKey: getISOWeekKey(now),
    };

    const raw = localStorage.getItem(RANKING_STORAGE_KEY);
    const all: RankingEntry[] = raw ? JSON.parse(raw) : [];
    all.push(fullEntry);
    localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(all));

    return fullEntry;
  } catch (e) {
    console.error("Failed to save ranking", e);
    return {
      ...entry,
      id: "temp",
      date: "",
      weekKey: getISOWeekKey(),
    };
  }
}

// プレイヤー名の記憶
export function getSavedPlayerName(): string {
  try {
    return localStorage.getItem(PLAYER_NAME_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function savePlayerName(name: string): void {
  try {
    localStorage.setItem(PLAYER_NAME_STORAGE_KEY, name.trim());
  } catch (e) {
    console.error("Failed to save player name", e);
  }
}

// スコア計算ロジック
export function calculateQuestionScore(
  isCorrect: boolean,
  timeTaken: number,
  timeLimit: number
): { speedBonus: number; totalScore: number } {
  if (!isCorrect) {
    return { speedBonus: 0, totalScore: 0 };
  }

  const BASE_SCORE = 1000;

  // 制限時間ありの場合のスピードボーナス
  if (timeLimit > 0) {
    const timeLeft = Math.max(0, timeLimit - timeTaken);
    // 残り時間割合に応じたボーナス（最大1000点）
    // 例えば10秒設定で2秒で回答（残り8秒） -> 8/10 * 1000 = 800点ボーナス！
    const ratio = timeLeft / timeLimit;
    const speedBonus = Math.round(ratio * 1000);
    return {
      speedBonus,
      totalScore: BASE_SCORE + speedBonus,
    };
  } else {
    // 制限時間なしの場合は、5秒以内の回答ならスピードボーナス（最大500点）
    const speedBonus = timeTaken < 5 ? Math.round(Math.max(0, (5 - timeTaken) / 5) * 500) : 0;
    return {
      speedBonus,
      totalScore: BASE_SCORE + speedBonus,
    };
  }
}
