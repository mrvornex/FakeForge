// app/api/custom/route.ts  — POST: store JSON, return unique URL
import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS } from "@/lib/api";

// In-memory store (resets on cold start — for production use Redis/DB)
const store = new Map<string, unknown>();

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = body.data ?? body;

    if (!data || typeof data !== "object") {
      return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
    }

    const size = JSON.stringify(data).length;
    if (size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "JSON too large. Max size is 5 MB." }, { status: 413 });
    }

    const id  = generateId();
    store.set(id, data);

    return NextResponse.json({
      id,
      url: `https://fakeforge.vercel.app/api/custom/${id}`,
      size,
      createdAt: new Date().toISOString(),
    }, { status: 201, headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}