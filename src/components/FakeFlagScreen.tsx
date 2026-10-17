import React, { useState, useEffect, useMemo, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  Lightbulb,
  Volume2,
  Eye,
  Zap,
} from "lucide-react";
import { FAKE_FLAG_STAGES, type FakeFlagStage, type FakeFlagVariant } from "../data/fakeFlagData";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface FakeFlagScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

type PlayMode = "stage" | "challenge";

export const FakeFlagScreen: React.FC<FakeFlagScreenProps> = ({
  onBack,
  showRuby = true,
}) => {
  const [playMode, setPlayMode] = useState<PlayMode>("stage");

  // ステージモード用
  const [stageIndex, setStageIndex] = useState<number>(0);
  const [clearedStageIds, setClearedStageIds] = useState<string[]>([]);

  // チャレンジモード（10問サバイバル）用
  const [challengeStages, setChallengeStages] = useState<FakeFlagStage[]>([]);
  const [challengeIdx, setChallengeIdx] = useState<number>(0);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [firstTryCount, setFirstTryCount] = useState<number>(0);
  const [isChallengeFinished, setIsChallengeFinished] = useState<boolean>(false);

  // 現在の問題の状態
  const [shuffledVariants, setShuffledVariants] = useState<FakeFlagVariant[]>([]);
  const [revealedFakeIds, setRevealedFakeIds] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>("4枚の中に「ほんもの」は1枚だけ！どれかな？");
  const [lastWrongId, setLastWrongId] = useState<string | null>(null);

  const currentStage: FakeFlagStage = useMemo(() => {
    if (playMode === "challenge" && challengeStages.length > 0) {
      return challengeStages[challengeIdx] || FAKE_FLAG_STAGES[0];
    }
    return FAKE_FLAG_STAGES[stageIndex] || FAKE_FLAG_STAGES[0];
  }, [playMode, challengeStages, challengeIdx, stageIndex]);

  // 問題のセットアップ（4択シャッフル）
  const setupQuestion = useCallback((stage: FakeFlagStage) => {
    const shuffled = [...stage.variants].sort(() => Math.random() - 0.5);
    setShuffledVariants(shuffled);
    setRevealedFakeIds([]);
    setIsSolved(false);
    setShowHint(false);
    setLastWrongId(null);
    setFeedbackMsg(`「${stage.countryName}」のほんものの国旗を1枚えらぼう！`);
  }, []);

  useEffect(() => {
    setupQuestion(currentStage);
  }, [currentStage, setupQuestion]);

  // チャレンジモード開始
  const startChallengeMode = useCallback(() => {
    const picked = [...FAKE_FLAG_STAGES]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    setChallengeStages(picked);
    setChallengeIdx(0);
    setChallengeScore(0);
    setFirstTryCount(0);
    setIsChallengeFinished(false);
    setPlayMode("challenge");
  }, []);

  // カードをタップした時
  const handleSelectVariant = (variant: FakeFlagVariant) => {
    if (isSolved || revealedFakeIds.includes(variant.id)) return;

    if (variant.isReal) {
      // 正解！
      soundEffect.playCorrect();
      soundEffect.playFanfare();
      setIsSolved(true);
      setLastWrongId(null);

      // 全てのニセモノの正体もオープンして比較できるようにする
      const allFakeIds = shuffledVariants.filter((v) => !v.isReal).map((v) => v.id);
      setRevealedFakeIds(allFakeIds);

      const mistakeCount = revealedFakeIds.length;
      if (playMode === "stage") {
        setClearedStageIds((prev) =>
          prev.includes(currentStage.id) ? prev : [...prev, currentStage.id]
        );
        setFeedbackMsg(
          mistakeCount === 0
            ? "✨ 一発正解！さすが本物を見抜く目を持っているね！"
            : "⭕ 正解！ほんものの国旗を見つけたよ！"
        );
      } else {
        // チャレンジモード得点計算
        const gained = mistakeCount === 0 ? 100 : mistakeCount === 1 ? 60 : 30;
        setChallengeScore((prev) => prev + gained);
        if (mistakeCount === 0) {
          setFirstTryCount((prev) => prev + 1);
        }
        setFeedbackMsg(
          mistakeCount === 0
            ? `✨ 一発鑑定成功！ +${gained}点！`
            : `⭕ 正解！ +${gained}点！`
        );
      }

      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.65 },
      });
    } else {
      // ニセモノ！
      soundEffect.playWrong();
      setRevealedFakeIds((prev) => [...prev, variant.id]);
      setLastWrongId(variant.id);
      setFeedbackMsg(`❌ それはニセモノ！「${variant.fakeReason}」`);
    }
  };

  // ヒントボタン（まだ開いていないニセモノを1枚暴く＋ヒント表示）
  const handleUseHint = () => {
    if (isSolved) return;
    soundEffect.playTap();
    setShowHint(true);

    const unrevealedFakes = shuffledVariants.filter(
      (v) => !v.isReal && !revealedFakeIds.includes(v.id)
    );
    if (unrevealedFakes.length > 1) {
      const targetFake = unrevealedFakes[0];
      setRevealedFakeIds((prev) => [...prev, targetFake.id]);
      setFeedbackMsg(`🔍 ヒント: 1枚のニセモノ（${targetFake.fakeReason}）を見破ったよ！`);
    } else {
      setFeedbackMsg(`🔍 ヒント: ${currentStage.hint}`);
    }
  };

  // 次の問題へ
  const handleNext = () => {
    soundEffect.playTap();
    if (playMode === "stage") {
      setStageIndex((prev) => (prev + 1) % FAKE_FLAG_STAGES.length);
    } else {
      if (challengeIdx + 1 >= challengeStages.length) {
        setIsChallengeFinished(true);
        soundEffect.playFanfare();
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      } else {
        setChallengeIdx((prev) => prev + 1);
      }
    }
  };

  // 鑑定士ランク判定
  const getAppraiserRank = (score: number) => {
    if (score >= 900) {
      return {
        rank: "S",
        title: "伝説の国旗鑑定マイスター 👑",
        desc: "どんな巧妙なニセモノも見逃さない神の目を持っています！",
        color: "from-amber-400 to-orange-500",
      };
    }
    if (score >= 750) {
      return {
        rank: "A",
        title: "ベテラン一級鑑定士 🕵️‍♂️✨",
        desc: "細かい色の順番やマークの向きまでバッチリ覚えていますね！",
        color: "from-indigo-500 to-purple-600",
      };
    }
    if (score >= 550) {
      return {
        rank: "B",
        title: "ひらめき国旗調査員 🔍",
        desc: "なかなかの観察眼！さらなる高みを目指そう！",
        color: "from-emerald-500 to-teal-600",
      };
    }
    return {
      rank: "C",
      title: "みならい鑑定士 🌱",
      desc: "ニセモノの特徴をおぼえて、もう一回チャレンジしてみよう！",
      color: "from-sky-500 to-blue-600",
    };
  };

  return (
    <div className="w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-amber-50 via-orange-50/40 to-slate-100 flex flex-col justify-between p-2.5 sm:p-3 select-none">
      {/* 1. ヘッダー */}
      <header className="flex items-center justify-between gap-2 mb-1.5">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all shadow-2xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>もどる</span>
        </button>

        {/* モード切替タブ */}
        <div className="flex bg-slate-200/90 p-0.5 rounded-xl text-xs font-black">
          <button
            onClick={() => {
              soundEffect.playTap();
              setPlayMode("stage");
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              playMode === "stage"
                ? "bg-amber-500 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>ステージ ({clearedStageIds.length}/{FAKE_FLAG_STAGES.length})</span>
          </button>
          <button
            onClick={() => {
              soundEffect.playTap();
              startChallengeMode();
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              playMode === "challenge"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>10問鑑定テスト</span>
          </button>
        </div>

        <button
          onClick={() => setupQuestion(currentStage)}
          className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-amber-600 active:scale-95 transition-all shadow-2xs cursor-pointer"
          title="シャッフルしなおす"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* 2. ステージ選択バー（ステージモード時） または スコアバー（チャレンジモード時） */}
      {playMode === "stage" ? (
        <div className="w-full bg-white/90 rounded-xl px-2 py-1.5 border border-amber-200/80 shadow-2xs mb-1.5">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {FAKE_FLAG_STAGES.map((st, idx) => {
              const isCurrent = idx === stageIndex;
              const isCleared = clearedStageIds.includes(st.id);
              return (
                <button
                  key={st.id}
                  onClick={() => {
                    soundEffect.playTap();
                    setStageIndex(idx);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-black shrink-0 transition-all cursor-pointer flex items-center gap-1 border ${
                    isCurrent
                      ? "bg-amber-500 text-white border-amber-600 shadow-2xs"
                      : isCleared
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {isCleared && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
                  <span>
                    {idx + 1}.{st.countryName}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="w-full bg-indigo-950 text-white rounded-xl px-3 py-1.5 shadow-2xs mb-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-600 px-2 py-0.5 rounded-full text-[11px] font-black">
              第 {challengeIdx + 1} / {challengeStages.length} 問
            </span>
            <span className="text-[11px] font-bold text-indigo-200">
              一発正解: <strong className="text-amber-300">{firstTryCount}</strong>回
            </span>
          </div>
          <div className="text-xs font-black text-amber-300 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            <span>{challengeScore} 点</span>
          </div>
        </div>
      )}

      {/* 3. お題ヘッダーカード */}
      <div className="w-full bg-white rounded-2xl px-3 py-2 border-2 border-amber-300 shadow-sm mb-2 text-center relative">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
            難易度 {"★".repeat(currentStage.difficulty)}
          </span>

          {/* 国名と音声ボタン */}
          <div className="flex items-center justify-center gap-1.5">
            <div>
              {showRuby && (
                <span className="text-[10px] font-bold text-slate-400 block leading-none">
                  {currentStage.countryRuby}
                </span>
              )}
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
                「{currentStage.countryName}」のほんものは？
              </h2>
            </div>
            <button
              onClick={() => speech.speak(currentStage.countryName)}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all cursor-pointer"
              title="発音をきく"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleUseHint}
            disabled={isSolved}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-[10px] font-black transition-all active:scale-95 disabled:opacity-40 cursor-pointer"
          >
            <Lightbulb className="w-3 h-3 text-amber-500 fill-amber-400" />
            <span>ヒント</span>
          </button>
        </div>

        {/* 状態フィードバックメッセージ */}
        <div
          className={`mt-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-all flex items-center justify-between gap-2 ${
            isSolved
              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
              : lastWrongId
              ? "bg-rose-100 text-rose-800 border border-rose-300"
              : "bg-slate-100 text-slate-700 justify-center"
          }`}
        >
          <span className="flex-1 text-center">{feedbackMsg}</span>
          {isSolved && (
            <button
              onClick={handleNext}
              className="shrink-0 px-2.5 py-0.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[11px] shadow-2xs flex items-center gap-0.5 cursor-pointer"
            >
              <span>つぎへ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* ヒント表示ボックス */}
        {showHint && !isSolved && (
          <div className="mt-1 bg-amber-50 border border-amber-200 rounded-lg px-2 py-0.5 text-[10px] font-bold text-amber-900">
            💡 注目ポイント: {currentStage.hint}
          </div>
        )}
      </div>

      {/* 4. 4枚の国旗比較グリッド */}
      <div className="grid grid-cols-2 gap-2 w-full my-auto">
        {shuffledVariants.map((variant, idx) => {
          const isRevealedFake = revealedFakeIds.includes(variant.id);
          const isRealAndSolved = isSolved && variant.isReal;
          const labels = ["A", "B", "C", "D"];

          return (
            <button
              key={variant.id}
              onClick={() => handleSelectVariant(variant)}
              disabled={isSolved || isRevealedFake}
              className={`relative rounded-2xl p-1.5 sm:p-2 transition-all duration-200 flex flex-col items-center border-3 cursor-pointer group ${
                isRealAndSolved
                  ? "bg-emerald-50 border-emerald-500 shadow-lg ring-2 ring-emerald-300 scale-[1.01] z-10"
                  : isRevealedFake
                  ? "bg-slate-100/90 border-rose-300 opacity-85"
                  : "bg-white border-slate-200 hover:border-amber-400 hover:shadow-md active:scale-95 shadow-xs"
              }`}
            >
              {/* 左上の記号バッジ (A/B/C/D) */}
              <div className="w-full flex items-center justify-between mb-1">
                <span
                  className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                    isRealAndSolved
                      ? "bg-emerald-600 text-white"
                      : isRevealedFake
                      ? "bg-rose-500 text-white"
                      : "bg-slate-200 text-slate-700 group-hover:bg-amber-500 group-hover:text-white"
                  }`}
                >
                  {labels[idx]}
                </span>

                {isRealAndSolved && (
                  <span className="flex items-center gap-0.5 text-[10px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full border border-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>ほんもの！</span>
                  </span>
                )}

                {isRevealedFake && (
                  <span className="flex items-center gap-0.5 text-[10px] font-black text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-full border border-rose-300">
                    <XCircle className="w-3 h-3 text-rose-600" />
                    <span>ニセモノ</span>
                  </span>
                )}
              </div>

              {/* SVG国旗キャンバス（四隅は直角） */}
              <div className="h-20 sm:h-24 aspect-[3/2] rounded-none overflow-hidden border border-slate-300 shadow-inner bg-slate-50 flex items-center justify-center">
                <svg
                  viewBox={currentStage.viewBox || "0 0 300 200"}
                  className="w-full h-full block"
                  preserveAspectRatio="none"
                >
                  {variant.renderSvg()}
                </svg>
              </div>

              {/* ニセモノの理由（開かれた時 or クリア後に全表示） */}
              {isRevealedFake && variant.fakeReason && (
                <div className="mt-1.5 w-full bg-rose-50 border border-rose-200 rounded-lg px-1.5 py-0.5 text-[10px] font-black text-rose-800 text-center leading-tight">
                  ❌ {variant.fakeReason}
                </div>
              )}

              {/* 本物の証（クリア後） */}
              {isRealAndSolved && (
                <div className="mt-1.5 w-full bg-emerald-100 border border-emerald-300 rounded-lg px-1.5 py-0.5 text-[10px] font-black text-emerald-900 text-center leading-tight">
                  ⭕ 正しい「{currentStage.countryName}」の国旗！
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* 5. 正解後の豆知識 ＆ 次へ進むフッター */}
      <div className="mt-2">
        {isSolved ? (
          <div className="w-full bg-white rounded-2xl p-2.5 border-2 border-emerald-400 shadow-md flex items-center justify-between gap-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <span className="text-base shrink-0">🎓</span>
              <p className="text-[11px] font-bold text-slate-700 leading-snug">
                {currentStage.trivia}
              </p>
            </div>
            <button
              onClick={handleNext}
              className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>
                {playMode === "challenge" && challengeIdx + 1 >= challengeStages.length
                  ? "結果を見る"
                  : "つぎへ"}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="w-full bg-white/80 rounded-xl px-3 py-1.5 border border-slate-200 text-center text-[11px] font-bold text-slate-500">
            💡 色の順番・マークの向き・形をよく見比べて、ほんものを1枚タップしよう！
          </div>
        )}
      </div>

      {/* 6. 10問鑑定テスト 結果モーダル */}
      {isChallengeFinished && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-300 text-center">
            <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-600 mb-2">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">10問鑑定テスト結果！</h3>

            {(() => {
              const rankInfo = getAppraiserRank(challengeScore);
              return (
                <div className="my-4">
                  <div
                    className={`inline-block bg-gradient-to-r ${rankInfo.color} text-white px-5 py-2 rounded-2xl shadow-md mb-2`}
                  >
                    <div className="text-xs font-bold opacity-90">あなたの鑑定ランク</div>
                    <div className="text-3xl font-black">{rankInfo.rank} ランク</div>
                  </div>
                  <div className="text-base font-black text-slate-800 mt-1">
                    {rankInfo.title}
                  </div>
                  <p className="text-xs font-bold text-slate-500 mt-1">{rankInfo.desc}</p>
                </div>
              );
            })()}

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 mb-4 flex justify-around text-xs font-bold text-slate-700">
              <div>
                <div className="text-slate-400">スコア</div>
                <div className="text-lg font-black text-indigo-600">{challengeScore} / 1000点</div>
              </div>
              <div className="border-r border-slate-200" />
              <div>
                <div className="text-slate-400">一発正解</div>
                <div className="text-lg font-black text-emerald-600">{firstTryCount} / 10問</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={startChallengeMode}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一回挑戦</span>
              </button>
              <button
                onClick={() => {
                  setIsChallengeFinished(false);
                  setPlayMode("stage");
                }}
                className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                ステージへ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
