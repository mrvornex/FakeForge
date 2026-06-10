// app/api/comments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateComment, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  await applyDelay(parseInt(req.nextUrl.searchParams.get("delay") ?? "0"));
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.comments)
    return notFound(`Comment with id '${idStr}' not found`);
  return NextResponse.json(generateComment(id), { headers: CORS_HEADERS });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.comments)
    return notFound(`Comment with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generateComment(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.comments)
    return notFound(`Comment with id '${idStr}' not found`);
  return NextResponse.json({ ...generateComment(id), isDeleted: true, deletedOn: new Date().toISOString() }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}