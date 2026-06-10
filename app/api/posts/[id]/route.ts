// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePost, generateComment, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

const ALL_COMMENTS = Array.from({ length: TOTALS.comments }, (_, i) => generateComment(i + 1));

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  await applyDelay(parseInt(req.nextUrl.searchParams.get("delay") ?? "0"));
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.posts) return notFound(`Post with id '${idStr}' not found`);

  const pathParts = req.nextUrl.pathname.split("/");
  const sub = pathParts[pathParts.length - 1];
  if (sub === "comments") {
    const comments = ALL_COMMENTS.filter(c => c.postId === id);
    return NextResponse.json({ comments, total: comments.length, skip: 0, limit: comments.length }, { headers: CORS_HEADERS });
  }
  return NextResponse.json(generatePost(id), { headers: CORS_HEADERS });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.posts) return notFound(`Post with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generatePost(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.posts) return notFound(`Post with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generatePost(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.posts) return notFound(`Post with id '${idStr}' not found`);
  return NextResponse.json({ ...generatePost(id), isDeleted: true, deletedOn: new Date().toISOString() }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}