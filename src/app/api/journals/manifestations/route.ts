import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all manifestations
export async function GET() {
  try {
    const manifestations = await prisma.manifestation.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(manifestations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch manifestations" },
      { status: 500 }
    );
  }
}

// POST a new manifestation
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newManifestation = await prisma.manifestation.create({
      data: { content: body.content },
    });
    return NextResponse.json(newManifestation);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create manifestation" },
      { status: 500 }
    );
  }
}
