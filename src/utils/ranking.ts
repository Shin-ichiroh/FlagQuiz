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

// 直近1週間（6日前〜今日）の日付範囲の文字列（例: "9/15(火) 〜 9/21(月)"）
export function getWeeklyRangeLabel(d: Date = new Date()): string {
  const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
  const end = new Date(d.getTime());
  const start = new Date(d.getTime());
  start.setDate(start.getDate() - 6);

  return `${start.getMonth() + 1}/${start.getDate()}(${dayNames[start.getDay()]}) 〜 ${end.getMonth() + 1}/${end.getDate()}(${dayNames[end.getDay()]})`;
}

// 直近1週間（過去7日間）のランキングの読み出し
export function getWeeklyRankings(d: Date = new Date()): RankingEntry[] {
  try {
    const raw = localStorage.getItem(RANKING_STORAGE_KEY);
    if (!raw) return [];
    const all: RankingEntry[] = JSON.parse(raw);

    // 7日前の00:00:00.000 (開始時点)
    const startTime = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 6, 0, 0, 0, 0).getTime();
    // 今日の23:59:59.999 (終了時点)
    const endTime = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();

    return all
      .filter((entry) => {
        let entryTime = entry.timestamp;
        if (!entryTime) {
          const parsed = parseInt(entry.id, 10);
          if (!isNaN(parsed) && parsed > 1600000000000) {
            entryTime = parsed;
          } else {
            entryTime = Date.now();
          }
        }
        return entryTime >= startTime && entryTime <= endTime;
      })
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
      timestamp: now.getTime(),
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
