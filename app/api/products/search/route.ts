// app/api/products/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateProduct, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_PRODUCTS = Array.from({ length: TOTALS.products }, (_, i) => generateProduct(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  const search = q.q.toLowerCase();
  let items = search
    ? ALL_PRODUCTS.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search)
      )
    : ALL_PRODUCTS;

  const total = items.length;
  items = applySort(items, q.sortBy, q.order);
  const paginated = items.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ products: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}