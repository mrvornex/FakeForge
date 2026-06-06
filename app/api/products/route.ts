// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateProduct, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

// Generate all products once (cached at module level)
const ALL_PRODUCTS = Array.from({ length: TOTALS.products }, (_, i) => generateProduct(i + 1));
const ALL_CATEGORIES = [...new Set(ALL_PRODUCTS.map(p => p.category))].sort();

// ─── GET /api/products ────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  let items = [...ALL_PRODUCTS];

  // Search
  if (q.q) {
    const search = q.q.toLowerCase();
    items = items.filter(p =>
      p.title.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.brand.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search)
    );
  }

  const total = items.length;
  items = applySort(items, q.sortBy, q.order);
  const paginated = items.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json(
    { products: selected, total, skip: q.skip, limit: q.limit },
    { headers: CORS_HEADERS }
  );
}

// ─── POST /api/products ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newId = TOTALS.products + 1;
    // Generate defaults first, then user body overrides everything, id is always newId
    const defaults = generateProduct(newId);
    const newProduct = { ...defaults, ...body, id: newId };
    return NextResponse.json(newProduct, { status: 201, headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}