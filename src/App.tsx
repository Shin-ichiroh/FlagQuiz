import { useState } from "react";
import type { AppScreen, GameSettings, QuizQuestion, QuizResultRecord } from "./types";
import { SettingsScreen } from "./components/SettingsScreen";
import { QuizScreen } from "./components/QuizScreen";
import { ResultScreen } from "./components/ResultScreen";
import { RankingScreen } from "./components/RankingScreen";
import { PuzzleScreen } from "./components/PuzzleScreen";
import { AssemblyPuzzleScreen } from "./components/AssemblyPuzzleScreen";
import { ColoringScreen } from "./components/ColoringScreen";
import { CapitalMatchingScreen } from "./components/CapitalMatchingScreen";
import { FlagDominoScreen } from "./components/FlagDominoScreen";
import { FlagAkinatorScreen } from "./components/FlagAkinatorScreen";
import { generateQuizQuestions } from "./utils/quizGenerator";
import { getSavedPlayerName } from "./utils/ranking";

export function App() {
  const [screen, setScreen] = useState<AppScreen>("settings");
  const [settings, setSettings] = useState<GameSettings>({
    playerName: getSavedPlayerName(),
    questionCount: 10,
    timeLimit: 10,
    mode: "random",
    region: "all",
    showRuby: true,
    soundEnabled: true,
    speechEnabled: true,
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

  return (
    <main className="min-h-screen w-full bg-slate-100 flex flex-col justify-start">
      {screen === "settings" && (
        <SettingsScreen
          settings={settings}
          onUpdateSettings={setSettings}
          onStartGame={handleStartGame}
          onViewRanking={() => setScreen("ranking")}
          onStartPuzzle={() => setScreen("puzzle")}
          onStartAssembly={() => setScreen("assembly")}
          onStartColoring={() => setScreen("coloring")}
          onStartCapitalMatch={() => setScreen("capital_match")}
          onStartDomino={() => setScreen("domino")}
          onStartAkinator={() => setScreen("akinator")}
        />
      )}

      {screen === "quiz" && (
        <QuizScreen
          questions={questions}
          settings={settings}
          onFinish={handleFinishQuiz}
          onQuit={() => setScreen("settings")}
        />
      )}

      {screen === "result" && (
        <ResultScreen
          results={results}
          settings={settings}
          onRestart={() => setScreen("settings")}
          onViewRanking={() => setScreen("ranking")}
        />
      )}

      {screen === "ranking" && (
        <RankingScreen onBack={() => setScreen("settings")} />
      )}

      {screen === "puzzle" && (
        <PuzzleScreen
          onBack={() => setScreen("settings")}
          showRuby={settings.showRuby}
        />
      )}

      {screen === "assembly" && (
        <AssemblyPuzzleScreen
          onBack={() => setScreen("settings")}
          showRuby={settings.showRuby}
        />
      )}

      {screen === "coloring" && (
        <ColoringScreen
          onBack={() => setScreen("settings")}
          showRuby={settings.showRuby}
        />
      )}

      {screen === "capital_match" && (
        <CapitalMatchingScreen
          onBack={() => setScreen("settings")}
          showRuby={settings.showRuby}
        />
      )}

      {screen === "domino" && (
        <FlagDominoScreen
          onBack={() => setScreen("settings")}
          showRuby={settings.showRuby}
        />
      )}

      {screen === "akinator" && (
        <FlagAkinatorScreen
          onBack={() => setScreen("settings")}
          showRuby={settings.showRuby}
        />
      )}
    </main>
  );
}

export default App;
