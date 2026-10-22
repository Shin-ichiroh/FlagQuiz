import React, { useState, useEffect, useCallback, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  Users,
  Plane,
  Dices,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { SUGOROKU_BOARD, type SugorokuSquare, type SugorokuQuiz } from "../data/sugorokuData";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface FlagSugorokuScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

export type SugorokuGameMode = "multi_2" | "multi_3" | "multi_4" | "vs_cpu" | "solo";

export interface SugorokuPlayer {
  id: number;
  name: string;
  isCpu: boolean;
  colorName: string;
  avatar: string; // 🚗, 🚢, 🚂, 🚀, 🤖
  theme: {
    textColor: string;
    bgColor: string;
    ringColor: string;
    borderColor: string;
    lightBg: string;
    badgeBg: string;
    gradient: string;
    pinBg: string;
  };
  pos: number;
  points: number;
  stamps: string[];
}

const PLAYER_TEMPLATES: Record<number, Omit<SugorokuPlayer, "pos" | "points" | "stamps">> = {
  0: {
    id: 0,
    name: "1P（あか）",
    isCpu: false,
    colorName: "赤",
    avatar: "🚗",
    theme: {
      textColor: "text-rose-600",
      bgColor: "bg-rose-500",
      ringColor: "ring-rose-400",
      borderColor: "border-rose-400",
      lightBg: "bg-rose-50",
      badgeBg: "bg-rose-100 text-rose-800 border-rose-300",
      gradient: "from-rose-500 to-red-600",
      pinBg: "bg-rose-500",
    },
  },
  1: {
    id: 1,
    name: "2P（あお）",
    isCpu: false,
    colorName: "青",
    avatar: "🚢",
    theme: {
      textColor: "text-sky-600",
      bgColor: "bg-sky-500",
      ringColor: "ring-sky-400",
      borderColor: "border-sky-400",
      lightBg: "bg-sky-50",
      badgeBg: "bg-sky-100 text-sky-800 border-sky-300",
      gradient: "from-sky-500 to-blue-600",
      pinBg: "bg-sky-500",
    },
  },
  2: {
    id: 2,
    name: "3P（みどり）",
    isCpu: false,
    colorName: "緑",
    avatar: "🚂",
    theme: {
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-500",
      ringColor: "ring-emerald-400",
      borderColor: "border-emerald-400",
      lightBg: "bg-emerald-50",
      badgeBg: "bg-emerald-100 text-emerald-800 border-emerald-300",
      gradient: "from-emerald-500 to-green-600",
      pinBg: "bg-emerald-500",
    },
  },
  3: {
    id: 3,
    name: "4P（きいろ）",
    isCpu: false,
    colorName: "黄",
    avatar: "🚀",
    theme: {
      textColor: "text-amber-600",
      bgColor: "bg-amber-500",
      ringColor: "ring-amber-400",
      borderColor: "border-amber-400",
      lightBg: "bg-amber-50",
      badgeBg: "bg-amber-100 text-amber-800 border-amber-300",
      gradient: "from-amber-500 to-orange-500",
      pinBg: "bg-amber-500",
    },
  },
};

const CPU_TEMPLATE: Omit<SugorokuPlayer, "pos" | "points" | "stamps"> = {
  id: 1,
  name: "CPU（ロボ）",
  isCpu: true,
  colorName: "紫",
  avatar: "🤖",
  theme: {
    textColor: "text-purple-600",
    bgColor: "bg-purple-500",
    ringColor: "ring-purple-400",
    borderColor: "border-purple-400",
    lightBg: "bg-purple-50",
    badgeBg: "bg-purple-100 text-purple-800 border-purple-300",
    gradient: "from-purple-500 to-indigo-600",
    pinBg: "bg-purple-500",
  },
};

const createPlayersForMode = (selectedMode: SugorokuGameMode): SugorokuPlayer[] => {
  if (selectedMode === "solo") {
    return [{ ...PLAYER_TEMPLATES[0], name: "あなた", pos: 0, points: 0, stamps: ["jp"] }];
  }
  if (selectedMode === "vs_cpu") {
    return [
      { ...PLAYER_TEMPLATES[0], name: "あなた", pos: 0, points: 0, stamps: ["jp"] },
      { ...CPU_TEMPLATE, pos: 0, points: 0, stamps: ["jp"] },
    ];
  }
  if (selectedMode === "multi_3") {
    return [
      { ...PLAYER_TEMPLATES[0], pos: 0, points: 0, stamps: ["jp"] },
      { ...PLAYER_TEMPLATES[1], pos: 0, points: 0, stamps: ["jp"] },
      { ...PLAYER_TEMPLATES[2], pos: 0, points: 0, stamps: ["jp"] },
    ];
  }
  if (selectedMode === "multi_4") {
    return [
      { ...PLAYER_TEMPLATES[0], pos: 0, points: 0, stamps: ["jp"] },
      { ...PLAYER_TEMPLATES[1], pos: 0, points: 0, stamps: ["jp"] },
      { ...PLAYER_TEMPLATES[2], pos: 0, points: 0, stamps: ["jp"] },
      { ...PLAYER_TEMPLATES[3], pos: 0, points: 0, stamps: ["jp"] },
    ];
  }
  // multi_2 (default)
  return [
    { ...PLAYER_TEMPLATES[0], pos: 0, points: 0, stamps: ["jp"] },
    { ...PLAYER_TEMPLATES[1], pos: 0, points: 0, stamps: ["jp"] },
  ];
};

export const FlagSugorokuScreen: React.FC<FlagSugorokuScreenProps> = ({
  onBack,
  showRuby = true,
}) => {
  const [mode, setMode] = useState<SugorokuGameMode>("multi_2");
  const [isModeMenuOpen, setIsModeMenuOpen] = useState<boolean>(false);

  // プレイヤー管理
  const [players, setPlayers] = useState<SugorokuPlayer[]>(() => createPlayersForMode("multi_2"));
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [turnCount, setTurnCount] = useState<number>(1);

  // ターン・サイコロ状態
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [activeSquare, setActiveSquare] = useState<SugorokuSquare>(SUGOROKU_BOARD[0]);
  const [eventBanner, setEventBanner] = useState<string>(
    "🎲 サイコロをふって、世界地図の大冒険へ出発しよう！"
  );

  // 空港クイズモーダル状態
  const [activeQuiz, setActiveQuiz] = useState<{
    square: SugorokuSquare;
    quiz: SugorokuQuiz;
    playerIndex: number;
    selectedIndex: number | null;
    isAnswered: boolean;
  } | null>(null);

  // ゴール結果モーダル
  const [winner, setWinner] = useState<SugorokuPlayer | null>(null);

  // あそびかたヘルプモーダル
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  const maxIndex = SUGOROKU_BOARD.length - 1; // 20

  // ゲーム初期化
  const startNewGame = useCallback((selectedMode: SugorokuGameMode) => {
    const newPlayers = createPlayersForMode(selectedMode);
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
    setTurnCount(1);
    setIsRolling(false);
    setDiceValue(null);
    setActiveSquare(SUGOROKU_BOARD[0]);
    setActiveQuiz(null);
    setWinner(null);

    const modeLabels: Record<SugorokuGameMode, string> = {
      multi_2: "👥 2人対戦スタート！交代でサイコロをふろう！",
      multi_3: "👥 3人対戦スタート！交代でサイコロをふろう！",
      multi_4: "👥 4人対戦スタート！交代でサイコロをふろう！",
      vs_cpu: "🤖 あなた vs CPUレース！先に日本へゴールした方の勝ち！",
      solo: "🎒 ひとり世界旅！世界の国旗スタンプを集めよう！",
    };
    setEventBanner(modeLabels[selectedMode]);
  }, []);

  useEffect(() => {
    startNewGame(mode);
  }, [mode, startNewGame]);

  const defaultPlayer: SugorokuPlayer = {
    ...PLAYER_TEMPLATES[0],
    pos: 0,
    points: 0,
    stamps: ["jp"],
  };
  const currentPlayer = players[currentPlayerIndex] || players[0] || defaultPlayer;

  // 次のプレイヤーにターンを交代
  const advanceToNextPlayer = useCallback(() => {
    setTurnCount((prev) => prev + 1);
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  }, [players.length]);

  // マス到着時のイベント処理
  const resolveLanding = useCallback(
    (targetPlayerIndex: number, pos: number) => {
      const sq = SUGOROKU_BOARD[pos];
      setActiveSquare(sq);
      speech.speak(sq.countryName.replace("（ゴール！）", "").replace("（スタート）", ""));

      setPlayers((prev) =>
        prev.map((p, idx) => {
          if (idx !== targetPlayerIndex) return p;
          const updatedStamps = p.stamps.includes(sq.countryCode)
            ? p.stamps
            : [...p.stamps, sq.countryCode];
          const updatedPoints = p.points + (sq.bonusPoints || 0);
          return { ...p, pos, stamps: updatedStamps, points: updatedPoints };
        })
      );

      const actingPlayer = players[targetPlayerIndex];

      // ゴール判定
      if (pos >= maxIndex) {
        soundEffect.playCorrect();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        setWinner(actingPlayer);
        setEventBanner(`🎉 ${actingPlayer.name} が世界一周ゴールを達成しました！`);
        return;
      }

      // イベントマスごとの処理
      if (sq.eventType === "quiz_warp" && sq.quiz) {
        soundEffect.playTap();
        setActiveQuiz({
          square: sq,
          quiz: sq.quiz,
          playerIndex: targetPlayerIndex,
          selectedIndex: null,
          isAnswered: false,
        });
        setEventBanner(`✈️ ${actingPlayer.name} が空港クイズに挑戦中！`);
        return;
      }

      if (sq.eventType === "advance" || sq.eventType === "retreat") {
        const delta = sq.moveDelta || 0;
        const newPos = Math.max(0, Math.min(maxIndex, pos + delta));

        setTimeout(() => {
          if (delta > 0) soundEffect.playCorrect();
          else soundEffect.playWrong();

          setPlayers((prev) =>
            prev.map((p, idx) => (idx === targetPlayerIndex ? { ...p, pos: newPos } : p))
          );
          const finalSq = SUGOROKU_BOARD[newPos];
          setActiveSquare(finalSq);

          if (newPos >= maxIndex) {
            soundEffect.playCorrect();
            confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            setWinner(actingPlayer);
            setEventBanner(`🎉 ${actingPlayer.name} が世界一周ゴールを達成しました！`);
          } else {
            setEventBanner(
              `${sq.eventTitle}（${delta > 0 ? `+${delta}` : delta}マス）➔「${finalSq.countryName}」へ！`
            );
            advanceToNextPlayer();
          }
        }, 800);
        return;
      }

      if (sq.eventType === "roll_again") {
        soundEffect.playCorrect();
        setEventBanner(
          `🎈 ${actingPlayer.name} は追い風に乗って【もう1回サイコロ】をふれるよ！`
        );
        // ターンは交代しない
        return;
      }

      // 通常・ボーナスマス
      soundEffect.playTap();
      setEventBanner(
        `${actingPlayer.name} は「${sq.countryName}」に到着！ ${sq.eventTitle}`
      );
      advanceToNextPlayer();
    },
    [players, maxIndex, advanceToNextPlayer]
  );

  // サイコロを振る
  const handleRollDice = useCallback(() => {
    if (isRolling || winner || activeQuiz || !currentPlayer || currentPlayer.isCpu) return;

    setIsRolling(true);
    soundEffect.playTap();

    let rollCount = 0;
    const interval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 4) + 1);
      rollCount++;
      if (rollCount >= 6) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 4) + 1;
        setDiceValue(finalRoll);
        setIsRolling(false);

        const currentPos = currentPlayer.pos;
        const nextPos = Math.min(maxIndex, currentPos + finalRoll);

        setPlayers((prev) =>
          prev.map((p, idx) => (idx === currentPlayerIndex ? { ...p, pos: nextPos } : p))
        );

        resolveLanding(currentPlayerIndex, nextPos);
      }
    }, 80);
  }, [
    isRolling,
    winner,
    activeQuiz,
    currentPlayer,
    currentPlayerIndex,
    maxIndex,
    resolveLanding,
  ]);

  // CPU自動ターン処理
  useEffect(() => {
    if (!currentPlayer || !currentPlayer.isCpu || winner || activeQuiz || isRolling) return;

    const cpuTimer = setTimeout(() => {
      setIsRolling(true);
      soundEffect.playTap();

      let rollCount = 0;
      const interval = setInterval(() => {
        setDiceValue(Math.floor(Math.random() * 4) + 1);
        rollCount++;
        if (rollCount >= 6) {
          clearInterval(interval);
          const finalRoll = Math.floor(Math.random() * 4) + 1;
          setDiceValue(finalRoll);
          setIsRolling(false);

          const currentPos = currentPlayer.pos;
          const nextPos = Math.min(maxIndex, currentPos + finalRoll);

          setPlayers((prev) =>
            prev.map((p, idx) => (idx === currentPlayerIndex ? { ...p, pos: nextPos } : p))
          );

          resolveLanding(currentPlayerIndex, nextPos);
        }
      }, 80);
    }, 1000);

    return () => clearTimeout(cpuTimer);
  }, [
    currentPlayer,
    currentPlayerIndex,
    winner,
    activeQuiz,
    isRolling,
    maxIndex,
    resolveLanding,
  ]);

  // クイズ回答処理
  const handleAnswerQuiz = (selectedIdx: number) => {
    if (!activeQuiz || activeQuiz.isAnswered) return;

    const isCorrect = selectedIdx === activeQuiz.quiz.correctIndex;
    if (isCorrect) soundEffect.playCorrect();
    else soundEffect.playWrong();

    setActiveQuiz((prev) => (prev ? { ...prev, selectedIndex: selectedIdx, isAnswered: true } : null));

    const actingPlayer = players[activeQuiz.playerIndex];

    if (isCorrect) {
      const warpPos = Math.min(maxIndex, actingPlayer.pos + (activeQuiz.square.moveDelta || 3));
      setTimeout(() => {
        setPlayers((prev) =>
          prev.map((p, idx) =>
            idx === activeQuiz.playerIndex
              ? {
                  ...p,
                  pos: warpPos,
                  points: p.points + 200,
                  stamps: p.stamps.includes(SUGOROKU_BOARD[warpPos].countryCode)
                    ? p.stamps
                    : [...p.stamps, SUGOROKU_BOARD[warpPos].countryCode],
                }
              : p
          )
        );
        setActiveSquare(SUGOROKU_BOARD[warpPos]);
      }, 700);
    }
  };

  // クイズモーダルを閉じる
  const handleCloseQuiz = () => {
    if (!activeQuiz) return;
    const actingPlayer = players[activeQuiz.playerIndex];
    const finalPos = actingPlayer.pos;

    setActiveQuiz(null);

    if (finalPos >= maxIndex) {
      soundEffect.playCorrect();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setWinner(actingPlayer);
      setEventBanner(`🎉 ${actingPlayer.name} が世界一周ゴールを達成しました！`);
    } else {
      advanceToNextPlayer();
    }
  };

  // 各マスにいるプレイヤーたちをグループ化
  const playersBySquare = useMemo(() => {
    const map: Record<number, SugorokuPlayer[]> = {};
    players.forEach((p) => {
      if (!map[p.pos]) map[p.pos] = [];
      map[p.pos].push(p);
    });
    return map;
  }, [players]);

  // 連続する飛行ルートのSVGパス文字列を生成
  const routePathD = useMemo(() => {
    let d = "";
    for (let i = 0; i < SUGOROKU_BOARD.length - 1; i++) {
      const from = SUGOROKU_BOARD[i];
      const to = SUGOROKU_BOARD[i + 1];

      // イギリス(15)からカナダ(16)への大西洋横断フライト
      if (i === 15) {
        d += ` M ${from.mapX} ${from.mapY} Q 330 60 ${to.mapX} ${to.mapY}`;
      }
      // ブラジル(19)から日本ゴール(20)への太平洋横断フライト
      else if (i === 19) {
        d += ` M ${from.mapX} ${from.mapY} Q 600 590 ${to.mapX} ${to.mapY}`;
      } else {
        // 通常の近隣国間の移動
        const midX = (from.mapX + to.mapX) / 2;
        const midY = (from.mapY + to.mapY) / 2 - 15;
        d += ` M ${from.mapX} ${from.mapY} Q ${midX} ${midY} ${to.mapX} ${to.mapY}`;
      }
    }
    return d;
  }, []);

  // 順位ソート（ゴール結果用）
  const rankedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      if (winner && a.id === winner.id) return -1;
      if (winner && b.id === winner.id) return 1;
      if (b.pos !== a.pos) return b.pos - a.pos;
      if (b.points !== a.points) return b.points - a.points;
      return b.stamps.length - a.stamps.length;
    });
  }, [players, winner]);

  return (
    <div className="w-full max-w-4xl mx-auto min-h-screen bg-slate-900 text-slate-800 flex flex-col justify-between p-2 sm:p-4 select-none">
      {/* 1. ヘッダーバー */}
      <header className="flex items-center justify-between gap-2 mb-2 bg-slate-800/90 backdrop-blur-md p-2 rounded-2xl border border-slate-700">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>もどる</span>
        </button>

        {/* 人数・モード選択ドロップダウン */}
        <div className="relative">
          <button
            onClick={() => {
              soundEffect.playTap();
              setIsModeMenuOpen((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            <Users className="w-3.5 h-3.5" />
            <span>
              {mode === "multi_2" && "👥 2人対戦"}
              {mode === "multi_3" && "👥 3人対戦"}
              {mode === "multi_4" && "👥 4人対戦"}
              {mode === "vs_cpu" && "🤖 CPU対戦"}
              {mode === "solo" && "🎒 ひとり旅"}
            </span>
            <ChevronDown className="w-3 h-3 ml-0.5 opacity-80" />
          </button>

          {isModeMenuOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 w-44 bg-slate-800 border border-slate-700 rounded-2xl p-1.5 shadow-2xl z-50 flex flex-col gap-1 text-xs font-bold text-white">
              <button
                onClick={() => {
                  setMode("multi_2");
                  setIsModeMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  mode === "multi_2" ? "bg-indigo-600 text-white" : "hover:bg-slate-700"
                }`}
              >
                <span>👥</span> 2人対戦（1P vs 2P）
              </button>
              <button
                onClick={() => {
                  setMode("multi_3");
                  setIsModeMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  mode === "multi_3" ? "bg-indigo-600 text-white" : "hover:bg-slate-700"
                }`}
              >
                <span>👥</span> 3人対戦（1P〜3P）
              </button>
              <button
                onClick={() => {
                  setMode("multi_4");
                  setIsModeMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  mode === "multi_4" ? "bg-indigo-600 text-white" : "hover:bg-slate-700"
                }`}
              >
                <span>👥</span> 4人対戦（1P〜4P）
              </button>
              <div className="border-t border-slate-700 my-0.5" />
              <button
                onClick={() => {
                  setMode("vs_cpu");
                  setIsModeMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  mode === "vs_cpu" ? "bg-purple-600 text-white" : "hover:bg-slate-700"
                }`}
              >
                <span>🤖</span> CPU対戦レース
              </button>
              <button
                onClick={() => {
                  setMode("solo");
                  setIsModeMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  mode === "solo" ? "bg-emerald-600 text-white" : "hover:bg-slate-700"
                }`}
              >
                <span>🎒</span> ひとり世界旅
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEffect.playTap();
              setShowHelpModal(true);
            }}
            className="p-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white active:scale-95 transition-all shadow-xs cursor-pointer"
            title="あそびかた"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
          <button
            onClick={() => startNewGame(mode)}
            className="p-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white active:scale-95 transition-all shadow-xs cursor-pointer"
            title="はじめから"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* 2. プレイヤー状態一覧バー */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-2">
        {players.map((p, idx) => {
          const isTurn = idx === currentPlayerIndex && !winner;
          const currentSq = SUGOROKU_BOARD[p.pos] || SUGOROKU_BOARD[0];

          return (
            <div
              key={p.id}
              className={`rounded-2xl p-2 transition-all border ${
                isTurn
                  ? `bg-slate-800 ${p.theme.borderColor} ring-2 ${p.theme.ringColor} shadow-lg scale-[1.02]`
                  : "bg-slate-800/70 border-slate-700 opacity-80"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <div className="flex items-center gap-1 font-black text-white">
                  <span className="text-sm">{p.avatar}</span>
                  <span className={p.theme.textColor}>{p.name}</span>
                </div>
                {isTurn && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-white text-slate-900 animate-pulse">
                    番
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-300">
                <div className="flex items-center gap-1 truncate">
                  <span className="text-slate-400">現在地:</span>
                  <span className="text-white truncate">{currentSq.countryName.replace(/（.*）/, "")}</span>
                </div>
                <div className="text-amber-300 font-black shrink-0">{p.points}P</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. 世界地図すごろくボード */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-indigo-400/40 shadow-2xl bg-gradient-to-b from-sky-950 via-indigo-950 to-slate-950 select-none">
        {/* SVG 地図背景 ＆ 大陸 ＆ 飛行ルート */}
        <svg
          viewBox="0 0 1000 600"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <defs>
            {/* 海洋グラデーション */}
            <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0c2d48" />
              <stop offset="50%" stopColor="#145da0" />
              <stop offset="100%" stopColor="#0a192f" />
            </linearGradient>

            {/* 大陸グラデーション */}
            <linearGradient id="landAmericas" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#047857" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="landEurasia" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6d28d9" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="landAfrica" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient id="landOceania" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c2410c" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* 1. 経度・緯度線（グリッド） */}
          <g stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" strokeWidth="1">
            <line x1="0" y1="150" x2="1000" y2="150" />
            <line x1="0" y1="300" x2="1000" y2="300" strokeWidth="1.5" stroke="rgba(255,255,255,0.18)" />
            <line x1="0" y1="450" x2="1000" y2="450" />
            <line x1="250" y1="0" x2="250" y2="600" />
            <line x1="500" y1="0" x2="500" y2="600" />
            <line x1="750" y1="0" x2="750" y2="600" />
          </g>

          {/* 赤道ラベル */}
          <text
            x="30"
            y="295"
            fill="rgba(255,255,255,0.3)"
            fontSize="10"
            fontWeight="bold"
            letterSpacing="2"
          >
            EQUATOR / 赤道
          </text>

          {/* 2. スタイライズ大陸シルエット */}
          {/* 北アメリカ */}
          <path
            d="M 60 140 Q 110 70 200 65 Q 290 60 340 95 Q 310 135 270 145 Q 330 190 310 250 Q 270 260 255 300 Q 230 340 210 345 Q 180 310 170 255 Q 130 220 100 190 Z"
            fill="url(#landAmericas)"
            stroke="rgba(16,185,129,0.5)"
            strokeWidth="1.5"
          />
          {/* 南アメリカ */}
          <path
            d="M 215 345 Q 315 345 370 410 Q 390 475 330 530 Q 280 575 255 565 Q 225 480 215 395 Z"
            fill="url(#landAmericas)"
            stroke="rgba(16,185,129,0.5)"
            strokeWidth="1.5"
          />
          {/* ヨーロッパ */}
          <path
            d="M 425 105 Q 480 75 540 85 Q 570 115 545 180 Q 575 225 530 245 Q 455 245 435 190 Q 415 155 425 105 Z"
            fill="url(#landEurasia)"
            stroke="rgba(139,92,246,0.5)"
            strokeWidth="1.5"
          />
          {/* イギリス諸島 */}
          <path
            d="M 430 105 Q 450 100 455 125 Q 440 140 430 125 Z"
            fill="url(#landEurasia)"
            stroke="rgba(139,92,246,0.5)"
            strokeWidth="1.5"
          />
          {/* アフリカ */}
          <path
            d="M 465 245 Q 585 235 645 285 Q 670 355 640 430 Q 605 525 575 545 Q 535 495 495 420 Q 455 335 465 245 Z"
            fill="url(#landAfrica)"
            stroke="rgba(245,158,11,0.5)"
            strokeWidth="1.5"
          />
          {/* アジア・ユーラシア */}
          <path
            d="M 585 115 Q 755 65 945 85 Q 965 145 905 215 Q 865 255 845 315 Q 785 365 745 325 Q 705 365 675 305 Q 605 295 585 225 Z"
            fill="url(#landEurasia)"
            stroke="rgba(139,92,246,0.5)"
            strokeWidth="1.5"
          />
          {/* 日本列島 */}
          <path
            d="M 890 180 Q 925 185 930 215 Q 905 240 885 225 Z"
            fill="rgba(244,63,94,0.3)"
            stroke="rgba(244,63,94,0.7)"
            strokeWidth="1.5"
          />
          {/* オーストラリア・オセアニア */}
          <path
            d="M 795 425 Q 915 415 935 465 Q 925 545 835 545 Q 785 505 795 425 Z"
            fill="url(#landOceania)"
            stroke="rgba(249,115,22,0.5)"
            strokeWidth="1.5"
          />

          {/* 3. 海洋ラベル & コンパスローズ */}
          <text
            x="80"
            y="520"
            fill="rgba(255,255,255,0.2)"
            fontSize="14"
            fontWeight="black"
            letterSpacing="3"
          >
            PACIFIC OCEAN / 太平洋
          </text>
          <text
            x="360"
            y="260"
            fill="rgba(255,255,255,0.2)"
            fontSize="13"
            fontWeight="black"
            letterSpacing="3"
          >
            ATLANTIC / 大西洋
          </text>
          <text
            x="710"
            y="440"
            fill="rgba(255,255,255,0.2)"
            fontSize="13"
            fontWeight="black"
            letterSpacing="3"
          >
            INDIAN OCEAN / インド洋
          </text>

          {/* コンパスローズ装飾 */}
          <g transform="translate(80, 80) scale(0.65)" stroke="rgba(255,255,255,0.3)" fill="none">
            <circle cx="0" cy="0" r="30" strokeWidth="1" strokeDasharray="2 3" />
            <polygon points="0,-38 7,-10 38,0 10,7 0,38 -7,10 -38,0 -10,-7" fill="rgba(255,255,255,0.15)" strokeWidth="1" />
            <text x="-4" y="-42" fill="rgba(255,255,255,0.6)" fontSize="12" fontWeight="bold">N</text>
          </g>

          {/* 4. 飛行・航海ルートライン（点線） */}
          <path
            d={routePathD}
            fill="none"
            stroke="rgba(99,102,241,0.6)"
            strokeWidth="3.5"
            strokeDasharray="6 6"
          />
          <path
            d={routePathD}
            fill="none"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
          />

          {/* 飛行機アイコン（大西洋・太平洋横断） */}
          <g transform="translate(330, 85) rotate(190) scale(0.8)">
            <text x="-8" y="8" fontSize="18">✈️</text>
          </g>
          <g transform="translate(600, 560) rotate(-20) scale(0.8)">
            <text x="-8" y="8" fontSize="18">✈️</text>
          </g>
        </svg>

        {/* 4. マス・ノード群（HTML配置） */}
        {SUGOROKU_BOARD.map((sq) => {
          const isPlayerHere = players.some((p) => p.pos === sq.index);
          const isCurrentPlayerHere = currentPlayer && currentPlayer.pos === sq.index;

          return (
            <div
              key={sq.index}
              style={{
                left: `${(sq.mapX / 1000) * 100}%`,
                top: `${(sq.mapY / 600) * 100}%`,
              }}
              onClick={() => {
                soundEffect.playTap();
                setActiveSquare(sq);
                speech.speak(sq.countryName.replace(/（.*）/, ""));
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            >
              {/* マス本体バッジ */}
              <div
                className={`relative rounded-full transition-all duration-300 flex items-center justify-center ${
                  sq.index === 0 || sq.index === 20
                    ? "w-8 h-8 sm:w-10 sm:h-10 ring-2 ring-amber-300 shadow-lg shadow-amber-500/30"
                    : "w-6 h-6 sm:w-8 sm:h-8 ring-1.5 ring-white/90 shadow-md"
                } ${
                  isCurrentPlayerHere
                    ? "ring-4 ring-indigo-400 scale-125 z-20"
                    : "group-hover:scale-110 z-10"
                }`}
              >
                {/* 国旗画像 */}
                <img
                  src={getFlagUrl(sq.countryCode, 80)}
                  alt={sq.countryName}
                  className="w-full h-full rounded-full object-cover"
                />

                {/* 番号バッジ */}
                <span
                  className={`absolute -top-1.5 -left-1.5 px-1 min-w-[14px] h-[14px] sm:min-w-[16px] sm:h-[16px] rounded-full text-[9px] sm:text-[10px] font-black flex items-center justify-center shadow-xs ${
                    sq.index === 0 || sq.index === 20
                      ? "bg-amber-400 text-amber-950 font-black"
                      : sq.eventType === "quiz_warp"
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-900/90 text-white"
                  }`}
                >
                  {sq.index}
                </span>

                {/* イベントアイコン */}
                <span className="absolute -bottom-1 -right-1 text-[10px] sm:text-xs">
                  {sq.icon}
                </span>

                {/* 誰かがいる時のリング波紋 */}
                {isPlayerHere && (
                  <span className="absolute inset-0 rounded-full animate-ping ring-2 ring-indigo-300 opacity-75 pointer-events-none" />
                )}
              </div>

              {/* 国名ツールチップ（ホバーまたは選択時） */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 hidden group-hover:block whitespace-nowrap bg-slate-900/95 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700 shadow-md pointer-events-none z-30">
                {sq.countryName}
              </div>
            </div>
          );
        })}

        {/* 5. プレイヤーコマ（乗り物アバター） */}
        {players.map((p, pIdx) => {
          const sq = SUGOROKU_BOARD[p.pos] || SUGOROKU_BOARD[0];
          const playersOnSameSquare = playersBySquare[p.pos] || [];
          const sameIndex = playersOnSameSquare.findIndex((item) => item.id === p.id);

          // 同一マスに複数人いる場合のオフセット配置
          let offsetX = 0;
          let offsetY = -8;
          if (playersOnSameSquare.length > 1) {
            const offsets = [
              { x: -10, y: -16 },
              { x: 10, y: -16 },
              { x: -10, y: 4 },
              { x: 10, y: 4 },
            ];
            const applied = offsets[sameIndex % offsets.length];
            offsetX = applied.x;
            offsetY = applied.y;
          }

          const isCurrentTurn = pIdx === currentPlayerIndex && !winner;

          return (
            <div
              key={p.id}
              style={{
                left: `${(sq.mapX / 1000) * 100}%`,
                top: `${(sq.mapY / 600) * 100}%`,
                transform: `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`,
                transition: "left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              className={`absolute pointer-events-none z-30 flex flex-col items-center ${
                isCurrentTurn ? "animate-bounce" : ""
              }`}
            >
              {/* コマ丸バッジ */}
              <div
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${p.theme.pinBg} border-2 border-white shadow-xl flex items-center justify-center text-xs sm:text-sm font-black`}
              >
                {p.avatar}
              </div>
              {/* プレイヤー名タグ */}
              <span
                className={`mt-0.5 px-1 py-0.2 rounded text-[8px] sm:text-[9px] font-black text-white bg-slate-900/90 border ${p.theme.borderColor} shadow-xs whitespace-nowrap`}
              >
                {p.name.replace(/（.*）/, "")}
              </span>
            </div>
          );
        })}
      </div>

      {/* 4. 操作パネル＆アクティブマス情報 */}
      <div className="mt-2 bg-slate-800/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-700 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* 左側: 現在のマス情報・イベントメッセージ */}
        <div className="flex-1 w-full text-left">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                currentPlayer.theme.badgeBg
              }`}
            >
              {currentPlayer.avatar} {currentPlayer.name}の番
            </span>
            <span className="text-xs font-bold text-slate-400">
              第{turnCount}ターン
            </span>
          </div>

          <div className="text-xs sm:text-sm font-bold text-white leading-relaxed flex items-center gap-1.5">
            <span>{eventBanner}</span>
          </div>

          <div className="text-[11px] font-bold text-slate-400 mt-0.5 flex items-center gap-1.5">
            <span>止まっている国:</span>
            <span className="text-amber-300 font-black">
              {showRuby && activeSquare.countryRuby ? (
                <ruby>
                  {activeSquare.countryName}
                  <rp>(</rp>
                  <rt className="text-[9px] text-amber-200">{activeSquare.countryRuby}</rt>
                  <rp>)</rp>
                </ruby>
              ) : (
                activeSquare.countryName
              )}
              （{activeSquare.regionLabel}）
            </span>
            <span className="text-slate-500">|</span>
            <span>{activeSquare.eventDesc}</span>
          </div>
        </div>

        {/* 右側: サイコロボタン */}
        <div className="flex items-center gap-2 shrink-0">
          {diceValue !== null && (
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 border-2 border-amber-400 text-amber-300 font-black text-2xl shadow-inner animate-in zoom-in-75 duration-150">
              {diceValue}
            </div>
          )}

          <button
            onClick={handleRollDice}
            disabled={isRolling || Boolean(winner) || Boolean(activeQuiz) || currentPlayer.isCpu}
            className={`px-5 py-3 rounded-2xl font-black text-sm text-white shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r ${currentPlayer.theme.gradient}`}
          >
            <Dices className={`w-5 h-5 ${isRolling ? "animate-spin" : ""}`} />
            <span>
              {currentPlayer.isCpu
                ? "🤖 CPU考え中..."
                : isRolling
                ? "コロコロ..."
                : "サイコロをふる！"}
            </span>
          </button>
        </div>
      </div>

      {/* 5. 空港クイズモーダル */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-5 max-w-sm w-full shadow-2xl text-center text-white">
            <div className="inline-flex p-3 rounded-full bg-indigo-500/20 text-indigo-400 mb-2">
              <Plane className="w-8 h-8" />
            </div>

            <div className="text-[11px] font-black text-indigo-400 uppercase tracking-widest mb-1">
              ✈️ 空港クイズワープチャレンジ！
            </div>
            <h3 className="text-base font-black text-white">
              {players[activeQuiz.playerIndex]?.name} への問題！
            </h3>
            <p className="text-xs text-slate-300 font-bold mt-1">
              {activeQuiz.quiz.question}
            </p>

            {/* 選択肢ボタン */}
            <div className="my-4 space-y-2">
              {activeQuiz.quiz.options.map((opt, idx) => {
                const isSelected = activeQuiz.selectedIndex === idx;
                const isCorrect = idx === activeQuiz.quiz.correctIndex;

                let btnStyle = "bg-slate-800 hover:bg-slate-700 border-slate-700 text-white";
                if (activeQuiz.isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-600 border-emerald-400 text-white ring-2 ring-emerald-300";
                  } else if (isSelected) {
                    btnStyle = "bg-rose-600 border-rose-400 text-white";
                  } else {
                    btnStyle = "bg-slate-800/50 border-slate-700 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswerQuiz(idx)}
                    disabled={activeQuiz.isAnswered}
                    className={`w-full py-2.5 px-3 rounded-xl border-2 font-black text-xs transition-all cursor-pointer ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {activeQuiz.isAnswered && (
              <div className="animate-in fade-in duration-200">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-2.5 text-xs font-bold text-slate-300 mb-3 text-left">
                  {activeQuiz.selectedIndex === activeQuiz.quiz.correctIndex ? (
                    <span className="text-emerald-400 font-black block mb-0.5">
                      ⭕ 大正解！飛行機で +{activeQuiz.square.moveDelta}マス ワープ！
                    </span>
                  ) : (
                    <span className="text-rose-400 font-black block mb-0.5">
                      ❌ おしい！正解は「{activeQuiz.quiz.options[activeQuiz.quiz.correctIndex]}」でした！
                    </span>
                  )}
                  {activeQuiz.quiz.explanation}
                </div>

                <button
                  onClick={handleCloseQuiz}
                  className="w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-md cursor-pointer"
                >
                  つづける ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 6. ゴール優勝・ランキングモーダル */}
      {winner && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border-4 border-amber-400 text-center text-white">
            <div className="inline-flex p-3 rounded-full bg-amber-400/20 text-amber-300 mb-2">
              <Trophy className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-black text-amber-300">
              🎉 {winner.name} の優勝！
            </h3>
            <p className="text-xs font-bold text-slate-400 mt-1">
              世界一周（20マス・日本）をいち早く達成しました！おめでとう！
            </p>

            {/* 順位・成績一覧 */}
            <div className="my-4 space-y-2 text-left">
              {rankedPlayers.map((p, idx) => (
                <div
                  key={p.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl border ${
                    idx === 0
                      ? "bg-amber-500/10 border-amber-400/50"
                      : "bg-slate-800 border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black w-6 text-center">
                      {idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "4位"}
                    </span>
                    <span className="text-base">{p.avatar}</span>
                    <span className={`text-xs font-black ${p.theme.textColor}`}>
                      {p.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-slate-400">{p.pos}/20マス</span>
                    <span className="text-amber-300 font-black">{p.points}P</span>
                    <span className="text-emerald-400 font-black">
                      {p.stamps.length}カ国
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* 優勝者が集めたスタンプ一覧 */}
            <div className="mb-4">
              <div className="text-[11px] font-black text-slate-400 mb-1.5 text-left">
                🛂 {winner.name} が集めた国旗スタンプ
              </div>
              <div className="flex items-center gap-1.5 flex-wrap bg-slate-800 p-2.5 rounded-2xl border border-slate-700 max-h-24 overflow-y-auto">
                {winner.stamps.map((code) => (
                  <img
                    key={code}
                    src={getFlagUrl(code, 160)}
                    alt={code}
                    className="w-7 h-4.5 rounded border border-slate-600 object-cover shadow-2xs"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startNewGame(mode)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black text-xs shadow-md active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一回あそぶ</span>
              </button>
              <button
                onClick={onBack}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                メニューへ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. あそびかたルール説明モーダル */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border-2 border-indigo-400/60 rounded-3xl p-5 max-w-md w-full shadow-2xl text-left max-h-[90vh] overflow-y-auto text-white">
            <h3 className="text-lg font-black text-white mb-2 flex items-center gap-1.5">
              <span>🎲</span>
              <span>こっきすごろくのあそびかた</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300 font-medium">
              <p>
                スタートの日本からサイコロをふって世界地図を一周し、<strong className="text-amber-300 font-bold">20番マスの日本（ゴール）</strong>を目指すゲームです！
              </p>

              <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 space-y-2">
                <div className="font-bold text-white text-xs">👥 みんなで遊べるマルチプレイ:</div>
                <div className="space-y-1 text-[11px] text-slate-300">
                  <div>
                    <strong className="text-white">・2人〜4人対戦: </strong>
                    1台のスマホ・PCを囲んで、1P（赤🚗）、2P（青🚢）、3P（緑🚂）、4P（黄🚀）が交代でサイコロを振って勝負できます！
                  </div>
                  <div>
                    <strong className="text-white">・CPU対戦＆ひとり旅: </strong>
                    1人でもロボットと対戦したり、のんびり世界一周スタンプ集めができます。
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 p-3 rounded-2xl border border-slate-700 space-y-2">
                <div className="font-bold text-white text-xs">🗺️ 世界地図ルートとマスのポイント:</div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🧭</span>
                  <div>
                    <strong className="text-white">世界地図の旅ルート</strong>
                    <div className="text-[11px] text-slate-400">
                      日本 ➔ アジア ➔ オセアニア ➔ アフリカ ➔ ヨーロッパ ➔ 大西洋横断 ➔ アメリカ大陸 ➔ 太平洋横断 ➔ 日本ゴール！
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">✈️</span>
                  <div>
                    <strong className="text-indigo-400">空港クイズマス（大逆転ワープ！）</strong>
                    <div className="text-[11px] text-slate-400">
                      クイズに正解すると、飛行機に乗って一気に <strong>+3マス ワープ</strong> ＆ボーナス点！
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">⚡</span>
                  <div>
                    <strong className="text-amber-400">イベントマス</strong>
                    <div className="text-[11px] text-slate-400">
                      「特急列車で前進」「ピザ食べすぎで戻る」「気球に乗ってもう1回サイコロ」など楽しいハプニングが満載！
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🛂</span>
                  <div>
                    <strong className="text-emerald-400">国旗スタンプ</strong>
                    <div className="text-[11px] text-slate-400">
                      止まった国の国旗スタンプがパスポートに集まり、ゴール時に表彰されます！
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
              className="mt-4 w-full py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-sm cursor-pointer transition-colors"
            >
              わかった！
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
