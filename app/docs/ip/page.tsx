// app/docs/ip/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/ip", description: "Get client IP address",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/ip');
const data = await res.json();
// { ip: "203.0.113.42" }`,
  },
];

export default function IpDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="IP Address" title="IP Address"
          description="Returns the client's IP address. Reads from X-Forwarded-For or X-Real-IP headers — works correctly behind proxies and on Vercel." />
        <SectionTitle title="Endpoint" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Endpoint"]} />
    </div>
  );
}