import React, { useEffect, useState, useRef } from "react";
import type { QuizQuestion, GameSettings, QuizResultRecord } from "../types";
import { getFlagUrl } from "../utils/quizGenerator";
import { CountryMap } from "./CountryMap";
import { soundEffect } from "../utils/sound";
import { speech } from "../utils/speech";
import { COUNTRY_FACTS } from "../data/countryFacts";
import { calculateQuestionScore } from "../utils/ranking";
import { X, Volume2, VolumeX, CheckCircle, XCircle, AlertCircle, Zap, ArrowRight, Mic, MicOff } from "lucide-react";

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
  const [speechOn, setSpeechOn] = useState(settings.speechEnabled);
  const [lastScoreGain, setLastScoreGain] = useState<{ total: number; speedBonus: number } | null>(null);

  const currentQuestion = questions[currentIndex];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoNextTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 音声読み上げの設定同期
  useEffect(() => {
    speech.setEnabled(speechOn);
  }, [speechOn]);

  // 新しい問題が出題されたときの音声読み上げ
  useEffect(() => {
    if (!speechOn) return;
    if (currentQuestion.type === "compare") {
      speech.speak(currentQuestion.prompt);
    } else if (currentQuestion.type === "name_to_flag" || currentQuestion.type === "name_to_shape") {
      speech.speak(currentQuestion.country.name);
    } else if (currentQuestion.type === "trivia") {
      speech.speak(currentQuestion.prompt);
    } else {
      speech.speak(currentQuestion.prompt);
    }
  }, [currentIndex, speechOn]);

  // 累計スコア
  const currentTotalScore = results.reduce((sum, r) => sum + r.questionScore, 0);

  // タイマー管理
  useEffect(() => {
    if (isAnswered) return;
    if (settings.timeLimit <= 0) return; // 無制限

    setTimeLeft(settings.timeLimit);
    setStartTime(Date.now());
    setLastScoreGain(null);

    const interval = 100;
    const step = 0.1;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        const next = Math.max(0, prev - step);
        if (next <= 0) {
          clearInterval(timerRef.current!);
          handleTimeUp();
          return 0;
        }
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

  // クリーンアップ
  useEffect(() => {
    return () => {
      if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    };
  }, []);

  // 時間切れ
  const handleTimeUp = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedOptionIndex(null);
    soundEffect.playWrong();

    const timeSpent = settings.timeLimit;
    const scoreResult = calculateQuestionScore(false, timeSpent, settings.timeLimit);
    setLastScoreGain({ total: 0, speedBonus: 0 });

    const record: QuizResultRecord = {
      question: currentQuestion,
      selectedOptionIndex: null,
      isCorrect: false,
      timeTaken: timeSpent,
      speedBonus: scoreResult.speedBonus,
      questionScore: scoreResult.totalScore,
    };

    const newResults = [...results, record];
    setResults(newResults);

    // トリビア・国くらべ問題は読む時間を確保（5秒）、通常は1.8秒
    const waitTime = currentQuestion.type === "trivia" || currentQuestion.type === "compare" ? 5000 : 1800;
    if (speechOn) {
      speech.speak(`正解は、${currentQuestion.country.name}です。`);
    }
    autoNextTimeoutRef.current = setTimeout(() => {
      goToNext(newResults);
    }, waitTime);
  };

  // 選択肢タップ
  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    if (timerRef.current) clearInterval(timerRef.current);

    setIsAnswered(true);
    setSelectedOptionIndex(index);

    const isCorrect = currentQuestion.options[index].isCorrect;
    const timeSpent = Math.max(0.2, (Date.now() - startTime) / 1000);
    const scoreResult = calculateQuestionScore(isCorrect, timeSpent, settings.timeLimit);
    setLastScoreGain({ total: scoreResult.totalScore, speedBonus: scoreResult.speedBonus });

    if (isCorrect) {
      soundEffect.playCorrect();
    } else {
      soundEffect.playWrong();
    }

    const fact = COUNTRY_FACTS[currentQuestion.country.code.toLowerCase()];
    if (speechOn) {
      if (isCorrect) {
        let msg = `正解！${currentQuestion.country.name}！`;
        if (fact && fact.greeting) {
          msg += ` ご挨拶は、${fact.greeting}`;
        }
        speech.speak(msg);
      } else {
        speech.speak(`残念！正解は、${currentQuestion.country.name}です。`);
      }
    }

    const record: QuizResultRecord = {
      question: currentQuestion,
      selectedOptionIndex: index,
      isCorrect,
      timeTaken: Math.min(timeSpent, settings.timeLimit || 999),
      speedBonus: scoreResult.speedBonus,
      questionScore: scoreResult.totalScore,
    };

    const newResults = [...results, record];
    setResults(newResults);

    // トリビア・国くらべ問題は読む時間をたっぷり確保（4.5秒）、通常は1.8秒
    const waitTime = currentQuestion.type === "trivia" || currentQuestion.type === "compare" ? 5000 : 1800;
    autoNextTimeoutRef.current = setTimeout(() => {
      goToNext(newResults);
    }, waitTime);
  };

  // 「つぎへ」ボタン押下（手動送り）
  const handleManualNext = () => {
    if (autoNextTimeoutRef.current) clearTimeout(autoNextTimeoutRef.current);
    soundEffect.playTap();
    goToNext(results);
  };

  const goToNext = (currentResults: QuizResultRecord[]) => {
    if (currentIndex + 1 >= questions.length) {
      onFinish(currentResults);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
      setLastScoreGain(null);
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    soundEffect.setEnabled(next);
  };

  const timePercent = settings.timeLimit > 0 ? (timeLeft / settings.timeLimit) * 100 : 100;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between max-w-md mx-auto relative overflow-hidden select-none pb-6">
      {/* 上部ヘッダー & スコア表示 */}
      <div className="bg-white px-4 pt-3 pb-2 shadow-xs z-10">
        <div className="flex items-center justify-between mb-1.5">
          <button
            onClick={onQuit}
            className="p-1.5 -ml-1 text-slate-400 hover:text-slate-600 rounded-full active:bg-slate-100"
            aria-label="もどる"
          >
            <X className="w-5 h-5" />
          </button>

          {/* プレイヤー名 ＆ 現在スコア */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-indigo-900 bg-indigo-50 px-2.5 py-1 rounded-full">
              だい {currentIndex + 1} / {questions.length} もん
            </span>
            <span className="text-xs font-black text-amber-900 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              {currentTotalScore.toLocaleString()} 点
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const next = !speechOn;
                setSpeechOn(next);
                speech.setEnabled(next);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full active:bg-slate-100"
              aria-label="こえ"
              title="こえ"
            >
              {speechOn ? <Mic className="w-5 h-5 text-indigo-600" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleSound}
              className="p-1.5 -mr-1 text-slate-400 hover:text-slate-600 rounded-full active:bg-slate-100"
              aria-label="おと"
              title="おと"
            >
              {soundOn ? <Volume2 className="w-5 h-5 text-indigo-600" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 制限時間バー */}
        {settings.timeLimit > 0 ? (
          <div className="w-full mt-1">
            <div className="flex justify-between items-center text-xs font-bold mb-1">
              <span className="text-slate-400 text-[10px]">のこりじかん（はやく答えるとボーナス！）</span>
              <span
                className={`font-mono text-xs font-black ${
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
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
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
        <div className="text-center mb-2">
          <p className="text-base font-black text-slate-800">
            {settings.showRuby && currentQuestion.promptRuby
              ? currentQuestion.promptRuby
              : currentQuestion.prompt}
          </p>
        </div>

        {/* 1. パターン: 国旗から国名当て、またはトリビア */}
        {(currentQuestion.type === "flag_to_name" || currentQuestion.type === "trivia") && (
          <div className="w-full flex flex-col items-center justify-center my-1">
            <div className="relative rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white w-64 h-38 max-w-full flex items-center justify-center">
              <img
                src={getFlagUrl(currentQuestion.country.code, 640)}
                alt="国旗"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
          </div>
        )}


        {/* 2. パターン: 周辺地図（ロケーション）から国名当て */}
        {currentQuestion.type === "location_to_name" && (
          <div className="w-full flex flex-col items-center justify-center my-1">
            <div className="relative rounded-2xl overflow-hidden shadow-md border-4 border-white bg-white w-64 h-44 max-w-full flex items-center justify-center">
              <CountryMap
                countryCode={currentQuestion.country.code}
                showSurroundings={true}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* 3. パターン: シルエットから国名当て */}
        {currentQuestion.type === "shape_to_name" && (
          <div className="w-full flex flex-col items-center justify-center my-1">
            <div className="relative rounded-2xl overflow-hidden shadow-md border-4 border-white bg-indigo-50/50 w-64 h-44 max-w-full flex items-center justify-center p-2">
              <CountryMap
                countryCode={currentQuestion.country.code}
                showSurroundings={false}
                highlightColor="#4f46e5"
                targetStrokeColor="#3730a3"
                targetStrokeWidth={1.5}
                className="w-full h-full"
              />
            </div>
          </div>
        )}

        {/* 3. パターン: 国名から国旗当て / 国名からシルエット当て */}
        {(currentQuestion.type === "name_to_flag" || currentQuestion.type === "name_to_shape") && (
          <div className="my-2 px-6 py-4 bg-white rounded-3xl shadow-sm border-2 border-indigo-100 text-center w-full max-w-xs">
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

        {/* 4. パターン: 国くらべ（面積・人口） */}
        {currentQuestion.type === "compare" && (
          <div className="my-2 px-4 py-3 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 rounded-2xl border border-amber-200 text-center w-full max-w-sm">
            <div className="text-xs font-black text-amber-900 flex items-center justify-center gap-1 mb-1">
              <span>⚔️ 国くらべ対決！</span>
              <span className="bg-amber-200 text-amber-800 text-[10px] px-2 py-0.5 rounded-full font-bold">
                {currentQuestion.compareType === "area" ? "面積のひろさ" : "人口のおおさ"}
              </span>
            </div>
            <p className="text-sm font-black text-slate-800">
              どちらの国のほうが
              {currentQuestion.compareType === "area" ? "広い（面積が大きい）" : "人口が多い"}
              かな？
            </p>
          </div>
        )}

        {/* 解答演出 & 加点表示バナー */}
        {isAnswered && (
          <div
            className={`w-full my-2 p-2 rounded-2xl text-center flex flex-col items-center justify-center font-black text-sm shadow-md animate-bounce ${
              selectedOptionIndex === null
                ? "bg-amber-500 text-white"
                : currentQuestion.options[selectedOptionIndex].isCorrect
                ? "bg-emerald-500 text-white"
                : "bg-rose-500 text-white"
            }`}
          >
            <div className="flex items-center gap-1.5">
              {selectedOptionIndex === null ? (
                <>
                  <AlertCircle className="w-4 h-4" />
                  <span>じかんぎれ！ ざんねん！</span>
                </>
              ) : currentQuestion.options[selectedOptionIndex].isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>せいかい！ +{lastScoreGain?.total.toLocaleString()}点</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>ざんねん！ まちがい！</span>
                </>
              )}
            </div>
            {lastScoreGain && lastScoreGain.speedBonus > 0 && (
              <span className="text-[10px] font-bold text-amber-200 mt-0.5 flex items-center gap-1">
                ⚡ スピードボーナス +{lastScoreGain.speedBonus}点！
              </span>
            )}
          </div>
        )}
      </div>

      {/* 選択肢ボタンエリア */}
      <div className="px-4 w-full">
        {/* パターンA: 国旗4択 */}
        {currentQuestion.type === "name_to_flag" && (
          <div className="grid grid-cols-2 gap-2.5">
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
                  className={`p-2 rounded-2xl transition-all flex flex-col items-center justify-center active:scale-95 shadow-xs ${btnClass}`}
                >
                  <div className="w-full h-18 rounded-lg overflow-hidden flex items-center justify-center bg-slate-50">
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
        )}

        {/* パターンB: シルエット4択 */}
        {currentQuestion.type === "name_to_shape" && (
          <div className="grid grid-cols-2 gap-2.5">
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
                  className={`p-2 rounded-2xl transition-all flex flex-col items-center justify-center active:scale-95 shadow-xs ${btnClass}`}
                >
                  <div className="w-full h-20 rounded-lg overflow-hidden flex items-center justify-center bg-indigo-50/40 p-1">
                    <CountryMap
                      countryCode={option.shapeCode!}
                      showSurroundings={false}
                      highlightColor="#4f46e5"
                      targetStrokeColor="#3730a3"
                      targetStrokeWidth={1.5}
                      className="w-full h-full"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* パターンC: 国くらべ 2択カード */}
        {currentQuestion.type === "compare" && (
          <div className="grid grid-cols-2 gap-3">
            {currentQuestion.options.map((option, idx) => {
              let cardBorder = "border-2 border-slate-200 hover:border-indigo-300 bg-white";
              if (isAnswered) {
                if (option.isCorrect) {
                  cardBorder = "bg-emerald-50 border-4 border-emerald-500 shadow-lg ring-2 ring-emerald-300 scale-[1.02]";
                } else if (idx === selectedOptionIndex) {
                  cardBorder = "bg-rose-50 border-4 border-rose-500 opacity-70";
                } else {
                  cardBorder = "bg-white border-2 border-slate-200 opacity-40";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`p-3 rounded-2xl transition-all flex flex-col items-center justify-between active:scale-95 shadow-sm text-center min-h-[160px] ${cardBorder}`}
                >
                  {/* 国旗 */}
                  <div className="w-full h-18 rounded-xl overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-100 p-1 mb-2">
                    <img
                      src={getFlagUrl(option.countryCode!, 320)}
                      alt={option.text}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* 国名 & ふりがな */}
                  <div className="w-full">
                    {settings.showRuby && option.ruby && (
                      <span className="text-[10px] font-bold text-indigo-500 block leading-none mb-0.5">
                        {option.ruby}
                      </span>
                    )}
                    <span className="text-base font-black text-slate-800 leading-tight block">
                      {option.text}
                    </span>
                  </div>

                  {/* 解答後に数値を表示 */}
                  {isAnswered && option.factValue && (
                    <div className="mt-2 w-full py-1 px-2 rounded-lg bg-slate-100 font-mono text-xs font-black text-indigo-900 border border-slate-200 animate-fadeIn">
                      {option.factValue}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* パターンD: テキスト4択（国名当て、トリビア） */}
        {(currentQuestion.type === "flag_to_name" || currentQuestion.type === "shape_to_name" || currentQuestion.type === "location_to_name" || currentQuestion.type === "trivia") && (
          <div className="flex flex-col gap-2">
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
                  className={`w-full py-3 px-4 rounded-2xl font-black text-base transition-all text-center flex flex-col items-center justify-center active:scale-95 shadow-xs ${btnClass}`}
                >
                  {settings.showRuby && option.ruby && (
                    <span className={`text-[10px] font-bold block leading-none mb-0.5 ${
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

      {/* 解説カード ＆ あいさつ ＆ 「つぎへ」ボタン */}
      {isAnswered && currentQuestion.explanation && (
        <div className="px-4 mt-2">
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 font-medium leading-relaxed shadow-xs flex flex-col gap-2">
            <div className="whitespace-pre-line">
              <span className="font-bold text-amber-800 mr-1">💡 まめちしき:</span>
              {currentQuestion.explanation}
            </div>

            {/* 世界のあいさつ再生ボタン */}
            {(() => {
              const fact = COUNTRY_FACTS[currentQuestion.country.code.toLowerCase()];
              if (fact && fact.greeting) {
                return (
                  <div className="bg-white/80 rounded-xl p-2 border border-amber-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                      <span>🗣️ 現地のごあいさつ:</span>
                      <span className="text-indigo-700 font-black">「{fact.greeting}」</span>
                      <span className="text-[10px] text-slate-500">({fact.greetingLang})</span>
                    </div>
                    <button
                      onClick={() => speech.speak(`現地の言葉で、${fact.greeting}`)}
                      className="p-1 px-2.5 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[10px] flex items-center gap-1 active:scale-95 transition-all shrink-0 border border-indigo-200"
                      title="音声をきく"
                    >
                      <Volume2 className="w-3 h-3 text-indigo-600" />
                      きく
                    </button>
                  </div>
                );
              }
              return null;
            })()}

            {/* 自分のペースで進める「つぎへ」ボタン */}
            <div className="flex justify-end pt-1">
              <button
                onClick={handleManualNext}
                className="py-1.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs rounded-full shadow-xs flex items-center gap-1 active:scale-95 transition-all"
              >
                <span>つぎへ進む</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
