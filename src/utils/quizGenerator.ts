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
  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
}

export function generateQuizQuestions(
  count: number,
  mode: GameMode,
  region: Region
): QuizQuestion[] {
  // 1. 地域フィルタリング
  let regionPool = region === "all" ? COUNTRIES : COUNTRIES.filter((c) => c.region === region);
  if (regionPool.length === 0) {
    regionPool = COUNTRIES;
  }

  // 2. 由来（トリビア）モードの場合
  if (mode === "trivia") {
    // トリビアを持つ国・問題を全て抽出
    const allTriviaItems: { country: Country; triviaIndex: number }[] = [];
    for (const c of regionPool) {
      if (c.trivia && c.trivia.length > 0) {
        c.trivia.forEach((_, tIdx) => {
          allTriviaItems.push({ country: c, triviaIndex: tIdx });
        });
      }
    }

    // トリビア問題が足りない場合は他地域からも補充
    if (allTriviaItems.length < count && region !== "all") {
      for (const c of COUNTRIES) {
        if (c.region !== region && c.trivia && c.trivia.length > 0) {
          c.trivia.forEach((_, tIdx) => {
            allTriviaItems.push({ country: c, triviaIndex: tIdx });
          });
        }
      }
    }

    const shuffledTrivia = shuffle(allTriviaItems);
    const selectedTrivia = [];
    while (selectedTrivia.length < count) {
      for (const item of shuffledTrivia) {
        if (selectedTrivia.length >= count) break;
        selectedTrivia.push(item);
      }
    }

    return selectedTrivia.map((item, idx) => {
      const country = item.country;
      const triviaItem = country.trivia![item.triviaIndex];
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
    });
  }

  // 3. 国旗当て / 国名当て / ランダムモード
  const shuffledCountries = shuffle(regionPool);
  const selectedCountries: Country[] = [];
  while (selectedCountries.length < count) {
    for (const c of shuffledCountries) {
      if (selectedCountries.length >= count) break;
      selectedCountries.push(c);
    }
  }

  return selectedCountries.map((country, idx) => {
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
      qType = mode;
    }

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
}
