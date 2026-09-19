import React from "react";
import type { GameMode, GameSettings, Region } from "../types";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";
import { savePlayerName } from "../utils/ranking";
import { Play, Volume2, VolumeX, Sparkles, Globe, Clock, Layers, HelpCircle, User, Trophy, Mic } from "lucide-react";

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: GameSettings) => void;
  onStartGame: () => void;
  onViewRanking: () => void;
  onStartPuzzle: () => void;
  onStartAssembly: () => void;
  onStartColoring: () => void;
}

export const SettingsScreen: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onStartGame,
  onViewRanking,
  onStartPuzzle,
  onStartAssembly,
  onStartColoring,
}) => {
  const modes: { id: GameMode; label: string; sub: string }[] = [
    { id: "random", label: "🎲 ランダム", sub: "ぜんぶミックス！" },
    { id: "flag_to_name", label: "🚩 国旗あて", sub: "はたをみて くにをあてる" },
    { id: "name_to_flag", label: "🔤 なまえあて", sub: "くになまえをみて はたをえらぶ" },
    { id: "trivia", label: "📖 ゆらいクイズ", sub: "デザインや いろのいみ" },
    { id: "shape", label: "🗺️ かたちあて", sub: "ちずのシルエットクイズ" },
    { id: "location", label: "📍 ばしょ・ちず", sub: "まわりの国と いっしょに出題！" },
    { id: "compare", label: "⚔️ 国くらべ", sub: "どっちが大きい？ 人口が多い？" },
  ];



  const regions: { id: Region; label: string }[] = [
    { id: "all", label: "🌍 ぜんせかい" },
    { id: "asia", label: "🌏 アジア" },
    { id: "europe", label: "🏰 ヨーロッパ" },
    { id: "africa", label: "🦁 アフリカ" },
    { id: "north_america", label: "🗽 きた・ちゅうべい" },
    { id: "south_america", label: "🦙 みなみアメリカ" },
    { id: "oceania", label: "🦘 オセアニア" },
  ];

  const questionCounts = [5, 10, 20, 50, 100];
  const timeLimits = [
    { value: 3, label: "⚡ 3秒", desc: "ちょうスピード！" },
    { value: 5, label: "🔥 5秒", desc: "ハラハラ" },
    { value: 10, label: "👍 10秒", desc: "スピード加点！" },
    { value: 15, label: "🌱 15秒", desc: "ゆったり" },
    { value: 0, label: "♾️ なし", desc: "じっくり" },
  ];

  const handleSoundToggle = () => {
    const next = !settings.soundEnabled;
    soundEffect.setEnabled(next);
    if (next) soundEffect.playTap();
    onUpdateSettings({ ...settings, soundEnabled: next });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    onUpdateSettings({ ...settings, playerName: name });
    savePlayerName(name);
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
            <p className="text-xs font-bold text-indigo-500">すばやく答えてハイスコアをめざそう！</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              soundEffect.playTap();
              onViewRanking();
            }}
            className="p-2.5 rounded-full bg-white shadow-xs border border-amber-200 text-amber-600 active:scale-95 transition-all"
            aria-label="ランキングをみる"
            title="ランキング"
          >
            <Trophy className="w-5 h-5" />
          </button>
          <button
            onClick={handleSoundToggle}
            className="p-2.5 rounded-full bg-white shadow-xs border border-indigo-100 text-indigo-600 active:scale-95 transition-all"
            aria-label="おんせいせってい"
          >
            {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* 知育・あそびコーナー */}
      <div className="w-full bg-gradient-to-r from-amber-400/20 via-pink-400/20 to-indigo-400/20 p-3.5 rounded-3xl border-2 border-amber-300/60 shadow-sm mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>たのしい知育・パズルコーナー</span>
          </div>
          <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
            あたらしく登場！
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* 1. こっきパズル */}
          <button
            onClick={() => {
              soundEffect.playTap();
              onStartPuzzle();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-indigo-200 hover:border-indigo-400 active:scale-95 transition-all shadow-xs flex flex-col items-center text-center cursor-pointer"
          >
            <span className="text-2xl mb-1">🧩</span>
            <span className="text-xs font-black text-indigo-900 leading-tight">こっき<br/>パズル</span>
            <span className="text-[9px] text-slate-500 font-semibold mt-1">9ピース</span>
          </button>

          {/* 2. マークパズル */}
          <button
            onClick={() => {
              soundEffect.playTap();
              onStartAssembly();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 active:scale-95 transition-all shadow-xs flex flex-col items-center text-center cursor-pointer"
          >
            <span className="text-2xl mb-1">⭐</span>
            <span className="text-xs font-black text-amber-900 leading-tight">マーク<br/>パズル</span>
            <span className="text-[9px] text-slate-500 font-semibold mt-1">絵柄を置こう</span>
          </button>

          {/* 3. こっきぬりえ */}
          <button
            onClick={() => {
              soundEffect.playTap();
              onStartColoring();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-rose-200 hover:border-rose-400 active:scale-95 transition-all shadow-xs flex flex-col items-center text-center cursor-pointer"
          >
            <span className="text-2xl mb-1">🎨</span>
            <span className="text-xs font-black text-rose-900 leading-tight">こっき<br/>ぬりえ</span>
            <span className="text-[9px] text-slate-500 font-semibold mt-1">タップで塗る</span>
          </button>
        </div>
      </div>

      {/* メイン設定カード */}
      <div className="w-full space-y-4 bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-indigo-100">
        {/* 0. なまえ入力 */}
        <div className="bg-indigo-50/70 p-3.5 rounded-2xl border border-indigo-100">
          <label className="flex items-center gap-1.5 text-xs font-black text-indigo-900 mb-1.5">
            <User className="w-4 h-4 text-indigo-600" />
            プレイヤーの なまえ（ニックネーム）
          </label>
          <input
            type="text"
            value={settings.playerName}
            onChange={handleNameChange}
            placeholder="例: たろう、はなこ"
            maxLength={10}
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border-2 border-indigo-200 font-black text-slate-800 text-base placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-xs"
          />
          <span className="text-[10px] text-indigo-500 font-bold block mt-1">
            ※ ランキングに なまえが のるよ！
          </span>
        </div>

        {/* 1. プレイモード選択 */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 mb-2">
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
                      ? "border-indigo-600 bg-indigo-50/80 text-indigo-950 shadow-xs"
                      : "border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200"
                  }`}
                >
                  <span className="text-sm font-black">{m.label}</span>
                  <span className="text-[10px] font-semibold text-slate-500 mt-0.5">{m.sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 地域フィルター */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 mb-2">
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
                  className={`py-2 px-3 rounded-2xl text-xs font-black border-2 transition-all text-left flex items-center gap-1.5 active:scale-95 ${
                    selected
                      ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs"
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
          <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 mb-2">
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
                      ? "border-amber-500 bg-amber-50 text-amber-900 text-xs shadow-xs"
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
          <label className="flex items-center gap-1.5 text-xs font-black text-slate-700 mb-2">
            <Clock className="w-4 h-4 text-rose-500" />
            1もんの じかん（はやく答えるとボーナス加点！）
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
                  className={`p-2 rounded-2xl border-2 text-center transition-all active:scale-95 flex flex-col items-center justify-center ${
                    selected
                      ? "border-rose-500 bg-rose-50 text-rose-950 shadow-xs"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                >
                  <span className="text-xs font-black">{t.label}</span>
                  <span className="text-[9px] text-slate-400 font-semibold">{t.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. ふりがなトグル */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-black text-slate-800">ふりがなを つける</div>
            <div className="text-[10px] text-slate-400 font-semibold">かん字のよみかたを ひょうじ</div>
          </div>
          <button
            onClick={() => {
              soundEffect.playTap();
              onUpdateSettings({ ...settings, showRuby: !settings.showRuby });
            }}
            className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              settings.showRuby ? "bg-indigo-600 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="bg-white w-5 h-5 rounded-full shadow-md transform transition-transform" />
          </button>
        </div>

        {/* 6. 音声よみあげトグル */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-black text-slate-800 flex items-center gap-1">
              <Mic className="w-3.5 h-3.5 text-indigo-600" />
              こえで よみあげ
            </div>
            <div className="text-[10px] text-slate-400 font-semibold">もんだいや 国のなまえを よみあげるよ</div>
          </div>
          <button
            onClick={() => {
              soundEffect.playTap();
              const next = !settings.speechEnabled;
              speech.setEnabled(next);
              if (next) speech.speak("音声読み上げをオンにしました");
              onUpdateSettings({ ...settings, speechEnabled: next });
            }}
            className={`w-12 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
              settings.speechEnabled ? "bg-indigo-600 justify-end" : "bg-slate-300 justify-start"
            }`}
          >
            <div className="bg-white w-5 h-5 rounded-full shadow-md transform transition-transform" />
          </button>
        </div>
      </div>

      {/* スタートボタン */}
      <div className="w-full mt-5 sticky bottom-4 z-20">
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
