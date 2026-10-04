import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ArrowLeft, Search, HelpCircle, RotateCcw, Award, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import {
  FLAG_ATTRIBUTES,
  AKINATOR_QUESTIONS,
  type FlagAttribute,
  type AkinatorQuestion,
} from "../data/flagAttributes";

interface FlagAkinatorScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

type QuestionCategory = "color" | "symbol" | "geo";

export const FlagAkinatorScreen: React.FC<FlagAkinatorScreenProps> = ({ onBack, showRuby = true }) => {
  const [boardSize, setBoardSize] = useState<16 | 20 | 24>(16);

  // ゲーム状態
  const [boardFlags, setBoardFlags] = useState<FlagAttribute[]>([]);
  const [targetFlag, setTargetFlag] = useState<FlagAttribute>(FLAG_ATTRIBUTES[0]);
  const [eliminatedCodes, setEliminatedCodes] = useState<Set<string>>(new Set());
  const [askedQuestionIds, setAskedQuestionIds] = useState<Set<string>>(new Set());
  const [questionCount, setQuestionCount] = useState<number>(0);

  // 質問カテゴリタブ
  const [activeCategory, setActiveCategory] = useState<QuestionCategory>("color");

  // 推理告発モード（ユーザーが直接カードを指名するモード）
  const [isAccuseMode, setIsAccuseMode] = useState<boolean>(false);

  // 最後の質問結果トースト
  const [lastAnswer, setLastAnswer] = useState<{ text: string; isYes: boolean; countEliminated: number } | null>(null);

  // ゲーム終了結果
  const [gameResult, setGameResult] = useState<"solved" | "failed" | null>(null);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // ゲーム初期化
  const startNewGame = useCallback((size: 16 | 20 | 24 = boardSize) => {
    soundEffect.playTap();
    // 全データからランダムに指定枚数を抽出
    const shuffled = [...FLAG_ATTRIBUTES].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, size);

    // ターゲット国をランダムに1つ決定
    const target = selected[Math.floor(Math.random() * selected.length)];

    setBoardFlags(selected);
    setTargetFlag(target);
    setEliminatedCodes(new Set());
    setAskedQuestionIds(new Set());
    setQuestionCount(0);
    setIsAccuseMode(false);
    setLastAnswer(null);
    setGameResult(null);
  }, [boardSize]);

  useEffect(() => {
    startNewGame(boardSize);
  }, [boardSize, startNewGame]);

  // 残りの生き残り国数
  const remainingFlags = useMemo(() => {
    return boardFlags.filter((f) => !eliminatedCodes.has(f.code));
  }, [boardFlags, eliminatedCodes]);

  // 質問を実行
  const handleAskQuestion = (q: AkinatorQuestion) => {
    if (askedQuestionIds.has(q.id) || gameResult) return;

    soundEffect.playTap();
    const newAsked = new Set(askedQuestionIds);
    newAsked.add(q.id);
    setAskedQuestionIds(newAsked);

    const nextQCount = questionCount + 1;
    setQuestionCount(nextQCount);

    // ターゲット国に対して質問を評価（YESかNOか）
    const isYes = q.evaluate(targetFlag);

    // 条件に合わない国を特定して除外
    const newlyEliminated: string[] = [];
    boardFlags.forEach((f) => {
      if (!eliminatedCodes.has(f.code)) {
        const flagMatches = q.evaluate(f);
        // isYesがtrueなら、合わない(flagMatchesがfalse)のを除外
        // isYesがfalseなら、当てはまる(flagMatchesがtrue)のを除外
        if (flagMatches !== isYes) {
          newlyEliminated.push(f.code);
        }
      }
    });

    const updatedEliminated = new Set(eliminatedCodes);
    newlyEliminated.forEach((c) => updatedEliminated.add(c));
    setEliminatedCodes(updatedEliminated);

    if (isYes) {
      soundEffect.playCorrect();
    } else {
      soundEffect.playWrong();
    }

    setLastAnswer({
      text: q.text,
      isYes,
      countEliminated: newlyEliminated.length,
    });

    // もし残り1カ国になったら自動で告発を促す
    if (boardFlags.length - updatedEliminated.size === 1) {
      setIsAccuseMode(true);
    }
  };

  // プレイヤーが国カードを直接タップ（推理告発）
  const handleSelectFlag = (flag: FlagAttribute) => {
    if (gameResult) return;

    if (flag.code === targetFlag.code) {
      // 大正解！
      soundEffect.playFanfare();
      setGameResult("solved");
    } else {
      // 不正解
      soundEffect.playWrong();
      // ペナルティとしてそのカードを除外して質問カウント+1
      const updated = new Set(eliminatedCodes);
      updated.add(flag.code);
      setEliminatedCodes(updated);
      setQuestionCount((c) => c + 1);
      setLastAnswer({
        text: `「${flag.name}」ではありませんでした！`,
        isYes: false,
        countEliminated: 1,
      });
    }
  };

  // 探偵ランク判定
  const detectiveRank = useMemo(() => {
    if (questionCount <= 3) return { rank: "S", title: "伝説の名探偵！👑", desc: "驚異の推理力！最小手数で暴きました" };
    if (questionCount <= 5) return { rank: "A", title: "ベテラン刑事！🕵️", desc: "鋭い洞察力で見事に特定しました" };
    if (questionCount <= 8) return { rank: "B", title: "一人前の探偵！🔎", desc: "着実に絞り込んで突き止めました" };
    return { rank: "C", title: "見習い捜査官！🌱", desc: "最後まで諦めずに暴き出しました" };
  }, [questionCount]);

  // カテゴリごとの質問リスト
  const currentCategoryQuestions = useMemo(() => {
    return AKINATOR_QUESTIONS.filter((q) => q.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full max-w-xl mx-auto min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col justify-between p-3 sm:p-4 select-none">
      {/* 1. ヘッダーバー */}
      <header className="flex items-center justify-between mb-2">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs hover:bg-slate-700 active:scale-95 transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>もどる</span>
        </button>

        {/* 候補数切り替え */}
        <div className="flex bg-slate-800 p-0.5 rounded-2xl text-[11px] font-black border border-slate-700">
          {([16, 20, 24] as const).map((size) => (
            <button
              key={size}
              onClick={() => {
                if (boardSize !== size) setBoardSize(size);
              }}
              className={`px-2.5 py-1 rounded-xl transition-all ${
                boardSize === size ? "bg-amber-500 text-slate-950 font-black shadow-xs" : "text-slate-400 hover:text-white"
              }`}
            >
              {size}国
            </button>
          ))}
        </div>

        {/* ヘルプモーダルボタン */}
        <button
          onClick={() => setShowHelpModal(true)}
          className="p-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 active:scale-95 transition-all cursor-pointer"
          title="あそびかた"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </header>

      {/* 2. 探偵ステータスバー */}
      <div className="w-full bg-slate-800/90 backdrop-blur-xs rounded-2xl border border-indigo-500/30 p-2.5 shadow-md mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-xl bg-amber-500/20 text-amber-400">🕵️</span>
          <div>
            <div className="text-[10px] font-bold text-slate-400">ターゲットの国を推理せよ！</div>
            <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span>しつもん: <strong className="text-white text-sm">{questionCount}</strong> 回</span>
              <span>•</span>
              <span>のこり: <strong className="text-emerald-400 text-sm">{remainingFlags.length}</strong> / {boardFlags.length} 国</span>
            </div>
          </div>
        </div>

        {/* 告発モード切替トグル */}
        <button
          onClick={() => {
            soundEffect.playTap();
            setIsAccuseMode((v) => !v);
          }}
          className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95 ${
            isAccuseMode
              ? "bg-gradient-to-r from-rose-500 to-red-600 text-white ring-2 ring-rose-400 animate-pulse shadow-md"
              : "bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xs"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>{isAccuseMode ? "推理をやめる" : "この国だ！🎯"}</span>
        </button>
      </div>

      {/* 最後の質問回答トースト */}
      {lastAnswer && (
        <div
          className={`mb-2 px-3 py-2 rounded-2xl border text-xs font-black flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-2 duration-200 ${
            lastAnswer.isYes
              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
              : "bg-rose-950/80 border-rose-500/50 text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {lastAnswer.isYes ? <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" /> : <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            <span className="leading-snug break-words text-[11px] sm:text-xs">{lastAnswer.text}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] font-black">
              {lastAnswer.isYes ? "YES! ⭕" : "NO! ❌"}
            </span>
            <span className="text-[10px] text-slate-400">({lastAnswer.countEliminated}国除外)</span>
          </div>
        </div>
      )}

      {/* 3. 国旗ボードグリッド */}
      <div className="w-full flex-1 min-h-0 bg-slate-950/60 rounded-3xl p-2 sm:p-2.5 border border-slate-800 shadow-inner flex flex-col justify-center overflow-y-auto mb-2">
        <div
          className={`grid gap-1.5 w-full ${
            boardSize === 16 ? "grid-cols-4" : boardSize === 20 ? "grid-cols-4 sm:grid-cols-5" : "grid-cols-4 sm:grid-cols-6"
          }`}
        >
          {boardFlags.map((flag) => {
            const isEliminated = eliminatedCodes.has(flag.code);
            return (
              <button
                key={flag.code}
                onClick={() => {
                  if (isAccuseMode && !isEliminated) {
                    handleSelectFlag(flag);
                  }
                }}
                disabled={isEliminated || !isAccuseMode}
                className={`relative p-1 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center text-center group ${
                  isEliminated
                    ? "bg-slate-900/40 border-slate-800/40 opacity-20 scale-90 blur-[0.5px] cursor-not-allowed"
                    : isAccuseMode
                    ? "bg-slate-800 border-rose-400 ring-2 ring-rose-400 hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-rose-950/50 animate-pulse"
                    : "bg-slate-800/90 border-slate-700 hover:border-slate-500 shadow-xs"
                }`}
              >
                {/* 国旗画像 */}
                <div className="w-full h-8 sm:h-11 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/60 flex items-center justify-center">
                  <img
                    src={getFlagUrl(flag.code, 160)}
                    alt={flag.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* 国名 */}
                <div className="mt-0.5 w-full truncate px-0.5">
                  {showRuby && <ruby className="text-[8px] text-slate-400 block truncate">{flag.ruby}</ruby>}
                  <span className="text-[10px] font-bold text-slate-200 block truncate leading-tight">
                    {flag.name}
                  </span>
                </div>

                {/* 除外バツ印マーク */}
                {isEliminated && (
                  <div className="absolute inset-0 flex items-center justify-center text-rose-500/60 text-2xl font-black pointer-events-none">
                    ✕
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* 告発モード時の案内バナー */}
        {isAccuseMode && (
          <div className="mt-2 text-center text-xs font-black text-rose-400 animate-pulse flex items-center justify-center gap-1">
            <Search className="w-3.5 h-3.5" />
            <span>ターゲットだと思う国旗カードをタップしてください！</span>
          </div>
        )}
      </div>

      {/* 4. 質問選択エリア */}
      <div className="w-full bg-slate-800/95 backdrop-blur-sm rounded-3xl p-2.5 sm:p-3 border border-slate-700 shadow-xl shrink-0">
        {/* カテゴリタブ切替 */}
        <div className="flex bg-slate-900 p-0.5 rounded-2xl text-xs font-black mb-2 border border-slate-700">
          <button
            onClick={() => setActiveCategory("color")}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 ${
              activeCategory === "color" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🎨</span>
            <span>色</span>
          </button>
          <button
            onClick={() => setActiveCategory("symbol")}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 ${
              activeCategory === "symbol" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>⭐</span>
            <span>マーク・模様</span>
          </button>
          <button
            onClick={() => setActiveCategory("geo")}
            className={`flex-1 py-1.5 rounded-xl transition-all flex items-center justify-center gap-1 ${
              activeCategory === "geo" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-400 hover:text-white"
            }`}
          >
            <span>🌍</span>
            <span>地域・特徴</span>
          </button>
        </div>

        {/* 質問リストボタン群 */}
        <div className="flex flex-col gap-1.5 max-h-40 sm:max-h-48 overflow-y-auto pr-1 scrollbar-thin">
          {currentCategoryQuestions.map((q) => {
            const isAsked = askedQuestionIds.has(q.id);
            return (
              <button
                key={q.id}
                onClick={() => handleAskQuestion(q)}
                disabled={isAsked || !!gameResult}
                className={`py-2 px-3 rounded-xl text-left text-xs sm:text-sm font-bold transition-all border flex items-center justify-between gap-2.5 cursor-pointer active:scale-98 group ${
                  isAsked
                    ? "bg-slate-900/60 border-slate-800 text-slate-500 line-through opacity-50 cursor-not-allowed"
                    : "bg-slate-700/80 hover:bg-slate-700 border-slate-600 text-slate-100 hover:border-indigo-400 shadow-2xs"
                }`}
              >
                <span className="flex-1 leading-snug break-words">{q.text}</span>
                {isAsked ? (
                  <span className="text-[10px] text-slate-500 shrink-0 font-medium px-2 py-0.5 rounded-md bg-slate-800">
                    質問済
                  </span>
                ) : (
                  <span className="text-[11px] text-indigo-300 group-hover:text-white shrink-0 font-bold bg-indigo-950/70 border border-indigo-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span>質問する</span>
                    <span className="text-xs">➔</span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. ゲームクリア・解決モーダル */}
      {gameResult && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border-2 border-amber-500/50 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-3xl mb-3 border border-amber-500/40">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-amber-400 mb-0.5">
              🎉 事件解決！
            </h3>
            <p className="text-xs font-bold text-slate-400 mb-3">
              ターゲットの国を見事に特定しました！
            </p>

            {/* 正解の国カードプレビュー */}
            <div className="bg-slate-800 rounded-2xl p-3 border border-slate-700 mb-4 flex items-center gap-3">
              <div className="w-20 h-14 rounded-lg overflow-hidden border border-slate-600 bg-slate-950 flex items-center justify-center shrink-0">
                <img
                  src={getFlagUrl(targetFlag.code, 320)}
                  alt={targetFlag.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-left">
                {showRuby && <ruby className="text-[10px] text-slate-400 block">{targetFlag.ruby}</ruby>}
                <div className="text-lg font-black text-white">{targetFlag.name}</div>
                <div className="text-[11px] text-slate-300 font-medium mt-0.5">{targetFlag.triviaShort}</div>
              </div>
            </div>

            {/* ランク評価 */}
            <div className="bg-gradient-to-r from-amber-950/60 to-slate-800 border border-amber-500/30 rounded-2xl p-3 mb-4 text-center">
              <div className="text-xs font-bold text-amber-300">探偵ランク</div>
              <div className="text-3xl font-black text-amber-400 my-0.5 flex items-center justify-center gap-1">
                <span>{detectiveRank.rank}</span>
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div className="text-xs font-bold text-white">{detectiveRank.title}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                しつもん回数: <strong className="text-amber-300">{questionCount}回</strong> （{detectiveRank.desc}）
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startNewGame(boardSize)}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-sm shadow-md active:scale-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>もう一問推理する</span>
              </button>
              <button
                onClick={onBack}
                className="px-4 py-3 rounded-2xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 active:scale-95 transition-all cursor-pointer border border-slate-700"
              >
                もどる
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. あそびかたルール説明モーダル */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 text-white rounded-3xl p-5 max-w-sm w-full shadow-2xl border border-slate-700 text-left">
            <h3 className="text-lg font-black text-amber-400 mb-2 flex items-center gap-1.5">
              <span>🕵️</span>
              <span>こっき探偵のルール</span>
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300 font-medium">
              <p>
                ボードの中に隠された**「秘密の国」**を質問で暴き出す推理ゲームです！
              </p>
              <div className="bg-slate-800 p-2.5 rounded-2xl border border-slate-700 space-y-1 text-slate-200">
                <div className="font-bold text-amber-300">推理のながれ:</div>
                <div>1. 下のメニューから「色」「マーク」「地域」の質問を選ぶ</div>
                <div>2. 条件に合わない国旗が**パタパタと倒れて除外**される</div>
                <div>3. 絞り込めたら「この国だ！🎯」を押して該当カードをタップ！</div>
              </div>
              <p className="text-slate-400">
                質問回数が少ないほど高い「探偵ランク（S・A・B・C）」が獲得できます。頭脳を駆使して最小手数を目指そう！
              </p>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="mt-4 w-full py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-xs shadow-sm cursor-pointer"
            >
              わかった！
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
