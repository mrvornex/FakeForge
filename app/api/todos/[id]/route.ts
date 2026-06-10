// app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateTodo, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  await applyDelay(parseInt(req.nextUrl.searchParams.get("delay") ?? "0"));

  // Handle /api/todos/random
  if (idStr === "random") {
    const randomId = Math.floor(Math.random() * TOTALS.todos) + 1;
    return NextResponse.json(generateTodo(randomId), { headers: CORS_HEADERS });
  }

  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.todos)
    return notFound(`Todo with id '${idStr}' not found`);
  return NextResponse.json(generateTodo(id), { headers: CORS_HEADERS });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.todos)
    return notFound(`Todo with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generateTodo(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.todos)
    return notFound(`Todo with id '${idStr}' not found`);
  return NextResponse.json({ ...generateTodo(id), isDeleted: true, deletedOn: new Date().toISOString() }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}