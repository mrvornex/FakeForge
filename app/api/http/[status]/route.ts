// app/api/http/[status]/route.ts
// Returns any HTTP status code — useful for testing error handling

import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS } from "@/lib/api";

const STATUS_MESSAGES: Record<number, string> = {
  200: "OK", 201: "Created", 204: "No Content", 301: "Moved Permanently",
  302: "Found", 304: "Not Modified", 400: "Bad Request", 401: "Unauthorized",
  403: "Forbidden", 404: "Not Found", 405: "Method Not Allowed",
  408: "Request Timeout", 409: "Conflict", 410: "Gone",
  422: "Unprocessable Entity", 429: "Too Many Requests",
  500: "Internal Server Error", 502: "Bad Gateway",
  503: "Service Unavailable", 504: "Gateway Timeout",
};

export async function GET(_req: NextRequest, { params }: { params: { status: string } }) {
  const code = parseInt(params.status);
  if (isNaN(code) || code < 100 || code > 599) {
    return NextResponse.json({ message: "Invalid status code. Use a number between 100-599." }, { status: 400 });
  }
  const message = STATUS_MESSAGES[code] ?? "Unknown Status";
  return NextResponse.json({ status: code, message }, { status: code, headers: CORS_HEADERS });
}

// Also handles POST/PUT/PATCH/DELETE
export const POST = GET;
export const PUT  = GET;
export const PATCH = GET;
export const DELETE = GET;

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}