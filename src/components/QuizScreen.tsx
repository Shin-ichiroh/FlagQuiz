import React, { useEffect, useState, useRef } from "react";
import type { QuizQuestion, GameSettings, QuizResultRecord } from "../types";
import { getFlagUrl } from "../utils/quizGenerator";
import { soundEffect } from "../utils/sound";
import { X, Volume2, VolumeX, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface QuizScreenProps {
  questions: QuizQuestion[];
  settings: GameSettings;
  onFinish: (results: QuizResultRecord[]) => void;
  onQuit: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  settings,
  onFinish,
  onQuit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [results, setResults] = useState<QuizResultRecord[]>([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(settings.timeLimit);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [soundOn, setSoundOn] = useState(settings.soundEnabled);

  const currentQuestion = questions[currentIndex];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // タイマー管理
  useEffect(() => {
    if (isAnswered) return;
    if (settings.timeLimit <= 0) return; // 無制限

    setTimeLeft(settings.timeLimit);
    setStartTime(Date.now());

    const interval = 100; // 100msごとに減少
    const step = 0.1;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - step);
        if (next <= 0) {
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
        // 3秒以下の時、各整数秒でカチ音
        if (next <= 3 && Math.floor(next) !== Math.floor(prev)) {
          soundEffect.playTick();
        }
        return next;
      });
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAnswered, settings.timeLimit]);

  // 時間切れ時の自動進行
  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionIndex(null);
    soundEffect.playWrong();

    const timeSpent = settings.timeLimit;
    const record: QuizResultRecord = {
      question: currentQuestion,
      selectedOptionIndex: null,
      isCorrect: false,
      timeTaken: timeSpent,
    };

    const newResults = [...results, record];
    setResults(newResults);

    // 1.8秒後に自動で次へ
    setTimeout(() => {
      goToNext(newResults);
    }, 1800);
  };

  // 選択肢タップ時
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsAnswered(true);
    setSelectedOptionIndex(index);

    const isCorrect = currentQuestion.options[index].isCorrect;
    const timeSpent = (Date.now() - startTime) / 1000;

    if (isCorrect) {
      soundEffect.playCorrect();
    } else {
      soundEffect.playWrong();
    }

    const record: QuizResultRecord = {
      question: currentQuestion,
      selectedOptionIndex: index,
      isCorrect,
      timeTaken: Math.min(timeSpent, settings.timeLimit || 999),
    };

    const newResults = [...results, record];
    setResults(newResults);

    // 1.5秒後に自動で次へ
    setTimeout(() => {
      goToNext(newResults);
    }, 1500);
  };

  const goToNext = (currentResults: QuizResultRecord[]) => {
    if (currentIndex + 1 >= questions.length) {
      onFinish(currentResults);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
    }
  };

  // サウンド切り替え
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEffect.setEnabled(next);
  };

  // タイマー割合
  const timePercent =
    settings.timeLimit > 0 ? (timeLeft / settings.timeLimit) * 100 : 100;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between max-w-md mx-auto relative overflow-hidden select-none pb-6">
      {/* 上部ヘッダー & プログレス */}
      <div className="bg-white px-4 pt-3 pb-2 shadow-xs z-10">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={onQuit}
            className="p-2 -ml-2 text-slate-400 hover:text-slate-600 rounded-full active:bg-slate-100"
            aria-label="もどる"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-sm font-black text-indigo-900 bg-indigo-50 px-3 py-1 rounded-full">
            だい {currentIndex + 1} / {questions.length} もん
          </div>

          <button
            onClick={toggleSound}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-full active:bg-slate-100"
            aria-label="おと"
          >
            {soundOn ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* 制限時間バー（タイマー有効時） */}
        {settings.timeLimit > 0 ? (
          <div className="w-full">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-slate-400">のこりじかん</span>
              <span
                className={`font-mono text-sm font-black ${
                  timeLeft <= 2 ? "text-rose-600 animate-pulse" : "text-indigo-600"
                }`}
              >
                {timeLeft.toFixed(1)} 秒
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-100 ease-linear rounded-full ${
                  timeLeft <= 1.5
                    ? "bg-rose-500"
                    : timeLeft <= 3
                    ? "bg-amber-400"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${timePercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* クイズ出題メインエリア */}
      <div className="flex-1 px-4 py-2 flex flex-col justify-center items-center">
        {/* 出題プロンプト */}
        <div className="text-center mb-3">
          <p className="text-base font-black text-slate-800">
            {settings.showRuby && currentQuestion.promptRuby
              ? currentQuestion.promptRuby
              : currentQuestion.prompt}
          </p>
        </div>

        {/* パターンAまたはトリビア: 国旗を大きく表示 */}
        {currentQuestion.type !== "name_to_flag" && (
          <div className="w-full flex flex-col items-center justify-center my-1">
            <div className="relative rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white w-64 h-40 max-w-full flex items-center justify-center">
              <img
                src={getFlagUrl(currentQuestion.country.code, 640)}
                alt="国旗"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </div>
        )}

        {/* パターンB: 国名を大きく表示 */}
        {currentQuestion.type === "name_to_flag" && (
          <div className="my-3 px-6 py-4 bg-white rounded-3xl shadow-sm border-2 border-indigo-100 text-center w-full max-w-xs">
            {settings.showRuby && (
              <span className="block text-xs font-bold text-indigo-500 mb-0.5">
                {currentQuestion.country.ruby}
              </span>
            )}
            <span className="text-2xl font-black text-indigo-950">
              {currentQuestion.country.name}
            </span>
          </div>
        )}

        {/* 解答・時間切れ時の演出バナー */}
        {isAnswered && (
          <div
            className={`w-full my-2 p-2.5 rounded-2xl text-center flex items-center justify-center gap-2 font-black text-sm animate-bounce shadow-md ${
              selectedOptionIndex === null
                ? "bg-amber-500 text-white"
                : currentQuestion.options[selectedOptionIndex].isCorrect
                ? "bg-emerald-500 text-white"
                : "bg-rose-500 text-white"
            }`}
          >
            {selectedOptionIndex === null ? (
              <>
                <AlertCircle className="w-5 h-5" />
                <span>じかんぎれ！ ざんねん！</span>
              </>
            ) : currentQuestion.options[selectedOptionIndex].isCorrect ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>せいかい！ すごい！！</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span>ざんねん！ まちがい！</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* 選択肢ボタンエリア */}
      <div className="px-4 w-full">
        {currentQuestion.type === "name_to_flag" ? (
          // パターンB: 4つの国旗画像グリッド
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "bg-white border-2 border-slate-200 hover:border-slate-300";
              if (isAnswered) {
                if (option.isCorrect) {
                  btnClass = "bg-emerald-50 border-4 border-emerald-500 shadow-md ring-2 ring-emerald-300";
                } else if (idx === selectedOptionIndex) {
                  btnClass = "bg-rose-50 border-4 border-rose-500 opacity-60";
                } else {
                  btnClass = "bg-white border-2 border-slate-200 opacity-30";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-2.5 rounded-2xl transition-all flex flex-col items-center justify-center active:scale-95 shadow-sm ${btnClass}`}
                >
                  <div className="w-full h-20 rounded-lg overflow-hidden flex items-center justify-center bg-slate-50">
                    <img
                      src={getFlagUrl(option.flagCode!, 320)}
                      alt="選択肢国旗"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          // パターンA & C: 4つのテキスト選択肢
          <div className="flex flex-col gap-2.5">
            {currentQuestion.options.map((option, idx) => {
              let btnClass = "bg-white border-2 border-slate-200 hover:border-indigo-200 text-slate-800";
              if (isAnswered) {
                if (option.isCorrect) {
                  btnClass = "bg-emerald-500 border-2 border-emerald-600 text-white shadow-md";
                } else if (idx === selectedOptionIndex) {
                  btnClass = "bg-rose-500 border-2 border-rose-600 text-white";
                } else {
                  btnClass = "bg-white border-2 border-slate-100 text-slate-300 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full py-3.5 px-4 rounded-2xl font-black text-base transition-all text-center flex flex-col items-center justify-center active:scale-95 shadow-xs ${btnClass}`}
                >
                  {settings.showRuby && option.ruby && (
                    <span className={`text-[11px] font-bold block leading-none mb-1 ${
                      isAnswered && (option.isCorrect || idx === selectedOptionIndex)
                        ? "text-white/80"
                        : "text-indigo-500"
                    }`}>
                      {option.ruby}
                    </span>
                  )}
                  <span>{option.text}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 解説カード（回答後に表示） */}
      {isAnswered && currentQuestion.explanation && (
        <div className="px-4 mt-2">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 font-medium leading-relaxed">
            <span className="font-bold text-amber-800 mr-1">💡 まめちしき:</span>
            {currentQuestion.explanation}
          </div>
        </div>
      )}
    </div>
  );
};
