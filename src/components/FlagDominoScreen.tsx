import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, Sparkles, Trophy, RotateCcw, Bot, Zap, PlusCircle, HelpCircle } from "lucide-react";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import {
  FLAG_ATTRIBUTES,
  getSharedAttributes,
  COLOR_LABELS,
  REGION_LABELS,
  type FlagAttribute,
  type SharedAttributeResult,
} from "../data/flagAttributes";

interface FlagDominoScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

type DominoMode = "combo" | "vs_cpu";

export const FlagDominoScreen: React.FC<FlagDominoScreenProps> = ({ onBack, showRuby = true }) => {
  const [mode, setMode] = useState<DominoMode>("combo");

  // ゲーム状態
  const [fieldCard, setFieldCard] = useState<FlagAttribute>(FLAG_ATTRIBUTES[0]);
  const [lastConnection, setLastConnection] = useState<SharedAttributeResult | null>(null);
  const [playerHand, setPlayerHand] = useState<FlagAttribute[]>([]);
  const [cpuHand, setCpuHand] = useState<FlagAttribute[]>([]);
  const [deck, setDeck] = useState<FlagAttribute[]>([]);
  const [chainHistory, setChainHistory] = useState<FlagAttribute[]>([]);

  // スコア・ステータス
  const [comboCount, setComboCount] = useState<number>(0);
  const [maxCombo, setMaxCombo] = useState<number>(0);
  const [isCpuTurn, setIsCpuTurn] = useState<boolean>(false);
  const [gameResult, setGameResult] = useState<"player_win" | "cpu_win" | "combo_end" | null>(null);
  const [infoMessage, setInfoMessage] = useState<string>("");
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // シャッフル山札の作成
  const createShuffledDeck = useCallback(() => {
    return [...FLAG_ATTRIBUTES].sort(() => Math.random() - 0.5);
  }, []);

  // ゲームの初期化
  const startNewGame = useCallback(
    (selectedMode: DominoMode = mode) => {
      soundEffect.playTap();
      const shuffled = createShuffledDeck();

      // 場の最初の1枚
      const initialField = shuffled.pop() || FLAG_ATTRIBUTES[0];
      setFieldCard(initialField);
      setLastConnection(null);
      setChainHistory([initialField]);
      setComboCount(0);
      setGameResult(null);
      setIsCpuTurn(false);

      if (selectedMode === "vs_cpu") {
        // プレイヤー5枚、CPU5枚
        const pHand = shuffled.splice(0, 5);
        const cHand = shuffled.splice(0, 5);
        setPlayerHand(pHand);
        setCpuHand(cHand);
        setDeck(shuffled);
        setInfoMessage("あなたのターン！出せる国旗を選んでね");
      } else {
        // コンボチャレンジ: プレイヤーに5枚
        const pHand = shuffled.splice(0, 5);
        setPlayerHand(pHand);
        setCpuHand([]);
        setDeck(shuffled);
        setInfoMessage("色（3色以上一致）や同じマークの国旗をつなげよう！");
      }
    },
    [mode, createShuffledDeck]
  );

  // 初回起動
  useEffect(() => {
    startNewGame(mode);
  }, [mode, startNewGame]);

  // 手札の中で出せるカードの判定
  const playableCardsIndices = useMemo(() => {
    return playerHand.map((card) => {
      const { canConnect } = getSharedAttributes(fieldCard, card);
      return canConnect;
    });
  }, [playerHand, fieldCard]);

  const hasPlayableCard = useMemo(() => {
    return playableCardsIndices.some(Boolean);
  }, [playableCardsIndices]);

  // プレイヤーがカードを出す
  const handlePlayCard = (card: FlagAttribute, index: number) => {
    if (isCpuTurn || gameResult) return;

    const connection = getSharedAttributes(fieldCard, card);
    if (!connection.canConnect) {
      soundEffect.playWrong();
      setInfoMessage(`「${card.name}」は場の「${fieldCard.name}」とつながりません❌（3色以上一致、または同じマークが必要です）`);
      return;
    }

    // 成功！
    soundEffect.playCorrect();
    const newHand = [...playerHand];
    newHand.splice(index, 1);

    setFieldCard(card);
    setLastConnection(connection);
    setChainHistory((prev) => [...prev.slice(-4), card]);

    if (mode === "combo") {
      // コンボモード
      const nextCombo = comboCount + 1;
      setComboCount(nextCombo);
      if (nextCombo > maxCombo) setMaxCombo(nextCombo);

      // 山札から1枚補充（常に5枚を維持）
      if (deck.length > 0) {
        const nextDeck = [...deck];
        const drawn = nextDeck.pop();
        if (drawn) {
          newHand.push(drawn);
          setDeck(nextDeck);
        }
      }
      setPlayerHand(newHand);

      // 次に出せるカードが手札にあるかチェック
      const nextPlayable = newHand.some((c) => getSharedAttributes(card, c).canConnect);
      if (!nextPlayable && deck.length === 0) {
        setGameResult("combo_end");
        soundEffect.playFanfare();
      } else if (!nextPlayable) {
        setInfoMessage(`ナイス！ ${nextCombo}連鎖！ 出せるカードがない時は「カードをひく」を押そう`);
      } else {
        setInfoMessage(`🔥 ${nextCombo}連鎖！ つぎの国旗を出そう！`);
      }
    } else {
      // CPU対戦モード
      setPlayerHand(newHand);

      // 勝利判定
      if (newHand.length === 0) {
        soundEffect.playFanfare();
        setGameResult("player_win");
        setInfoMessage("🎉 おめでとう！ あなたの勝ちです！");
        return;
      }

      // CPUのターンへ
      setIsCpuTurn(true);
      setInfoMessage("CPUが考え中...");
    }
  };

  // 山札からカードを引く
  const handleDrawCard = () => {
    if (isCpuTurn || gameResult) return;

    if (deck.length === 0) {
      if (mode === "combo") {
        setGameResult("combo_end");
        soundEffect.playFanfare();
      } else {
        // 山札がない場合はパスしてCPUへ
        setIsCpuTurn(true);
        setInfoMessage("山札がありません。CPUのターンへ交代！");
      }
      return;
    }

    soundEffect.playTap();
    const nextDeck = [...deck];
    const drawn = nextDeck.pop();
    if (!drawn) return;

    const newHand = [...playerHand, drawn];
    setPlayerHand(newHand);
    setDeck(nextDeck);

    if (mode === "combo") {
      // コンボ終了判定チェック
      const connection = getSharedAttributes(fieldCard, drawn);
      if (connection.canConnect) {
        setInfoMessage(`「${drawn.name}」を引いた！ すぐに出せるよ！`);
      } else {
        setInfoMessage(`「${drawn.name}」を引きました。`);
      }
    } else {
      // CPU対戦の場合、引いたらCPUのターンへ
      setIsCpuTurn(true);
      setInfoMessage(`「${drawn.name}」を引きました。CPUの番です！`);
    }
  };

  // CPU思考ロジック
  useEffect(() => {
    if (mode !== "vs_cpu" || !isCpuTurn || gameResult) return;

    const timer = setTimeout(() => {
      // 出せるカードを探す
      const playableCpuCards = cpuHand.filter((c) => getSharedAttributes(fieldCard, c).canConnect);

      if (playableCpuCards.length > 0) {
        // 出せるカードの中からランダムに選択
        const chosenCard = playableCpuCards[Math.floor(Math.random() * playableCpuCards.length)];
        const cardIdx = cpuHand.findIndex((c) => c.code === chosenCard.code);
        const connection = getSharedAttributes(fieldCard, chosenCard);

        const newCpuHand = [...cpuHand];
        newCpuHand.splice(cardIdx, 1);
        setCpuHand(newCpuHand);

        setFieldCard(chosenCard);
        setLastConnection(connection);
        setChainHistory((prev) => [...prev.slice(-4), chosenCard]);
        soundEffect.playCorrect();

        if (newCpuHand.length === 0) {
          soundEffect.playWrong();
          setGameResult("cpu_win");
          setInfoMessage("CPUの手札がなくなりました！ CPUの勝ち！");
        } else {
          setIsCpuTurn(false);
          setInfoMessage(`CPUが「${chosenCard.name}」を出した！ あなたの番です`);
        }
      } else {
        // CPUは出せないので山札から引く
        if (deck.length > 0) {
          const nextDeck = [...deck];
          const drawn = nextDeck.pop();
          if (drawn) {
            setCpuHand([...cpuHand, drawn]);
            setDeck(nextDeck);
            setInfoMessage("CPUは出せるカードがなく、山札から1枚引きました！");
          }
        } else {
          setInfoMessage("CPUは出せるカードがなく、パスしました！");
        }
        setIsCpuTurn(false);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [isCpuTurn, mode, cpuHand, fieldCard, deck, gameResult]);

  return (
    <div className="w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-indigo-50 via-slate-50 to-blue-50 flex flex-col justify-between p-3 sm:p-4 select-none">
      {/* 1. ヘッダーバー */}
      <header className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>もどる</span>
        </button>

        {/* モード切り替えタブ */}
        <div className="flex bg-slate-200/80 p-0.5 rounded-2xl text-xs font-black">
          <button
            onClick={() => {
              if (mode !== "combo") setMode("combo");
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              mode === "combo"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🔥 コンボ
          </button>
          <button
            onClick={() => {
              if (mode !== "vs_cpu") setMode("vs_cpu");
            }}
            className={`px-3 py-1 rounded-xl transition-all ${
              mode === "vs_cpu"
                ? "bg-indigo-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            🤖 CPU対戦
          </button>
        </div>

        {/* ルール説明モーダルボタン */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 active:scale-95 transition-all shadow-xs cursor-pointer"
          title="あそびかた"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </header>

      {/* 2. ステータスインフォバー */}
      <div className="w-full bg-white/90 backdrop-blur-xs rounded-2xl border border-indigo-100 p-2.5 shadow-xs mb-2 flex items-center justify-between">
        {mode === "combo" ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-xl font-black text-sm shadow-xs">
              <Zap className="w-4 h-4 fill-white" />
              <span>{comboCount} 連鎖！</span>
            </div>
            <div className="text-[11px] font-bold text-slate-500">
              最高: <span className="text-amber-600 font-black">{maxCombo}</span> 連鎖
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-700">
              <Bot className="w-4 h-4 text-indigo-500" />
              <span>CPU手札: <strong className="text-indigo-600 text-sm">{cpuHand.length}</strong> 枚</span>
            </div>
            {isCpuTurn && (
              <span className="text-[11px] font-black text-amber-600 animate-pulse bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                思考中...
              </span>
            )}
          </div>
        )}

        <div className="text-xs font-bold text-slate-500 flex items-center gap-1">
          <span>山札:</span>
          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg font-black">{deck.length}</span>
        </div>
      </div>

      {/* 3. CPU対戦時のCPU手札プレビュー */}
      {mode === "vs_cpu" && (
        <div className="flex justify-center gap-1 mb-2">
          {cpuHand.map((_, idx) => (
            <div
              key={idx}
              className="w-8 h-10 sm:w-10 sm:h-12 rounded-lg bg-gradient-to-br from-indigo-800 to-blue-900 border-2 border-indigo-300 shadow-xs flex items-center justify-center text-white/50 text-[10px] font-black"
            >
              🚩
            </div>
          ))}
        </div>
      )}

      {/* 4. 場の中央カード（メインテーブル） */}
      <div className="w-full flex-1 flex flex-col items-center justify-center py-2">
        {/* 直近のトレイン履歴 */}
        <div className="flex items-center gap-1 mb-1.5 opacity-70">
          <span className="text-[10px] font-bold text-slate-400 mr-1">これまでの国:</span>
          {chainHistory.map((c, i) => (
            <div
              key={i}
              className="w-6 h-4 rounded overflow-hidden border border-slate-300 bg-white shrink-0 shadow-2xs"
              title={c.name}
            >
              <img src={getFlagUrl(c.code, 160)} alt={c.name} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* 場の親カード */}
        <div className="relative bg-white rounded-3xl p-3 sm:p-4 shadow-xl border-4 border-indigo-400 flex flex-col items-center max-w-[280px] sm:max-w-[320px] w-full transition-all duration-300">
          <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-black shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>場の国旗（親カード）</span>
          </div>

          {/* 国旗画像 */}
          <div className="w-full h-32 sm:h-36 rounded-2xl overflow-hidden border-2 border-slate-100 bg-slate-50 flex items-center justify-center shadow-inner mt-1">
            <img
              src={getFlagUrl(fieldCard.code, 640)}
              alt={fieldCard.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* 国名 */}
          <div className="mt-2 text-center">
            {showRuby && <ruby className="text-[11px] font-bold text-slate-400 block">{fieldCard.ruby}</ruby>}
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">{fieldCard.name}</h2>
            <div className="flex items-center justify-center gap-1.5 mt-1 flex-wrap">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {REGION_LABELS[fieldCard.region]?.icon} {fieldCard.regionLabel}
              </span>
              {fieldCard.isIsland && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                  🏝️ 島国
                </span>
              )}
              {fieldCard.isLandlocked && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  🏔️ 内陸国
                </span>
              )}
            </div>
          </div>

          {/* つながった理由バッジ（直前の連鎖理由） */}
          {lastConnection && lastConnection.sharedReasons.length > 0 && (
            <div className="mt-2.5 w-full bg-emerald-50 border border-emerald-200 rounded-2xl p-2 text-center animate-in fade-in zoom-in-95 duration-200">
              <span className="text-[11px] font-black text-emerald-800 flex items-center justify-center gap-1 flex-wrap">
                <span>つながった！➔</span>
                {lastConnection.sharedReasons.map((r, i) => (
                  <span key={i} className="inline-flex items-center gap-0.5 bg-white px-2 py-0.5 rounded-md shadow-2xs border border-emerald-300 text-emerald-900">
                    <span>{r.icon}</span>
                    <span>{r.label}</span>
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>

        {/* 状態メッセージトースト */}
        <p className="mt-2 text-xs font-bold text-center text-slate-600 h-5">
          {infoMessage}
        </p>
      </div>

      {/* 5. プレイヤーの手札エリア */}
      <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-3 border-2 border-slate-200 shadow-lg">
        {/* 常時表示のルールガイドバー */}
        <div className="mb-2.5 bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50 border border-indigo-200 rounded-2xl px-3 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 flex-wrap">
            <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-2xs">
              ルール
            </span>
            <span className="text-[11px] sm:text-xs">
              🎨 <strong className="text-indigo-900">3色以上一致</strong>（2色旗は全色一致） または ⭐ <strong className="text-indigo-900">同じマーク</strong>
            </span>
          </div>
          <button
            onClick={() => setShowHelpModal(true)}
            className="text-[11px] text-indigo-600 hover:text-indigo-800 underline font-black shrink-0 ml-1 cursor-pointer"
          >
            くわしく
          </button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-700">
            <span>あなたのお手札:</span>
            <span className="text-indigo-600 text-sm font-black">{playerHand.length}枚</span>
            {hasPlayableCard ? (
              <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full animate-bounce">
                出せるカードがあります！
              </span>
            ) : (
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                山札から1枚引いてね
              </span>
            )}
          </div>

          {/* 山札から引くボタン */}
          <button
            onClick={handleDrawCard}
            disabled={isCpuTurn || !!gameResult}
            className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>カードをひく</span>
          </button>
        </div>

        {/* 手札カード横スクロールグリッド */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin">
          {playerHand.map((card, idx) => {
            const isPlayable = playableCardsIndices[idx];
            return (
              <button
                key={`${card.code}-${idx}`}
                onClick={() => handlePlayCard(card, idx)}
                disabled={isCpuTurn || !!gameResult}
                className={`group relative flex-shrink-0 w-24 sm:w-28 p-2 rounded-2xl border-2 transition-all duration-200 flex flex-col items-center text-left cursor-pointer active:scale-95 ${
                  isPlayable
                    ? "bg-white border-emerald-400 shadow-md shadow-emerald-200/50 hover:border-emerald-500 ring-2 ring-emerald-300 scale-102 animate-pulse hover:animate-none"
                    : "bg-slate-100/80 border-slate-200 opacity-60 hover:opacity-80"
                }`}
              >
                {/* 出せるバッジ */}
                {isPlayable && (
                  <span className="absolute -top-2 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-black shadow-xs">
                    出せる！
                  </span>
                )}

                {/* 国旗 */}
                <div className="w-full h-14 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center">
                  <img
                    src={getFlagUrl(card.code, 320)}
                    alt={card.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* 国名 */}
                <div className="mt-1 text-center w-full truncate">
                  {showRuby && <ruby className="text-[9px] font-bold text-slate-400 block truncate">{card.ruby}</ruby>}
                  <span className="text-xs font-black text-slate-800 block truncate">{card.name}</span>
                </div>

                {/* 色・地域ドットアイコン */}
                <div className="mt-1 flex items-center justify-center gap-0.5 flex-wrap">
                  {card.colors.slice(0, 3).map((col, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full ${COLOR_LABELS[col]?.bg || "bg-slate-400"} ring-1 ring-white`}
                      title={COLOR_LABELS[col]?.label}
                    />
                  ))}
                  <span className="text-[9px] text-slate-400 ml-0.5">{REGION_LABELS[card.region]?.icon}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. ゲーム終了・リザルトモーダル */}
      {gameResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border-2 border-indigo-200 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-3 shadow-inner">
              <Trophy className="w-8 h-8 fill-amber-400" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-1">
              {gameResult === "player_win" && "🎉 YOU WIN!"}
              {gameResult === "cpu_win" && "🤖 CPU WIN!"}
              {gameResult === "combo_end" && "🏁 連鎖終了！"}
            </h3>

            <p className="text-xs font-bold text-slate-500 mb-4">
              {gameResult === "player_win" && "見事に全ての手札を出し切りました！"}
              {gameResult === "cpu_win" && "今回はCPUの勝利！次は勝てるかな？"}
              {gameResult === "combo_end" && "つなげられるカードがなくなりました。"}
            </p>

            {mode === "combo" && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 mb-4">
                <span className="text-xs font-bold text-amber-800 block">今回の記録</span>
                <span className="text-3xl font-black text-amber-600">{comboCount}</span>
                <span className="text-xs font-bold text-amber-800 ml-1">連鎖</span>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => startNewGame(mode)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一回あそぶ</span>
              </button>
              <button
                onClick={onBack}
                className="px-4 py-3 rounded-2xl bg-slate-100 text-slate-700 font-bold text-sm hover:bg-slate-200 active:scale-95 transition-all cursor-pointer"
              >
                もどる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. あそびかたルール説明モーダル */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border-2 border-indigo-200 text-left">
            <h3 className="text-lg font-black text-slate-900 mb-2 flex items-center gap-1.5">
              <span>🀄</span>
              <span>こっきドミノのルール</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600 font-medium">
              <p>
                場に出ている国旗に対して、<strong className="text-indigo-600 font-bold">共通点がある国旗</strong>を手札から出していくゲームです！
              </p>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800 text-xs">つながる条件:</div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">🎨</span>
                  <div>
                    <strong className="text-slate-900">3色以上が一致</strong>
                    <div className="text-[11px] text-slate-500">赤・白・青など3色以上が同じならつながる！（2色国旗同士は全2色完全一致でOK）</div>
                  </div>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-base">⭐</span>
                  <div>
                    <strong className="text-slate-900">同じマーク・模様</strong>
                    <div className="text-[11px] text-slate-500">星、月、太陽、十字、しま模様（横/縦）、丸、動物など</div>
                  </div>
                </div>
                <div className="text-[11px] text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200 font-bold">
                  ⚠️ ※難易度調整のため、同じ地域（アジア同士など）だけではつながりません！
                </div>
              </div>
              <p>
                出せるカードはピカピカ光って教えてくれます！手札に出せるカードがない時は「カードをひく」ボタンを押そう。
              </p>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="mt-4 w-full py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-xs shadow-sm cursor-pointer"
            >
              わかった！
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
