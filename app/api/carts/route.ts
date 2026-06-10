// app/api/carts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateCart, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_CARTS = Array.from({ length: TOTALS.carts }, (_, i) => generateCart(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  const total     = ALL_CARTS.length;
  const sorted    = applySort(ALL_CARTS, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ carts: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const newId = TOTALS.carts + 1;
  const defaults = generateCart(newId);
  return NextResponse.json({ ...defaults, ...body, id: newId }, { status: 201, headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}