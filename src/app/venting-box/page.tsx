"use client";
import { useState, useEffect } from "react";

export default function VentingBoxPage() {
  const [text, setText] = useState("");
  const [logs, setLogs] = useState<{id:number; text:string; createdAt:string}[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("venting_logs");
    if (saved) setLogs(JSON.parse(saved));
  }, []);

  const handleSave = () => {
    if (!text.trim()) return;
    const newLog = { id: Date.now(), text, createdAt: new Date().toISOString() };
    const updated = [...logs, newLog];
    setLogs(updated);
    localStorage.setItem("venting_logs", JSON.stringify(updated));
    setText("");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">📝 Safe Venting Box</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your frustrations here..."
        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleSave}
        className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Save & Release
      </button>

      <div className="mt-6">
        {logs.map((log) => (
          <p key={log.id} className="text-gray-600 italic mb-2">
            {log.text} — <span className="text-xs">{new Date(log.createdAt).toLocaleString()}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
