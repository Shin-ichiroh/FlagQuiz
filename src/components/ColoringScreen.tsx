import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { ArrowLeft, RotateCcw, Download, Check, Trophy, ChevronRight, Eye, EyeOff, Volume2 } from "lucide-react";
import { COLORING_FLAGS, type ColoringFlag } from "../data/flagColoringData";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";

interface ColoringScreenProps {
  onBack: () => void;
  showRuby?: boolean;
}

function prefixSvgIds(svg: string, prefix: string): string {
  return svg
    .replace(/\bid="([^"]+)"/g, `id="${prefix}_$1"`)
    .replace(/(?:xlink:)?href="#([^"]+)"/g, (match, id) =>
      match.startsWith("xlink:") ? `xlink:href="#${prefix}_${id}"` : `href="#${prefix}_${id}"`
    );
}

export const ColoringScreen: React.FC<ColoringScreenProps> = ({
  onBack,
  showRuby = true,
}) => {
  const [flagIndex, setFlagIndex] = useState<number>(0);
  const flag: ColoringFlag = COLORING_FLAGS[flagIndex];

  // elementId -> selected hex color
  const [userFills, setUserFills] = useState<Record<string, string>>({});
  const [selectedColor, setSelectedColor] = useState<string>(flag.palette[1] || "#bc002d");
  const [showModel, setShowModel] = useState<boolean>(true);
  const [showOutlines, setShowOutlines] = useState<boolean>(false); // デフォルトで枠線なし
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [checkResult, setCheckResult] = useState<"perfect" | "imperfect" | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // 国が切り替わったときの初期化
  useEffect(() => {
    setUserFills({});
    setSelectedColor(flag.palette[1] || "#bc002d");
    setIsCompleted(false);
    setCheckResult(null);
  }, [flagIndex, flag.palette]);

  // 要素をタップして色を塗る
  const handleElementClick = (elementId: string) => {
    soundEffect.playTap();
    setUserFills((prev) => ({
      ...prev,
      [elementId]: selectedColor,
    }));
    setCheckResult(null);
  };

  const [feedbackMsg, setFeedbackMsg] = useState<string>("");

  const handleCheckAnswer = () => {
    soundEffect.playTap();

    // 未塗りの部分があるかチェック
    const hasUnpainted = flag.elements.some((elem) => !userFills[elem.id]);
    if (hasUnpainted) {
      soundEffect.playWrong();
      setCheckResult("imperfect");
      setFeedbackMsg("まだ塗っていない場所があるよ！ えのぐをえらんでタップしてね！");
      setTimeout(() => setCheckResult(null), 3500);
      return;
    }

    // すべての要素が正解の色に一致しているか
    const isAllCorrect = flag.elements.every((elem) => {
      const userColor = userFills[elem.id]?.toLowerCase();
      const targetColor = elem.correctColor.toLowerCase();
      return userColor === targetColor;
    });

    if (isAllCorrect) {
      setIsCompleted(true);
      setCheckResult("perfect");
      soundEffect.playCorrect();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      speech.speak(`せいかい！ ${flag.countryName}の国旗がかんせいしたよ！ ${flag.trivia}`);
    } else {
      soundEffect.playWrong();
      setCheckResult("imperfect");
      setFeedbackMsg("ちがう色のところがあるよ！ おてほんをよく見てみよう！");
      setTimeout(() => setCheckResult(null), 3500);
    }
  };

  // 画像をPNGで保存（ダウンロード）
  const handleDownloadImage = () => {
    soundEffect.playTap();
    if (!svgRef.current) return;

    // SVG文字列をシリアライズ
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 解析してviewBoxからサイズ取得
    const [, , vw, vh] = flag.viewBox.split(" ").map(Number);
    canvas.width = vw * 2;
    canvas.height = vh * 2;

    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const link = document.createElement("a");
      link.download = `${flag.countryName}_こっきぬりえ.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = url;
  };

  // リセット
  const handleReset = () => {
    soundEffect.playTap();
    setUserFills({});
    setIsCompleted(false);
    setCheckResult(null);
  };

  // 次の国へ
  const handleNextFlag = () => {
    soundEffect.playTap();
    setFlagIndex((prev) => (prev + 1) % COLORING_FLAGS.length);
  };

  // 音声読み上げ
  const handleSpeakTrivia = () => {
    soundEffect.playTap();
    speech.speak(`${flag.countryName}。${flag.trivia}`);
  };

  return (
    <div className="w-full max-w-md mx-auto px-3 py-1.5 sm:py-3 flex flex-col items-center justify-start select-none">
      {/* コンパクト統合ヘッダー (もどる + 国名 + 進捗/セレクタ) */}
      <div className="w-full bg-white/95 backdrop-blur-xs rounded-2xl px-2.5 py-1.5 shadow-xs border border-slate-200/80 flex items-center justify-between gap-1.5 mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
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
          <div className="truncate flex items-baseline gap-1">
            <h2 className="text-base sm:text-lg font-black text-slate-800 truncate">
              {showRuby && flag.countryRuby ? (
                <ruby>
                  {flag.countryName}
                  <rt className="text-[10px] text-rose-500 font-bold">{flag.countryRuby}</rt>
                </ruby>
              ) : (
                flag.countryName
              )}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <select
            value={flagIndex}
            onChange={(e) => {
              soundEffect.playTap();
              setFlagIndex(Number(e.target.value));
            }}
            className="max-w-[110px] sm:max-w-[130px] bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl px-2 py-1 focus:outline-none focus:border-rose-500 truncate"
          >
            {COLORING_FLAGS.map((f, i) => (
              <option key={f.id} value={i}>
                {i + 1}. {f.countryName}
              </option>
            ))}
          </select>

          <button
            onClick={handleNextFlag}
            className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs rounded-xl border border-rose-200 shrink-0 active:scale-95"
          >
            つぎ
          </button>
        </div>
      </div>

      {/* サブバー (ミニおてほん表示 ＆ わくせん/表示トグル) */}
      <div className="w-full flex items-center justify-between text-xs font-bold text-slate-600 px-1 mb-1.5">
        {/* インラインおてほんミニ表示 */}
        {showModel ? (
          <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200/80 px-2 py-0.5 rounded-lg shadow-2xs">
            <span className="text-[10px] font-black text-rose-800 shrink-0">おてほん:</span>
            <div
              className="h-5 sm:h-6 rounded shadow-2xs border border-white overflow-hidden shrink-0"
              style={{ aspectRatio: flag.aspectRatio }}
            >
              <svg viewBox={flag.viewBox} className="w-full h-full">
                {flag.elements.map((elem) => {
                  if (elem.type === "g" && elem.svgContent) {
                    return (
                      <g
                        key={elem.id}
                        dangerouslySetInnerHTML={{ __html: prefixSvgIds(elem.svgContent, "model") }}
                      />
                    );
                  } else if (elem.type === "circle") {
                    return <circle key={elem.id} {...elem.props} fill={elem.correctColor} />;
                  } else if (elem.type === "polygon") {
                    return <polygon key={elem.id} {...elem.props} fill={elem.correctColor} />;
                  } else if (elem.type === "path") {
                    return <path key={elem.id} {...elem.props} fill={elem.correctColor} />;
                  }
                  return <rect key={elem.id} {...elem.props} fill={elem.correctColor} />;
                })}
              </svg>
            </div>
          </div>
        ) : (
          <span className="text-[10px] text-slate-400">タップして色をぬろう！</span>
        )}

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEffect.playTap();
              setShowOutlines((v) => !v);
            }}
            className={`px-2 py-0.5 rounded-md border text-[11px] font-bold transition-all ${
              showOutlines
                ? "bg-amber-100 border-amber-300 text-amber-900"
                : "bg-white border-slate-200 text-slate-600"
            }`}
          >
            わくせん: {showOutlines ? "ON" : "OFF"}
          </button>
          <button
            onClick={() => {
              soundEffect.playTap();
              setShowModel((v) => !v);
            }}
            className="flex items-center gap-0.5 text-[11px] text-slate-500 hover:text-slate-800 transition-colors"
          >
            {showModel ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            <span>{showModel ? "かくす" : "おてほん"}</span>
          </button>
        </div>
      </div>

      {/* ぬりえキャンバス (SVG) */}
      <div
        className="relative rounded-2xl shadow-sm bg-white overflow-hidden select-none mb-2 border border-slate-200"
        style={{
          aspectRatio: flag.aspectRatio,
          height: "min(28vh, 195px)",
          maxWidth: "calc(100% - 16px)",
          width: "auto",
        }}
      >
        <svg
          ref={svgRef}
          viewBox={flag.viewBox}
          className="w-full h-full cursor-pointer"
        >
          {flag.elements.map((elem, idx) => {
            const isFilled = !!userFills[elem.id];
            // 未塗り時はパーツごとの淡い面グラデーションで境界を表現
            const defaultUnfilled =
              elem.id === "bg" || elem.id === "mid"
                ? "#f8fafc"
                : elem.id.includes("leaf") ||
                  elem.id.includes("sun") ||
                  elem.id.includes("moon") ||
                  elem.id.includes("star") ||
                  elem.id.includes("globe") ||
                  elem.id.includes("diamond") ||
                  elem.id.includes("taegeuk") ||
                  elem.id.includes("trigram")
                ? "#cbd5e1"
                : elem.id.includes("cross")
                ? "#e2e8f0"
                : idx % 2 === 0
                ? "#f8fafc"
                : "#e2e8f0";

            const fillColor = isFilled ? userFills[elem.id] : defaultUnfilled;

            // 枠線設定:
            // 色を塗った要素は常に枠線なし (stroke: none)
            // 未塗りの場合も「わくせん: OFF (デフォルト)」なら枠線なし
            const strokeColor = !isFilled && showOutlines ? "#94a3b8" : "none";
            const strokeWidth = !isFilled && showOutlines ? 1.5 : 0;
            const strokeDasharray = !isFilled && showOutlines ? "4 2" : undefined;

            if (elem.type === "g" && elem.svgContent) {
              let content = elem.svgContent;
              if (!isFilled) {
                content = content
                  .replaceAll("#f6b40e", "#e2e8f0")
                  .replaceAll("#85340a", "#94a3b8")
                  .replaceAll("#843511", "#94a3b8");
              } else {
                content = content.replaceAll("#f6b40e", fillColor);
              }

              return (
                <g
                  key={elem.id}
                  onClick={() => handleElementClick(elem.id)}
                  className="transition-colors duration-150 hover:opacity-85 cursor-pointer"
                  dangerouslySetInnerHTML={{ __html: prefixSvgIds(content, "canvas") }}
                />
              );
            } else if (elem.type === "circle") {
              return (
                <circle
                  key={elem.id}
                  {...elem.props}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  onClick={() => handleElementClick(elem.id)}
                  className="transition-colors duration-150 hover:opacity-85 cursor-pointer"
                />
              );
            } else if (elem.type === "polygon") {
              return (
                <polygon
                  key={elem.id}
                  {...elem.props}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  onClick={() => handleElementClick(elem.id)}
                  className="transition-colors duration-150 hover:opacity-85 cursor-pointer"
                />
              );
            } else if (elem.type === "path") {
              return (
                <path
                  key={elem.id}
                  {...elem.props}
                  fill={fillColor}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDasharray}
                  onClick={() => handleElementClick(elem.id)}
                  className="transition-colors duration-150 hover:opacity-85 cursor-pointer"
                />
              );
            }

            return (
              <rect
                key={elem.id}
                {...elem.props}
                fill={fillColor}
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                onClick={() => handleElementClick(elem.id)}
                className="transition-colors duration-150 hover:opacity-85 cursor-pointer"
              />
            );
          })}
        </svg>
      </div>

      {/* カラーパレット */}
      <div className="w-full bg-white rounded-xl px-2.5 py-1.5 shadow-xs border border-slate-100 mb-2">
        <div className="flex items-center justify-between text-[11px] font-black text-slate-700 mb-1 px-1">
          <span>えのぐパレット</span>
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <span>えらんだ色:</span>
            <span
              className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs inline-block"
              style={{ backgroundColor: selectedColor }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {flag.palette.map((hex) => {
            const isSelected = selectedColor.toLowerCase() === hex.toLowerCase();
            return (
              <button
                key={hex}
                onClick={() => {
                  soundEffect.playTap();
                  setSelectedColor(hex);
                }}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 transition-all active:scale-90 flex items-center justify-center shadow-2xs ${
                  isSelected
                    ? "ring-3 ring-rose-400 scale-110 border-white z-10"
                    : "border-slate-300 hover:scale-105"
                }`}
                style={{ backgroundColor: hex }}
                title={hex}
              >
                {isSelected && (
                  <Check
                    className={`w-4 h-4 ${
                      hex.toLowerCase() === "#ffffff" || hex.toLowerCase() === "#ffce00"
                        ? "text-slate-800"
                        : "text-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 不正解メッセージ */}
      {checkResult === "imperfect" && (
        <div className="w-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-black rounded-xl p-2 text-center mb-1.5 animate-shake">
          {feedbackMsg}
        </div>
      )}

      {/* アクションボタン */}
      {isCompleted ? (
        <div className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-3 text-white text-center shadow-md animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-center gap-1 font-black text-base mb-0.5">
            <Trophy className="w-5 h-5 text-amber-300" />
            <span>🎉 お見事！ 正解の国旗ができたよ！</span>
          </div>

          <p className="text-xs text-emerald-100 font-bold mb-2 px-2 leading-snug">
            {flag.trivia}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={handleSpeakTrivia}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-black text-xs rounded-lg flex items-center gap-1 transition-all"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>声できく</span>
            </button>
            <button
              onClick={handleDownloadImage}
              className="px-3 py-1.5 bg-white/20 hover:bg-white/30 active:scale-95 text-white font-black text-xs rounded-lg flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>保存</span>
            </button>
            <button
              onClick={handleNextFlag}
              className="px-4 py-1.5 bg-white text-emerald-800 hover:bg-emerald-50 active:scale-95 font-black text-xs rounded-lg flex items-center gap-1 transition-all shadow-xs"
            >
              <span>つぎの国へ！</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span>やりなおす</span>
          </button>

          <button
            onClick={handleDownloadImage}
            className="flex items-center gap-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95 shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>保存</span>
          </button>

          <button
            onClick={handleCheckAnswer}
            className="flex-1 max-w-[150px] py-2 px-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-sm flex items-center justify-center gap-1 active:scale-95 transition-all hover:brightness-105"
          >
            <Check className="w-4 h-4" />
            <span>できた！</span>
          </button>
        </div>
      )}
    </div>
  );
};
