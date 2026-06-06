// lib/api.ts — shared API utilities for all route handlers

import { NextRequest, NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ListQuery {
  limit: number; skip: number;
  select: string[]; sortBy: string; order: "asc" | "desc";
  q: string; delay: number;
}

// ─── Parse common query params ────────────────────────────────────────────────
export function parseQuery(req: NextRequest): ListQuery {
  const s = req.nextUrl.searchParams;
  return {
    limit:  Math.min(Math.max(parseInt(s.get("limit")  ?? "30"), 1), 100),
    skip:   Math.max(parseInt(s.get("skip")   ?? "0"), 0),
    select: s.get("select") ? s.get("select")!.split(",").map(f => f.trim()) : [],
    sortBy: s.get("sortBy") ?? "",
    order:  (s.get("order") ?? "asc") as "asc" | "desc",
    q:      s.get("q") ?? "",
    delay:  Math.min(parseInt(s.get("delay") ?? "0"), 5000),
  };
}

// ─── Apply select (pick only requested fields) ────────────────────────────────
export function applySelect<T extends object>(items: T[], fields: string[]): Partial<T>[] {
  if (!fields.length) return items;
  return items.map(item =>
    Object.fromEntries(fields.map(f => [f, (item as Record<string,unknown>)[f]])) as Partial<T>
  );
}

// ─── Apply sort ───────────────────────────────────────────────────────────────
export function applySort<T extends object>(items: T[], sortBy: string, order: "asc" | "desc"): T[] {
  if (!sortBy) return items;
  return [...items].sort((a, b) => {
    const av = (a as Record<string,unknown>)[sortBy];
    const bv = (b as Record<string,unknown>)[sortBy];
    if (typeof av === "number" && typeof bv === "number") return order === "asc" ? av - bv : bv - av;
    if (typeof av === "string" && typeof bv === "string") return order === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    return 0;
  });
}

// ─── Delay helper ─────────────────────────────────────────────────────────────
export async function applyDelay(ms: number) {
  if (ms > 0) await new Promise(r => setTimeout(r, ms));
}

// ─── Standard list response ───────────────────────────────────────────────────
export function listResponse<T extends object>(
  allItems: T[], q: ListQuery, resourceKey: string, total: number
) {
  let items = allItems;
  if (q.q) {
    const search = q.q.toLowerCase();
    items = items.filter(item =>
      Object.values(item).some(v => String(v).toLowerCase().includes(search))
    );
  }
  items = applySort(items, q.sortBy, q.order);
  const paginated = items.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);
  return NextResponse.json({
    [resourceKey]: selected,
    total,
    skip: q.skip,
    limit: q.limit,
  });
}

// ─── 404 helper ───────────────────────────────────────────────────────────────
export function notFound(msg: string) {
  return NextResponse.json({ message: msg }, { status: 404 });
}

// ─── CORS headers (optional, useful for public API) ───────────────────────────
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};