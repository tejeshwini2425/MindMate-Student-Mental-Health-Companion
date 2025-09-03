import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all vision board items
export async function GET() {
  try {
    const items = await prisma.visionItem.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch vision board items" },
      { status: 500 }
    );
  }
}

// POST a new vision board item
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, image, category } = body;

    if (!text && !image) {
      return NextResponse.json(
        { error: "Text or image is required" },
        { status: 400 }
      );
    }

    const newItem = await prisma.visionItem.create({
      data: { text: text || "", image, category },
    });
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create vision board item" },
      { status: 500 }
    );
  }
}
