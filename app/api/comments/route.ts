// app/api/comments/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateComment, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_COMMENTS = Array.from({ length: TOTALS.comments }, (_, i) => generateComment(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  let items = [...ALL_COMMENTS];
  if (q.q) {
    const s = q.q.toLowerCase();
    items = items.filter(c => c.body.toLowerCase().includes(s));
  }

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ comments: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const newId = TOTALS.comments + 1;
  const defaults = generateComment(newId);
  return NextResponse.json({ ...defaults, ...body, id: newId }, { status: 201, headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}