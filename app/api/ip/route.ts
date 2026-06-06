// app/api/ip/route.ts
import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS } from "@/lib/api";

export function GET(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "127.0.0.1";
  return NextResponse.json({ ip }, { headers: CORS_HEADERS });
}