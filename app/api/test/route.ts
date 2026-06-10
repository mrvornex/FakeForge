// app/api/test/route.ts
import { NextResponse } from "next/server";
import { CORS_HEADERS } from "@/lib/api";

export function GET() {
    return NextResponse.json({
        status: "ok",
        message: "FakeForge API is up and running!",
        version: "2.0.0",
        timestamp: new Date().toISOString(),
        resources: {
            products: { count: 194, url: "/api/products" },
            users: { count: 208, url: "/api/users" },
            posts: { count: 251, url: "/api/posts" },
            comments: { count: 340, url: "/api/comments" },
            todos: { count: 254, url: "/api/todos" },
            carts: { count: 20, url: "/api/carts" },
            quotes: { count: 100, url: "/api/quotes" },
            recipes: { count: 50, url: "/api/recipes" },
        },
        docs: "https://fakeforge.vercel.app/docs",
    }, { headers: CORS_HEADERS });
}

export function OPTIONS() {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}