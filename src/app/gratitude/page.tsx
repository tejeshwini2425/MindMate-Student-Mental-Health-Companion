"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function GratitudePage() {
  const prayers = [
    {
      title: "🌿 Teach Me Gratitude",
      author: "Rebecca Ruiz",
      text: `Holy Spirit, open my heart to understand how precious I am to you,
      how loved I am by you. Open the eyes of my soul, to see the gifts you have put before me this day.
      Give me the grace to recognize each encounter with you.
      Teach me to respond in gratitude, to grow in gratitude.
      Teach me to be generous, as you are generous with me, and to collaborate with you in serving my sister and my brother
      for your greater glory.`,
    },
    {
      title: "🌸 Gratitude to You",
      author: "Beth McLendon",
      text: `Loving Lord, as I express my gratitude to you in prayer, may it be a pleasing, joyful sound to you.
      Thank you, Lord, for your love. It brings me acceptance and significance.
      Thank you, Lord, for your truth. It brings me guidance and direction.
      Thank you, Lord, for your mercy. It brings me help and comfort.
      Thank you, Lord, for your faithfulness. It brings me stability and strength.
      Thank you, Lord, for your beauty displayed in the earth. It brings me joy and delight.
      Thank you, Lord, for your way of redemption - the cross. It brings me salvation and regeneration.`,
    },
    {
      title: "🌼 Making Our Souls Great",
      author: "Abraham Joshua Heschel",
      text: `To pray is to regain a sense of the mystery that animates all beings,
      the divine margin in all attainments. Prayer is our humble answer to the inconceivable surprise of living.
      It is all we can offer in return. Who is worthy to be present at the constant unfolding of time?
      Here we are amidst the meditation of the land, the songs of the water, the humility of the flowers...
      It is gratefulness which makes our small souls great.`,
    },
    {
      title: "🌷 Show My Gratitude",
      author: "Kelli Mahoney",
      text: `Thank you, Lord, for the blessings you have bestowed on my life.
      You have provided me with more than I could ever have imagined. You have surrounded me with people who always look out for me.
      You have given me family and friends who bless me every day with kind words and actions.
      Also, thank you, Lord, for keeping me safe. You protect me from those things that seem to haunt others.
      I am extremely grateful for all of your blessings in my life, Lord. I pray that you remind me of just how blessed I am
      and that I never forget to show my gratitude in prayer and acts of kindness.`,
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white px-6 py-10">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 text-purple-800"
      >
        🙏 Gratitude Prayers
      </motion.h1>

      {/* Prayer Cards */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        {prayers.map((prayer, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 border border-purple-100 relative overflow-hidden"
          >
            {/* Floating magical particles */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              animate={{
                background:
                  "radial-gradient(circle at 20% 30%, rgba(233,213,255,0.3) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(255,228,230,0.3) 0%, transparent 60%)",
              }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            />

            <h2 className="text-xl font-semibold mb-3 text-purple-700">
              {prayer.title}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {prayer.text}
            </p>
            <p className="text-right mt-4 text-sm italic text-gray-500">
              — {prayer.author}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Back button */}
      <div className="text-center mt-10">
        <Link
          href="/dashboard"
          className="inline-block px-6 py-2 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 transition"
        >
          ⬅ Back to Dashboard
        </Link>
      </div>
    </main>
  );
}
