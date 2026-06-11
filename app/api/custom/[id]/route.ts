// app/api/custom/[id]/route.ts  — GET: return stored JSON
import { NextRequest, NextResponse } from "next/server";
import { notFound, CORS_HEADERS } from "@/lib/api";

// Same store — must be in shared module for production
// For now using module-level map (works on same instance)
const store = new Map<string, unknown>();

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = store.get(id);
  if (!data) return notFound(`Custom response '${id}' not found or has expired.`);
  return NextResponse.json(data, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}