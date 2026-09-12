import React, { useEffect } from "react";
import type { QuizResultRecord, GameSettings } from "../types";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import confetti from "canvas-confetti";
import { RotateCcw, Trophy, BookOpen } from "lucide-react";

interface ResultScreenProps {
  results: QuizResultRecord[];
  settings: GameSettings;
  onRestart: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  results,
  onRestart,
}) => {
  const total = results.length;
  const correctCount = results.filter((r) => r.isCorrect).length;
  const accuracy = Math.round((correctCount / total) * 100);

  // 称号判定
  let title = "こっき見習い";
  let titleColor = "text-slate-600";
  let message = "よくがんばったね！もっともっとせかいの国をおぼえよう！";

  if (accuracy === 100) {
    title = "🌟 こっきマスター 🌟";
    titleColor = "text-amber-500";
    message = "かんぺき！全問正解おめでとう！！きみは世界一の国旗博士だ！";
  } else if (accuracy >= 80) {
    title = "🎖️ こっきはかせ";
    titleColor = "text-indigo-600";
    message = "すごい！ほとんど正解できたね！マスターまであと少し！";
  } else if (accuracy >= 50) {
    title = "🚩 こっきチャレンジャー";
    titleColor = "text-emerald-600";
    message = "ナイスファイト！まちがえた国旗をふくしゅうしてみよう！";
  }

  // クラッカー演出
  useEffect(() => {
    if (accuracy >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [accuracy]);

  const mistakes = results.filter((r) => !r.isCorrect);

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-12 flex flex-col items-center max-w-md mx-auto">
      {/* 結果サマリーカード */}
      <div className="w-full bg-white rounded-3xl p-6 shadow-md border border-indigo-50 text-center relative overflow-hidden mt-2">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
            <Trophy className="w-9 h-9" />
          </div>
        </div>

        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">クイズけっか</span>
        <h2 className={`text-2xl font-black mt-1 mb-2 ${titleColor}`}>{title}</h2>

        <div className="my-4 py-3 bg-slate-50 rounded-2xl flex items-center justify-around border border-slate-100">
          <div>
            <span className="block text-xs font-bold text-slate-400">せいかいすう</span>
            <span className="text-2xl font-black text-indigo-950">
              {correctCount} <span className="text-sm font-bold text-slate-500">/ {total}</span>
            </span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="block text-xs font-bold text-slate-400">せいかいりつ</span>
            <span className="text-2xl font-black text-indigo-950">{accuracy}%</span>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-600 leading-relaxed">{message}</p>
      </div>

      {/* まちがえた問題のふくしゅう */}
      {mistakes.length > 0 && (
        <div className="w-full mt-6">
          <div className="flex items-center gap-2 mb-3 px-1">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-sm font-black text-slate-800">
              ふくしゅうコーナー（まちがえた {mistakes.length} もん）
            </h3>
          </div>

          <div className="space-y-3">
            {mistakes.map((record, idx) => {
              const country = record.question.country;
              return (
                <div
                  key={idx}
                  className="bg-white p-3.5 rounded-2xl shadow-xs border border-slate-100 flex items-start gap-3"
                >
                  <img
                    src={getFlagUrl(country.code, 160)}
                    alt={country.name}
                    className="w-16 h-11 object-contain rounded-lg border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-indigo-500">{country.ruby}</span>
                    </div>
                    <div className="text-base font-black text-slate-900 leading-tight">
                      {country.name}
                    </div>
                    {record.question.explanation && (
                      <p className="text-xs text-slate-600 font-medium mt-1.5 leading-normal bg-amber-50/70 p-2 rounded-xl border border-amber-100">
                        💡 {record.question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="w-full mt-8 sticky bottom-4 z-20">
        <button
          onClick={() => {
            soundEffect.playTap();
            onRestart();
          }}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black text-lg rounded-full shadow-lg shadow-indigo-300 flex items-center justify-center gap-2.5 active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>もういちど あそぶ！</span>
        </button>
      </div>
    </div>
  );
};
