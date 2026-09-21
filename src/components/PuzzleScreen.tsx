import React, { useState, useEffect, useCallback, useRef } from "react";
import confetti from "canvas-confetti";
import { ArrowLeft, RotateCcw, HelpCircle, Eye, EyeOff, Trophy, ChevronRight, Shuffle } from "lucide-react";
import { COUNTRIES } from "../data/countries";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";
import { checkEquivalentTiles } from "../utils/puzzleEquivalence";
import type { Country } from "../types";

interface PuzzleScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

// パズルボード上のマウス/タッチ座標から対応するタイルのインデックスを算出する
const getTileIdxFromCoord = (
  clientX: number,
  clientY: number,
  boardEl: HTMLElement,
  size: number
): number | null => {
  const rect = boardEl.getBoundingClientRect();
  if (
    clientX < rect.left ||
    clientX > rect.right ||
    clientY < rect.top ||
    clientY > rect.bottom
  ) {
    return null;
  }
  const relX = clientX - rect.left;
  const relY = clientY - rect.top;
  const col = Math.floor((relX / rect.width) * size);
  const row = Math.floor((relY / rect.height) * size);
  if (col >= 0 && col < size && row >= 0 && row < size) {
    return row * size + col;
  }
  return null;
};

export const PuzzleScreen: React.FC<PuzzleScreenProps> = ({ onBack, showRuby = true }) => {
  const [gridSize, setGridSize] = useState<2 | 3 | 4>(3); // 2x2, 3x3, or 4x4
  const [country, setCountry] = useState<Country>(() => {
    const initial = COUNTRIES.find((c) => c.code === "jp") || COUNTRIES[0];
    return initial;
  });

  // 各タイルの現在の位置: インデックス i に入っているタイルの「本来の番号」
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showModel, setShowModel] = useState<boolean>(true);

  // 同一絵柄・同色ピースの等価判定マトリクス (matrix[pieceVal][slotIdx] === true なら視覚的に同色・正解扱い)
  const [equivMatrix, setEquivMatrix] = useState<boolean[][]>([]);

  // ドラッグ＆ドロップ状態管理
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [ghostSize, setGhostSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const boardRef = useRef<HTMLDivElement>(null);
  const justDraggedRef = useRef<boolean>(false);

  const flagImgUrl = getFlagUrl(country.code, 640);

  // タイルがそのスロットで視覚的に合っているか判定（本来の位置 または 同一絵柄・同色位置）
  const isTileCorrect = useCallback(
    (pieceVal: number, slotIdx: number, matrix: boolean[][] = equivMatrix) => {
      if (pieceVal === slotIdx) return true;
      if (matrix[pieceVal] && matrix[pieceVal][slotIdx]) return true;
      return false;
    },
    [equivMatrix]
  );

  // 全体が完成しているか判定
  const checkSolved = useCallback(
    (tilesList: number[], matrix: boolean[][] = equivMatrix) => {
      if (tilesList.length === 0) return false;
      return tilesList.every((val, slotIdx) => isTileCorrect(val, slotIdx, matrix));
    },
    [isTileCorrect, equivMatrix]
  );

  // 画像から等価ピースマトリクスを解析し、パズルを初期化（依存配列なしで無限ループを完全防止）
  const initPuzzle = useCallback(
    async (targetCountry: Country, size: 2 | 3 | 4) => {
      const count = size * size;
      const imgUrl = getFlagUrl(targetCountry.code, 640);

      // 同一絵柄・同色のピース判定をCanvasから事前解析
      const matrix = await checkEquivalentTiles(imgUrl, size);
      setEquivMatrix(matrix);

      const initial = Array.from({ length: count }, (_, i) => i);
      let shuffled: number[];
      let attempts = 0;
      do {
        shuffled = [...initial].sort(() => Math.random() - 0.5);
        attempts++;
      } while (
        attempts < 30 &&
        shuffled.every((val, slotIdx) => {
          if (val === slotIdx) return true;
          if (matrix[val] && matrix[val][slotIdx]) return true;
          return false;
        })
      );

      setTiles(shuffled);
      setSelectedIdx(null);
      setMoves(0);
      setIsCompleted(false);
    },
    []
  );

  useEffect(() => {
    initPuzzle(country, gridSize);
  }, [country.code, gridSize, initPuzzle]);

  // 2つのタイルを入れ替える共通処理
  const swapTiles = useCallback(
    (fromIdx: number, toIdx: number) => {
      if (fromIdx === toIdx || fromIdx < 0 || toIdx < 0) return;

      setTiles((prevTiles) => {
        const nextTiles = [...prevTiles];
        const temp = nextTiles[fromIdx];
        nextTiles[fromIdx] = nextTiles[toIdx];
        nextTiles[toIdx] = temp;

        // 完成判定（同一絵柄ピースの等価位置も正解とみなす）
        const solved = checkSolved(nextTiles);
        if (solved) {
          setIsCompleted(true);
          soundEffect.playCorrect();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          speech.speak(`せいかい！ ${country.name}の国旗が完成したよ！`);
        }

        return nextTiles;
      });

      setSelectedIdx(null);
      setMoves((m) => m + 1);
      soundEffect.playTap();
    },
    [country.name, checkSolved]
  );

  // タイルタップ時の選択/入れ替え処理（クリック/タップ操作）
  const handleTileClick = useCallback(
    (index: number) => {
      if (isCompleted) return;

      if (selectedIdx === null) {
        soundEffect.playTap();
        setSelectedIdx(index);
      } else if (selectedIdx === index) {
        soundEffect.playTap();
        setSelectedIdx(null);
      } else {
        swapTiles(selectedIdx, index);
      }
    },
    [isCompleted, selectedIdx, swapTiles]
  );

  // --- ポインター操作（マウスドラッグ＆スマホ・タブレットのタッチスワイプ共通） ---
  const handlePointerDown = (e: React.PointerEvent, idx: number) => {
    if (isCompleted) return;
    if (e.button !== undefined && e.button > 0) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const tileEl = e.currentTarget as HTMLElement;
    const rect = tileEl.getBoundingClientRect();
    setGhostSize({ width: rect.width, height: rect.height });

    let hasDragged = false;
    let currentTargetIdx: number | null = idx;

    setDraggedIdx(idx);
    setHoveredIdx(idx);
    setDragPos({ x: startX, y: startY });
    setIsDragging(false);

    const onPointerMove = (moveEvt: PointerEvent) => {
      const dist = Math.hypot(moveEvt.clientX - startX, moveEvt.clientY - startY);
      if (dist > 6) {
        hasDragged = true;
        setIsDragging(true);
      }

      if (hasDragged) {
        setDragPos({ x: moveEvt.clientX, y: moveEvt.clientY });

        if (boardRef.current) {
          const target = getTileIdxFromCoord(moveEvt.clientX, moveEvt.clientY, boardRef.current, gridSize);
          currentTargetIdx = target;
          setHoveredIdx(target);
        }
      }
    };

    const onPointerUp = (upEvt: PointerEvent) => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);

      if (hasDragged) {
        justDraggedRef.current = true;
        setTimeout(() => {
          justDraggedRef.current = false;
        }, 150);

        let finalTarget = currentTargetIdx;
        if (boardRef.current) {
          finalTarget = getTileIdxFromCoord(upEvt.clientX, upEvt.clientY, boardRef.current, gridSize);
        }
        if (finalTarget !== null && finalTarget !== idx) {
          swapTiles(idx, finalTarget);
        }
      }

      setDraggedIdx(null);
      setHoveredIdx(null);
      setDragPos(null);
      setIsDragging(false);
    };

    const onPointerCancel = () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerCancel);
      setDraggedIdx(null);
      setHoveredIdx(null);
      setDragPos(null);
      setIsDragging(false);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerCancel);
  };

  const handleTileClickWrapper = (idx: number) => {
    if (justDraggedRef.current) return;
    handleTileClick(idx);
  };

  // ランダムな次の国を選ぶ
  const handleRandomCountry = () => {
    soundEffect.playTap();
    const otherCountries = COUNTRIES.filter((c) => c.code !== country.code);
    const randomOne = otherCountries[Math.floor(Math.random() * otherCountries.length)];
    setCountry(randomOne);
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
              {showRuby && country.ruby ? (
                <ruby>
                  {country.name}
                  <rt className="text-[10px] text-indigo-500 font-normal">{country.ruby}</rt>
                </ruby>
              ) : (
                country.name
              )}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <select
            value={country.code}
            onChange={(e) => {
              const selected = COUNTRIES.find((c) => c.code === e.target.value);
              if (selected) {
                soundEffect.playTap();
                setCountry(selected);
              }
            }}
            className="bg-slate-100 border-none text-slate-700 font-bold text-xs rounded-lg px-2 py-1 focus:ring-2 focus:ring-indigo-400 max-w-[110px] sm:max-w-[130px] truncate"
            title="国をえらぶ"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleRandomCountry}
            className="px-2 py-1 bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-700 font-black text-xs rounded-lg flex items-center gap-1 transition-all border border-indigo-200 shrink-0"
            title="ランダムにつぎの国へ"
          >
            <Shuffle className="w-3 h-3" />
            <span>つぎ</span>
          </button>
        </div>
      </div>

      {/* サブバー（難易度切替・手数・ヒント・おてほんを1行に統合） */}
      <div className="w-full bg-slate-100/90 rounded-xl px-2 py-1 flex items-center justify-between gap-1 mb-2 text-xs">
        {/* グリッドサイズ切り替え */}
        <div className="flex bg-white/80 p-0.5 rounded-lg text-[11px] font-black shrink-0 shadow-2xs">
          <button
            onClick={() => {
              soundEffect.playTap();
              setGridSize(2);
            }}
            className={`px-1.5 py-0.5 rounded transition-all ${
              gridSize === 2 ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            2×2
          </button>
          <button
            onClick={() => {
              soundEffect.playTap();
              setGridSize(3);
            }}
            className={`px-1.5 py-0.5 rounded transition-all ${
              gridSize === 3 ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            3×3
          </button>
          <button
            onClick={() => {
              soundEffect.playTap();
              setGridSize(4);
            }}
            className={`px-1.5 py-0.5 rounded transition-all ${
              gridSize === 4 ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            4×4
          </button>
        </div>

        {/* 手数 */}
        <span className="text-[11px] font-bold text-slate-500 shrink-0">
          てすう: <strong className="text-indigo-600 font-black">{moves}</strong>
        </span>

        {/* ヒント & おてほん */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => {
              soundEffect.playTap();
              setShowHint((v) => !v);
            }}
            className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-bold border transition-all ${
              showHint ? "bg-amber-100 border-amber-300 text-amber-900" : "bg-white border-slate-200 text-slate-600"
            }`}
          >
            <HelpCircle className="w-3 h-3" />
            <span>ヒント:{showHint ? "ON" : "OFF"}</span>
          </button>

          <button
            onClick={() => {
              soundEffect.playTap();
              setShowModel((v) => !v);
            }}
            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-bold border transition-all ${
              showModel ? "bg-indigo-100 border-indigo-300 text-indigo-800" : "bg-white border-slate-200 text-slate-600"
            }`}
          >
            {showModel ? (
              <>
                <img
                  src={flagImgUrl}
                  alt={country.name}
                  className="h-4 w-6 object-cover rounded-xs border border-white shrink-0"
                />
                <EyeOff className="w-3 h-3" />
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" />
                <span>おてほん</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* パズルボード */}
      <div
        ref={boardRef}
        className="relative w-full max-w-[260px] sm:max-w-[300px] max-h-[29vh] aspect-[3/2] bg-slate-200 rounded-xl p-1 shadow-md border-2 border-slate-300 overflow-hidden select-none touch-none mb-2"
      >
        <div
          className="w-full h-full grid gap-0.5 sm:gap-1 rounded-lg overflow-hidden"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`,
          }}
        >
          {tiles.map((pieceVal, idx) => {
            const origRow = Math.floor(pieceVal / gridSize);
            const origCol = pieceVal % gridSize;
            const isSelected = selectedIdx === idx;
            const isCorrect = isTileCorrect(pieceVal, idx);
            const isThisDragging = isDragging && draggedIdx === idx;
            const isThisHovered = isDragging && hoveredIdx === idx && draggedIdx !== idx;

            // background-positionの計算 (2x2: step 100%, 3x3: step 50%, 4x4: step 33.333%)
            const step = gridSize > 1 ? 100 / (gridSize - 1) : 0;
            const posX = origCol * step;
            const posY = origRow * step;
            const bgSize = `${gridSize * 100}% ${gridSize * 100}%`;

            return (
              <div
                key={idx}
                data-tile-idx={idx}
                onPointerDown={(e) => handlePointerDown(e, idx)}
                onClick={() => handleTileClickWrapper(idx)}
                className={`relative cursor-grab active:cursor-grabbing transition-all duration-150 rounded-lg overflow-hidden flex items-center justify-center select-none touch-none ${
                  isThisDragging
                    ? "opacity-25 scale-95 border-2 border-dashed border-indigo-500"
                    : isThisHovered
                    ? "ring-4 ring-indigo-500 scale-105 z-20 shadow-xl brightness-110"
                    : isSelected
                    ? "ring-4 ring-amber-400 scale-[0.96] z-10 shadow-lg"
                    : "hover:opacity-95 active:scale-95"
                } ${isCorrect && isCompleted ? "ring-0" : ""}`}
                style={{
                  backgroundImage: `url("${flagImgUrl}")`,
                  backgroundSize: bgSize,
                  backgroundPosition: `${posX}% ${posY}%`,
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* 番号ヒント */}
                {showHint && !isCompleted && (
                  <span className="absolute top-1 left-1 bg-black/60 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {pieceVal + 1}
                  </span>
                )}

                {/* 正解位置に入っている目印（同色・同一絵柄の等価位置でも点灯） */}
                {isCorrect && !isCompleted && (
                  <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white shadow-xs" />
                )}
              </div>
            );
          })}
        </div>

        {/* 操作ガイド案内 */}
        {!isCompleted && moves === 0 && (
          <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
            <span className="bg-black/75 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
              ピースをドラッグして いれかえよう！
            </span>
          </div>
        )}
      </div>

      {/* ドラッグ中の浮遊プレビュー（ゴーストピース） */}
      {isDragging && draggedIdx !== null && dragPos && ghostSize.width > 0 && (
        <div
          className="fixed pointer-events-none z-50 rounded-lg shadow-2xl ring-4 ring-indigo-500 scale-105 overflow-hidden transition-transform duration-75"
          style={{
            left: dragPos.x - ghostSize.width / 2,
            top: dragPos.y - ghostSize.height / 2,
            width: ghostSize.width,
            height: ghostSize.height,
            backgroundImage: `url("${flagImgUrl}")`,
            backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            backgroundPosition: `${(tiles[draggedIdx] % gridSize) * (100 / (gridSize - 1))}% ${
              Math.floor(tiles[draggedIdx] / gridSize) * (100 / (gridSize - 1))
            }%`,
            backgroundRepeat: "no-repeat",
            opacity: 0.92,
          }}
        >
          {showHint && (
            <span className="absolute top-1 left-1 bg-black/75 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
              {tiles[draggedIdx] + 1}
            </span>
          )}
        </div>
      )}

      {/* 完成時の祝福モーダル / メッセージ */}
      {isCompleted ? (
        <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-3 text-white text-center shadow-md animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-center gap-1.5 font-black text-sm mb-1">
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>🎉 かんせい！ おめでとう！</span>
          </div>
          <p className="text-[11px] text-emerald-100 font-bold mb-2">
            {moves}手で {country.name}の国旗を完成させました！
          </p>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => {
                soundEffect.playTap();
                initPuzzle(country, gridSize);
              }}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>もういちど</span>
            </button>
            <button
              onClick={handleRandomCountry}
              className="px-4 py-1.5 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 font-black text-xs rounded-lg flex items-center gap-1 transition-all shadow-xs"
            >
              <span>つぎの国へ！</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2 mt-1">
          <button
            onClick={() => {
              soundEffect.playTap();
              initPuzzle(country, gridSize);
            }}
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
