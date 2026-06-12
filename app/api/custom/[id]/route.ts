// app/api/custom/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { CORS_HEADERS } from "@/lib/api";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const raw = await kv.get<string>(`custom:${id}`);
    if (!raw) {
      return NextResponse.json(
        { message: `Custom response '${id}' not found or has expired.` },
        { status: 404, headers: CORS_HEADERS }
      );
    }
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    return NextResponse.json(data, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json(
      { message: "Error retrieving data." },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await kv.del(`custom:${id}`);
  return NextResponse.json({ id, deleted: true }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}