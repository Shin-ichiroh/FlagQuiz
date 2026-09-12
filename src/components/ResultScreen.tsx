import React, { useEffect, useState } from "react";
import type { QuizResultRecord, GameSettings } from "../types";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { saveRankingEntry } from "../utils/ranking";
import confetti from "canvas-confetti";
import { RotateCcw, Trophy, BookOpen, Zap } from "lucide-react";

interface ResultScreenProps {
  results: QuizResultRecord[];
  settings: GameSettings;
  onRestart: () => void;
  onViewRanking: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  results,
  settings,
  onRestart,
  onViewRanking,
}) => {
  const total = results.length;
  const correctCount = results.filter((r) => r.isCorrect).length;
  const accuracy = Math.round((correctCount / total) * 100);
  const totalScore = results.reduce((sum, r) => sum + r.questionScore, 0);

  const [saved, setSaved] = useState(false);

  // プレイヤー名に応じた呼びかけ
  const displayName = settings.playerName ? `${settings.playerName} さん` : "きみ";

  // 称号判定 & プレイヤーへのメッセージ
  let title = "こっき見習い";
  let titleColor = "text-slate-600";
  let message = `${displayName}、よくがんばったね！もっともっとせかいの国をおぼえよう！`;

  if (accuracy === 100) {
    title = "🌟 こっきマスター 🌟";
    titleColor = "text-amber-500";
    message = `すごい！${displayName}は全問正解！世界一の国旗博士だ！`;
  } else if (accuracy >= 80) {
    title = "🎖️ こっきはかせ";
    titleColor = "text-indigo-600";
    message = `すばらしい！${displayName}、ほとんど正解できたね！マスターまであと少し！`;
  } else if (accuracy >= 50) {
    title = "🚩 こっきチャレンジャー";
    titleColor = "text-emerald-600";
    message = `ナイスファイト！${displayName}、まちがえた国旗をふくしゅうしてみよう！`;
  }

  // ランキング保存 & クラッカー演出
  useEffect(() => {
    if (!saved) {
      saveRankingEntry({
        playerName: settings.playerName || "ななしさん",
        score: totalScore,
        accuracy,
        correctCount,
        totalQuestions: total,
        mode: settings.mode,
        timeLimit: settings.timeLimit,
      });
      setSaved(true);
    }

    if (accuracy >= 70) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, []);

  const mistakes = results.filter((r) => !r.isCorrect);

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-12 flex flex-col items-center max-w-md mx-auto">
      {/* 結果サマリーカード */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-md border border-indigo-50 text-center relative overflow-hidden mt-2">
        <div className="flex justify-center mb-2">
          <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-black mb-1">
          {displayName} の けっか
        </div>

        <h2 className={`text-2xl font-black mb-2 ${titleColor}`}>{title}</h2>

        {/* スコア表示 */}
        <div className="mb-3 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl shadow-sm flex items-center justify-between">
          <span className="text-xs font-black flex items-center gap-1">
            <Zap className="w-4 h-4 fill-white" />
            ごうけいスコア
          </span>
          <span className="text-2xl font-black tracking-tight">
            {totalScore.toLocaleString()} <span className="text-sm font-bold">点</span>
          </span>
        </div>

        <div className="py-2.5 bg-slate-50 rounded-2xl flex items-center justify-around border border-slate-100">
          <div>
            <span className="block text-[11px] font-bold text-slate-400">せいかいすう</span>
            <span className="text-xl font-black text-indigo-950">
              {correctCount} <span className="text-xs font-bold text-slate-500">/ {total}</span>
            </span>
          </div>
          <div className="w-px h-6 bg-slate-200" />
          <div>
            <span className="block text-[11px] font-bold text-slate-400">せいかいりつ</span>
            <span className="text-xl font-black text-indigo-950">{accuracy}%</span>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-600 leading-relaxed mt-3">{message}</p>
      </div>

      {/* まちがえた問題のふくしゅう */}
      {mistakes.length > 0 && (
        <div className="w-full mt-5">
          <div className="flex items-center gap-2 mb-2.5 px-1">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-black text-slate-800">
              ふくしゅうコーナー（まちがえた {mistakes.length} もん）
            </h3>
          </div>

          <div className="space-y-2.5">
            {mistakes.map((record, idx) => {
              const country = record.question.country;
              return (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex items-start gap-3"
                >
                  <img
                    src={getFlagUrl(country.code, 160)}
                    alt={country.name}
                    className="w-14 h-10 object-contain rounded-lg border border-slate-200 bg-slate-50 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold text-indigo-500">{country.ruby}</div>
                    <div className="text-sm font-black text-slate-900 leading-tight">
                      {country.name}
                    </div>
                    {record.question.explanation && (
                      <p className="text-[11px] text-slate-600 font-medium mt-1 leading-normal bg-amber-50/70 p-2 rounded-xl border border-amber-100">
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
      <div className="w-full mt-6 space-y-2.5 sticky bottom-4 z-20">
        <button
          onClick={() => {
            soundEffect.playTap();
            onViewRanking();
          }}
          className="w-full py-3.5 px-6 bg-white border-2 border-amber-300 text-amber-900 font-black text-base rounded-full shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>こんしゅうのランキングをみる</span>
        </button>

        <button
          onClick={() => {
            soundEffect.playTap();
            onRestart();
          }}
          className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-black text-base rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
          <RotateCcw className="w-5 h-5" />
          <span>もういちど あそぶ！</span>
        </button>
      </div>
    </div>
  );
};
