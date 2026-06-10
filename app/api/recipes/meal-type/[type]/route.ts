// app/api/recipes/meal-type/[type]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateRecipe, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

const ALL_RECIPES = Array.from({ length: TOTALS.recipes }, (_, i) => generateRecipe(i + 1));
const VALID_TYPES = ["breakfast", "lunch", "dinner", "snack", "dessert"];

export async function GET(req: NextRequest, { params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const q = parseQuery(req);
  await applyDelay(q.delay);

  if (!VALID_TYPES.includes(type.toLowerCase()))
    return notFound(`Meal type '${type}' not found. Valid types: ${VALID_TYPES.join(", ")}`);

  const items = ALL_RECIPES.filter(r =>
    r.mealType.some(m => m.toLowerCase() === type.toLowerCase())
  );

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ recipes: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}