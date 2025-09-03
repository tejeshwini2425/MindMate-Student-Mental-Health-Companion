"use client";

import { useState } from "react";

const copingSuggestions: Record<string, string[]> = {
  anxious: [
    "🧘 Try a 3-minute breathing exercise: Inhale 4 sec, hold 4 sec, exhale 4 sec.",
    "🎧 Listen to calming rain or ocean sounds for 5 minutes.",
    "✍️ Write down 3 things that are in your control right now."
  ],
  sad: [
    "💛 Text a close friend or loved one, even just 'Hey'.",
    "🌞 Step outside for 10 minutes of fresh air.",
    "🙏 Try writing 1 thing you’re grateful for today."
  ],
  stressed: [
    "🚶 Take a 5-minute walk away from screens.",
    "🕒 Use the Pomodoro technique: 25 min focus, 5 min break.",
    "🍵 Drink water or herbal tea slowly and mindfully."
  ],
  tired: [
    "😴 Close your eyes and take 10 deep belly breaths.",
    "📱 Put your phone away for 10 minutes before sleeping.",
    "🎶 Play gentle music or white noise while you rest."
  ],
};

export default function CopingPage() {
  const [mood, setMood] = useState<string | null>(null);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Coping Tips</h1>
      <p className="text-gray-600 mb-6">
        Select how you feel, and get instant personalized tips. 💛
      </p>

      {/* Mood Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {["anxious", "sad", "stressed", "tired"].map((m) => (
          <button
            key={m}
            onClick={() => setMood(m)}
            className={`py-3 rounded-xl font-semibold ${
              mood === m ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {m.charAt(0).toUpperCase() + m.slice(1)}
          </button>
        ))}
      </div>

      {/* Suggestions */}
      {mood && (
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3">Tips for feeling {mood}:</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {copingSuggestions[mood].map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
