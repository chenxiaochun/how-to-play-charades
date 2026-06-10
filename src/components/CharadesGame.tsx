"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/i18n/types";
import { playGameSound } from "@/lib/sounds";
import type { Locale } from "@/lib/site";
import {
  getUniqueRandomWord,
  type Category,
  type Difficulty,
} from "@/lib/word-database";

type CharadesGameProps = {
  locale: Locale;
  dict: Dictionary;
};

type HistoryItem = { word: string; correct: boolean };

export function CharadesGame({ locale, dict }: CharadesGameProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeLimit, setTimeLimit] = useState(60);
  const [category, setCategory] = useState<Category | "all">("all");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [currentWord, setCurrentWord] = useState(dict.game.clickStart);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const usedWordsRef = useRef<Set<string>>(new Set());
  const historyRef = useRef<HistoryItem[]>([]);

  useEffect(() => {
    historyRef.current = history;
  }, [history]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const nextWord = useCallback(() => {
    const word = getUniqueRandomWord(
      locale,
      category,
      difficulty,
      usedWordsRef.current,
    );
    setCurrentWord(word);
    return word;
  }, [locale, category, difficulty]);

  const finishRound = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setShowHistory(historyRef.current.length > 0);
    setTimeLeft(timeLimit);
  }, [clearTimer, timeLimit]);

  const startRound = () => {
    clearTimer();
    usedWordsRef.current.clear();
    setHistory([]);
    historyRef.current = [];
    setShowHistory(false);
    setTimeLeft(timeLimit);
    setIsRunning(true);
    nextWord();

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          setShowHistory(historyRef.current.length > 0);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const recordResult = (correct: boolean) => {
    if (!isRunning || currentWord === dict.game.clickStart) return;
    playGameSound(correct ? "correct" : "wrong");
    setHistory((prev) => {
      const next = [...prev, { word: currentWord, correct }];
      historyRef.current = next;
      return next;
    });
    nextWord();
  };

  const skipWord = () => {
    if (!isRunning || currentWord === dict.game.clickStart) return;
    nextWord();
  };

  const resetToMenu = () => {
    finishRound();
    setCurrentWord(dict.game.clickStart);
    setShowHistory(false);
  };

  useEffect(() => () => clearTimer(), [clearTimer]);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <section id="game" className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
      <h2 className="mb-6 text-center text-2xl font-bold text-[#2c3e50]">
        {dict.game.settingsTitle}
      </h2>

      {!isRunning && (
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <label className="block text-sm font-semibold text-[#2c3e50]">
            {dict.game.category}
            <select
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category | "all")}
            >
              <option value="all">{dict.game.allCategories}</option>
              <option value="animals">{dict.game.animals}</option>
              <option value="movies">{dict.game.movies}</option>
              <option value="sports">{dict.game.sports}</option>
              <option value="food">{dict.game.food}</option>
              <option value="famous">{dict.game.famous}</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-[#2c3e50]">
            {dict.game.difficulty}
            <select
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Difficulty)}
            >
              <option value="easy">{dict.game.easy}</option>
              <option value="medium">{dict.game.medium}</option>
              <option value="hard">{dict.game.hard}</option>
            </select>
          </label>
          <label className="block text-sm font-semibold text-[#2c3e50]">
            {dict.game.timeLimit}
            <input
              type="number"
              min={10}
              max={300}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
              value={timeLimit}
              onChange={(e) => {
                const value = Number(e.target.value) || 60;
                setTimeLimit(value);
                if (!isRunning) setTimeLeft(value);
              }}
            />
          </label>
        </div>
      )}

      {showHistory && history.length > 0 && (
        <div className="mb-6 rounded-xl bg-[#f8f9fa] p-4">
          <h3 className="mb-3 text-center font-semibold text-[#2c3e50]">
            {dict.game.historyTitle}
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {history.map((item, i) => (
              <div
                key={`${item.word}-${i}`}
                className={`flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm shadow-sm ${
                  item.correct
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
                }`}
              >
                <span>{item.word}</span>
                <span className={item.correct ? "text-green-600" : "text-red-600"}>
                  {item.correct
                    ? dict.game.correctStatus
                    : dict.game.wrongStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4 min-h-[120px] rounded-xl bg-[#f8f9fa] px-4 py-8 text-center text-2xl font-bold tracking-wide text-[#2c3e50] md:text-4xl">
        {currentWord}
      </div>

      <div
        className={`mb-6 text-center text-4xl font-bold md:text-5xl ${
          timeLeft <= 10
            ? "text-red-500"
            : timeLeft <= 20
              ? "text-orange-500"
              : "text-[#ff5e62]"
        }`}
      >
        {minutes}:{seconds}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          className="btn-primary"
          onClick={() => (isRunning ? finishRound() : startRound())}
        >
          {isRunning ? dict.game.endGame : dict.game.startGame}
        </button>
        <button
          type="button"
          className="rounded-full bg-green-500 px-6 py-3 font-bold text-white transition hover:bg-green-600 disabled:opacity-50"
          onClick={() => recordResult(true)}
          disabled={!isRunning}
        >
          {dict.game.correct}
        </button>
        <button
          type="button"
          className="rounded-full bg-red-500 px-6 py-3 font-bold text-white transition hover:bg-red-600 disabled:opacity-50"
          onClick={() => recordResult(false)}
          disabled={!isRunning}
        >
          {dict.game.wrong}
        </button>
        <button
          type="button"
          className="rounded-full bg-gray-500 px-6 py-3 font-bold text-white transition hover:bg-gray-600 disabled:opacity-50"
          onClick={skipWord}
          disabled={!isRunning}
        >
          {dict.game.skip}
        </button>
        {isRunning && (
          <button
            type="button"
            className="btn-secondary"
            onClick={resetToMenu}
          >
            {dict.game.backToMenu}
          </button>
        )}
      </div>
    </section>
  );
}
