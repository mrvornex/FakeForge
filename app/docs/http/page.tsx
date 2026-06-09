// app/docs/http/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const STATUS_CODES = [
  { code: 200, label: "OK",                    color: "#4ade80" },
  { code: 201, label: "Created",               color: "#4ade80" },
  { code: 204, label: "No Content",            color: "#4ade80" },
  { code: 301, label: "Moved Permanently",     color: "#facc15" },
  { code: 400, label: "Bad Request",           color: "#fb923c" },
  { code: 401, label: "Unauthorized",          color: "#f87171" },
  { code: 403, label: "Forbidden",             color: "#f87171" },
  { code: 404, label: "Not Found",             color: "#f87171" },
  { code: 429, label: "Too Many Requests",     color: "#f87171" },
  { code: 500, label: "Internal Server Error", color: "#f87171" },
  { code: 503, label: "Service Unavailable",   color: "#f87171" },
];

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/http/:status", description: "Returns any HTTP status",
    params: [
      { name: "status", type: "number", required: true, description: "HTTP status code (100–599)" },
    ],
    code: `// Test 404 error handling
const res = await fetch('https://fakeforge.vercel.app/http/404');
console.log(res.status); // 404
const data = await res.json();
// { status: 404, message: "Not Found" }

// Works with all methods
await fetch('/http/201', { method: 'POST' });
await fetch('/http/500', { method: 'DELETE' });`,
  },
];

export default function HttpDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Mock HTTP" title="Mock HTTP"
          description="Return any HTTP status code to test how your application handles different server responses. Works with all HTTP methods." />

        <SectionTitle title="Endpoint" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}

        <SectionTitle title="Supported Status Codes" />
        <div className="grid grid-cols-2 gap-2">
          {STATUS_CODES.map(s => (
            <div key={s.code} className="bg-[#0d0d14] border border-white/[0.07] rounded-[8px] px-3.5 py-3 flex items-center gap-3">
              <span className="font-mono text-[13px] font-semibold" style={{ color: s.color }}>{s.code}</span>
              <span className="font-mono text-[11px] text-white/40">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <OnThisPage items={["Endpoint","Status Codes"]} />
    </div>
  );
}