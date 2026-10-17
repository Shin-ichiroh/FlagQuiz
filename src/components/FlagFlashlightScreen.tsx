import React, { useState, useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Sparkles,
  Flashlight,
  BatteryCharging,
  ZoomIn,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Volume2,
  Compass,
} from "lucide-react";
import { FLAG_ATTRIBUTES, type FlagAttribute } from "../data/flagAttributes";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface FlagFlashlightScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

type DifficultyLevel = "easy" | "normal" | "hard";

const DIFFICULTY_CONFIG: Record<
  DifficultyLevel,
  { label: string; baseRadius: number; maxRadius: number; drainRate: number; badge: string }
> = {
  easy: {
    label: "🌕 かんたん（大ライト）",
    baseRadius: 56,
    maxRadius: 110,
    drainRate: 2,
    badge: "大ライト",
  },
  normal: {
    label: "🌓 ふつう（中ライト）",
    baseRadius: 38,
    maxRadius: 95,
    drainRate: 3,
    badge: "中ライト",
  },
  hard: {
    label: "🌑 むずかしい（極小ライト）",
    baseRadius: 24,
    maxRadius: 80,
    drainRate: 4,
    badge: "極小ライト",
  },
};

const TOTAL_QUESTIONS = 10;

export const FlagFlashlightScreen: React.FC<FlagFlashlightScreenProps> = ({
  onBack,
  showRuby = true,
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("normal");

  // クイズ進行状態
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [firstTryCount, setFirstTryCount] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // 現在の問題データ
  const [targetFlag, setTargetFlag] = useState<FlagAttribute>(FLAG_ATTRIBUTES[0]);
  const [options, setOptions] = useState<FlagAttribute[]>([]);
  const [wrongCodes, setWrongCodes] = useState<string[]>([]);
  const [isRevealed, setIsRevealed] = useState<boolean>(false);

  // 懐中電灯（スポットライト）状態 (x, y は 0〜100%)
  const [lightPos, setLightPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [extraRadius, setExtraRadius] = useState<number>(0);
  const [battery, setBattery] = useState<number>(100);
  const [isAutoPatrol, setIsAutoPatrol] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const patrolAngleRef = useRef<number>(0);
  const usedCodesRef = useRef<string[]>([]);

  const config = DIFFICULTY_CONFIG[difficulty];
  const currentRadius = Math.min(config.maxRadius, config.baseRadius + extraRadius);

  // 1問分の出題生成
  const generateQuestion = useCallback(
    (diff: DifficultyLevel) => {
      const available = FLAG_ATTRIBUTES.filter((f) => !usedCodesRef.current.includes(f.code));
      const pool = available.length >= 4 ? available : FLAG_ATTRIBUTES;

      const target = pool[Math.floor(Math.random() * pool.length)];
      usedCodesRef.current = [...usedCodesRef.current, target.code];

      // ダミー選択肢3つ（同じ色や地域が近いものを優先して混ぜると面白い）
      const others = FLAG_ATTRIBUTES.filter((f) => f.code !== target.code).sort(
        () => Math.random() - 0.5
      );
      const fourOptions = [target, ...others.slice(0, 3)].sort(() => Math.random() - 0.5);

      setTargetFlag(target);
      setOptions(fourOptions);
      setWrongCodes([]);
      setIsRevealed(false);
      setExtraRadius(0);
      setBattery(100);
      setIsAutoPatrol(true);

      // 初期ライト位置は中心から少しずらしたランダム位置
      const initAngle = Math.random() * Math.PI * 2;
      patrolAngleRef.current = initAngle;
      setLightPos({
        x: 50 + Math.cos(initAngle) * 24,
        y: 50 + Math.sin(initAngle) * 20,
      });

      void diff;
    },
    []
  );

  // ゲーム全体の初期化
  const startNewExpedition = useCallback(
    (diff: DifficultyLevel) => {
      usedCodesRef.current = [];
      setQuestionIndex(0);
      setScore(0);
      setCombo(0);
      setFirstTryCount(0);
      setIsFinished(false);
      generateQuestion(diff);
    },
    [generateQuestion]
  );

  useEffect(() => {
    startNewExpedition(difficulty);
  }, [difficulty, startNewExpedition]);

  // オート巡回アニメーション（指で触っていない間、懐中電灯が8の字でゆっくり国旗を照らす）
  useEffect(() => {
    if (isRevealed || !isAutoPatrol || isFinished) return;

    const timer = setInterval(() => {
      patrolAngleRef.current += 0.055;
      const a = patrolAngleRef.current;
      setLightPos({
        x: 50 + Math.sin(a) * 32,
        y: 50 + Math.sin(a * 2) * 26,
      });
    }, 40);

    return () => clearInterval(timer);
  }, [isRevealed, isAutoPatrol, isFinished]);

  // バッテリー減少タイマー（最低30%でストップするので時間切れゲームオーバーにはならない）
  useEffect(() => {
    if (isRevealed || isFinished) return;

    const timer = setInterval(() => {
      setBattery((prev) => Math.max(30, prev - config.drainRate));
    }, 600);

    return () => clearInterval(timer);
  }, [isRevealed, isFinished, config.drainRate]);

  // マウス・タッチで懐中電灯を動かす
  const updateLightFromClientXY = (clientX: number, clientY: number) => {
    if (!containerRef.current || isRevealed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((clientY - rect.top) / rect.height) * 100));
    setIsAutoPatrol(false);
    setLightPos({ x, y });
  };

  // ワイドビーム（ライトを広げるヒント機能）
  const handleExpandBeam = () => {
    if (isRevealed || currentRadius >= config.maxRadius) return;
    soundEffect.playTap();
    setExtraRadius((r) => r + 20);
    setBattery((b) => Math.max(30, b - 10));
  };

  // 選択肢をタップした時
  const handleSelectOption = (option: FlagAttribute) => {
    if (isRevealed || wrongCodes.includes(option.code)) return;

    if (option.code === targetFlag.code) {
      // 正解！パッと全体の明かりがつく！
      soundEffect.playCorrect();
      soundEffect.playFanfare();
      setIsRevealed(true);
      speech.speak(targetFlag.name);

      const isFirstTry = wrongCodes.length === 0;
      const nextCombo = isFirstTry ? combo + 1 : 0;
      setCombo(nextCombo);
      if (isFirstTry) {
        setFirstTryCount((c) => c + 1);
      }

      // 得点計算: バッテリー残量 + コンボボーナス (お手つきがある場合は少し減点)
      const basePts = Math.round(battery);
      const comboBonus = isFirstTry ? Math.min(50, nextCombo * 10) : 0;
      const penalty = wrongCodes.length * 20;
      const earned = Math.max(20, basePts + comboBonus - penalty);
      setScore((s) => s + earned);

      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });
    } else {
      // 不正解！ライトが少し広がって見やすくなる
      soundEffect.playWrong();
      setWrongCodes((prev) => [...prev, option.code]);
      setCombo(0);
      setExtraRadius((r) => r + 14);
    }
  };

  // 次の問題へ
  const handleNext = () => {
    soundEffect.playTap();
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      setIsFinished(true);
      soundEffect.playFanfare();
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    } else {
      setQuestionIndex((i) => i + 1);
      generateQuestion(difficulty);
    }
  };

  // 探検家ランク判定
  const getExplorerRank = (totalScore: number) => {
    if (totalScore >= 950) {
      return {
        rank: "S",
        title: "伝説の閃光フラッグハンター 🔦👑",
        desc: "ほんの一瞬の光だけで世界の国旗を見抜く神ワザです！",
        color: "from-amber-400 to-orange-500",
      };
    }
    if (totalScore >= 750) {
      return {
        rank: "A",
        title: "ベテラン暗闇たんけん隊長 🧭✨",
        desc: "暗闇の中でも色やマークの特徴をバッチリ捉えていますね！",
        color: "from-indigo-500 to-purple-600",
      };
    }
    if (totalScore >= 550) {
      return {
        rank: "B",
        title: "ひらめきサーチライト隊員 💡",
        desc: "いい調子！さらに素早い発見でSランクを目指そう！",
        color: "from-emerald-500 to-teal-600",
      };
    }
    return {
      rank: "C",
      title: "みならい探検家 🌱",
      desc: "ワイドビームも活用しながら、国旗の特徴をおぼえていこう！",
      color: "from-sky-500 to-blue-600",
    };
  };

  return (
    <div className="w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between p-2.5 sm:p-3 select-none">
      {/* 1. ヘッダーバー */}
      <header className="flex items-center justify-between gap-2 mb-1.5">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>もどる</span>
        </button>

        {/* 難易度（ライトサイズ）切り替え */}
        <div className="flex bg-slate-800/90 p-0.5 rounded-xl text-[11px] font-black border border-slate-700">
          {(["easy", "normal", "hard"] as DifficultyLevel[]).map((lv) => (
            <button
              key={lv}
              onClick={() => {
                soundEffect.playTap();
                setDifficulty(lv);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                difficulty === lv
                  ? "bg-amber-500 text-slate-950 shadow-2xs"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {DIFFICULTY_CONFIG[lv].badge}
            </button>
          ))}
        </div>

        <button
          onClick={() => startNewExpedition(difficulty)}
          className="p-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 active:scale-95 transition-all cursor-pointer"
          title="はじめから"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* 2. ステータス＆バッテリーゲージバー */}
      <div className="w-full bg-slate-800/90 rounded-2xl px-3 py-1.5 border border-slate-700 mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-600 text-white px-2 py-0.5 rounded-full text-[11px] font-black">
            第 {questionIndex + 1} / {TOTAL_QUESTIONS} 問
          </span>
          {combo >= 2 && (
            <span className="bg-amber-500/20 border border-amber-400/50 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-black animate-pulse">
              🔥 {combo}連続一発！
            </span>
          )}
        </div>

        {/* バッテリー残量（そのまま得点になる） */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs font-black text-emerald-400">
            <BatteryCharging className="w-4 h-4" />
            <span>充電 {battery}%</span>
          </div>
          <div className="w-16 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
            <div
              className={`h-full transition-all duration-300 ${
                battery > 60
                  ? "bg-emerald-400"
                  : battery > 35
                  ? "bg-amber-400"
                  : "bg-rose-500"
              }`}
              style={{ width: `${battery}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-black text-amber-300">
          <Trophy className="w-3.5 h-3.5" />
          <span>{score} P</span>
        </div>
      </div>

      {/* 3. 暗闇スポットライト・国旗キャンバス */}
      <div className="w-full flex flex-col items-center my-auto">
        <div className="w-full flex items-center justify-between px-1 mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
            <Flashlight className="w-4 h-4 text-amber-400" />
            <span>
              {isRevealed
                ? `💡 ライトアップ完了！正解は「${targetFlag.name}」！`
                : "指やマウスで暗闇を照らして国旗をさがそう！"}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {!isRevealed && (
              <>
                <button
                  onClick={() => setIsAutoPatrol((p) => !p)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-black border transition-all cursor-pointer flex items-center gap-1 ${
                    isAutoPatrol
                      ? "bg-sky-500/20 border-sky-400 text-sky-300"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  <Compass className="w-3 h-3" />
                  <span>{isAutoPatrol ? "自動移動ON" : "自動移動OFF"}</span>
                </button>

                <button
                  onClick={handleExpandBeam}
                  disabled={currentRadius >= config.maxRadius}
                  className="px-2 py-0.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/60 text-amber-300 text-[10px] font-black transition-all active:scale-95 disabled:opacity-40 cursor-pointer flex items-center gap-1"
                >
                  <ZoomIn className="w-3 h-3" />
                  <span>ライト拡大</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 国旗＆暗闇マスクボックス */}
        <div
          ref={containerRef}
          onMouseMove={(e) => updateLightFromClientXY(e.clientX, e.clientY)}
          onMouseDown={(e) => updateLightFromClientXY(e.clientX, e.clientY)}
          onTouchMove={(e) => {
            if (e.touches[0]) {
              updateLightFromClientXY(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchStart={(e) => {
            if (e.touches[0]) {
              updateLightFromClientXY(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className={`relative w-full max-w-[340px] sm:max-w-[380px] aspect-[3/2] rounded-2xl overflow-hidden border-4 transition-all duration-300 shadow-2xl cursor-crosshair touch-none ${
            isRevealed
              ? "border-amber-400 ring-4 ring-amber-400/30"
              : "border-slate-700 bg-slate-950"
          }`}
        >
          {/* 国旗画像本体 */}
          <img
            src={getFlagUrl(targetFlag.code, 640)}
            alt="mystery flag"
            draggable={false}
            className="w-full h-full object-cover select-none pointer-events-none"
          />

          {/* 懐中電灯の暗闇マスク＆光の輪エフェクト */}
          {!isRevealed && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(circle ${currentRadius}px at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,0) 0%, rgba(255,255,220,0.05) 78%, rgba(251,191,36,0.85) 94%, rgba(2,6,23,0.995) 100%)`,
              }}
            />
          )}

          {/* 暗闇グリッドガイド（うっすら背景にある探検スコープ風の目盛り） */}
          {!isRevealed && (
            <div className="pointer-events-none absolute inset-0 border border-white/5 flex items-center justify-center">
              <div className="text-[10px] font-bold text-slate-600/70 absolute bottom-1.5 right-2">
                🔦 なぞって照らそう
              </div>
            </div>
          )}
        </div>

        {/* 正解時の国旗解説バー */}
        {isRevealed && (
          <div className="mt-2 w-full bg-emerald-950/90 border border-emerald-500/60 rounded-xl px-3 py-1.5 flex items-center justify-between gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 min-w-0">
              <button
                onClick={() => speech.speak(targetFlag.name)}
                className="p-1.5 rounded-full bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 shrink-0 cursor-pointer"
                title="発音をきく"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <div className="min-w-0">
                <div className="text-xs font-black text-emerald-300 truncate">
                  ⭕ {targetFlag.name}（{targetFlag.regionLabel}）
                </div>
                <div className="text-[11px] font-bold text-emerald-100/90 truncate">
                  {targetFlag.triviaShort}
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="shrink-0 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>{questionIndex + 1 >= TOTAL_QUESTIONS ? "結果を見る" : "つぎへ"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 4. 下部：4択回答ボタンエリア */}
      <div className="mt-2">
        <div className="grid grid-cols-2 gap-2">
          {options.map((opt) => {
            const isWrong = wrongCodes.includes(opt.code);
            const isCorrect = isRevealed && opt.code === targetFlag.code;

            let btnClass =
              "bg-slate-800/95 border-slate-700 text-white hover:border-amber-400 hover:bg-slate-800";
            if (isCorrect) {
              btnClass =
                "bg-emerald-600 border-emerald-400 text-white ring-2 ring-emerald-300 shadow-lg";
            } else if (isWrong) {
              btnClass = "bg-rose-950/60 border-rose-800 text-rose-300 opacity-60";
            } else if (isRevealed) {
              btnClass = "bg-slate-800/50 border-slate-800 text-slate-500 opacity-60";
            }

            return (
              <button
                key={opt.code}
                onClick={() => handleSelectOption(opt)}
                disabled={isRevealed || isWrong}
                className={`py-2.5 px-3 rounded-2xl border-2 font-black text-left transition-all active:scale-95 flex items-center justify-between gap-2 cursor-pointer ${btnClass}`}
              >
                <div className="min-w-0">
                  {showRuby && (
                    <span className="block text-[10px] font-bold opacity-75 leading-none mb-0.5 truncate">
                      {opt.ruby}
                    </span>
                  )}
                  <span className="block text-sm sm:text-base leading-tight truncate">
                    {opt.name}
                  </span>
                </div>

                {isCorrect && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                {isWrong && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. 全10問クリア結果モーダル */}
      {isFinished && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-400 text-center text-white">
            <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 mb-2">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black">くらやみ国旗たんけん 完了！</h3>

            {(() => {
              const rankInfo = getExplorerRank(score);
              return (
                <div className="my-4">
                  <div
                    className={`inline-block bg-gradient-to-r ${rankInfo.color} text-white px-5 py-2 rounded-2xl shadow-md mb-2`}
                  >
                    <div className="text-xs font-bold opacity-90">たんけん家ランク</div>
                    <div className="text-3xl font-black">{rankInfo.rank} ランク</div>
                  </div>
                  <div className="text-base font-black text-amber-300 mt-1">
                    {rankInfo.title}
                  </div>
                  <p className="text-xs font-bold text-slate-300 mt-1">{rankInfo.desc}</p>
                </div>
              );
            })()}

            <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700 mb-4 flex justify-around text-xs font-bold">
              <div>
                <div className="text-slate-400">合計スコア</div>
                <div className="text-lg font-black text-amber-400">{score} P</div>
              </div>
              <div className="border-r border-slate-700" />
              <div>
                <div className="text-slate-400">一発正解</div>
                <div className="text-lg font-black text-emerald-400">
                  {firstTryCount} / {TOTAL_QUESTIONS}問
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startNewExpedition(difficulty)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一回たんけん</span>
              </button>
              <button
                onClick={onBack}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                メニューへ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
