import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Sparkles,
  Bot,
  User,
  Plane,
  Stamp,
  Dices,
  HelpCircle,
} from "lucide-react";
import { SUGOROKU_BOARD, type SugorokuSquare, type SugorokuQuiz } from "../data/sugorokuData";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface FlagSugorokuScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

type SugorokuMode = "vs_cpu" | "solo";

export const FlagSugorokuScreen: React.FC<FlagSugorokuScreenProps> = ({
  onBack,
  showRuby = true,
}) => {
  const [mode, setMode] = useState<SugorokuMode>("vs_cpu");

  // プレイヤー・CPUの位置とスコア
  const [playerPos, setPlayerPos] = useState<number>(0);
  const [cpuPos, setCpuPos] = useState<number>(0);
  const [playerPoints, setPlayerPoints] = useState<number>(0);
  const [cpuPoints, setCpuPoints] = useState<number>(0);
  const [turnCount, setTurnCount] = useState<number>(1);
  const [stamps, setStamps] = useState<string[]>(["jp"]);

  // ターン・サイコロ状態
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [isCpuTurn, setIsCpuTurn] = useState<boolean>(false);
  const [activeSquare, setActiveSquare] = useState<SugorokuSquare>(SUGOROKU_BOARD[0]);
  const [eventBanner, setEventBanner] = useState<string>(
    "🎲 サイコロ（1〜4）をふって、日本から世界一周の旅へ出発しよう！"
  );

  // 空港クイズモーダル状態
  const [activeQuiz, setActiveQuiz] = useState<{
    square: SugorokuSquare;
    quiz: SugorokuQuiz;
    selectedIndex: number | null;
    isAnswered: boolean;
  } | null>(null);

  // ゴール結果モーダル
  const [winner, setWinner] = useState<"player" | "cpu" | null>(null);

  // あそびかたヘルプモーダル
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const maxIndex = SUGOROKU_BOARD.length - 1; // 20

  // ゲーム初期化
  const startNewGame = useCallback((selectedMode: SugorokuMode) => {
    setPlayerPos(0);
    setCpuPos(0);
    setPlayerPoints(0);
    setCpuPoints(0);
    setTurnCount(1);
    setStamps(["jp"]);
    setIsRolling(false);
    setDiceValue(null);
    setIsCpuTurn(false);
    setActiveSquare(SUGOROKU_BOARD[0]);
    setActiveQuiz(null);
    setWinner(null);
    setEventBanner(
      selectedMode === "vs_cpu"
        ? "🤖 CPUと世界一周レース！先にゴール（20.日本）へ着いた方の勝ち！"
        : "🎒 ひとり世界旅モード！世界の国旗スタンプを集めながらゴールを目指そう！"
    );
  }, []);

  useEffect(() => {
    startNewGame(mode);
  }, [mode, startNewGame]);

  // スタンプ追加ヘルパー
  const addStamp = useCallback((code: string) => {
    setStamps((prev) => (prev.includes(code) ? prev : [...prev, code]));
  }, []);

  // マス到着時のイベント処理（プレイヤー）
  const resolvePlayerLanding = useCallback(
    (pos: number) => {
      const sq = SUGOROKU_BOARD[pos];
      setActiveSquare(sq);
      addStamp(sq.countryCode);
      speech.speak(sq.countryName.replace("（ゴール！）", "").replace("（スタート）", ""));

      if (sq.bonusPoints) {
        setPlayerPoints((p) => p + sq.bonusPoints!);
      }

      // ゴール判定
      if (pos >= maxIndex) {
        soundEffect.playFanfare();
        setWinner("player");
        setEventBanner(`🎉 世界一周達成！${sq.eventTitle}`);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        return;
      }

      // クイズワープマス
      if (sq.eventType === "quiz_warp" && sq.quiz) {
        setEventBanner(`✈️ ${sq.countryName}に到着！空港ワープクイズに挑戦！`);
        setActiveQuiz({
          square: sq,
          quiz: sq.quiz,
          selectedIndex: null,
          isAnswered: false,
        });
        return;
      }

      // 進む・戻るマス
      if ((sq.eventType === "advance" || sq.eventType === "retreat") && sq.moveDelta) {
        const nextPos = Math.max(0, Math.min(maxIndex, pos + sq.moveDelta));
        setEventBanner(`${sq.eventTitle}（${sq.eventDesc}）`);
        setTimeout(() => {
          if (sq.moveDelta! > 0) soundEffect.playCorrect();
          else soundEffect.playTap();
          setPlayerPos(nextPos);
          const nextSq = SUGOROKU_BOARD[nextPos];
          setActiveSquare(nextSq);
          addStamp(nextSq.countryCode);

          if (nextPos >= maxIndex) {
            soundEffect.playFanfare();
            setWinner("player");
            confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
            return;
          }

          if (mode === "vs_cpu") {
            setIsCpuTurn(true);
          } else {
            setTurnCount((t) => t + 1);
          }
        }, 900);
        return;
      }

      // もう1回サイコロマス
      if (sq.eventType === "roll_again") {
        soundEffect.playCorrect();
        setEventBanner(`🎲 ${sq.eventTitle} ➔ もう1回サイコロがふれるよ！`);
        return;
      }

      // 通常ボーナスマス
      setEventBanner(`${sq.eventTitle}（${sq.eventDesc}）`);
      if (mode === "vs_cpu") {
        setIsCpuTurn(true);
      } else {
        setTurnCount((t) => t + 1);
      }
    },
    [addStamp, maxIndex, mode]
  );

  // プレイヤーがサイコロを振る (1〜4)
  const handleRollDice = () => {
    if (isRolling || isCpuTurn || activeQuiz || winner) return;
    soundEffect.playTap();
    setIsRolling(true);

    let ticks = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 4) + 1);
      ticks++;
      if (ticks >= 8) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 4) + 1;
        setDiceValue(finalRoll);
        setIsRolling(false);
        soundEffect.playCorrect();

        const targetPos = Math.min(maxIndex, playerPos + finalRoll);
        setPlayerPos(targetPos);
        resolvePlayerLanding(targetPos);
      }
    }, 65);
  };

  // 空港クイズ回答処理
  const handleAnswerQuiz = (optionIdx: number) => {
    if (!activeQuiz || activeQuiz.isAnswered) return;
    const isCorrect = optionIdx === activeQuiz.quiz.correctIndex;

    if (isCorrect) {
      soundEffect.playCorrect();
    } else {
      soundEffect.playWrong();
    }

    setActiveQuiz({
      ...activeQuiz,
      selectedIndex: optionIdx,
      isAnswered: true,
    });
  };

  // クイズモーダルを閉じてワープ反映
  const handleCloseQuiz = () => {
    if (!activeQuiz) return;
    const isCorrect = activeQuiz.selectedIndex === activeQuiz.quiz.correctIndex;
    const sq = activeQuiz.square;
    setActiveQuiz(null);

    if (isCorrect && sq.moveDelta) {
      const warpedPos = Math.min(maxIndex, playerPos + sq.moveDelta);
      setPlayerPos(warpedPos);
      setPlayerPoints((p) => p + 300);
      const destSq = SUGOROKU_BOARD[warpedPos];
      setActiveSquare(destSq);
      addStamp(destSq.countryCode);
      setEventBanner(`✈️ クイズ正解！飛行機で「${destSq.countryName}」まで +${sq.moveDelta}マス ワープ！`);

      if (warpedPos >= maxIndex) {
        soundEffect.playFanfare();
        setWinner("player");
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
        return;
      }
    } else {
      setEventBanner(`おしい！ワープはならず。次はがんばろう！`);
    }

    if (mode === "vs_cpu") {
      setIsCpuTurn(true);
    } else {
      setTurnCount((t) => t + 1);
    }
  };

  // CPUのターン処理
  useEffect(() => {
    if (!isCpuTurn || mode !== "vs_cpu" || winner) return;

    const timer = setTimeout(() => {
      const cpuRoll = Math.floor(Math.random() * 4) + 1;
      setDiceValue(cpuRoll);
      soundEffect.playTap();

      let nextCpuPos = Math.min(maxIndex, cpuPos + cpuRoll);
      const sq = SUGOROKU_BOARD[nextCpuPos];

      if (sq.bonusPoints) {
        setCpuPoints((p) => p + sq.bonusPoints!);
      }

      if ((sq.eventType === "advance" || sq.eventType === "retreat") && sq.moveDelta) {
        nextCpuPos = Math.max(0, Math.min(maxIndex, nextCpuPos + sq.moveDelta));
      }

      setCpuPos(nextCpuPos);
      const finalSq = SUGOROKU_BOARD[nextCpuPos];

      if (nextCpuPos >= maxIndex) {
        soundEffect.playWrong();
        setWinner("cpu");
        setEventBanner(`🤖 CPUが先にゴール（日本）へ到着しました！`);
        setIsCpuTurn(false);
        return;
      }

      setEventBanner(
        `🤖 CPUは「${cpuRoll}」を出して「${finalSq.countryName}」に進んだ！次はあなたの番！`
      );
      setIsCpuTurn(false);
      setTurnCount((t) => t + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCpuTurn, mode, cpuPos, maxIndex, winner]);

  // 7列×3行の蛇行（S字）レイアウト用に配列を整形
  // 1行目: 0, 1, 2, 3, 4, 5, 6 (左→右)
  // 2行目: 13, 12, 11, 10, 9, 8, 7 (右←左 なので表示順は13..7)
  // 3行目: 14, 15, 16, 17, 18, 19, 20 (左→右)
  const boardRows: SugorokuSquare[][] = [
    SUGOROKU_BOARD.slice(0, 7),
    [...SUGOROKU_BOARD.slice(7, 14)].reverse(),
    SUGOROKU_BOARD.slice(14, 21),
  ];

  return (
    <div className="w-full max-w-2xl mx-auto min-h-screen bg-gradient-to-b from-sky-50 via-indigo-50/40 to-amber-50/40 flex flex-col justify-between p-2.5 sm:p-3 select-none">
      {/* 1. ヘッダーバー */}
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

        {/* モード切替 */}
        <div className="flex bg-slate-200/90 p-0.5 rounded-xl text-xs font-black">
          <button
            onClick={() => {
              soundEffect.playTap();
              setMode("vs_cpu");
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              mode === "vs_cpu"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>CPU対戦レース</span>
          </button>
          <button
            onClick={() => {
              soundEffect.playTap();
              setMode("solo");
            }}
            className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 ${
              mode === "solo"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Stamp className="w-3.5 h-3.5" />
            <span>ひとり世界旅</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEffect.playTap();
              setShowHelpModal(true);
            }}
            className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 active:scale-95 transition-all shadow-2xs cursor-pointer"
            title="あそびかた"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => startNewGame(mode)}
            className="p-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 active:scale-95 transition-all shadow-2xs cursor-pointer"
            title="はじめから"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* 2. ステータス＆パスポートスタンプバー */}
      <div className="w-full bg-white/95 rounded-2xl px-3 py-1.5 border border-indigo-100 shadow-2xs mb-1.5 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-3 text-xs font-black">
          <div className="flex items-center gap-1 text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-lg border border-indigo-200">
            <User className="w-3.5 h-3.5" />
            <span>あなた: {playerPos}/20マス</span>
            <span className="text-amber-600 ml-1">({playerPoints}P)</span>
          </div>

          {mode === "vs_cpu" && (
            <div className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
              <Bot className="w-3.5 h-3.5" />
              <span>CPU: {cpuPos}/20マス</span>
              <span className="text-rose-500 ml-1">({cpuPoints}P)</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
          <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-black">
            🛂 国旗スタンプ: {stamps.length}カ国
          </span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-black">
            {turnCount}ターン目
          </span>
        </div>
      </div>

      {/* 3. 世界一周すごろくボード（7列×3行 S字ルート） */}
      <div className="w-full bg-white/90 rounded-2xl p-2 border-2 border-sky-200 shadow-sm space-y-1.5 my-auto">
        {boardRows.map((row, rowIdx) => (
          <div key={rowIdx} className="space-y-1">
            {/* 行の進行方向ガイド */}
            <div className="flex items-center justify-between px-1 text-[10px] font-black text-slate-400">
              {rowIdx === 0 && <span>🛫 アジア・オセアニア ➔ ➔ ➔</span>}
              {rowIdx === 1 && <span className="ml-auto">⬅ ⬅ ⬅ ヨーロッパ・アフリカ 🌍</span>}
              {rowIdx === 2 && <span>🗽 南北アメリカ ➔ ➔ ➔ 👑 世界一周ゴール！</span>}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
              {row.map((sq) => {
                const isPlayerHere = playerPos === sq.index;
                const isCpuHere = mode === "vs_cpu" && cpuPos === sq.index;
                const isVisited = stamps.includes(sq.countryCode);

                // マスの種類別カラー
                let borderClass = "border-slate-200 bg-slate-50/80";
                let badgeText = "";
                let badgeColor = "";

                if (sq.eventType === "start") {
                  borderClass = "border-indigo-300 bg-indigo-50/70";
                  badgeText = "START";
                  badgeColor = "bg-indigo-600 text-white";
                } else if (sq.eventType === "goal") {
                  borderClass = "border-amber-400 bg-gradient-to-b from-amber-50 to-orange-100";
                  badgeText = "GOAL👑";
                  badgeColor = "bg-amber-500 text-white";
                } else if (sq.eventType === "quiz_warp") {
                  borderClass = "border-sky-300 bg-sky-50/80";
                  badgeText = "✈️+3";
                  badgeColor = "bg-sky-600 text-white";
                } else if (sq.eventType === "advance") {
                  borderClass = "border-emerald-300 bg-emerald-50/70";
                  badgeText = `+${sq.moveDelta}進`;
                  badgeColor = "bg-emerald-600 text-white";
                } else if (sq.eventType === "retreat") {
                  borderClass = "border-rose-300 bg-rose-50/70";
                  badgeText = `${sq.moveDelta}戻`;
                  badgeColor = "bg-rose-500 text-white";
                } else if (sq.eventType === "roll_again") {
                  borderClass = "border-purple-300 bg-purple-50/70";
                  badgeText = "🎲再";
                  badgeColor = "bg-purple-600 text-white";
                } else {
                  badgeText = `+${sq.bonusPoints}`;
                  badgeColor = "bg-amber-500 text-white";
                }

                return (
                  <button
                    key={sq.index}
                    onClick={() => {
                      soundEffect.playTap();
                      setActiveSquare(sq);
                    }}
                    className={`relative rounded-xl p-1 border-2 flex flex-col items-center justify-between transition-all cursor-pointer min-h-[74px] sm:min-h-[82px] ${borderClass} ${
                      isPlayerHere
                        ? "ring-3 ring-indigo-500 shadow-md scale-[1.03] z-10 bg-white"
                        : isCpuHere
                        ? "ring-2 ring-rose-400 z-10"
                        : ""
                    }`}
                  >
                    {/* 上段：マス番号とイベントバッジ */}
                    <div className="w-full flex items-center justify-between gap-0.5">
                      <span className="text-[9px] font-black text-slate-500 leading-none">
                        {sq.index}
                      </span>
                      <span
                        className={`text-[8px] font-black px-1 py-0.2 rounded leading-tight ${badgeColor}`}
                      >
                        {badgeText}
                      </span>
                    </div>

                    {/* 中段：国旗画像 */}
                    <div className="w-10 h-6 sm:w-12 sm:h-8 rounded overflow-hidden border border-slate-300 bg-white shadow-2xs my-0.5 shrink-0">
                      <img
                        src={getFlagUrl(sq.countryCode, 160)}
                        alt={sq.countryName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 下段：国名 */}
                    <div className="w-full text-center">
                      {showRuby && (
                        <span className="block text-[7px] text-slate-400 font-bold leading-none truncate">
                          {sq.countryRuby}
                        </span>
                      )}
                      <span className="block text-[9px] sm:text-[10px] font-black text-slate-800 leading-tight truncate">
                        {sq.countryName.replace("（スタート）", "").replace("（ゴール！）", "")}
                      </span>
                    </div>

                    {/* 訪問済みスタンプマーク */}
                    {isVisited && !isPlayerHere && !isCpuHere && (
                      <span className="absolute bottom-1 right-1 text-[9px] opacity-60">💮</span>
                    )}

                    {/* プレイヤー＆CPUのコマ */}
                    {(isPlayerHere || isCpuHere) && (
                      <div className="absolute -top-2.5 inset-x-0 flex items-center justify-center gap-0.5 z-20">
                        {isPlayerHere && (
                          <span className="px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[9px] font-black shadow-sm border border-white animate-bounce">
                            🧑あなた
                          </span>
                        )}
                        {isCpuHere && (
                          <span className="px-1 py-0.2 rounded-full bg-rose-600 text-white text-[9px] font-black shadow-sm border border-white">
                            🤖CPU
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 4. 下部：イベント詳細パネル ＆ サイコロ操作パネル */}
      <div className="mt-2 grid grid-cols-12 gap-2 items-stretch">
        {/* 左側（8列）：現在のマス詳細＆イベントログ */}
        <div className="col-span-8 bg-white rounded-2xl p-2.5 border-2 border-indigo-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-14 h-9 rounded-lg overflow-hidden border border-slate-300 shadow-2xs shrink-0 bg-slate-50">
              <img
                src={getFlagUrl(activeSquare.countryCode, 160)}
                alt={activeSquare.countryName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                  {activeSquare.index}マス目・{activeSquare.regionLabel}
                </span>
                <span className="text-xs font-black text-slate-900 truncate">
                  {activeSquare.countryName}
                </span>
              </div>
              <div className="text-xs font-black text-indigo-700 mt-0.5 truncate">
                {activeSquare.eventTitle}
              </div>
              <div className="text-[10px] font-bold text-slate-500 leading-tight">
                {activeSquare.eventDesc}
              </div>
            </div>
          </div>

          <div className="mt-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-[11px] font-black text-amber-900 truncate">
            {eventBanner}
          </div>
        </div>

        {/* 右側（4列）：サイコロボタン */}
        <div className="col-span-4 flex flex-col">
          <button
            onClick={handleRollDice}
            disabled={isRolling || isCpuTurn || !!activeQuiz || !!winner}
            className="flex-1 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-600 text-white font-black p-2 shadow-md active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer disabled:opacity-50 border-2 border-indigo-300"
          >
            <div className="flex items-center gap-1.5">
              <Dices className={`w-6 h-6 ${isRolling ? "animate-spin" : ""}`} />
              {diceValue !== null && (
                <span className="text-2xl font-black bg-white text-indigo-700 w-8 h-8 rounded-xl flex items-center justify-center shadow-inner">
                  {diceValue}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm tracking-tight">
              {isCpuTurn
                ? "🤖 CPU思考中..."
                : isRolling
                ? "回転中..."
                : "サイコロをふる！"}
            </span>
            <span className="text-[9px] text-indigo-200 font-bold">（1〜4マス進む）</span>
          </button>
        </div>
      </div>

      {/* 5. 空港クイズ・ワープモーダル */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border-4 border-sky-400 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black mb-2">
              <Plane className="w-4 h-4 text-sky-600" />
              <span>空港ワープチャンス！（正解で +{activeQuiz.square.moveDelta}マス）</span>
            </div>

            <div className="w-24 h-16 mx-auto rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm mb-2">
              <img
                src={getFlagUrl(activeQuiz.square.countryCode, 320)}
                alt={activeQuiz.square.countryName}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-base font-black text-slate-900 mb-3 leading-snug">
              {activeQuiz.quiz.question}
            </h3>

            <div className="space-y-2 mb-3">
              {activeQuiz.quiz.options.map((opt, idx) => {
                const isSelected = activeQuiz.selectedIndex === idx;
                const isCorrect = idx === activeQuiz.quiz.correctIndex;
                let btnStyle =
                  "bg-slate-50 border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50";

                if (activeQuiz.isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-100 border-rose-400 text-rose-900";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerQuiz(idx)}
                    disabled={activeQuiz.isAnswered}
                    className={`w-full py-2.5 px-3 rounded-2xl border-2 font-black text-xs transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {activeQuiz.isAnswered && (
              <div className="animate-in fade-in duration-200">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-2.5 text-xs font-bold text-slate-700 mb-3 text-left">
                  {activeQuiz.selectedIndex === activeQuiz.quiz.correctIndex ? (
                    <span className="text-emerald-600 font-black block mb-0.5">
                      ⭕ 大正解！飛行機で +{activeQuiz.square.moveDelta}マス ワープ！
                    </span>
                  ) : (
                    <span className="text-rose-600 font-black block mb-0.5">
                      ❌ おしい！正解は「{activeQuiz.quiz.options[activeQuiz.quiz.correctIndex]}」でした！
                    </span>
                  )}
                  {activeQuiz.quiz.explanation}
                </div>

                <button
                  onClick={handleCloseQuiz}
                  className="w-full py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-md cursor-pointer"
                >
                  つづける ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. ゴール結果モーダル */}
      {winner && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-amber-300 text-center">
            <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-600 mb-2">
              {winner === "player" ? <Trophy className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
            </div>

            <h3 className="text-xl font-black text-slate-900">
              {winner === "player"
                ? "🎉 世界一周ゴール達成！"
                : "🤖 CPUが先にゴール！"}
            </h3>
            <p className="text-xs font-bold text-slate-500 mt-1">
              {winner === "player"
                ? `${turnCount}ターンで世界一周を達成しました！おめでとう！`
                : "次は空港ワープを使って逆転勝利を目指そう！"}
            </p>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 my-4 flex justify-around text-xs font-bold text-slate-700">
              <div>
                <div className="text-slate-400">旅ポイント</div>
                <div className="text-lg font-black text-indigo-600">{playerPoints} P</div>
              </div>
              <div className="border-r border-slate-200" />
              <div>
                <div className="text-slate-400">集めた国旗スタンプ</div>
                <div className="text-lg font-black text-emerald-600">{stamps.length} カ国</div>
              </div>
            </div>

            {/* 集めた国旗スタンプ一覧 */}
            <div className="mb-4">
              <div className="text-[11px] font-black text-slate-500 mb-1.5">
                🛂 パスポートに集めた国旗スタンプ
              </div>
              <div className="flex items-center justify-center gap-1.5 flex-wrap bg-amber-50/70 p-2 rounded-2xl border border-amber-200">
                {stamps.map((code) => (
                  <img
                    key={code}
                    src={getFlagUrl(code, 160)}
                    alt={code}
                    className="w-8 h-5 rounded border border-slate-300 object-cover shadow-2xs"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startNewGame(mode)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一回旅する</span>
              </button>
              <button
                onClick={onBack}
                className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                メニューへ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. あそびかたルール説明モーダル */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border-2 border-indigo-200 text-left max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-1.5">
              <span>🎲</span>
              <span>こっきすごろくのあそびかた</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <p>
                スタートの日本からサイコロをふって世界各国を旅し、<strong className="text-indigo-600 font-bold">20番マスの日本（ゴール）</strong>を目指すゲームです！
              </p>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-xs">🏁 2つのモード:</div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🤖</span>
                  <div>
                    <strong className="text-slate-900">CPU対戦レース</strong>
                    <div className="text-[11px] text-slate-500">
                      ロボットと競争！先に20番マスの日本にゴールしたほうが勝ち！
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🎒</span>
                  <div>
                    <strong className="text-slate-900">ひとり世界旅</strong>
                    <div className="text-[11px] text-slate-500">
                      じっくり自分のペースで世界一周。パスポートにスタンプを集めて高得点を目指そう！
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-xs">🗺️ マスとルールのポイント:</div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🎲</span>
                  <div>
                    <strong className="text-slate-900">サイコロ（1〜4）</strong>
                    <div className="text-[11px] text-slate-500">「サイコロをふる」を押すと1〜4マス進みます。</div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">✈️</span>
                  <div>
                    <strong className="text-sky-600">空港クイズマス（大逆転！）</strong>
                    <div className="text-[11px] text-slate-500">
                      クイズに正解すると、飛行機に乗って一気に <strong>+3マス ワープ</strong> ＆ボーナスポイント獲得！
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">⚡</span>
                  <div>
                    <strong className="text-amber-600">イベントマス</strong>
                    <div className="text-[11px] text-slate-500">
                      「特急列車で前進」「砂嵐で戻る」「もう1回サイコロ」など様々な旅のハプニングが発生します。
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🛂</span>
                  <div>
                    <strong className="text-emerald-600">国旗スタンプ</strong>
                    <div className="text-[11px] text-slate-500">
                      止まった国の国旗スタンプが自動的にパスポートにコレクションされます！
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffect.playTap();
                setShowHelpModal(false);
              }}
              className="mt-4 w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-sm cursor-pointer transition-colors"
            >
              わかった！
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
