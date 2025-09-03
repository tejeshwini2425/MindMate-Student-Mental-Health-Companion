"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Affirmation {
  id: number;
  content: string;
  createdAt: string;
}

const defaultAffirmations = [
  "I am worthy of love and respect.",
  "I choose to be kind to myself today.",
  "I am capable of achieving my dreams.",
  "I trust in my ability to handle whatever comes my way.",
  "I am grateful for the good things in my life.",
  "I deserve happiness and peace.",
  "I am growing stronger every day.",
  "I choose thoughts that serve me well.",
  "I am enough just as I am.",
  "I radiate positive energy.",
];

export default function AffirmationsPage() {
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [newAffirmation, setNewAffirmation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load affirmations from localStorage or use defaults
    const saved = localStorage.getItem("affirmations");
    if (saved) {
      setAffirmations(JSON.parse(saved));
    } else {
      // Initialize with default affirmations
      const initialAffirmations = defaultAffirmations.map((content, index) => ({
        id: index + 1,
        content,
        createdAt: new Date().toISOString(),
      }));
      setAffirmations(initialAffirmations);
      localStorage.setItem("affirmations", JSON.stringify(initialAffirmations));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAffirmation.trim()) return;

    setIsLoading(true);
    const newAff = {
      id: Date.now(),
      content: newAffirmation.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [...affirmations, newAff];
    setAffirmations(updated);
    localStorage.setItem("affirmations", JSON.stringify(updated));
    setNewAffirmation("");
    setIsLoading(false);
  };

  const deleteAffirmation = (id: number) => {
    const updated = affirmations.filter((aff) => aff.id !== id);
    setAffirmations(updated);
    localStorage.setItem("affirmations", JSON.stringify(updated));
  };

  const filteredAffirmations = selectedCategory === "all"
    ? affirmations
    : affirmations.filter((aff) => {
        const daysSince = Math.floor(
          (Date.now() - new Date(aff.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (selectedCategory === "recent") return daysSince <= 7;
        if (selectedCategory === "today") return daysSince === 0;
        return true;
      });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">
          🌞 Daily Affirmations
        </h1>
        <p className="text-gray-600">
          Positive statements to uplift your spirit and mindset
        </p>
      </motion.div>

      {/* Add New Affirmation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
          <textarea
            value={newAffirmation}
            onChange={(e) => setNewAffirmation(e.target.value)}
            placeholder="Write your personal affirmation here..."
            className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
            rows={3}
          />
          <button
            type="submit"
            disabled={isLoading || !newAffirmation.trim()}
            className="mt-4 w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Adding..." : "✨ Add Affirmation"}
          </button>
        </form>
      </motion.div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-8">
        {[
          { key: "all", label: "All", emoji: "📚" },
          { key: "today", label: "Today", emoji: "🌅" },
          { key: "recent", label: "Recent", emoji: "🕐" },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setSelectedCategory(filter.key)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              selectedCategory === filter.key
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {filter.emoji} {filter.label}
          </button>
        ))}
      </div>

      {/* Affirmations Grid */}
      <div className="grid gap-4 max-w-4xl mx-auto">
        {filteredAffirmations.map((affirmation, idx) => (
          <motion.div
            key={affirmation.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 border border-gray-100 relative group"
          >
            <div className="flex justify-between items-start">
              <p className="text-gray-800 text-lg leading-relaxed flex-1">
                {affirmation.content}
              </p>
              <button
                onClick={() => deleteAffirmation(affirmation.id)}
                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity ml-4"
              >
                🗑️
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {new Date(affirmation.createdAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))}
      </div>

      {filteredAffirmations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-gray-500 text-lg">
            {selectedCategory === "all"
              ? "No affirmations yet. Start by adding your first one above! 🌱"
              : `No ${selectedCategory} affirmations found.`}
          </p>
        </motion.div>
      )}

      {/* Back button */}
      <div className="text-center mt-10">
        <Link
          href="/dashboard"
          className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
