// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateUser, generatePost, generateTodo, generateCart, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

const ALL_POSTS = Array.from({ length: TOTALS.posts },    (_, i) => generatePost(i + 1));
const ALL_TODOS = Array.from({ length: TOTALS.todos },    (_, i) => generateTodo(i + 1));
const ALL_CARTS = Array.from({ length: TOTALS.carts },    (_, i) => generateCart(i + 1));

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const delay = parseInt(req.nextUrl.searchParams.get("delay") ?? "0");
  await applyDelay(delay);
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.users)
    return notFound(`User with id '${idStr}' not found`);

  const pathParts = req.nextUrl.pathname.split("/");
  const sub = pathParts[pathParts.length - 1];

  if (sub === "posts") {
    const posts = ALL_POSTS.filter(p => p.userId === id);
    return NextResponse.json({ posts, total: posts.length, skip: 0, limit: posts.length }, { headers: CORS_HEADERS });
  }
  if (sub === "todos") {
    const todos = ALL_TODOS.filter(t => t.userId === id);
    return NextResponse.json({ todos, total: todos.length, skip: 0, limit: todos.length }, { headers: CORS_HEADERS });
  }
  if (sub === "carts") {
    const carts = ALL_CARTS.filter(c => c.userId === id);
    return NextResponse.json({ carts, total: carts.length, skip: 0, limit: carts.length }, { headers: CORS_HEADERS });
  }
  return NextResponse.json(generateUser(id), { headers: CORS_HEADERS });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.users) return notFound(`User with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generateUser(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.users) return notFound(`User with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generateUser(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.users) return notFound(`User with id '${idStr}' not found`);
  return NextResponse.json({ ...generateUser(id), isDeleted: true, deletedOn: new Date().toISOString() }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}