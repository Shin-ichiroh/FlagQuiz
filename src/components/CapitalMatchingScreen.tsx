import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Volume2, VolumeX, Mic, MicOff, Zap, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { COUNTRIES } from "../data/countries";
import { getCountryCapital } from "../data/countryCapitals";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface CapitalMatchingScreenProps {
  onBack: () => void;
  showRuby: boolean;
}

interface MatchCard {
  id: string; // 一意なID (例: "flag_jp", "cap_jp")
  countryCode: string;
  countryName: string;
  countryRuby: string;
  capital: string;
  capitalRuby: string;
  type: "flag" | "capital";
  isMatched: boolean;
}

const GAME_DURATION = 50; // 制限時間 50秒
const PAIRS_PER_ROUND = 4; // 1ラウンド4ペア (国旗4枚 + 首都4枚)

// Fisher-Yates シャッフル
function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const CapitalMatchingScreen: React.FC<CapitalMatchingScreenProps> = ({
  onBack,
  showRuby,
}) => {
  // 利用可能な国のプール (首都データが存在する国)
  const availablePool = useRef(
    COUNTRIES.filter((c) => !!getCountryCapital(c.code))
  );

  const [isPlaying, setIsPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // 現在のカード一覧
  const [flagCards, setFlagCards] = useState<MatchCard[]>([]);
  const [capitalCards, setCapitalCards] = useState<MatchCard[]>([]);

  // 選択状態
  const [selectedFlagId, setSelectedFlagId] = useState<string | null>(null);
  const [selectedCapitalId, setSelectedCapitalId] = useState<string | null>(null);
  const [wrongCardIds, setWrongCardIds] = useState<string[]>([]);

  // 音声・効果音
  const [soundOn, setSoundOn] = useState(true);
  const [speechOn, setSpeechOn] = useState(true);

  // ラウンドのカードを生成
  const generateNewRound = () => {
    const selected = shuffle(availablePool.current).slice(0, PAIRS_PER_ROUND);

    const flags: MatchCard[] = selected.map((c) => {
      const cap = getCountryCapital(c.code)!;
      return {
        id: `flag_${c.code}`,
        countryCode: c.code,
        countryName: c.name,
        countryRuby: c.ruby,
        capital: cap.capital,
        capitalRuby: cap.ruby,
        type: "flag",
        isMatched: false,
      };
    });

    const capitals: MatchCard[] = selected.map((c) => {
      const cap = getCountryCapital(c.code)!;
      return {
        id: `cap_${c.code}`,
        countryCode: c.code,
        countryName: c.name,
        countryRuby: c.ruby,
        capital: cap.capital,
        capitalRuby: cap.ruby,
        type: "capital",
        isMatched: false,
      };
    });

    setFlagCards(shuffle(flags));
    setCapitalCards(shuffle(capitals));
    setSelectedFlagId(null);
    setSelectedCapitalId(null);
  };

  // 初期化
  useEffect(() => {
    soundEffect.setEnabled(soundOn);
    speech.setEnabled(speechOn);
    generateNewRound();
  }, []);

  // タイマー
  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      soundEffect.playCorrect();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      if (speechOn) {
        speech.speak(`タイムアップ！ ${matchedPairsCount}ペア正解、合計スコア${score}点！`);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, matchedPairsCount, score, speechOn]);

  // 国旗カードクリック
  const handleFlagClick = (card: MatchCard) => {
    if (card.isMatched || !isPlaying) return;
    soundEffect.playTap();

    if (selectedFlagId === card.id) {
      setSelectedFlagId(null);
      return;
    }

    setSelectedFlagId(card.id);

    // 既に首都カードが選択されていれば判定
    if (selectedCapitalId) {
      checkMatch(card.id, selectedCapitalId);
    } else if (speechOn) {
      speech.speak(card.countryName);
    }
  };

  // 首都カードクリック
  const handleCapitalClick = (card: MatchCard) => {
    if (card.isMatched || !isPlaying) return;
    soundEffect.playTap();

    if (selectedCapitalId === card.id) {
      setSelectedCapitalId(null);
      return;
    }

    setSelectedCapitalId(card.id);

    // 既に国旗カードが選択されていれば判定
    if (selectedFlagId) {
      checkMatch(selectedFlagId, card.id);
    } else if (speechOn) {
      speech.speak(card.capital);
    }
  };

  // ペア判定
  const checkMatch = (flagId: string, capId: string) => {
    const flagCard = flagCards.find((c) => c.id === flagId);
    const capCard = capitalCards.find((c) => c.id === capId);
    if (!flagCard || !capCard) return;

    if (flagCard.countryCode === capCard.countryCode) {
      // 正解！
      soundEffect.playCorrect();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > maxCombo) setMaxCombo(newCombo);

      const bonus = Math.min(newCombo * 10, 50);
      const points = 100 + bonus;
      setScore((s) => s + points);
      setMatchedPairsCount((c) => c + 1);

      if (speechOn) {
        speech.speak(`正解！ ${flagCard.countryName}、首都${flagCard.capital}`);
      }

      // マッチ済みに更新
      const nextFlags = flagCards.map((c) => (c.id === flagId ? { ...c, isMatched: true } : c));
      const nextCapitals = capitalCards.map((c) => (c.id === capId ? { ...c, isMatched: true } : c));
      setFlagCards(nextFlags);
      setCapitalCards(nextCapitals);
      setSelectedFlagId(null);
      setSelectedCapitalId(null);

      // 全問マッチしたか判定
      const remaining = nextFlags.filter((c) => !c.isMatched).length;
      if (remaining === 0) {
        soundEffect.playCorrect();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
        setTimeout(() => {
          generateNewRound();
        }, 300);
      }
    } else {
      // 不正解
      soundEffect.playWrong();
      setCombo(0);
      setWrongCardIds([flagId, capId]);
      setTimeout(() => {
        setWrongCardIds([]);
        setSelectedFlagId(null);
        setSelectedCapitalId(null);
      }, 500);
    }
  };

  // もう一度あそぶ
  const handleRestart = () => {
    soundEffect.playTap();
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setMatchedPairsCount(0);
    setCombo(0);
    setIsPlaying(true);
    generateNewRound();
  };

  const timePercent = (timeLeft / GAME_DURATION) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-3 py-1.5 sm:py-2 flex flex-col justify-between select-none min-h-[95vh] xs:min-h-screen">
      {/* 上部ヘッダー */}
      <div className="w-full bg-white/95 backdrop-blur-xs rounded-2xl px-2.5 py-1.5 shadow-xs border border-slate-200/80 mb-2">
        <div className="flex items-center justify-between gap-1 mb-1">
          <button
            onClick={() => {
              soundEffect.playTap();
              onBack();
            }}
            className="flex items-center gap-0.5 px-2 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-bold text-xs shrink-0 transition-transform"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">もどる</span>
          </button>

          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-base sm:text-lg">🏛️</span>
            <h2 className="text-sm sm:text-base font-black text-slate-800 leading-tight truncate">
              首都マッチ
            </h2>
          </div>

          {/* スコア・コンボ & 音声トグル */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-black text-amber-900">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>{score}</span>
            </div>
            {combo > 1 && (
              <span className="text-[10px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full animate-bounce">
                {combo}連勝!
              </span>
            )}
            <button
              onClick={() => {
                const next = !speechOn;
                setSpeechOn(next);
                speech.setEnabled(next);
              }}
              className="p-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              title="こえ"
            >
              {speechOn ? <Mic className="w-3.5 h-3.5 text-indigo-600" /> : <MicOff className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => {
                const next = !soundOn;
                setSoundOn(next);
                soundEffect.setEnabled(next);
              }}
              className="p-1 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
              title="おと"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 text-indigo-600" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 制限時間バー */}
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex items-center">
          <div
            className={`h-full transition-all duration-1000 ease-linear rounded-full ${
              timeLeft <= 10 ? "bg-rose-500 animate-pulse" : timeLeft <= 20 ? "bg-amber-400" : "bg-emerald-500"
            }`}
            style={{ width: `${timePercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 px-1 mt-0.5">
          <span>のこり時間: {timeLeft}秒</span>
          <span>消したペア: {matchedPairsCount}組</span>
        </div>
      </div>

      {/* メインゲームボード: 2カラム (左: 国旗カード4枚、右: 首都カード4枚) */}
      <div className="flex-1 w-full flex flex-col justify-center gap-1.5 my-1">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 px-1">
          <span className="flex items-center gap-1">🚩 こっきカード</span>
          <span className="flex items-center gap-1">🏛️ しゅとカード</span>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
          {/* 左列: 国旗カード */}
          <div className="flex flex-col gap-2">
            {flagCards.map((card) => {
              const isSelected = selectedFlagId === card.id;
              const isWrong = wrongCardIds.includes(card.id);

              if (card.isMatched) {
                return (
                  <div
                    key={card.id}
                    className="h-16 sm:h-20 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center opacity-40 transition-all"
                  >
                    <span className="text-slate-300 text-xs font-bold">OK!</span>
                  </div>
                );
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleFlagClick(card)}
                  className={`h-16 sm:h-20 p-1.5 rounded-2xl transition-all flex items-center gap-2 border-2 shadow-xs active:scale-95 cursor-pointer relative overflow-hidden ${
                    isWrong
                      ? "border-rose-400 bg-rose-50 animate-shake"
                      : isSelected
                      ? "border-amber-400 bg-amber-50 ring-3 ring-amber-300 scale-[1.02] shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  {/* 国旗画像 */}
                  <div className="w-16 sm:w-20 h-full rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-100">
                    <img
                      src={getFlagUrl(card.countryCode, 320)}
                      alt={card.countryName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* 国名 */}
                  <div className="min-w-0 text-left flex-1">
                    {showRuby && card.countryRuby && (
                      <span className="text-[9px] font-bold text-indigo-500 block leading-tight truncate">
                        {card.countryRuby}
                      </span>
                    )}
                    <span className="text-xs sm:text-sm font-black text-slate-800 leading-tight block truncate">
                      {card.countryName}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 右列: 首都カード */}
          <div className="flex flex-col gap-2">
            {capitalCards.map((card) => {
              const isSelected = selectedCapitalId === card.id;
              const isWrong = wrongCardIds.includes(card.id);

              if (card.isMatched) {
                return (
                  <div
                    key={card.id}
                    className="h-16 sm:h-20 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center opacity-40 transition-all"
                  >
                    <span className="text-slate-300 text-xs font-bold">OK!</span>
                  </div>
                );
              }

              return (
                <button
                  key={card.id}
                  onClick={() => handleCapitalClick(card)}
                  className={`h-16 sm:h-20 px-3 py-1.5 rounded-2xl transition-all flex flex-col justify-center items-center text-center border-2 shadow-xs active:scale-95 cursor-pointer relative overflow-hidden ${
                    isWrong
                      ? "border-rose-400 bg-rose-50 animate-shake"
                      : isSelected
                      ? "border-emerald-400 bg-emerald-50 ring-3 ring-emerald-300 scale-[1.02] shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-[9px] font-bold text-emerald-600 mb-0.5">🏛️ しゅと</span>
                  {showRuby && card.capitalRuby && (
                    <span className="text-[9px] font-bold text-slate-500 block leading-tight truncate w-full">
                      {card.capitalRuby}
                    </span>
                  )}
                  <span className="text-xs sm:text-sm font-black text-slate-800 leading-tight block truncate w-full">
                    {card.capital}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 下部ステータス/ヒント */}
      <div className="w-full bg-indigo-50/80 border border-indigo-100 rounded-xl px-2.5 py-1 flex items-center justify-center text-[11px] font-bold text-indigo-900 mb-1 shadow-2xs">
        <span>💡 左の「国旗」と 右の「首都」をタップしてペアをそろえよう！</span>
      </div>

      {/* ゲームオーバー / タイムアップ結果モーダル */}
      {!isPlaying && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-5 w-full max-w-sm shadow-2xl border-4 border-amber-300 text-center animate-scaleUp">
            <span className="text-4xl sm:text-5xl block mb-2">🏆</span>
            <h3 className="text-lg sm:text-xl font-black text-slate-800 mb-1">
              タイムアップ！
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-4">
              たくさんペアをそろえられたね！
            </p>

            <div className="bg-amber-50 rounded-2xl p-3 border border-amber-200 mb-4 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold text-amber-900">
                <span>合計スコア:</span>
                <span className="text-base font-black text-amber-600">{score.toLocaleString()} 点</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>そろえたペア:</span>
                <span className="text-sm font-black">{matchedPairsCount} 組</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>さいこう連勝（コンボ）:</span>
                <span className="text-sm font-black text-rose-500">{maxCombo} 連続</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundEffect.playTap();
                  onBack();
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs transition-colors"
              >
                メニューへ
              </button>
              <button
                onClick={handleRestart}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs shadow-md active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                もう一回あそぶ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
