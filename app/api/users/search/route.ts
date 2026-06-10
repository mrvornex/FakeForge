// app/api/users/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateUser, TOTALS } from "@/lib/faker";
import { parseQuery, applySort, applySelect, applyDelay, CORS_HEADERS } from "@/lib/api";

const ALL_USERS = Array.from({ length: TOTALS.users }, (_, i) => generateUser(i + 1));

export async function GET(req: NextRequest) {
  const q = parseQuery(req);
  await applyDelay(q.delay);

  const search = q.q.toLowerCase();
  const items = search
    ? ALL_USERS.filter(u =>
        u.firstName.toLowerCase().includes(search) ||
        u.lastName.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.username.toLowerCase().includes(search)
      )
    : ALL_USERS;

  const total     = items.length;
  const sorted    = applySort(items, q.sortBy, q.order);
  const paginated = sorted.slice(q.skip, q.skip + q.limit);
  const selected  = applySelect(paginated, q.select);

  return NextResponse.json({ users: selected, total, skip: q.skip, limit: q.limit }, { headers: CORS_HEADERS });
}