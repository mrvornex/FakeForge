// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePost, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_POSTS = Array.from({ length: TOTALS.posts }, (_, i) => generatePost(i + 1));

// ─── GET /api/posts ────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  let items = [...ALL_POSTS];
  if (q.q) {
    const s = q.q.toLowerCase();
    items = items.filter(p => p.title.toLowerCase().includes(s) || p.body.toLowerCase().includes(s));
  }

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ posts: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const newId = TOTALS.posts + 1;
  const defaults = generatePost(newId);
  return NextResponse.json({ ...defaults, ...body, id: newId }, { status: 201, headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}