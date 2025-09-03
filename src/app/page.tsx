"use client";

import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, login } = useAuth();
  const [greeting, setGreeting] = useState("Hello");
  const router = useRouter();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  if (user) {
    router.push("/dashboard");
    return null;
  }

  return (
    <main className="text-center py-10 px-4">
      <h1 className="text-2xl font-bold">
        {greeting}, welcome to MindfulPath 🌱
      </h1>

      <button
        onClick={() => {
          login("Student123");
          router.push("/dashboard");
        }}
        className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Login as Student
      </button>

      {/* Mood Tracker */}
      <div className="mt-6 flex justify-center gap-3">
        {["😊", "😐", "😢", "😡"].map((mood) => (
          <button
            key={mood}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {mood}
          </button>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 text-left max-w-2xl mx-auto">
        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="font-semibold">📊 Quick Stats</h2>
          <p>Journal Entries: 12</p>
          <p>Streak: 5 days</p>
          <p>Last Login: 1 Sept 2025</p>
        </div>

        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="font-semibold">📝 Daily Journal</h2>
          <button className="mt-2 w-full px-4 py-2 bg-indigo-500 text-white rounded-lg">
            + Add New Entry
          </button>
        </div>

        <div className="p-4 rounded-xl shadow bg-white">
          <h2 className="font-semibold">📚 Resources</h2>
          <ul className="mt-2 space-y-1">
            <li>🧘 Meditation Guide</li>
            <li>💡 Coping Strategies</li>
            <li>🌸 Self-care Articles</li>
          </ul>
        </div>

        <div className="p-4 rounded-xl shadow bg-white md:col-span-2">
          <h2 className="font-semibold">🤝 Community & Support</h2>
          <div className="mt-2 flex gap-3">
            <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg">
              Talk to a Counselor
            </button>
            <button className="flex-1 px-4 py-2 border rounded-lg">
              Join a Group
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
