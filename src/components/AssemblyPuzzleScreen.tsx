import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { ArrowLeft, RotateCcw, Trophy, ChevronRight, Lightbulb, Volume2 } from "lucide-react";
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
  const canvasRef = useRef<HTMLDivElement>(null);

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
  const handleSlotClick = (clickedSlotId: string, event?: React.MouseEvent) => {
    if (isCompleted) return;

    if (!selectedPartId) {
      soundEffect.playTap();
      return;
    }

    let targetSlot = stage.slots.find((s) => s.id === clickedSlotId);
    if (!targetSlot) return;

    // クリックされたスロットが選択中のパーツのスロットと異なる場合:
    // 例: イギリスで「斜め十字」を置きたいのに、上のレイヤーの「聖ジョージ十字」のスロット（透明な枠）がクリックを拾ってしまった場合や、
    // ブラジルの天球儀とひし形のように重なっている場合、
    // 選択中のパーツに対応する未配置スロット（candidateSlot）が存在し、
    // クリック位置（またはスロット領域）がcandidateSlot内であれば、candidateSlotを優先ターゲットとする
    if (targetSlot.requiredPartId !== selectedPartId) {
      const candidateSlot = stage.slots.find(
        (s) => s.requiredPartId === selectedPartId && !placedParts[s.id]
      );
      if (candidateSlot) {
        let isMatch = false;
        if (event && canvasRef.current) {
          const rect = canvasRef.current.getBoundingClientRect();
          const clickX = ((event.clientX - rect.left) / rect.width) * 100;
          const clickY = ((event.clientY - rect.top) / rect.height) * 100;

          const cLeft = candidateSlot.xPercent - candidateSlot.widthPercent / 2;
          const cRight = candidateSlot.xPercent + candidateSlot.widthPercent / 2;
          const cTop = candidateSlot.yPercent - candidateSlot.heightPercent / 2;
          const cBottom = candidateSlot.yPercent + candidateSlot.heightPercent / 2;

          if (
            clickX >= cLeft - 3 &&
            clickX <= cRight + 3 &&
            clickY >= cTop - 3 &&
            clickY <= cBottom + 3
          ) {
            isMatch = true;
          }
        } else {
          // イベント情報がない場合はバウンディングボックスの重複判定
          const targetLeft = targetSlot.xPercent - targetSlot.widthPercent / 2;
          const targetRight = targetSlot.xPercent + targetSlot.widthPercent / 2;
          const targetTop = targetSlot.yPercent - targetSlot.heightPercent / 2;
          const targetBottom = targetSlot.yPercent + targetSlot.heightPercent / 2;

          const cLeft = candidateSlot.xPercent - candidateSlot.widthPercent / 2;
          const cRight = candidateSlot.xPercent + candidateSlot.widthPercent / 2;
          const cTop = candidateSlot.yPercent - candidateSlot.heightPercent / 2;
          const cBottom = candidateSlot.yPercent + candidateSlot.heightPercent / 2;

          const overlaps = !(
            targetRight < cLeft ||
            targetLeft > cRight ||
            targetBottom < cTop ||
            targetTop > cBottom
          );
          if (overlaps) {
            isMatch = true;
          }
        }

        if (isMatch) {
          targetSlot = candidateSlot;
        }
      }
    }

    // 正解判定: クリックされたスロットが、選択中パーツの指定スロットと一致しているか厳密にチェック
    if (targetSlot.requiredPartId === selectedPartId && !placedParts[targetSlot.id]) {
      // 正解！
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
      // 不正解！（違うスロットに置こうとした）
      soundEffect.playWrong();
      setWrongSlotId(targetSlot.id);
      setTimeout(() => setWrongSlotId(null), 800);
    }
  };

  // キャンバスの背景タップ時（スロット外タップのハンドリング）
  const handleCanvasClick = (event: React.MouseEvent) => {
    if (isCompleted || !selectedPartId) return;
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = ((event.clientX - rect.left) / rect.width) * 100;
      const clickY = ((event.clientY - rect.top) / rect.height) * 100;

      const candidateSlot = stage.slots.find(
        (s) => s.requiredPartId === selectedPartId && !placedParts[s.id]
      );
      if (candidateSlot) {
        const cLeft = candidateSlot.xPercent - candidateSlot.widthPercent / 2;
        const cRight = candidateSlot.xPercent + candidateSlot.widthPercent / 2;
        const cTop = candidateSlot.yPercent - candidateSlot.heightPercent / 2;
        const cBottom = candidateSlot.yPercent + candidateSlot.heightPercent / 2;

        if (
          clickX >= cLeft - 3 &&
          clickX <= cRight + 3 &&
          clickY >= cTop - 3 &&
          clickY <= cBottom + 3
        ) {
          handleSlotClick(candidateSlot.id, event);
          return;
        }
      }
    }
    soundEffect.playWrong();
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
    <div className="w-full max-w-md mx-auto px-3 py-1.5 sm:py-3 flex flex-col items-center">
      {/* 上部統合コントロールバー */}
      <div className="w-full bg-white/95 backdrop-blur-xs rounded-2xl px-3 py-2 shadow-xs border border-slate-100 flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={() => {
              soundEffect.playTap();
              onBack();
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">もどる</span>
          </button>
          <div className="min-w-0">
            <h2 className="text-base sm:text-lg font-black text-slate-800 leading-tight truncate">
              {showRuby && stage.countryRuby ? (
                <ruby>
                  {stage.countryName}
                  <rt className="text-[10px] text-amber-600 font-normal">{stage.countryRuby}</rt>
                </ruby>
              ) : (
                stage.countryName
              )}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <select
            value={stageIndex}
            onChange={(e) => {
              soundEffect.playTap();
              setStageIndex(Number(e.target.value));
            }}
            className="bg-slate-100 border-none text-slate-700 font-bold text-xs rounded-lg px-2 py-1 focus:ring-2 focus:ring-amber-400 max-w-[120px] sm:max-w-[140px] truncate"
          >
            {ASSEMBLY_STAGES.map((stg, i) => (
              <option key={stg.id} value={i}>
                {i + 1}. {stg.countryName}
              </option>
            ))}
          </select>
          <div className="bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg text-[11px] font-black text-amber-900 shrink-0">
            {stageIndex + 1}/{ASSEMBLY_STAGES.length}
          </div>
        </div>
      </div>

      {/* ヒント文表示 */}
      <div className="w-full bg-amber-50/80 border border-amber-200/80 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5 mb-2 shadow-xs">
        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
        <p className="text-[11px] sm:text-xs font-bold text-amber-950 leading-tight truncate">
          {stage.hint}
        </p>
      </div>

      {/* 国旗組み立てキャンバス */}
      <div
        ref={canvasRef}
        onClick={(e) => {
          if (selectedPartId) {
            handleCanvasClick(e);
          }
        }}
        className="relative rounded-xl shadow-md border-2 border-white overflow-hidden select-none mb-2 mx-auto"
        style={{
          width: `min(100%, calc(min(25vh, 180px) * (${stage.aspectRatio || "3 / 2"})))`,
          aspectRatio: stage.aspectRatio || "3 / 2",
          backgroundColor: stage.baseBgColor,
        }}
      >
        {/* 背景SVG要素 (しま模様など) */}
        {stage.baseElementsSvg && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={stage.baseViewBox || "0 0 100 100"}
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
                handleSlotClick(slot.id, e);
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
                    preserveAspectRatio={placedPart.preserveAspectRatio || "none"}
                    className="w-full h-full drop-shadow-xs"
                    dangerouslySetInnerHTML={{ __html: placedPart.svgContent }}
                  />
                ) : (
                  <span className="text-3xl">{placedPart.icon}</span>
                )
              ) : null}
            </div>
          );
        })}
      </div>

      {/* パーツトレイ */}
      <div className="w-full bg-white rounded-xl p-2 shadow-xs border border-slate-100 mb-2">
        <div className="text-[11px] font-black text-slate-700 mb-1.5 flex items-center justify-between">
          <span>パーツをえらんで 旗に置こう！</span>
          {selectedPartId && (
            <span className="text-[10px] text-amber-600 font-bold animate-pulse">
              旗のわくをタップ！
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
          {stage.availableParts.map((part) => {
            const isPlaced = Object.values(placedParts).includes(part.id);
            const isSelected = selectedPartId === part.id;

            return (
              <button
                key={part.id}
                disabled={isPlaced}
                onClick={() => handleSelectPart(part)}
                className={`relative p-1.5 rounded-lg border-2 transition-all flex items-center gap-1.5 text-left active:scale-95 ${
                  isPlaced
                    ? "opacity-30 border-slate-100 bg-slate-50 cursor-not-allowed"
                    : isSelected
                    ? "border-amber-500 bg-amber-50 ring-2 ring-amber-300 shadow-xs"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {/* ミニアイコン/SVG */}
                <div className="w-8 h-8 rounded-md border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden" style={{ backgroundColor: stage.baseBgColor === "#ffffff" ? "#f1f5f9" : stage.baseBgColor }}>
                  {part.traySvgContent || part.svgContent ? (
                    <svg
                      viewBox={part.trayViewBox || part.viewBox || "0 0 100 100"}
                      className="w-6 h-6"
                      dangerouslySetInnerHTML={{ __html: part.traySvgContent || part.svgContent || "" }}
                    />
                  ) : (
                    <span className="text-xl">{part.icon}</span>
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
                  <span className="absolute top-1 right-1 text-[9px] font-black text-emerald-600 bg-emerald-100 px-1 rounded">
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
        <div className="w-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-3 text-white text-center shadow-md animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-center gap-1.5 font-black text-sm mb-1">
            <Trophy className="w-4 h-4 text-yellow-200" />
            <span>🎉 国旗が完成したよ！</span>
          </div>

          <p className="text-[11px] text-amber-100 font-bold mb-2 px-2 leading-tight">
            {stage.trivia}
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleSpeakTrivia}
              className="px-2.5 py-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>声できく</span>
            </button>
            <button
              onClick={handleNextStage}
              className="px-4 py-1.5 bg-white text-orange-700 hover:bg-amber-50 active:scale-95 font-black text-xs rounded-lg flex items-center gap-1 transition-all shadow-xs"
            >
              <span>つぎへ！</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 mt-1">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>やりなおす</span>
          </button>
        </div>
      )}
    </div>
  );
};
