// app/api/quotes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateQuote, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_QUOTES = Array.from({ length: TOTALS.quotes }, (_, i) => generateQuote(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  let items = [...ALL_QUOTES];
  if (q.q) {
    const s = q.q.toLowerCase();
    items = items.filter(qt => qt.quote.toLowerCase().includes(s) || qt.author.toLowerCase().includes(s));
  }

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ quotes: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}