import React from "react";
import { getWeeklyRankings, getWeeklyRangeLabel } from "../utils/ranking";
import { soundEffect } from "../utils/sound";
import { ArrowLeft, Trophy, Calendar, Award } from "lucide-react";

interface RankingScreenProps {
  onBack: () => void;
}

export const RankingScreen: React.FC<RankingScreenProps> = ({ onBack }) => {
  const rankings = getWeeklyRankings();
  const weekLabel = getWeeklyRangeLabel();

  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-12 flex flex-col items-center max-w-md mx-auto">
      {/* ヘッダー */}
      <div className="w-full flex items-center justify-between pt-2 pb-4">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-800 rounded-full active:bg-slate-200"
          aria-label="もどる"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-black text-indigo-950 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500 fill-amber-400" />
          この1週間のランキング
        </h2>
        <div className="w-6" />
      </div>

      {/* 期間バナー */}
      <div className="w-full bg-indigo-50 border border-indigo-100 rounded-2xl p-3 mb-4 flex items-center justify-center gap-2 text-xs font-bold text-indigo-900">
        <Calendar className="w-4 h-4 text-indigo-600" />
        <span>集計期間: {weekLabel}</span>
      </div>

      {/* ランキングリスト */}
      <div className="w-full flex-1">
        {rankings.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xs mt-4">
            <Award className="w-12 h-12 text-slate-300 mx-auto mb-2" />
            <h3 className="text-base font-black text-slate-700">まだスコアがないよ</h3>
            <p className="text-xs text-slate-400 mt-1">クイズにあそんで 1位をめざそう！</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {rankings.slice(0, 15).map((entry, idx) => {
              let rankBadge = (
                <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-black text-sm flex items-center justify-center">
                  {idx + 1}
                </span>
              );
              let cardBg = "bg-white border-slate-100";

              if (idx === 0) {
                rankBadge = (
                  <span className="w-8 h-8 rounded-full bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shadow-xs">
                    🥇
                  </span>
                );
                cardBg = "bg-gradient-to-r from-amber-50 to-white border-amber-200 shadow-sm";
              } else if (idx === 1) {
                rankBadge = (
                  <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center">
                    🥈
                  </span>
                );
              } else if (idx === 2) {
                rankBadge = (
                  <span className="w-8 h-8 rounded-full bg-amber-600/30 text-amber-900 font-black text-sm flex items-center justify-center">
                    🥉
                  </span>
                );
              }

              return (
                <div
                  key={entry.id}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${cardBg}`}
                >
                  <div className="flex items-center gap-3">
                    {rankBadge}
                    <div>
                      <div className="font-black text-base text-slate-900 leading-tight">
                        {entry.playerName || "ななしさん"}
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold mt-0.5">
                        {entry.correctCount}/{entry.totalQuestions}もん正解 ({entry.date})
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-indigo-950 block leading-tight">
                      {entry.score.toLocaleString()} <span className="text-xs font-bold text-indigo-500">点</span>
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      正解率 {entry.accuracy}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* もどるボタン */}
      <div className="w-full mt-6 sticky bottom-4 z-20">
        <button
          onClick={() => {
            soundEffect.playTap();
            onBack();
          }}
          className="w-full py-3.5 px-6 bg-slate-800 text-white font-black text-base rounded-full shadow-md active:scale-95 transition-all text-center"
        >
          メニューにもどる
        </button>
      </div>
    </div>
  );
};
