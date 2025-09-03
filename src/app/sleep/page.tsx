"use client";

import { useState } from "react";

export default function SleepPage() {
  const [reminder, setReminder] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);

  const sounds = [
    { name: "Rain 🌧️", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
    { name: "Ocean 🌊", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { name: "White Noise 🎶", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  ];

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">🌙 Sleep Aid</h1>
      <p className="text-gray-600 mb-6">
        Create a peaceful bedtime routine with reminders and calming sounds.
      </p>

      {/* Bedtime Reminder */}
      <div className="bg-white p-5 rounded-xl shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">⏰ Set Bedtime Reminder</h2>
        <input
          type="time"
          className="border rounded-lg px-3 py-2 w-full mb-3"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
        {reminder && (
          <p className="text-green-600 font-medium">
            ✅ Reminder set for {reminder}
          </p>
        )}
      </div>

      {/* Relaxing Sounds */}
      <div className="bg-white p-5 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-3">🎵 Relaxing Sounds</h2>
        <div className="space-y-3">
          {sounds.map((sound) => (
            <button
              key={sound.name}
              onClick={() => {
                if (playing === sound.url) {
                  const audio = document.getElementById("audio") as HTMLAudioElement;
                  audio.pause();
                  setPlaying(null);
                } else {
                  const audio = document.getElementById("audio") as HTMLAudioElement;
                  audio.src = sound.url;
                  audio.play();
                  setPlaying(sound.url);
                }
              }}
              className={`w-full py-2 rounded-lg font-medium ${
                playing === sound.url ? "bg-indigo-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {playing === sound.url ? `⏸ Stop ${sound.name}` : `▶️ Play ${sound.name}`}
            </button>
          ))}
        </div>
        <audio id="audio" loop />
      </div>
    </div>
  );
}
