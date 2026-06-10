// app/api/products/categories/route.ts
import { NextResponse } from "next/server";
import { generateProduct, TOTALS } from "@/lib/faker";
import { CORS_HEADERS } from "@/lib/api";

const ALL_PRODUCTS  = Array.from({ length: TOTALS.products }, (_, i) => generateProduct(i + 1));
const ALL_CATEGORIES = [...new Set(ALL_PRODUCTS.map(p => p.category))].sort().map(slug => ({
  slug, name: slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
  url: `https://fakeforge.vercel.app/api/products/category/${slug}`,
}));

export async function GET() {
  return NextResponse.json(ALL_CATEGORIES, { headers: CORS_HEADERS });
}