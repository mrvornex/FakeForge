// app/api/quotes/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateQuote, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  await applyDelay(parseInt(req.nextUrl.searchParams.get("delay") ?? "0"));

  if (idStr === "random") {
    const randomId = Math.floor(Math.random() * TOTALS.quotes) + 1;
    return NextResponse.json(generateQuote(randomId), { headers: CORS_HEADERS });
  }

  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.quotes)
    return notFound(`Quote with id '${idStr}' not found`);
  return NextResponse.json(generateQuote(id), { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}