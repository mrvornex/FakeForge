// app/api/products/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateProduct, TOTALS } from "@/lib/faker";
import { applyDelay, notFound, CORS_HEADERS } from "@/lib/api";

// ─── GET /api/products/:id ────────────────────────────────────────────────────
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const delay = parseInt(req.nextUrl.searchParams.get("delay") ?? "0");
  await applyDelay(delay);

  const id = parseInt(params.id);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${params.id}' not found`);

  return NextResponse.json(generateProduct(id), { headers: CORS_HEADERS });
}

// ─── PUT /api/products/:id ────────────────────────────────────────────────────
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${params.id}' not found`);

  try {  
    const body = await req.json();
    const existing = generateProduct(id);
    return NextResponse.json({ ...existing, ...body, id }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

// ─── PATCH /api/products/:id ──────────────────────────────────────────────────
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${params.id}' not found`);

  try {
    const body = await req.json();
    const existing = generateProduct(id);
    return NextResponse.json({ ...existing, ...body, id }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }
}

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  if (isNaN(id) || id < 1 || id > TOTALS.products)
    return notFound(`Product with id '${params.id}' not found`);

  const product = generateProduct(id);
  return NextResponse.json({ ...product, isDeleted: true, deletedOn: new Date().toISOString() }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}