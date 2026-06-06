// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { generateUser } from "@/lib/faker";
import { CORS_HEADERS } from "@/lib/api";

// NOTE: In production use proper JWT library — npm install jose
// This is a simplified mock that returns a fake JWT-like token

function fakeToken(payload: object): string {
  const header  = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body    = Buffer.from(JSON.stringify({ ...payload, iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000) + 3600 })).toString("base64url");
  const sig     = Buffer.from("fakeforge-secret-signature").toString("base64url");
  return `${header}.${body}.${sig}`;
}

export async function POST(req: NextRequest) {
  try {
    const { username, password, expiresInMins = 60 } = await req.json();
    if (!username || !password)
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 });

    // Find user by username (search across generated users)
    const user = generateUser(
      Math.abs(username.split("").reduce((a: number, c: string) => a + c.charCodeAt(0), 0) % 208) + 1
    );

    const payload = { id: user.id, username: user.username, email: user.email, role: user.role };
    const accessToken  = fakeToken({ ...payload, type: "access" });
    const refreshToken = fakeToken({ ...payload, type: "refresh" });

    return NextResponse.json({
      ...user,
      accessToken,
      refreshToken,
    }, { headers: CORS_HEADERS });
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}