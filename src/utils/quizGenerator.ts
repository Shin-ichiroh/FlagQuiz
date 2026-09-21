import type { Country, GameMode, QuizQuestion, Region } from "../types";
import { COUNTRIES } from "../data/countries";
import { COUNTRY_FACTS } from "../data/countryFacts";
import { COUNTRY_CAPITALS, getCountryCapital } from "../data/countryCapitals";
import worldGeo from "../data/world_geo.json";
import { PERU_FLAG_DATA_URI } from "../data/peruFlag";
const geoCodes = new Set((worldGeo as any[]).map((g) => g.id));
// 全199カ国の高精度地図データを使用
const availableShapes = geoCodes;

// 面積をわかりやすい日本語表記にする
export function formatArea(areaKm2: number): string {
  if (areaKm2 >= 10000) {
    const man = Math.round(areaKm2 / 1000) / 10;
    return `約${man.toLocaleString()}万 km²`;
  }
  return `約${areaKm2.toLocaleString()} km²`;
}

// 人口をわかりやすい日本語表記にする
export function formatPopulation(pop: number): string {
  if (pop >= 100000000) {
    const oku = Math.round(pop / 10000000) / 10;
    return `約${oku.toLocaleString()}億人`;
  } else if (pop >= 10000) {
    const man = Math.round(pop / 1000) / 10;
    return `約${man.toLocaleString()}万人`;
  }
  return `約${pop.toLocaleString()}人`;
}

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
  if (code.toLowerCase() === "pe") {
    return PERU_FLAG_DATA_URI;
  }
  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`;
}

// 国のシルエット地図SVGのURL
export function getShapeUrl(code: string): string {
  return `https://raw.githubusercontent.com/djaiss/mapsicon/master/all/${code.toLowerCase()}/vector.svg`;
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
    const allTriviaItems: { country: Country; triviaIndex: number }[] = [];
    for (const c of regionPool) {
      if (c.trivia && c.trivia.length > 0) {
        c.trivia.forEach((_, tIdx) => {
          allTriviaItems.push({ country: c, triviaIndex: tIdx });
        });
      }
    }

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

  // 3. シルエット（国のかたち）モードの場合
  if (mode === "shape") {
    const shapePool = regionPool.filter((c) => availableShapes.has(c.code));
    const poolToUse = shapePool.length > 0 ? shapePool : COUNTRIES.filter((c) => availableShapes.has(c.code));
    const shuffledShapes = shuffle(poolToUse);
    const selectedCountries: Country[] = [];
    while (selectedCountries.length < count) {
      for (const c of shuffledShapes) {
        if (selectedCountries.length >= count) break;
        selectedCountries.push(c);
      }
    }

    return selectedCountries.map((country, idx) => {
      // 50%で「かたちから国名当て」、50%で「国名からかたち当て」
      const isShapeToName = Math.random() < 0.5;
      const otherCountries = shuffle(poolToUse.filter((c) => c.code !== country.code)).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      if (isShapeToName) {
        return {
          id: idx + 1,
          type: "shape_to_name",
          country,
          prompt: "この かたちの くには どこかな？",
          promptRuby: "この かたちの くには どこかな？",
          options: optionCountries.map((c) => ({
            text: c.name,
            ruby: c.ruby,
            shapeCode: c.code,
            isCorrect: c.code === country.code,
          })),
          explanation: `正解は「${country.name}」の国土の形です！`,
        };
      } else {
        return {
          id: idx + 1,
          type: "name_to_shape",
          country,
          prompt: "この国の かたちは どれかな？",
          promptRuby: "このくにの かたちは どれかな？",
          options: optionCountries.map((c) => ({
            shapeCode: c.code,
            text: c.name,
            ruby: c.ruby,
            isCorrect: c.code === country.code,
          })),
          explanation: `正解は「${country.name}」のかたちです！`,
        };
      }
    });
  }


  // 4. 周辺地図（ロケーション）モードの場合
  if (mode === "location") {
    const geoPool = regionPool.filter((c) => geoCodes.has(c.code));
    const poolToUse = geoPool.length > 0 ? geoPool : COUNTRIES.filter((c) => geoCodes.has(c.code));
    const shuffledGeo = shuffle(poolToUse);
    const selectedCountries: Country[] = [];
    while (selectedCountries.length < count) {
      for (const c of shuffledGeo) {
        if (selectedCountries.length >= count) break;
        selectedCountries.push(c);
      }
    }

    return selectedCountries.map((country, idx) => {
      const otherCountries = shuffle(poolToUse.filter((c) => c.code !== country.code)).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "location_to_name",
        country,
        prompt: "オレンジ色で ひかった 国は どこかな？",
        promptRuby: "オレンジいろで ひかった くには どこかな？",
        options: optionCountries.map((c) => ({
          text: c.name,
          ruby: c.ruby,
          shapeCode: c.code,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${country.name}」です！周りの国との位置関係を覚えてみよう！`,
      };
    });
  }

  // 5. 国くらべ（面積・人口）モードの場合
  if (mode === "compare") {
    const comparePool = regionPool.filter((c) => !!COUNTRY_FACTS[c.code.toLowerCase()]);
    const poolToUse = comparePool.length >= 2 ? comparePool : COUNTRIES.filter((c) => !!COUNTRY_FACTS[c.code.toLowerCase()]);
    const questions: QuizQuestion[] = [];

    for (let i = 0; i < count; i++) {
      const isArea = Math.random() < 0.5;
      const compareType = isArea ? "area" : "population";
      const shuffled = shuffle(poolToUse);
      const c1 = shuffled[0];
      const c2 = shuffled[1];
      const f1 = COUNTRY_FACTS[c1.code.toLowerCase()];
      const f2 = COUNTRY_FACTS[c2.code.toLowerCase()];

      const val1 = isArea ? f1.area : f1.population;
      const val2 = isArea ? f2.area : f2.population;

      // 値が大きいほうを正解とする（同じならval1）
      const c1IsCorrect = val1 >= val2;
      const correctCountry = c1IsCorrect ? c1 : c2;
      const otherCountry = c1IsCorrect ? c2 : c1;
      const correctFact = c1IsCorrect ? f1 : f2;
      const otherFact = c1IsCorrect ? f2 : f1;

      const prompt = isArea
        ? "面積が 広いのは どっちかな？"
        : "人口（人の数）が 多いのは どっちかな？";
      const promptRuby = isArea
        ? "めんせきが ひろいのは どっちかな？"
        : "じんこう（ひとの かず）が おおいのは どっちかな？";

      const val1Str = isArea ? formatArea(f1.area) : formatPopulation(f1.population);
      const val2Str = isArea ? formatArea(f2.area) : formatPopulation(f2.population);

      const correctValStr = isArea ? formatArea(correctFact.area) : formatPopulation(correctFact.population);
      const otherValStr = isArea ? formatArea(otherFact.area) : formatPopulation(otherFact.population);

      const typeName = isArea ? "面積" : "人口";
      const greetingInfo = correctFact.greeting
        ? `\n🗣️ 「${correctCountry.name}」のごあいさつ: 「${correctFact.greeting}」(${correctFact.greetingLang})`
        : "";

      const explanation = `正解は「${correctCountry.name}」！\n・${correctCountry.name}: ${correctValStr}\n・${otherCountry.name}: ${otherValStr}\n${correctCountry.name}のほうが${typeName}が大きいです！${greetingInfo}`;

      questions.push({
        id: i + 1,
        type: "compare",
        compareType,
        country: correctCountry,
        prompt,
        promptRuby,
        options: [
          {
            text: c1.name,
            ruby: c1.ruby,
            flagCode: c1.code,
            countryCode: c1.code,
            factValue: val1Str,
            isCorrect: c1IsCorrect,
          },
          {
            text: c2.name,
            ruby: c2.ruby,
            flagCode: c2.code,
            countryCode: c2.code,
            factValue: val2Str,
            isCorrect: !c1IsCorrect,
          },
        ],
        explanation,
      });
    }

    return questions;
  }

  // 6. 首都クイズモードの場合
  if (mode === "capital") {
    const capitalPool = regionPool.filter((c) => !!COUNTRY_CAPITALS[c.code.toLowerCase()]);
    const poolToUse = capitalPool.length > 0 ? capitalPool : COUNTRIES.filter((c) => !!COUNTRY_CAPITALS[c.code.toLowerCase()]);
    const shuffledPool = shuffle(poolToUse);
    const selectedCountries: Country[] = [];
    while (selectedCountries.length < count) {
      for (const c of shuffledPool) {
        if (selectedCountries.length >= count) break;
        selectedCountries.push(c);
      }
    }

    return selectedCountries.map((country, idx) => {
      const capital = getCountryCapital(country.code)!;
      const isFlagToCapital = Math.random() < 0.5;

      const sameRegion = poolToUse.filter((c) => c.region === country.region && c.code !== country.code);
      const otherRegion = poolToUse.filter((c) => c.region !== country.region && c.code !== country.code);
      const dummyCandidates = [...shuffle(sameRegion), ...shuffle(otherRegion)];
      const otherCountries = dummyCandidates.slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      if (isFlagToCapital) {
        return {
          id: idx + 1,
          type: "flag_to_capital",
          country,
          prompt: "この国旗の 首都（しゅと）は どこかな？",
          promptRuby: "このこっきの しゅとは どこかな？",
          options: optionCountries.map((c) => {
            const cap = getCountryCapital(c.code)!;
            return {
              text: cap.capital,
              ruby: cap.ruby,
              isCorrect: c.code === country.code,
            };
          }),
          explanation: `正解は「${country.name}」の首都「${capital.capital}」です！`,
        };
      } else {
        return {
          id: idx + 1,
          type: "capital_to_flag",
          country,
          prompt: `首都が「${capital.capital}」の 国旗は どれかな？`,
          promptRuby: `しゅとが「${capital.ruby}」の こっきは どれかな？`,
          options: optionCountries.map((c) => ({
            flagCode: c.code,
            text: c.name,
            ruby: c.ruby,
            isCorrect: c.code === country.code,
          })),
          explanation: `正解は「${capital.capital}」が首都の「${country.name}」の国旗です！`,
        };
      }
    });
  }

  // 7. 国旗当て / 国名当て / ランダムモード
  const shuffledCountries = shuffle(regionPool);
  const selectedCountries: Country[] = [];
  while (selectedCountries.length < count) {
    for (const c of shuffledCountries) {
      if (selectedCountries.length >= count) break;
      selectedCountries.push(c);
    }
  }

  return selectedCountries.map((country, idx) => {
    let qType: "flag_to_name" | "name_to_flag" | "trivia" | "shape_to_name" | "name_to_shape" | "location_to_name" | "compare" | "flag_to_capital" | "capital_to_flag" = "flag_to_name";
    if (mode === "random") {
      const candidates: ("flag_to_name" | "name_to_flag" | "trivia" | "shape_to_name" | "name_to_shape" | "location_to_name" | "compare" | "flag_to_capital" | "capital_to_flag")[] = [
        "flag_to_name",
        "name_to_flag",
      ];

      if (country.trivia && country.trivia.length > 0) {
        candidates.push("trivia");
      }
      if (availableShapes.has(country.code)) {
        candidates.push(Math.random() < 0.5 ? "shape_to_name" : "name_to_shape");
      }
      if (geoCodes.has(country.code)) {
        candidates.push("location_to_name");
      }
      if (COUNTRY_FACTS[country.code.toLowerCase()]) {
        candidates.push("compare");
      }
      if (COUNTRY_CAPITALS[country.code.toLowerCase()]) {
        candidates.push(Math.random() < 0.5 ? "flag_to_capital" : "capital_to_flag");
      }
      qType = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      qType = mode as any;
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
    } else if (qType === "location_to_name") {
      const geoPool = COUNTRIES.filter((c) => geoCodes.has(c.code) && c.code !== country.code);
      const otherCountries = shuffle(geoPool).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "location_to_name",
        country,
        prompt: "オレンジ色で ひかった 国は どこかな？",
        promptRuby: "オレンジいろで ひかった くには どこかな？",
        options: optionCountries.map((c) => ({
          text: c.name,
          ruby: c.ruby,
          shapeCode: c.code,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${country.name}」です！周りの国との位置関係を覚えてみよう！`,
      };
    } else if (qType === "shape_to_name") {
      const shapePool = COUNTRIES.filter((c) => availableShapes.has(c.code) && c.code !== country.code);
      const otherCountries = shuffle(shapePool).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "shape_to_name",
        country,
        prompt: "この かたちの くには どこかな？",
        promptRuby: "この かたちの くには どこかな？",
        options: optionCountries.map((c) => ({
          text: c.name,
          ruby: c.ruby,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${country.name}」の国土の形です！`,
      };
    } else if (qType === "name_to_shape") {
      const shapePool = COUNTRIES.filter((c) => availableShapes.has(c.code) && c.code !== country.code);
      const otherCountries = shuffle(shapePool).slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "name_to_shape",
        country,
        prompt: "この国の かたちは どれかな？",
        promptRuby: "このくにの かたちは どれかな？",
        options: optionCountries.map((c) => ({
          shapeCode: c.code,
          text: c.name,
          ruby: c.ruby,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${country.name}」のかたちです！`,
      };
    } else if (qType === "compare") {
      const isArea = Math.random() < 0.5;
      const compareType = isArea ? "area" : "population";
      const otherPool = COUNTRIES.filter(
        (c) => c.code !== country.code && !!COUNTRY_FACTS[c.code.toLowerCase()]
      );
      const otherCountry = shuffle(otherPool)[0] || country;
      const f1 = COUNTRY_FACTS[country.code.toLowerCase()];
      const f2 = COUNTRY_FACTS[otherCountry.code.toLowerCase()];

      const val1 = isArea ? f1.area : f1.population;
      const val2 = isArea ? f2.area : f2.population;
      const c1IsCorrect = val1 >= val2;
      const correctCountry = c1IsCorrect ? country : otherCountry;
      const wrongCountry = c1IsCorrect ? otherCountry : country;
      const correctFact = c1IsCorrect ? f1 : f2;
      const wrongFact = c1IsCorrect ? f2 : f1;

      const prompt = isArea
        ? "面積が 広いのは どっちかな？"
        : "人口（人の数）が 多いのは どっちかな？";
      const promptRuby = isArea
        ? "めんせきが ひろいのは どっちかな？"
        : "じんこう（ひとの かず）が おおいのは どっちかな？";

      const val1Str = isArea ? formatArea(f1.area) : formatPopulation(f1.population);
      const val2Str = isArea ? formatArea(f2.area) : formatPopulation(f2.population);
      const correctValStr = isArea ? formatArea(correctFact.area) : formatPopulation(correctFact.population);
      const wrongValStr = isArea ? formatArea(wrongFact.area) : formatPopulation(wrongFact.population);
      const typeName = isArea ? "面積" : "人口";
      const greetingInfo = correctFact.greeting
        ? `\n🗣️ 「${correctCountry.name}」のごあいさつ: 「${correctFact.greeting}」(${correctFact.greetingLang})`
        : "";

      const explanation = `正解は「${correctCountry.name}」！\n・${correctCountry.name}: ${correctValStr}\n・${wrongCountry.name}: ${wrongValStr}\n${correctCountry.name}のほうが${typeName}が大きいです！${greetingInfo}`;

      return {
        id: idx + 1,
        type: "compare",
        compareType,
        country: correctCountry,
        prompt,
        promptRuby,
        options: [
          {
            text: country.name,
            ruby: country.ruby,
            flagCode: country.code,
            countryCode: country.code,
            factValue: val1Str,
            isCorrect: c1IsCorrect,
          },
          {
            text: otherCountry.name,
            ruby: otherCountry.ruby,
            flagCode: otherCountry.code,
            countryCode: otherCountry.code,
            factValue: val2Str,
            isCorrect: !c1IsCorrect,
          },
        ],
        explanation,
      };
    } else if (qType === "flag_to_capital") {
      const capital = getCountryCapital(country.code)!;
      const sameRegion = COUNTRIES.filter((c) => c.region === country.region && c.code !== country.code && !!COUNTRY_CAPITALS[c.code.toLowerCase()]);
      const otherRegion = COUNTRIES.filter((c) => c.region !== country.region && c.code !== country.code && !!COUNTRY_CAPITALS[c.code.toLowerCase()]);
      const dummyCandidates = [...shuffle(sameRegion), ...shuffle(otherRegion)];
      const otherCountries = dummyCandidates.slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "flag_to_capital",
        country,
        prompt: "この国旗の 首都（しゅと）は どこかな？",
        promptRuby: "このこっきの しゅとは どこかな？",
        options: optionCountries.map((c) => {
          const cap = getCountryCapital(c.code)!;
          return {
            text: cap.capital,
            ruby: cap.ruby,
            isCorrect: c.code === country.code,
          };
        }),
        explanation: `正解は「${country.name}」の首都「${capital.capital}」です！`,
      };
    } else if (qType === "capital_to_flag") {
      const capital = getCountryCapital(country.code)!;
      const sameRegion = COUNTRIES.filter((c) => c.region === country.region && c.code !== country.code && !!COUNTRY_CAPITALS[c.code.toLowerCase()]);
      const otherRegion = COUNTRIES.filter((c) => c.region !== country.region && c.code !== country.code && !!COUNTRY_CAPITALS[c.code.toLowerCase()]);
      const dummyCandidates = [...shuffle(sameRegion), ...shuffle(otherRegion)];
      const otherCountries = dummyCandidates.slice(0, 3);
      const optionCountries = shuffle([country, ...otherCountries]);

      return {
        id: idx + 1,
        type: "capital_to_flag",
        country,
        prompt: `首都が「${capital.capital}」の 国旗は どれかな？`,
        promptRuby: `しゅとが「${capital.ruby}」の こっきは どれかな？`,
        options: optionCountries.map((c) => ({
          flagCode: c.code,
          text: c.name,
          ruby: c.ruby,
          isCorrect: c.code === country.code,
        })),
        explanation: `正解は「${capital.capital}」が首都の「${country.name}」の国旗です！`,
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
