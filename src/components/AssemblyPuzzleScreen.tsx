import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { ArrowLeft, RotateCcw, Sparkles, Trophy, ChevronRight, Lightbulb, Volume2 } from "lucide-react";
import { ASSEMBLY_STAGES, type AssemblyFlagStage, type AssemblyPart } from "../data/flagAssemblyData";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface AssemblyPuzzleScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

export const AssemblyPuzzleScreen: React.FC<AssemblyPuzzleScreenProps> = ({
  onBack,
  showRuby = true,
}) => {
  const [stageIndex, setStageIndex] = useState<number>(0);
  const stage: AssemblyFlagStage = ASSEMBLY_STAGES[stageIndex];

  // slotId -> partId
  const [placedParts, setPlacedParts] = useState<Record<string, string>>({});
  const [selectedPartId, setSelectedPartId] = useState<string | null>(null);
  const [wrongSlotId, setWrongSlotId] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // ステージ切り替え時の初期化
  useEffect(() => {
    setPlacedParts({});
    setSelectedPartId(null);
    setWrongSlotId(null);
    setIsCompleted(false);
  }, [stageIndex]);

  // パーツを選択したとき
  const handleSelectPart = (part: AssemblyPart) => {
    soundEffect.playTap();
    // 既に配置済みの場合は何もしない
    const alreadyPlaced = Object.values(placedParts).includes(part.id);
    if (alreadyPlaced) return;

    if (selectedPartId === part.id) {
      setSelectedPartId(null);
    } else {
      setSelectedPartId(part.id);
    }
  };

  // スロットをタップしたとき
  const handleSlotClick = (clickedSlotId: string) => {
    if (isCompleted) return;

    if (!selectedPartId) {
      soundEffect.playTap();
      return;
    }

    // クリックされたスロットを取得
    let targetSlot = stage.slots.find((s) => s.id === clickedSlotId);
    if (!targetSlot) return;

    // 前面・背面の重なり対策:
    // クリックされたスロットが既に埋まっている場合、または選択中のパーツと合わない場合、
    // 未配置のスロットの中に、現在選択中のパーツを求めているスロットがあればそちらをターゲットにする
    if (placedParts[targetSlot.id] || targetSlot.requiredPartId !== selectedPartId) {
      const matchSlot = stage.slots.find(
        (s) => s.requiredPartId === selectedPartId && !placedParts[s.id]
      );
      if (matchSlot) {
        targetSlot = matchSlot;
      }
    }

    // 正解チェック
    if (targetSlot.requiredPartId === selectedPartId && !placedParts[targetSlot.id]) {
      soundEffect.playCorrect();
      const nextPlaced = { ...placedParts, [targetSlot.id]: selectedPartId };
      setPlacedParts(nextPlaced);
      setSelectedPartId(null);
      setWrongSlotId(null);

      // 全てのスロットが埋まったか判定
      const allFilled = stage.slots.every((s) => !!nextPlaced[s.id]);
      if (allFilled) {
        setIsCompleted(true);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
        speech.speak(`せいかい！ ${stage.countryName}の国旗が完成！ ${stage.trivia}`);
      }
    } else {
      // 不正解
      soundEffect.playWrong();
      setWrongSlotId(targetSlot.id);
      setTimeout(() => setWrongSlotId(null), 800);
    }
  };

  // 次のステージへ
  const handleNextStage = () => {
    soundEffect.playTap();
    setStageIndex((prev) => (prev + 1) % ASSEMBLY_STAGES.length);
  };

  // リセット
  const handleReset = () => {
    soundEffect.playTap();
    setPlacedParts({});
    setSelectedPartId(null);
    setWrongSlotId(null);
    setIsCompleted(false);
  };

  // 音声読み上げ
  const handleSpeakTrivia = () => {
    soundEffect.playTap();
    speech.speak(`${stage.countryName}。${stage.trivia}`);
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 flex flex-col items-center min-h-[90vh]">
      {/* 上部ヘッダー */}
      <div className="w-full flex items-center justify-between mb-3">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>もどる</span>
        </button>

        {/* ステージ進捗バッジ */}
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-xs font-black text-amber-900">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>ステージ {stageIndex + 1} / {ASSEMBLY_STAGES.length}</span>
        </div>
      </div>

      {/* 国名カード */}
      <div className="w-full bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex items-center justify-between mb-3">
        <div>
          <div className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5" />
            国旗づくりパズル
          </div>
          <h2 className="text-xl font-black text-slate-800">
            {showRuby && stage.countryRuby ? (
              <ruby>
                {stage.countryName}
                <rt className="text-xs text-amber-600 font-normal">{stage.countryRuby}</rt>
              </ruby>
            ) : (
              stage.countryName
            )}
          </h2>
        </div>

        {/* ステージ切り替えセレクタ */}
        <select
          value={stageIndex}
          onChange={(e) => {
            soundEffect.playTap();
            setStageIndex(Number(e.target.value));
          }}
          className="bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-amber-500"
        >
          {ASSEMBLY_STAGES.map((stg, i) => (
            <option key={stg.id} value={i}>
              {i + 1}. {stg.countryName}
            </option>
          ))}
        </select>
      </div>

      {/* ヒント文表示 */}
      <div className="w-full bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5 flex items-start gap-2 mb-3 shadow-xs">
        <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs font-black text-amber-950 leading-relaxed">
          {stage.hint}
        </p>
      </div>

      {/* 国旗組み立てキャンバス */}
      <div
        className="relative w-full max-w-[340px] rounded-2xl shadow-lg border-4 border-white overflow-hidden select-none mb-4"
        onClick={() => {
          if (selectedPartId) {
            const matchSlot = stage.slots.find((s) => s.requiredPartId === selectedPartId && !placedParts[s.id]);
            if (matchSlot) handleSlotClick(matchSlot.id);
          }
        }}
        style={{
          aspectRatio: stage.aspectRatio || "3 / 2",
          backgroundColor: stage.baseBgColor,
        }}
      >
        {/* 背景SVG要素 (しま模様など) */}
        {stage.baseElementsSvg && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            dangerouslySetInnerHTML={{ __html: stage.baseElementsSvg }}
          />
        )}

        {/* スロット枠 */}
        {stage.slots.map((slot, idx) => {
          const placedPartId = placedParts[slot.id];
          const placedPart = stage.availableParts.find((p) => p.id === placedPartId);
          const isWrong = wrongSlotId === slot.id;
          const isFilled = !!placedPart;
          const layerIndex = slot.layer ?? (idx + 1);
          const zIndex = layerIndex * 10;

          return (
            <div
              key={slot.id}
              onClick={(e) => {
                e.stopPropagation();
                handleSlotClick(slot.id);
              }}
              className={`absolute cursor-pointer transition-all flex items-center justify-center ${
                isFilled
                  ? ""
                  : selectedPartId
                  ? "border-2 border-dashed border-amber-400 bg-amber-300/30 animate-pulse hover:bg-amber-300/50"
                  : "border-2 border-dashed border-slate-400/40 bg-black/5 hover:border-slate-500/60"
              } ${isWrong ? "ring-4 ring-rose-500 bg-rose-200/50 scale-105" : ""}`}
              style={{
                left: `${slot.xPercent - slot.widthPercent / 2}%`,
                top: `${slot.yPercent - slot.heightPercent / 2}%`,
                width: `${slot.widthPercent}%`,
                height: `${slot.heightPercent}%`,
                zIndex,
                borderRadius: slot.id.includes("circle") || slot.id.includes("globe") || slot.id.includes("sun") ? "50%" : slot.id.includes("canton") ? "0px" : "4px",
              }}
            >
              {/* 配置済みパーツ */}
              {placedPart ? (
                placedPart.svgContent ? (
                  <svg
                    viewBox={placedPart.viewBox || "0 0 100 100"}
                    preserveAspectRatio="none"
                    className="w-full h-full drop-shadow-xs"
                    dangerouslySetInnerHTML={{ __html: placedPart.svgContent }}
                  />
                ) : (
                  <span className="text-4xl">{placedPart.icon}</span>
                )
              ) : null}
            </div>
          );
        })}
      </div>

      {/* パーツトレイ */}
      <div className="w-full bg-white rounded-2xl p-3 shadow-sm border border-slate-100 mb-3">
        <div className="text-xs font-black text-slate-700 mb-2 flex items-center justify-between">
          <span>パーツをえらんで 旗に置こう！</span>
          {selectedPartId && (
            <span className="text-[10px] text-amber-600 font-bold animate-pulse">
              旗のわくをタップ！
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {stage.availableParts.map((part) => {
            const isPlaced = Object.values(placedParts).includes(part.id);
            const isSelected = selectedPartId === part.id;

            return (
              <button
                key={part.id}
                disabled={isPlaced}
                onClick={() => handleSelectPart(part)}
                className={`relative p-2 rounded-xl border-2 transition-all flex items-center gap-2 text-left active:scale-95 ${
                  isPlaced
                    ? "opacity-30 border-slate-100 bg-slate-50 cursor-not-allowed"
                    : isSelected
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300 shadow-md"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {/* ミニアイコン/SVG */}
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  {part.svgContent ? (
                    <svg
                      viewBox={part.viewBox || "0 0 100 100"}
                      className="w-8 h-8"
                      dangerouslySetInnerHTML={{ __html: part.svgContent }}
                    />
                  ) : (
                    <span className="text-2xl">{part.icon}</span>
                  )}
                </div>

                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-black text-slate-800 truncate">
                    {part.name}
                  </span>
                  {showRuby && part.ruby && (
                    <span className="text-[9px] text-slate-400 truncate">
                      {part.ruby}
                    </span>
                  )}
                </div>

                {isPlaced && (
                  <span className="absolute top-1 right-1 text-[10px] font-black text-emerald-600 bg-emerald-100 px-1 rounded">
                    OK
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 完成メッセージ or リセット */}
      {isCompleted ? (
        <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white text-center shadow-lg animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-center gap-1.5 font-black text-lg mb-1">
            <Trophy className="w-6 h-6 text-yellow-200" />
            <span>🎉 国旗が完成したよ！</span>
          </div>

          <p className="text-xs text-amber-100 font-bold mb-3 px-2 leading-relaxed">
            {stage.trivia}
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleSpeakTrivia}
              className="px-3.5 py-2 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <Volume2 className="w-4 h-4" />
              <span>声できく</span>
            </button>
            <button
              onClick={handleNextStage}
              className="px-5 py-2 bg-white text-orange-700 hover:bg-amber-50 active:scale-95 font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
            >
              <span>つぎのステージへ！</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 mt-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>はじめから やりなおす</span>
          </button>
        </div>
      )}
    </div>
  );
};
