// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateProduct, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const delay = parseInt(req.nextUrl.searchParams.get("delay") ?? "0");
  await applyDelay(delay);
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${idStr}' not found`);
  return NextResponse.json(generateProduct(id), { headers: CORS_HEADERS });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generateProduct(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${idStr}' not found`);
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ ...generateProduct(id), ...body, id }, { headers: CORS_HEADERS });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idStr } = await params;
  const id = parseInt(idStr);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${idStr}' not found`);
  return NextResponse.json({ ...generateProduct(id), isDeleted: true, deletedOn: new Date().toISOString() }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}