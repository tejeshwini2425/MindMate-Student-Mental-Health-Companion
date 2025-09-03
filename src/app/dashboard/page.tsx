"use client";

import { useAuth } from "@/providers/AuthProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <main className="text-center py-10">
        <h1 className="text-xl">⚠️ You must log in first</h1>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go to Login
        </Link>
      </main>
    );
  }

    return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Welcome back, <span className="text-indigo-600">{user?.name}</span> 🌱
        </h1>
        <p className="text-gray-600">Signed in as {user?.name}</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Journals Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">📝 Journals</h2>
          <p className="text-gray-600 text-sm mb-4">
            Reflect on your thoughts and feelings daily.
          </p>
          <a
            href="/journals"
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            Go to Journals →
          </a>
        </div>

        {/* Manifestations Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">✨ Manifestations</h2>
          <p className="text-gray-600 text-sm mb-4">
            Track and manifest your goals with positivity.
          </p>
          <a
            href="/manifestations"
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            Explore Manifestations →
          </a>
        </div>

        {/* Mood Tracker Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">📊 Mood Tracker</h2>
          <p className="text-gray-600 text-sm mb-4">
            Record how you feel each day and spot patterns.
          </p>
          <a
            href="/mood-tracker"
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            Start Tracking →
          </a>
        </div>

        {/* Resources Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h2 className="text-lg font-semibold mb-2">📚 Resources</h2>
          <p className="text-gray-600 text-sm mb-4">
            Helpful guides, tips, and mental health resources.
          </p>
          <a
            href="/resources"
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            Browse Resources →
          </a>
        </div>
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition col-span-1 sm:col-span-2">
        <h2 className="text-lg font-semibold mb-4">🌟 Support Dashboard</h2>

        {/* Positive Quote */}
        <div className="mb-4">
          <p className="text-gray-600 italic">
            "Believe in yourself and all that you are. 🌱"
          </p>
        </div>

        {/* Breathing Tips */}
        <div className="mb-4">
          <h3 className="font-medium text-sm">🌬 Breathing Tip</h3>
          <p className="text-gray-600 text-sm">
            Inhale for 4s → Hold for 4s → Exhale for 4s → Repeat 3 times.
          </p>
        </div>

        {/* Progress Chart (mock data for now) */}
        <div className="h-48">
          <p className="text-gray-500 text-sm">Mood Progress Chart (coming soon...)</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
  <h2 className="text-lg font-semibold mb-2">🌈 Vision Board</h2>
  <p className="text-gray-600 text-sm mb-4">
    Collect your goals and inspirations in one place.
  </p>
  <a
    href="/vision-board"
    className="text-indigo-600 text-sm font-medium hover:underline"
  >
    Open Vision Board →
  </a>
  {/* Vision Board Card */}
<div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
  <h2 className="text-lg font-semibold mb-2">🌈 Vision Board</h2>
  <p className="text-gray-600 text-sm mb-4">
    Add goals and images to build your dream board.
  </p>
  <a
    href="/vision-board"
    className="text-indigo-600 text-sm font-medium hover:underline"
  >
    Open Vision Board →
  </a>
</div>

</div>

{/* Affirmations Card */}
<div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
  <h2 className="text-lg font-semibold mb-2">🌞 Daily Affirmations</h2>
  <p className="text-gray-600 text-sm mb-4">
    Gentle reminders to uplift your day.
  </p>
  <a
    href="/affirmations"
    className="text-indigo-600 text-sm font-medium hover:underline"
  >
    Explore Affirmations →
  </a>
</div>

{/* Gratitude Prayer Link */}
  <div
  onClick={() => router.push("/gratitude")}
  className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 text-white shadow-md rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:scale-105 transition transform"
>
  <h2 className="text-lg font-semibold mb-2">🙏 Gratitude Prayer</h2>
  <p className="text-sm opacity-90">
    Explore powerful prayers & gratitude reflections with magical animations.
  </p>
</div>

<Link
  href="/venting-box"
  className="block p-4 bg-pink-100 rounded-xl hover:bg-pink-200"
>
  💭 Safe Venting Box
</Link>

<Link
  href="/habit-tracker"
  className="block p-4 bg-blue-100 rounded-xl hover:bg-blue-200"
>
  📊 Habit Tracker
</Link>


<Link
  href="/buddy-system"
  className="block p-4 bg-blue-100 rounded-xl hover:bg-blue-200"
>
  👫 Buddy System
</Link>

<Link
  href="/sos"
  className="block p-4 bg-red-100 rounded-xl hover:bg-red-200"
>
  🚨 Emergency SOS
</Link>

<Link
  href="/sleep"
  className="block p-4 bg-indigo-100 rounded-xl hover:bg-indigo-200"
>
  🌙 Sleep Aid
</Link>
<Link
  href="/rewards"
  className="block p-4 bg-yellow-100 rounded-xl hover:bg-yellow-200"
>
  🏆 Rewards
</Link>



<Link
  href="/coping"
  className="block p-4 bg-indigo-100 rounded-xl hover:bg-indigo-200"
>
  🤖 AI Coping Tips
</Link>



      <button
  onClick={logout}
  className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
>
  Logout
</button>

      </div>

    </div>
  );
}