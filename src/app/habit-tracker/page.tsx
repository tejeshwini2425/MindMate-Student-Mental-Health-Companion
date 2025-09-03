"use client";
import { useState, useEffect } from "react";

type Habit = {
  id: number;
  name: string;
  progress: boolean[];
};

const initialHabits: Habit[] = [
  { id: 1, name: "Sleep", progress: Array(7).fill(false) },
  { id: 2, name: "Hydration", progress: Array(7).fill(false) },
];

export default function HabitTrackerPage() {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);

  useEffect(() => {
    const saved = localStorage.getItem("habits");
    if (saved) setHabits(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const toggleProgress = (habitId: number, dayIndex: number) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === habitId
          ? { ...h, progress: h.progress.map((done, i) => (i === dayIndex ? !done : done)) }
          : h
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">📊 Habit Tracker</h1>
      {habits.map((habit) => (
        <div key={habit.id} className="mb-6">
          <p className="font-semibold">{habit.name}</p>
          <div className="flex gap-2 mt-2">
            {habit.progress.map((done, idx) => (
              <button
                key={idx}
                onClick={() => toggleProgress(habit.id, idx)}
                className={`w-10 h-10 rounded-full ${
                  done ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                {["S", "M", "T", "W", "T", "F", "S"][idx]}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
