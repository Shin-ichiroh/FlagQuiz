import React from "react";
import type { GameMode, GameSettings, Region } from "../types";
import { soundEffect } from "../utils/sound";
import { Play, Volume2, VolumeX, Sparkles, Globe, Clock, Layers, HelpCircle } from "lucide-react";

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onStartGame: () => void;
}

export const SettingsScreen: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onStartGame,
}) => {
  const modes: { id: GameMode; label: string; sub: string; icon: string }[] = [
    { id: "random", label: "🎲 ランダム", sub: "ぜんぶミックス！", icon: "🎲" },
    { id: "flag_to_name", label: "🚩 国旗あて", sub: "はたをみて くにをあてる", icon: "🚩" },
    { id: "name_to_flag", label: "🔤 なまえあて", sub: "くになまえをみて はたをえらぶ", icon: "🔤" },
    { id: "trivia", label: "📖 ゆらいクイズ", sub: "デザインや いろのいみ", icon: "📖" },
  ];

  const regions: { id: Region; label: string; icon: string }[] = [
    { id: "all", label: "🌍 ぜんせかい", icon: "🌍" },
    { id: "asia", label: "🌏 アジア", icon: "🌏" },
    { id: "europe", label: "🏰 ヨーロッパ", icon: "🏰" },
    { id: "africa", label: "🦁 アフリカ", icon: "🦁" },
    { id: "north_america", label: "🗽 きた・ちゅうべい", icon: "🗽" },
    { id: "south_america", label: "🦙 みなみアメリカ", icon: "🦙" },
    { id: "oceania", label: "🦘 オセアニア", icon: "🦘" },
  ];

  const questionCounts = [5, 10, 20, 50, 100];
  const timeLimits = [
    { value: 3, label: "⚡ 3秒", desc: "ちょうスピード！" },
    { value: 5, label: "🔥 5秒", desc: "ハラハラ" },
    { value: 10, label: "👍 10秒", desc: "ちょうどいい" },
    { value: 15, label: "🌱 15秒", desc: "ゆったり" },
    { value: 0, label: "♾️ なし", desc: "じっくりかんがえる" },
  ];

  const handleSoundToggle = () => {
    const next = !settings.soundEnabled;
    soundEffect.setEnabled(next);
    if (next) soundEffect.playTap();
    onUpdateSettings({ ...settings, soundEnabled: next });
  };

  const handleStart = () => {
    soundEffect.playCorrect();
    onStartGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-sky-50 to-amber-50 p-4 pb-12 flex flex-col items-center justify-start max-w-md mx-auto">
      {/* ヘッダー */}
      <header className="w-full flex items-center justify-between pt-2 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚩</span>
          <div>
            <h1 className="text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-1.5">
              こっきクイズ
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 inline" />
            </h1>
            <p className="text-xs font-bold text-indigo-500">たのしくあそんで せかいをしろう！</p>
          </div>
        </div>
        <button
          onClick={handleSoundToggle}
          className="p-2.5 rounded-full bg-white shadow-sm border border-indigo-100 text-indigo-600 active:scale-95 transition-all"
          aria-label="おんせいせってい"
        >
          {settings.soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-slate-400" />}
        </button>
      </header>

      {/* メイン設定カード */}
      <div className="w-full space-y-5 bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-indigo-100">
        {/* 1. プレイモード選択 */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700 mb-2.5">
            <Layers className="w-4 h-4 text-indigo-500" />
            あそびかた（プレイモード）
          </label>
          <div className="grid grid-cols-2 gap-2">
            {modes.map((m) => {
              const selected = settings.mode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    soundEffect.playTap();
                    onUpdateSettings({ ...settings, mode: m.id });
                  }}
                  className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between active:scale-95 ${
                    selected
                      ? "border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                  }`}
                >
                  <span className="text-base font-black">{m.label}</span>
                  <span className="text-[11px] font-semibold text-slate-500 mt-1">{m.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 地域（エリア）フィルター */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700 mb-2.5">
            <Globe className="w-4 h-4 text-emerald-500" />
            ちいき（エリア）
          </label>
          <div className="grid grid-cols-2 gap-2">
            {regions.map((r) => {
              const selected = settings.region === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => {
                    soundEffect.playTap();
                    onUpdateSettings({ ...settings, region: r.id });
                  }}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black border-2 transition-all text-left flex items-center gap-1.5 active:scale-95 ${
                    selected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. もんだいすう */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700 mb-2.5">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            もんだいすう
          </label>
          <div className="grid grid-cols-5 gap-1.5">
            {questionCounts.map((count) => {
              const selected = settings.questionCount === count;
              return (
                <button
                  key={count}
                  onClick={() => {
                    soundEffect.playTap();
                    onUpdateSettings({ ...settings, questionCount: count });
                  }}
                  className={`py-2 rounded-xl text-center font-black transition-all border-2 active:scale-95 ${
                    selected
                      ? "border-amber-500 bg-amber-50 text-amber-900 text-sm shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-600 text-xs"
                  }`}
                >
                  {count}もん
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. せいげんじかん */}
        <div>
          <label className="flex items-center gap-1.5 text-sm font-extrabold text-slate-700 mb-2.5">
            <Clock className="w-4 h-4 text-rose-500" />
            1もんの じかん
          </label>
          <div className="grid grid-cols-3 gap-2">
            {timeLimits.map((t) => {
              const selected = settings.timeLimit === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    soundEffect.playTap();
                    onUpdateSettings({ ...settings, timeLimit: t.value });
                  }}
                  className={`p-2.5 rounded-2xl border-2 text-center transition-all active:scale-95 flex flex-col items-center justify-center ${
                    selected
                      ? "border-rose-500 bg-rose-50 text-rose-950 shadow-sm"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-sm font-black">{t.label}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. ふりがな（ルビ）表示トグル */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-black text-slate-800">ふりがなを つける</div>
            <div className="text-xs text-slate-400 font-semibold">かん字のよみかたを ひょうじ</div>
          </div>
          <button
            onClick={() => {
              soundEffect.playTap();
              onUpdateSettings({ ...settings, showRuby: !settings.showRuby });
            }}
            className={`w-14 h-8 flex items-center rounded-full p-1 duration-300 cursor-pointer transition-colors ${
              settings.showRuby ? "bg-indigo-600 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="bg-white w-6 h-6 rounded-full shadow-md transform transition-transform" />
          </button>
        </div>
      </div>

      {/* スタートボタン */}
      <div className="w-full mt-6 sticky bottom-4 z-20">
        <button
          onClick={handleStart}
          className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white font-black text-xl rounded-full shadow-xl shadow-orange-300/50 flex items-center justify-center gap-3 transform active:scale-95 transition-all hover:brightness-105"
        >
          <Play className="w-6 h-6 fill-white" />
          <span>クイズをはじめよう！</span>
        </button>
      </div>
    </div>
  );
};
