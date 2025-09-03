"use client";

import { useState } from "react";

type Badge = {
  name: string;
  description: string;
  icon: string;
};

export default function RewardsPage() {
  const [streak, setStreak] = useState(3); // Example: 3-day streak
  const [badges, setBadges] = useState<Badge[]>([
    { name: "Starter 🌱", description: "Completed your first activity!", icon: "🌱" },
  ]);

  const allBadges: Badge[] = [
    { name: "Starter 🌱", description: "Completed your first activity!", icon: "🌱" },
    { name: "Consistency 🔥", description: "7 days streak in a row!", icon: "🔥" },
    { name: "Mindful Master 🌸", description: "30 mindful check-ins", icon: "🌸" },
    { name: "Gratitude Guru 💖", description: "Logged 10 gratitude entries", icon: "💖" },
    { name: "Night Owl 🌙", description: "Used sleep aid 5 times", icon: "🌙" },
  ];

  // Unlock badge when streak hits milestones
  const unlockBadge = () => {
    if (streak === 7 && !badges.find((b) => b.name === "Consistency 🔥")) {
      setBadges([...badges, allBadges[1]]);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">🏆 Rewards & Badges</h1>
      <p className="text-gray-600 mb-6">
        Stay consistent with your mental health journey and unlock rewards!
      </p>

      {/* Streak Tracker */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6 text-center">
        <h2 className="text-lg font-semibold mb-2">🔥 Current Streak</h2>
        <p className="text-4xl font-bold text-indigo-600 mb-3">{streak} Days</p>
        <button
          onClick={() => {
            setStreak(streak + 1);
            unlockBadge();
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Log Today’s Activity
        </button>
      </div>

      {/* Badges */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">🎖️ Your Badges</h2>
        <div className="grid grid-cols-2 gap-4">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span className="text-3xl">{badge.icon}</span>
              <p className="font-medium mt-2">{badge.name}</p>
              <p className="text-xs text-gray-500 text-center">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
