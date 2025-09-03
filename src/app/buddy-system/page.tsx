"use client";
import { useState, useEffect } from "react";

export default function BuddySystemPage() {
  const [myName, setMyName] = useState("");
  const [buddyName, setBuddyName] = useState("");
  const [savedPair, setSavedPair] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("buddy_pair");
    if (saved) setSavedPair(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    const pair = { myName, buddyName, lastCheckIn: new Date().toISOString() };
    localStorage.setItem("buddy_pair", JSON.stringify(pair));
    setSavedPair(pair);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">👫 Buddy System</h1>
      {!savedPair ? (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={myName}
            onChange={(e) => setMyName(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Buddy's Name"
            value={buddyName}
            onChange={(e) => setBuddyName(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
          >
            Pair Up
          </button>
        </>
      ) : (
        <div className="bg-white shadow p-4 rounded-lg">
          <p>✅ You’re paired with <strong>{savedPair.buddyName}</strong></p>
          <p className="mt-2 italic">Check-in: “Did you drink water today?” 💧</p>
        </div>
      )}
    </div>
  );
}
