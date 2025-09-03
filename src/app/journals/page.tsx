// src/app/journals/page.tsx

type Journal = {
  id: number
  title: string
  content: string
}

export default function JournalsPage() {
  // Dummy journal data for now — later we’ll fetch from Prisma
  const journals: Journal[] = [
    { id: 1, title: "Day 1", content: "Felt good" },
    { id: 2, title: "Day 2", content: "A bit tired but managed well" },
    { id: 3, title: "Day 3", content: "Feeling more positive today" },
  ]

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Journals</h1>
      <div className="space-y-4">
        {journals.map((j: Journal) => (
          <div
            key={j.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold">{j.title}</h2>
            <p className="text-gray-600">{j.content}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
