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
  onStartCapitalMatch: () => void;
}

export const SettingsScreen: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onStartGame,
  onViewRanking,
  onStartPuzzle,
  onStartAssembly,
  onStartColoring,
  onStartCapitalMatch,
}) => {
  const modes: { id: GameMode; label: string; sub: string }[] = [
    { id: "random", label: "🎲 ランダム", sub: "ぜんぶミックス！" },
    { id: "flag_to_name", label: "🚩 国旗あて", sub: "はたをみて くにをあてる" },
    { id: "name_to_flag", label: "🔤 なまえあて", sub: "くになまえをみて はたをえらぶ" },
    { id: "capital", label: "🏛️ 首都クイズ", sub: "国旗と首都をあてる！" },
    { id: "trivia", label: "📖 ゆらいクイズ", sub: "デザインや いろのいみ" },
    { id: "shape", label: "🗺️ かたちあて", sub: "ちずのシルエットクイズ" },
    { id: "location", label: "📍 かたちあて（ちず）", sub: "まわりの国と いっしょに出題！" },
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

  const [activeTab, setActiveTab] = React.useState<"quiz" | "puzzle">("quiz");

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
      <header className="w-full flex items-center justify-between pt-2 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🚩</span>
          <div>
            <h1 className="text-2xl font-black text-indigo-900 tracking-tight flex items-center gap-1.5">
              こっきクイズ
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400 inline" />
            </h1>
            <p className="text-xs font-bold text-indigo-500">あそんでまなべる世界の国旗</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleSoundToggle}
            className="p-2.5 rounded-full bg-white shadow-xs border border-indigo-100 text-indigo-600 active:scale-95 transition-all cursor-pointer"
            aria-label="おんせいせってい"
          >
            {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>
        </div>
      </header>

      {/* 2大ジャンル切り替えタブ */}
      <div className="w-full bg-slate-200/90 p-1.5 sm:p-2 rounded-3xl flex items-center gap-2 mb-4 shadow-sm border border-slate-300/60">
        <button
          onClick={() => {
            soundEffect.playTap();
            setActiveTab("quiz");
          }}
          className={`flex-1 py-3 px-2 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            activeTab === "quiz"
              ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-300/60 scale-[1.02] ring-2 ring-indigo-300"
              : "bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs"
          }`}
        >
          <span className="text-base sm:text-lg">🎯</span>
          <span>4択クイズ</span>
        </button>

        <button
          onClick={() => {
            soundEffect.playTap();
            setActiveTab("puzzle");
          }}
          className={`flex-1 py-3 px-2 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
            activeTab === "puzzle"
              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-300/60 scale-[1.02] ring-2 ring-amber-300"
              : "bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white shadow-xs"
          }`}
        >
          <span className="text-base sm:text-lg">🧩</span>
          <span>パズル ＆ あそび</span>
        </button>
      </div>

      {/* 【タブ1: パズル・知育系】 */}
      {activeTab === "puzzle" && (
        <div className="w-full space-y-3 animate-in fade-in duration-200">
          <div className="bg-amber-100/60 border border-amber-200 px-3 py-2 rounded-2xl flex items-center gap-2 text-xs font-bold text-amber-900">
            <span className="text-lg">💡</span>
            <span>時間制限なし！じっくり手を使って国旗をおぼえよう</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* 1. こっきパズル */}
            <button
              onClick={() => {
                soundEffect.playTap();
                onStartPuzzle();
              }}
              className="p-3.5 rounded-3xl bg-white border-2 border-indigo-100 hover:border-indigo-400 active:scale-95 transition-all shadow-sm flex flex-col justify-between text-left cursor-pointer group hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 rounded-2xl bg-indigo-50 group-hover:scale-110 transition-transform">🧩</span>
                  <span className="text-[10px] font-black bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                    4・9・16ピース
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-800 leading-tight">こっきパズル</h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">バラバラになったタイルを並べ替えよう！</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-black text-indigo-600">
                <span>あそぶ</span>
                <span>➔</span>
              </div>
            </button>

            {/* 2. マークパズル */}
            <button
              onClick={() => {
                soundEffect.playTap();
                onStartAssembly();
              }}
              className="p-3.5 rounded-3xl bg-white border-2 border-amber-100 hover:border-amber-400 active:scale-95 transition-all shadow-sm flex flex-col justify-between text-left cursor-pointer group hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 rounded-2xl bg-amber-50 group-hover:scale-110 transition-transform">⭐</span>
                  <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                    絵柄を置く
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-800 leading-tight">マークパズル</h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">星や太陽などのマークを正しい位置に配置！</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-black text-amber-600">
                <span>あそぶ</span>
                <span>➔</span>
              </div>
            </button>

            {/* 3. こっきぬりえ */}
            <button
              onClick={() => {
                soundEffect.playTap();
                onStartColoring();
              }}
              className="p-3.5 rounded-3xl bg-white border-2 border-rose-100 hover:border-rose-400 active:scale-95 transition-all shadow-sm flex flex-col justify-between text-left cursor-pointer group hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 rounded-2xl bg-rose-50 group-hover:scale-110 transition-transform">🎨</span>
                  <span className="text-[10px] font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    色を塗る
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-800 leading-tight">こっきぬりえ</h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">絵の具パレットから色を選んで国旗を塗ろう！</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-black text-rose-600">
                <span>あそぶ</span>
                <span>➔</span>
              </div>
            </button>

            {/* 4. 首都マッチ */}
            <button
              onClick={() => {
                soundEffect.playTap();
                onStartCapitalMatch();
              }}
              className="p-3.5 rounded-3xl bg-white border-2 border-emerald-100 hover:border-emerald-400 active:scale-95 transition-all shadow-sm flex flex-col justify-between text-left cursor-pointer group hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl p-2 rounded-2xl bg-emerald-50 group-hover:scale-110 transition-transform">🏛️</span>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                    ペア消し
                  </span>
                </div>
                <h3 className="text-base font-black text-slate-800 leading-tight">首都マッチ</h3>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">国旗と首都のペアを見つけてすばやく消そう！</p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-xs font-black text-emerald-600">
                <span>あそぶ</span>
                <span>➔</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* 【タブ2: 4択クイズ ＆ ランキング系】 */}
      {activeTab === "quiz" && (
        <div className="w-full space-y-4 animate-in fade-in duration-200">
          {/* プレイヤー登録 ＆ 全国ランキング一体化カード */}
          <div className="w-full bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-indigo-500/15 p-3.5 rounded-3xl border-2 border-amber-300/80 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              {/* 名前入力 */}
              <div className="flex-1 min-w-0">
                <label className="flex items-center gap-1.5 text-xs font-black text-slate-800 mb-1">
                  <User className="w-3.5 h-3.5 text-indigo-600" />
                  <span>プレイヤー名（ランキング用）</span>
                </label>
                <input
                  type="text"
                  value={settings.playerName}
                  onChange={handleNameChange}
                  placeholder="例: たろう、はなこ"
                  maxLength={10}
                  className="w-full px-3 py-1.5 rounded-xl bg-white border-2 border-amber-200 font-black text-slate-800 text-sm placeholder:text-slate-400 focus:outline-none focus:border-amber-500 shadow-2xs"
                />
              </div>

              {/* ランキングを見るボタン */}
              <button
                onClick={() => {
                  soundEffect.playTap();
                  onViewRanking();
                }}
                className="shrink-0 px-3 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-xs shadow-sm border border-amber-300 flex flex-col items-center justify-center gap-0.5 active:scale-95 transition-all cursor-pointer"
              >
                <Trophy className="w-5 h-5 text-amber-900 fill-amber-300" />
                <span className="leading-tight">ランキング<br/>をみる</span>
              </button>
            </div>
            <div className="mt-1.5 text-[10px] font-bold text-amber-800 flex items-center gap-1">
              <span>⚡</span>
              <span>すばやく答えるとスピード加点！全国ハイスコアをめざそう</span>
            </div>
          </div>

          {/* クイズ設定カード */}
          <div className="w-full space-y-4 bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-lg border border-indigo-100">

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
      )}
    </div>
  );
};
