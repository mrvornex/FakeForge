// app/docs/page.tsx — Introduction page
import Link from "next/link";
import { OnThisPage } from "@/components/docs/DocsComponents";

const RESOURCES = [
  { name: "Products",  href: "/docs/products",  color: "#f97316", count: "194", desc: "Full CRUD + search + categories" },
  { name: "Users",     href: "/docs/users",     color: "#60a5fa", count: "208", desc: "Auth, filter, sub-resources"     },
  { name: "Posts",     href: "/docs/posts",     color: "#4ade80", count: "251", desc: "With comments, search, sort"     },
  { name: "Comments",  href: "/docs/comments",  color: "#e879f9", count: "340", desc: "Linked to posts and users"       },
  { name: "Todos",     href: "/docs/todos",     color: "#34d399", count: "254", desc: "Random, by user, CRUD"           },
  { name: "Carts",     href: "/docs/carts",     color: "#facc15", count: "20",  desc: "With products and totals"        },
  { name: "Quotes",    href: "/docs/quotes",    color: "#a78bfa", count: "100", desc: "Random + search"                 },
  { name: "Recipes",   href: "/docs/recipes",   color: "#fb7185", count: "50",  desc: "By tag, meal type, search"       },
];

const CODE_QUICK = `// Any endpoint — no setup needed
const res = await fetch('https://fakeforge.vercel.app/api/products?limit=5');
const { products } = await res.json();`;

const CODE_PARAMS = `// Common query params work on all list endpoints
fetch('/products?limit=10&skip=20')         // pagination
fetch('/products?sortBy=price&order=desc')  // sorting
fetch('/products?select=id,title,price')    // field selection
fetch('/products?q=phone')                  // search
fetch('/products?delay=2000')               // latency simulation`;

export default function DocsIndexPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-black mb-5">
          <span>Docs</span>
          <span className="text-black">/</span>
          <span>Introduction</span>
        </div>

        {/* Title */}
        <h1 className="font-['Syne',sans-serif] text-[28px] font-extrabold text-black tracking-[-1px] mb-1.5">
          Introduction
        </h1>
        <p className="font-['Syne',sans-serif] text-[13px] text-black leading-[1.65] max-w-[520px] mb-8">
          FakeForge is a free fake REST API for developers. No registration, no API key, no rate limits. Just fetch and build.
        </p>

        {/* Quick start */}
        <div className="flex items-center gap-3 mb-3.5">
          <span className="text-[13px] font-bold text-black tracking-[0.5px] uppercase">Quick Start</span>
          <div className="flex-1 h-px bg-black" />
        </div>

        <div className="bg-[#080810] border border-black rounded-[8px] overflow-hidden mb-8">
          <div className="flex items-center px-3 py-2 border-b border-black">
            <span className="font-mono text-[9.5px] text-white/25 tracking-[0.8px] uppercase">javascript</span>
          </div>
          <pre className="px-4 py-3.5 font-mono text-[11.5px] leading-[1.75] text-white/65 overflow-x-auto">
            {CODE_QUICK}
          </pre>
        </div>

        {/* Base URL */}
        <div className="flex items-center gap-3 mb-3.5">
          <span className="text-[13px] font-bold text-black tracking-[0.5px] uppercase">Base URL</span>
          <div className="flex-1 h-px bg-black" />
        </div>

        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[9px] p-4 mb-8 flex items-center gap-3">
          <span className="font-mono text-[11px] text-white">BASE URL</span>
          <div className="w-px h-4 bg-black" />
          <span className="font-mono text-[13px] text-blue-400">https://fakeforge.vercel.app</span>
        </div>

        {/* Common params */}
        <div className="flex items-center gap-3 mb-3.5">
          <span className="text-[13px] font-bold text-black tracking-[0.5px] uppercase">Common Params</span>
          <div className="flex-1 h-px bg-black" />
        </div>

        <table className="w-full border-collapse mb-4">
          <thead>
            <tr>
              {["Param", "Type", "Description"].map((h) => (
                <th key={h} className="font-mono text-[9.5px] text-black text-left px-2 pb-2 tracking-[0.8px] uppercase font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["limit",  "number", "Max items to return (default: 30, max: 100)"],
              ["skip",   "number", "Items to skip — use with limit for pagination"],
              ["select", "string", "Comma-separated fields: id,title,price"],
              ["sortBy", "string", "Field name to sort by"],
              ["order",  "string", "Sort direction: asc or desc"],
              ["q",      "string", "Full-text search query"],
              ["delay",  "number", "Simulate network latency in milliseconds (max 5000)"],
            ].map(([param, type, desc]) => (
              <tr key={param} className="border-b border-black last:border-0">
                <td className="font-mono text-[11px] text-blue-400 px-2 py-[6px]">{param}</td>
                <td className="font-mono text-[11px] text-black px-2 py-[6px]">{type}</td>
                <td className="font-mono text-[11px] text-black px-2 py-[6px]">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="bg-[#080810] border border-black rounded-[8px] overflow-hidden mb-8">
          <div className="flex items-center px-3 py-2 border-b border-white/[0.05]">
            <span className="font-mono text-[9.5px] text-white tracking-[0.8px] uppercase">javascript</span>
          </div>
          <pre className="px-4 py-3.5 font-mono text-[11.5px] leading-[1.75] text-white overflow-x-auto">
            {CODE_PARAMS}
          </pre>
        </div>

        {/* All resources */}
        <div className="flex items-center gap-3 mb-3.5">
          <span className="text-[13px] font-bold text-black tracking-[0.5px] uppercase">All Resources</span>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {RESOURCES.map((r) => (
            <Link
              key={r.name} href={r.href}
              className="bg-[#0d0d14] border border-black hover:border-blue-500/20 rounded-[10px] p-4 transition-all group"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: r.color }} />
                <span className="font-['Syne',sans-serif] text-[14px] font-bold text-white group-hover:text-blue-400 transition-colors">
                  {r.name}
                </span>
                <span className="font-mono text-[10px] text-white ml-auto">{r.count}</span>
              </div>
              <p className="font-mono text-[11px] text-white">{r.desc}</p>
            </Link>
          ))}
        </div>

      </div>
      <OnThisPage items={["Quick Start", "Base URL", "Common Params", "All Resources"]} />
    </div>
  );
}