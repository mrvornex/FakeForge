// app/api/recipes/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateRecipe, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_RECIPES = Array.from({ length: TOTALS.recipes }, (_, i) => generateRecipe(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  const search = q.q.toLowerCase();
  const items = search
    ? ALL_RECIPES.filter(r =>
        r.name.toLowerCase().includes(search) ||
        r.cuisine.toLowerCase().includes(search)
      )
    : ALL_RECIPES;

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ recipes: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}