// app/api/custom/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { CORS_HEADERS } from "@/lib/api";

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export async function GET() {
  return NextResponse.json({
    message: "POST your JSON to get a unique URL.",
    example: {
      method: "POST",
      url: "https://fakeforge.vercel.app/api/custom",
      body: { name: "Ali", role: "admin" },
    },
  }, { headers: CORS_HEADERS });
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
      return NextResponse.json({ message: "JSON too large. Max 5 MB." }, { status: 413 });
    }

    const id = generateId();
    // Store in KV with 7 day expiry
    await kv.set(`custom:${id}`, JSON.stringify(data), { ex: 60 * 60 * 24 * 7 });

    return NextResponse.json({
      id,
      url: `https://fakeforge.vercel.app/api/custom/${id}`,
      size,
      expiresIn: "7 days",
      createdAt: new Date().toISOString(),
    }, { status: 201, headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}