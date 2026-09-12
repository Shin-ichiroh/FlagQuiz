import { useState } from "react";
import type { GameSettings, QuizQuestion, QuizResultRecord } from "./types";
import { SettingsScreen } from "./components/SettingsScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { generateQuizQuestions } from "./utils/quizGenerator";

export function App() {
  const [screen, setScreen] = useState<"settings" | "quiz" | "result">("settings");
  const [settings, setSettings] = useState<GameSettings>({
    questionCount: 10,
    timeLimit: 10,
    mode: "random",
    region: "all",
    showRuby: true,
    soundEnabled: true,
  });

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [results, setResults] = useState<QuizResultRecord[]>([]);

  // クイズ開始
  const handleStartGame = () => {
    const generated = generateQuizQuestions(
      settings.questionCount,
      settings.mode,
      settings.region
    );
    setQuestions(generated);
    setResults([]);
    setScreen("quiz");
  };

  // クイズ完了
  const handleFinishQuiz = (finalResults: QuizResultRecord[]) => {
    setResults(finalResults);
    setScreen("result");
  };

  // タイトルに戻る
  const handleRestart = () => {
    setScreen("settings");
  };

  return (
    <main className="min-h-screen w-full bg-slate-100 flex flex-col justify-start">
      {screen === "settings" && (
        <SettingsScreen
          settings={settings}
          onUpdateSettings={setSettings}
          onStartGame={handleStartGame}
        />
      )}

      {screen === "quiz" && (
        <QuizScreen
          questions={questions}
          settings={settings}
          onFinish={handleFinishQuiz}
          onQuit={handleRestart}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          results={results}
          settings={settings}
          onRestart={handleRestart}
        />
      )}
    </main>
  );
}

export default App;
