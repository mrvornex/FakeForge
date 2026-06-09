// app/docs/quotes/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/quotes", description: "Get all quotes",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30)" },
      { name: "skip",   type: "number", required: false, description: "Items to skip" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency in ms" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/quotes?limit=5');
const data = await res.json();
// { quotes: [...], total: 100, skip: 0, limit: 5 }`,
  },
  {
    method: "GET", path: "/quotes/:id", description: "Get single quote",
    params: [{ name: "id", type: "number", required: true, description: "Quote ID (1–100)" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/quotes/1');
const quote = await res.json();
// { id: 1, quote: "The only way to do great work...", author: "Steve Jobs" }`,
  },
  {
    method: "GET", path: "/quotes/random", description: "Get a random quote",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/quotes/random');
const quote = await res.json();
// { id: 42, quote: "...", author: "..." }`,
  },
];

export default function QuotesDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Quotes" title="Quotes"
          description="100 famous quotes with author attribution. Perfect for placeholder text, loading states, and UI testing. Includes random quote endpoint." />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Get all quotes","Get single quote","Random quote"]} />
    </div>
  );
}