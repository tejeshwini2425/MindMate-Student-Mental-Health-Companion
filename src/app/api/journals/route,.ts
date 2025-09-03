// src/app/api/journals/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const journals = await prisma.journal.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(journals)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { mood, entry } = body || {}

    if (!mood || !entry) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const created = await prisma.journal.create({
      data: { mood, entry },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Server error' }, { status: 500 })
  }
}
