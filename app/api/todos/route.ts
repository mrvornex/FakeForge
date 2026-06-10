// app/api/todos/route.ts + [id]/route.ts combined reference
import { NextRequest, NextResponse } from "next/server";
import { generateTodo, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

const ALL_TODOS = Array.from({ length: TOTALS.todos }, (_, i) => generateTodo(i + 1));

// GET /api/todos
export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  let items = [...ALL_TODOS];
  if (q.q) {
    const s = q.q.toLowerCase();
    items = items.filter(t => t.todo.toLowerCase().includes(s));
  }

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ todos: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}

// GET /api/todos/random
export function getRandomTodo() {
  const id = Math.floor(Math.random() * TOTALS.todos) + 1;
  return NextResponse.json(generateTodo(id), { headers: CORS_HEADERS });
}

// GET /api/todos/:id
export function getTodoById(id: number) {
  if (id < 1 || id > TOTALS.todos) return notFound(`Todo with id '${id}' not found`);
  return NextResponse.json(generateTodo(id), { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}