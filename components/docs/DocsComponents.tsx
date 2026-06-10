// components/docs/DocsComponents.tsx
// ─── Shared components used across all doc pages ──────────────────────────────
"use client";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Param {
  name: string; type: string; required: boolean; description: string;
}

export interface Endpoint {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  path: string; description: string;
  params?: Param[]; code: string;
}

// ─── Method badge colors ──────────────────────────────────────────────────────
const METHOD_STYLE: Record<string, string> = {
  GET:    "text-green-400 bg-green-400/10 border-green-400/20",
  POST:   "text-blue-400 bg-blue-400/10 border-blue-400/20",
  PUT:    "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  PATCH:  "text-blue-400 bg-orange-400/10 border-orange-400/20",
  DELETE: "text-red-400 bg-red-400/10 border-red-400/20",
};

// ─── Code Block ───────────────────────────────────────────────────────────────
export function CodeBlock({ code, lang = "javascript" }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const highlighted = code
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\/\/.*$)/gm, '<span style="color:rgba(255,255,255,0.25)">$1</span>')
    .replace(/\b(const|let|var|await|async|function|return|if|else|try|catch|new)\b/g, '<span style="color:#c084fc">$1</span>')
    .replace(/'([^']*)'/g, '<span style="color:#4ade80">\'$1\'</span>')
    .replace(/"([^"]*)"/g, '<span style="color:#4ade80">"$1"</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#e879f9">$1</span>')
    .replace(/(\w+)\(/g, '<span style="color:#60a5fa">$1</span>(');

  return (
    <div className="bg-[#080810] border border-white/[0.06] rounded-[8px] overflow-hidden mt-3.5">
      <div className="flex items-center px-3 py-2 border-b border-white/[0.05]">
        <span className="font-mono text-[9.5px] text-white/25 tracking-[0.8px] uppercase">{lang}</span>
        <button
          onClick={copy}
          className="ml-auto font-mono text-[9.5px] text-white/30 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-[4px] px-2.5 py-[3px] transition-all"
        >
          {copied ? "copied!" : "copy"}
        </button>
      </div>
      <pre
        className="px-4 py-3.5 font-mono text-[11.5px] leading-[1.75] overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  );
}

// ─── Params Table ─────────────────────────────────────────────────────────────
export function ParamsTable({ params, title = "Parameters" }: { params: Param[]; title?: string }) {
  return (
    <div className="mt-3.5">
      <p className="font-mono text-[9.5px] text-white/20 tracking-[1px] uppercase mb-2">{title}</p>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {["Parameter", "Type", "Required", "Description"].map((h) => (
              <th key={h} className="font-mono text-[9.5px] text-white/20 text-left px-2 pb-2 tracking-[0.8px] uppercase font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {params.map((p) => (
            <tr key={p.name} className="border-b border-white/[0.04] last:border-0">
              <td className="font-mono text-[11px] text-blue-400 px-2 py-[6px]">{p.name}</td>
              <td className="font-mono text-[11px] text-white/30 px-2 py-[6px]">{p.type}</td>
              <td className="px-2 py-[6px]">
                <span className={`font-mono text-[9px] px-1.5 py-px rounded ${p.required ? "text-red-400 bg-red-400/10" : "text-white/20 bg-white/[0.04]"}`}>
                  {p.required ? "required" : "optional"}
                </span>
              </td>
              <td className="font-mono text-[11px] text-white/45 px-2 py-[6px]">{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Endpoint Card ────────────────────────────────────────────────────────────
export function EndpointCard({ endpoint }: { endpoint: Endpoint }) {
  const [open, setOpen] = useState(false);
  const BASE = "fakeforge.vercel.app";

  return (
    <div
      className={[
        "bg-[#0F1117] border rounded-[10px] overflow-hidden mb-3 transition-colors duration-150",
        open ? "border-blue-500/20" : "border-white/[0.07] hover:border-white/[0.12]",
      ].join(" ")}
    >
      {/* Header */}
      <div
        className="flex items-center gap-2.5 px-4 py-3 cursor-pointer"
        onClick={() => setOpen((o) => !o)}
      >
        <span className={`font-mono text-[10px] font-semibold px-2 py-[3px] rounded-[5px] border min-w-[52px] text-center ${METHOD_STYLE[endpoint.method]}`}>
          {endpoint.method}
        </span>
        <span className="font-mono text-[12px] flex-1">
          <span className="text-white/30">{BASE}</span>
          <span className="text-white/70">{endpoint.path}</span>
        </span>
        <span className="text-[12px] text-white/30">{endpoint.description}</span>
        <svg
          className={`w-3.5 h-3.5 text-white/20 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Body */}
      {open && (
        <div className="px-4 pb-4 border-t border-white/[0.05]">
          {endpoint.params && endpoint.params.length > 0 && (
            <ParamsTable
              params={endpoint.params}
              title={endpoint.method === "GET" ? "Query Parameters" : "Path Parameters"}
            />
          )}
          <CodeBlock code={endpoint.code} />
        </div>
      )}
    </div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────
export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-3.5">
      <span className="text-[13px] font-bold text-white/50 tracking-[0.5px] uppercase">{title}</span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────
export function DocsPageHeader({
  title, description, breadcrumb,
}: {
  title: string; description: string; breadcrumb: string;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-white/25 mb-5">
        <span>Docs</span>
        <span className="text-white/15">/</span>
        <span>{breadcrumb}</span>
      </div>
      <h1 className="font-['Syne',sans-serif] text-[28px] font-extrabold text-white tracking-[-1px] mb-1.5">
        {title}
      </h1>
      <p className="font-['Syne',sans-serif] text-[13px] text-white/40 leading-[1.65] max-w-[520px]">
        {description}
      </p>
    </div>
  );
}

// ─── On This Page (right sidebar) ─────────────────────────────────────────────
export function OnThisPage({ items }: { items: string[] }) {
  return (
    <aside className="w-[180px] flex-shrink-0 border-l border-white/[0.06] px-4 py-5 sticky top-[102px] h-[calc(100vh-102px)] overflow-y-auto hidden xl:block">
      <p className="font-mono text-[9.5px] text-white/20 tracking-[1.2px] uppercase mb-3">On this page</p>
      {items.map((item) => (
        <a
          key={item}
          href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
          className="block font-mono text-[11.5px] text-white/30 hover:text-white/70 py-1 pl-2.5 border-l-2 border-transparent hover:border-white/20 transition-all first:text-blue-500 first:border-blue-500"
        >
          {item}
        </a>
      ))}
    </aside>
  );
}