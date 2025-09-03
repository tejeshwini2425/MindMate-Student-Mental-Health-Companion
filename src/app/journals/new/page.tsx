// src/app/journals/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewJournalPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const mood = String(form.get('mood') || '').trim()
    const entry = String(form.get('entry') || '').trim()

    if (!mood || !entry) {
      setError('Please provide a mood and an entry.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/journals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood, entry }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Failed to create entry')
      }
      router.push('/journals')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4">New Reflection</h1>

      <form className="space-y-4" onSubmit={onSubmit}>
        {error && <div className="text-red-400">{error}</div>}

        <label className="block">
          <div className="text-sm mb-1">Mood</div>
          <input name="mood" placeholder="e.g., Anxious, Hopeful" className="w-full border rounded px-3 py-2" />
        </label>

        <label className="block">
          <div className="text-sm mb-1">Reflection</div>
          <textarea name="entry" rows={6} placeholder="Write what you're feeling..." className="w-full border rounded px-3 py-2" />
        </label>

        <div>
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={loading}>
            {loading ? 'Saving…' : 'Save Reflection'}
          </button>
        </div>
      </form>
    </div>
  )
}
