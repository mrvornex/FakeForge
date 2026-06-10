// app/api/image/[...params]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ params: string[] }> }) {
  const { params: segments } = await params;
  const sizeStr = segments[0] ?? "200x150";
  const [wStr, hStr] = sizeStr.split("x");
  const width  = Math.min(Math.max(parseInt(wStr) || 200, 10), 2000);
  const height = Math.min(Math.max(parseInt(hStr) || 150, 10), 2000);

  const search   = req.nextUrl.searchParams;
  const text     = search.get("text")      ?? `${width}x${height}`;
  const bgColor  = search.get("bgColor")   ?? "1a1a2e";
  const txtColor = search.get("textColor") ?? "f97316";
  const fontSize = Math.min(Math.max(parseInt(search.get("fontSize") ?? "0") || Math.round(Math.min(width, height) * 0.15), 10), 200);

  const bg  = bgColor.startsWith("#")  ? bgColor  : `#${bgColor}`;
  const fg  = txtColor.startsWith("#") ? txtColor : `#${txtColor}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${bg}"/>
  <text
    x="${width / 2}"
    y="${height / 2}"
    dominant-baseline="middle"
    text-anchor="middle"
    font-family="Inter, Arial, sans-serif"
    font-size="${fontSize}"
    font-weight="600"
    fill="${fg}"
  >${text}</text>
</svg>`;

  const format = search.get("format") ?? "svg";

  if (format === "svg") {
    return new NextResponse(svg, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000",
      "Access-Control-Allow-Origin": "*",
    },
  });
}