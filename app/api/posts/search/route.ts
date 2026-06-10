// app/api/posts/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generatePost, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_POSTS = Array.from({ length: TOTALS.posts }, (_, i) => generatePost(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  const search = q.q.toLowerCase();
  const items = search
    ? ALL_POSTS.filter(p =>
        p.title.toLowerCase().includes(search) ||
        p.body.toLowerCase().includes(search)
      )
    : ALL_POSTS;

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ posts: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}