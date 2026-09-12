import type { Country, GameMode, QuizQuestion, Region } from "../types";
import { COUNTRIES } from "../data/countries";

// Fisher-Yates シャッフル
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getFlagUrl(code: string, width: number = 320): string {
  // flagcdn.com を利用 (無料・高信頼性・SVG / PNG両対応)
  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
}

export function generateQuizQuestions(
  count: number,
  mode: GameMode,
  region: Region
): QuizQuestion[] {
  // 1. 地域フィルタリング
  let pool = region === "all" ? COUNTRIES : COUNTRIES.filter((c) => c.region === region);
  if (pool.length === 0) {
    pool = COUNTRIES;
  }

  // 2. モードがトリビアのみの場合、トリビア情報を持つ国を優先
  if (mode === "trivia") {
    const triviaPool = pool.filter((c) => c.trivia && c.trivia.length > 0);
    if (triviaPool.length > 0) {
      pool = triviaPool;
    }
  }

  // 3. 出題する国を決定（重複を極力防ぎ、要求数まで）
  const shuffledCountries = shuffle(pool);
  const selectedCountries: Country[] = [];
  while (selectedCountries.length < count) {
    for (const c of shuffledCountries) {
      if (selectedCountries.length >= count) break;
      selectedCountries.push(c);
    }
  }

  // 4. 各問題の生成
  const questions: QuizQuestion[] = selectedCountries.map((country, idx) => {
    // 問題タイプ決定
    let qType: "flag_to_name" | "name_to_flag" | "trivia" = "flag_to_name";
    if (mode === "random") {
      const candidates: ("flag_to_name" | "name_to_flag" | "trivia")[] = [
        "flag_to_name",
        "name_to_flag",
      ];
      if (country.trivia && country.trivia.length > 0) {
        candidates.push("trivia");
      }
      qType = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      // 指定モード
      if (mode === "trivia" && (!country.trivia || country.trivia.length === 0)) {
        // トリビアがない場合は国旗当てにフォールバック
        qType = "flag_to_name";
      } else {
        qType = mode;
      }
    }

    // パターンに応じた問題構築
    if (qType === "trivia" && country.trivia && country.trivia.length > 0) {
      const triviaItem = country.trivia[Math.floor(Math.random() * country.trivia.length)];
      const shuffledOptions = shuffle(triviaItem.options).map((opt) => ({
        text: opt,
        isCorrect: opt === triviaItem.correctAnswer,
      }));

      return {
        id: idx + 1,
        type: "trivia",
        country,
        prompt: triviaItem.question,
        promptRuby: triviaItem.questionRuby,
        options: shuffledOptions,
        explanation: triviaItem.explanation,
      };
    } else if (qType === "name_to_flag") {
      // 国名 -> 4つの国旗文字から選択
      const otherCountries = shuffle(COUNTRIES.filter((c) => c.code !== country.code)).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "name_to_flag",
        country,
        prompt: "この国旗はどれかな？",
        promptRuby: "このこっきはどれかな？",
        options: optionCountries.map((c) => ({
          flagCode: c.code,
          text: c.name,
          ruby: c.ruby,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${country.name}」の国旗です！`,
      };
    } else {
      // flag_to_name: 国旗 -> 4つの国名から選択
      const otherCountries = shuffle(COUNTRIES.filter((c) => c.code !== country.code)).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "flag_to_name",
        country,
        prompt: "この国はどこかな？",
        promptRuby: "このくにはどこかな？",
        options: optionCountries.map((c) => ({
          text: c.name,
          ruby: c.ruby,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${country.name}」です！`,
      };
    }
  });

  return questions;
}
