"use client";

import { useState, useCallback, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type TabId  = "params" | "headers" | "body" | "auth";
type ResTab = "response" | "headers";
type Status = "idle" | "loading" | "ok" | "error";

interface Resource {
  name: string;
  count: string;
  color: string;
  hints: string[];
}

interface Params {
  limit: string; skip: string; select: string;
  sortBy: string; order: string; delay: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const RESOURCES: Resource[] = [
  { name:"products", count:"194",  color:"#f97316", hints:["/products?limit=5","/products/1","/products/search?q=phone","/products/categories"] },
  { name:"users",    count:"208",  color:"#60a5fa", hints:["/users?limit=5","/users/1","/users/search?q=john","/users/1/posts"] },
  { name:"posts",    count:"251",  color:"#4ade80", hints:["/posts?limit=5","/posts/1","/posts/search?q=love","/posts/1/comments"] },
  { name:"comments", count:"340",  color:"#e879f9", hints:["/comments?limit=5","/comments/1","/posts/1/comments"] },
  { name:"carts",    count:"20",   color:"#facc15", hints:["/carts?limit=5","/carts/1","/users/1/carts"] },
  { name:"todos",    count:"254",  color:"#34d399", hints:["/todos?limit=5","/todos/1","/todos/random","/users/1/todos"] },
  { name:"quotes",   count:"1467", color:"#a78bfa", hints:["/quotes?limit=5","/quotes/1","/quotes/random"] },
  { name:"recipes",  count:"50",   color:"#fb7185", hints:["/recipes?limit=5","/recipes/1","/recipes/search?q=pasta","/recipes/meal-type/dinner"] },
  { name:"image",    count:"∞",   color:"#38bdf8", hints:["/image/200x150","/image/300x200?text=Hello","/image/400x300?bgColor=orange"] },
  { name:"auth",     count:"—",   color:"#f97316", hints:["/auth/login","/auth/me","/auth/refresh"] },
  { name:"http",     count:"—",   color:"#f87171", hints:["/http/200","/http/404","/http/500"] },
  { name:"ip",       count:"—",   color:"#94a3b8", hints:["/ip"] },
];

const BASE = "https://fakeforge.vercel.app";
const PROXY = "https://dummyjson.com"; // swap until backend is live

// ─── Helpers ──────────────────────────────────────────────────────────────────
function buildUrl(resource: string, params: Params, method: Method): string {
  if (!["GET","DELETE"].includes(method)) return `${BASE}/${resource}`;
  const p = new URLSearchParams();
  if (params.limit)              p.set("limit",  params.limit);
  if (params.skip && params.skip !== "0") p.set("skip", params.skip);
  if (params.select)             p.set("select", params.select);
  if (params.sortBy)             p.set("sortBy", params.sortBy);
  if (params.order)              p.set("order",  params.order);
  if (params.delay && params.delay !== "0") p.set("delay", params.delay);
  const qs = p.toString();
  return `${BASE}/${resource}${qs ? "?" + qs : ""}`;
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (m) => {
        if (/^"/.test(m)) {
          if (/:$/.test(m)) return `<span style="color:#f97316">${m}</span>`;
          return `<span style="color:#4ade80">${m}</span>`;
        }
        if (/true|false/.test(m)) return `<span style="color:#60a5fa">${m}</span>`;
        if (/null/.test(m))       return `<span style="color:rgba(255,255,255,0.25)">${m}</span>`;
        return `<span style="color:#e879f9">${m}</span>`;
      }
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Sidebar({
  resources, active, search, onSearch, onSelect,
}: {
  resources: Resource[]; active: string; search: string;
  onSearch: (v: string) => void; onSelect: (r: Resource) => void;
}) {
  const filtered = resources.filter((r) => r.name.includes(search.toLowerCase()));
  return (
    <div className="border-r border-white/[0.06] flex flex-col w-[260px] flex-shrink-0">
      <div className="p-4 border-b border-white/[0.06]">
        <p className="font-mono text-[10px] text-white/25 tracking-[1px] uppercase mb-2.5">Resources</p>
        <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-[7px] px-2.5 py-[7px]">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            type="text" value={search} onChange={(e) => onSearch(e.target.value)}
            placeholder="Search resource..."
            className="bg-transparent border-none outline-none font-mono text-[11px] text-white/60 placeholder-white/20 w-full"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {filtered.map((r) => (
          <div
            key={r.name} onClick={() => onSelect(r)}
            className={[
              "flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] cursor-pointer transition-all border mb-0.5",
              r.name === active
                ? "bg-orange-500/10 border-orange-500/20"
                : "border-transparent hover:bg-white/[0.04]",
            ].join(" ")}
          >
            <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: r.color }} />
            <span className={`font-mono text-[12px] flex-1 ${r.name === active ? "text-orange-500" : "text-white/50"}`}>{r.name}</span>
            <span className={`font-mono text-[10px] px-1.5 py-px rounded-full ${r.name === active ? "text-orange-500/60 bg-orange-500/[0.08]" : "text-white/20 bg-white/[0.05]"}`}>{r.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ApiExplorer() {
  const [resource, setResource] = useState<Resource>(RESOURCES[0]);
  const [search,   setSearch]   = useState("");
  const [method,   setMethod]   = useState<Method>("GET");
  const [params,   setParams]   = useState<Params>({ limit:"5", skip:"0", select:"", sortBy:"", order:"", delay:"0" });
  const [tab,      setTab]      = useState<TabId>("params");
  const [resTab,   setResTab]   = useState<ResTab>("response");
  const [authHeader, setAuthHeader] = useState("");
  const [bodyText, setBodyText] = useState('');
  const [authUser, setAuthUser] = useState("emilys");
  const [authPass, setAuthPass] = useState("emilyspass");
  const [tokenMsg, setTokenMsg] = useState("");

  const [status,  setStatus]  = useState<Status>("idle");
  const [code,    setCode]    = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [size,    setSize]    = useState<string>("");
  const [json,    setJson]    = useState("");
  const [respHdrs,setRespHdrs]= useState<Record<string,string>>({});
  const [copied,  setCopied]  = useState(false);

  const url = buildUrl(resource.name, params, method);

  const handleSelect = (r: Resource) => {
    setResource(r);
    setParams({ limit:"5", skip:"0", select:"", sortBy:"", order:"", delay:"0" });
    setJson(""); setStatus("idle"); setCode(null); setElapsed(null);
  };

  const setParam = (key: keyof Params) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setParams((p) => ({ ...p, [key]: e.target.value }));

  const sendRequest = useCallback(async () => {
    setStatus("loading"); setJson(""); setCode(null); setElapsed(null); setSize("");
    const proxyUrl = url.replace(BASE, PROXY);
    const opts: RequestInit = { method, headers: { "Content-Type": "application/json" } as Record<string,string> };
    if (authHeader) (opts.headers as Record<string,string>)["Authorization"] = authHeader;
    if (["POST","PUT","PATCH"].includes(method) && bodyText.trim()) opts.body = bodyText;

    const start = Date.now();
    try {
      const res = await fetch(proxyUrl, opts);
      const ms  = Date.now() - start;
      const text = await res.text();
      let pretty = text;
      try { pretty = JSON.stringify(JSON.parse(text), null, 2); } catch {}
      const preview = pretty.split("\n").slice(0, 50).join("\n");
      setJson(preview);
      setRespHdrs({ "content-type": res.headers.get("content-type") ?? "", status: `${res.status} ${res.statusText}`, "cache-control": res.headers.get("cache-control") ?? "no-cache" });
      setStatus(res.ok ? "ok" : "error");
      setCode(res.status);
      setElapsed(ms);
      setSize(`${(new Blob([pretty]).size / 1024).toFixed(1)} KB`);
      setResTab("response");
    } catch (e: unknown) {
      setStatus("error");
      setJson(`// Network error: ${e instanceof Error ? e.message : "unknown"}`);
    }
  }, [url, method, authHeader, bodyText]);

  const doLogin = async () => {
    setTokenMsg("Logging in...");
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: authUser, password: authPass, expiresInMins: 60 }),
      });
      const data = await res.json();
      if (data.accessToken) { setAuthHeader("Bearer " + data.accessToken); setTokenMsg("✓ Token saved to Authorization header"); }
      else setTokenMsg(`✗ ${data.message || "Login failed"}`);
    } catch { setTokenMsg("✗ Network error"); }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(json).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); });
  };

  const statusColor = status === "ok" ? "text-green-400 bg-green-400/[0.08] border-green-400/20"
    : status === "error"   ? "text-red-400 bg-red-400/[0.08] border-red-400/20"
    : "text-white/20 bg-white/[0.03] border-white/[0.06]";

  const methodColor = method === "GET"    ? "text-green-400 bg-green-400/10 border-green-400/20"
    : method === "POST"   ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
    : method === "PUT"    ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
    : method === "PATCH"  ? "text-orange-400 bg-orange-400/10 border-orange-400/20"
    : "text-red-400 bg-red-400/10 border-red-400/20";

  return (
    <section className="bg-[#0a0a0f] px-6 py-20">
      {/* Label */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 h-px bg-orange-500/40" />
        <span className="font-mono text-[11px] text-orange-500 tracking-[1.5px] uppercase">Live API Explorer</span>
        <div className="w-8 h-px bg-orange-500/40" />
      </div>
      <h2 className="font-['Syne',sans-serif] text-[40px] font-extrabold text-white text-center tracking-[-1.5px] leading-[1.1] mb-3">
        Try it <span className="text-orange-500">right now</span>
      </h2>
      <p className="font-['Syne',sans-serif] text-[14px] text-white/40 text-center mb-12 leading-relaxed">
        Pick a resource, set your params, hit Send — real JSON response instantly. No setup needed.
      </p>

      {/* Explorer Container */}
      <div className="flex max-w-[1000px] mx-auto bg-[#0d0d14] border border-white/[0.07] rounded-[16px] overflow-hidden min-h-[560px]">
        <Sidebar resources={RESOURCES} active={resource.name} search={search} onSearch={setSearch} onSelect={handleSelect} />

        {/* Main Panel */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Request Bar */}
          <div className="p-4 border-b border-white/[0.06] flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <select
                value={method} onChange={(e) => setMethod(e.target.value as Method)}
                className={`font-mono text-[11px] font-semibold border rounded-[6px] px-3 py-[7px] outline-none cursor-pointer bg-transparent ${methodColor}`}
              >
                {(["GET","POST","PUT","PATCH","DELETE"] as Method[]).map((m) => (
                  <option key={m} value={m} style={{ background:"#0d0d14", color:"#fff" }}>{m}</option>
                ))}
              </select>
              <span className="flex-1 font-mono text-[11.5px] text-white/60 bg-white/[0.04] border border-white/[0.08] rounded-[7px] px-3 py-[7px] truncate">
                {url}
              </span>
              <button
                onClick={sendRequest} disabled={status === "loading"}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-[#0a0a0f] font-['Syne',sans-serif] text-[13px] font-bold px-4 py-[7px] rounded-[7px] transition-all whitespace-nowrap"
              >
                {status === "loading" ? <span className="inline-block w-3.5 h-3.5 border-2 border-[#0a0a0f]/20 border-t-[#0a0a0f] rounded-full animate-spin" /> : null}
                {status === "loading" ? "Sending" : "Send ↗"}
              </button>
              <button onClick={() => { setJson(""); setStatus("idle"); setCode(null); setElapsed(null); }}
                className="font-['Syne',sans-serif] text-[12px] text-white/40 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20 px-3 py-[7px] rounded-[7px] transition-all">
                Clear
              </button>
            </div>
            <p className="font-mono text-[10px] text-white/20 leading-relaxed">
              Try:&nbsp;
              {resource.hints.map((h, i) => (
                <span key={h}>
                  <span className="text-orange-500/50 cursor-pointer hover:text-orange-500 transition-colors" onClick={() => {
                    const field = document.querySelector<HTMLSpanElement>('.url-display');
                    if(field) field.textContent = `${BASE}${h}`;
                  }}>{h}</span>
                  {i < resource.hints.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>

          {/* Tabs: Params / Headers / Body / Auth */}
          <div className="flex border-b border-white/[0.06]">
            {(["params","headers","body","auth"] as TabId[]).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={[
                  "font-mono text-[11px] px-4 py-2.5 border-b-2 transition-all capitalize",
                  tab === t ? "text-orange-500 border-orange-500" : "text-white/30 border-transparent hover:text-white/60",
                  t === "body" && !["POST","PUT","PATCH"].includes(method) ? "opacity-40" : "",
                ].join(" ")}
              >{t}</button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {tab === "params" && (
              <table className="w-full">
                <thead>
                  <tr>
                    {["Key","Value","Description"].map((h) => (
                      <th key={h} className="font-mono text-[10px] text-white/20 uppercase tracking-[0.8px] text-left pb-2 font-normal"
                        style={{ width: h==="Key"?"22%":h==="Value"?"30%":"auto" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { key:"limit",  val:params.limit,  type:"number", placeholder:"",          desc:"Number of items to return" },
                    { key:"skip",   val:params.skip,   type:"number", placeholder:"",          desc:"Items to skip (pagination)" },
                    { key:"select", val:params.select, type:"text",   placeholder:"id,title",  desc:"Comma-separated fields" },
                    { key:"sortBy", val:params.sortBy, type:"text",   placeholder:"price",     desc:"Field to sort by" },
                    { key:"delay",  val:params.delay,  type:"number", placeholder:"ms",        desc:"Simulate latency (ms)" },
                  ].map(({ key, val, type, placeholder, desc }) => (
                    <tr key={key}>
                      <td className="font-mono text-[11px] text-white/40 py-1 pr-3 whitespace-nowrap">{key}</td>
                      <td className="py-1 pr-3">
                        {key === "sortBy" ? (
                          <select value={params.order} onChange={setParam("order")}
                            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/30 rounded-[5px] px-2.5 py-[5px] font-mono text-[11px] text-white/70 outline-none">
                            <option value="" style={{background:"#0d0d14"}}>--</option>
                            <option value="asc" style={{background:"#0d0d14"}}>asc</option>
                            <option value="desc" style={{background:"#0d0d14"}}>desc</option>
                          </select>
                        ) : (
                          <input type={type} value={val} placeholder={placeholder}
                            onChange={setParam(key as keyof Params)}
                            className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/30 rounded-[5px] px-2.5 py-[5px] font-mono text-[11px] text-white/70 outline-none transition-colors" />
                        )}
                      </td>
                      <td className="font-mono text-[10px] text-white/20 py-1 whitespace-nowrap">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "headers" && (
              <table className="w-full">
                <thead><tr>
                  <th className="font-mono text-[10px] text-white/20 uppercase tracking-[0.8px] text-left pb-2 font-normal w-[30%]">Key</th>
                  <th className="font-mono text-[10px] text-white/20 uppercase tracking-[0.8px] text-left pb-2 font-normal">Value</th>
                </tr></thead>
                <tbody>
                  <tr>
                    <td className="font-mono text-[11px] text-white/40 pr-3 py-1">Content-Type</td>
                    <td><input readOnly value="application/json" className="w-full bg-white/[0.02] border border-white/[0.05] rounded-[5px] px-2.5 py-[5px] font-mono text-[11px] text-white/30 outline-none opacity-50" /></td>
                  </tr>
                  <tr>
                    <td className="font-mono text-[11px] text-white/40 pr-3 py-1">Authorization</td>
                    <td><input value={authHeader} onChange={(e) => setAuthHeader(e.target.value)} placeholder="Bearer <token>"
                      className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/30 rounded-[5px] px-2.5 py-[5px] font-mono text-[11px] text-white/70 outline-none transition-colors" /></td>
                  </tr>
                </tbody>
              </table>
            )}
            {tab === "body" && (
              <textarea value={bodyText} onChange={(e) => setBodyText(e.target.value)}
                placeholder='{ "title": "New Product", "price": 99 }'
                className="w-full bg-white/[0.03] border border-white/[0.08] focus:border-orange-500/30 rounded-[7px] px-3 py-2.5 font-mono text-[11.5px] text-white/70 outline-none resize-none h-[100px] leading-relaxed transition-colors" />
            )}
            {tab === "auth" && (
              <div className="flex flex-col gap-3">
                <table className="w-full">
                  <thead><tr>
                    <th className="font-mono text-[10px] text-white/20 uppercase tracking-[0.8px] text-left pb-2 font-normal w-[22%]">Field</th>
                    <th className="font-mono text-[10px] text-white/20 uppercase tracking-[0.8px] text-left pb-2 font-normal">Value</th>
                  </tr></thead>
                  <tbody>
                    <tr>
                      <td className="font-mono text-[11px] text-white/40 pr-3 py-1">Username</td>
                      <td><input value={authUser} onChange={(e) => setAuthUser(e.target.value)} placeholder="emilys"
                        className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/30 rounded-[5px] px-2.5 py-[5px] font-mono text-[11px] text-white/70 outline-none transition-colors" /></td>
                    </tr>
                    <tr>
                      <td className="font-mono text-[11px] text-white/40 pr-3 py-1">Password</td>
                      <td><input type="password" value={authPass} onChange={(e) => setAuthPass(e.target.value)} placeholder="emilyspass"
                        className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-orange-500/30 rounded-[5px] px-2.5 py-[5px] font-mono text-[11px] text-white/70 outline-none transition-colors" /></td>
                    </tr>
                    <tr>
                      <td />
                      <td className="pt-2">
                        <button onClick={doLogin}
                          className="bg-orange-500/15 border border-orange-500/30 text-orange-500 font-['Syne',sans-serif] text-[12px] px-4 py-[6px] rounded-[6px] cursor-pointer hover:bg-orange-500/25 transition-all">
                          Login → Get Token
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {tokenMsg && (
                  <div className={`font-mono text-[10px] px-3 py-2 rounded-[6px] border ${tokenMsg.startsWith("✓") ? "text-green-400 bg-green-400/[0.08] border-green-400/15" : "text-red-400 bg-red-400/[0.08] border-red-400/15"}`}>
                    {tokenMsg}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Response Panel */}
          <div className="flex-1 flex flex-col border-t border-white/[0.06]">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-black/20">
              <span className="w-[9px] h-[9px] rounded-full bg-[#ff5f57]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#febc2e]" />
              <span className="w-[9px] h-[9px] rounded-full bg-[#28c840]" />
              <div className="flex items-center gap-2 ml-auto">
                {elapsed !== null && <span className="font-mono text-[10px] text-white/20">{elapsed}ms</span>}
                {size && <span className="font-mono text-[10px] text-white/20">{size}</span>}
                <span className={`font-mono text-[10px] px-2.5 py-px rounded-full border ${statusColor}`}>
                  {status === "idle" ? "waiting" : status === "loading" ? "loading" : status === "ok" ? `${code} OK` : `${code} Error`}
                </span>
                {json && (
                  <button onClick={copyJson} className="font-mono text-[10px] text-white/35 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-[5px] px-2.5 py-1 transition-all">
                    {copied ? "copied!" : "copy JSON"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex border-b border-white/[0.05]">
              {(["response","headers"] as ResTab[]).map((t) => (
                <button key={t} onClick={() => setResTab(t)}
                  className={`font-mono text-[10.5px] px-4 py-2 border-b-2 transition-all capitalize ${resTab===t?"text-orange-500 border-orange-500":"text-white/30 border-transparent hover:text-white/60"}`}>
                  {t}
                </button>
              ))}
            </div>
            <div className="flex-1 p-4 overflow-y-auto max-h-[200px] min-h-[140px]">
              {status === "idle" && (
                <div className="text-center py-8">
                  <p className="font-mono text-[11px] text-white/20">Select a resource and hit Send to see the response</p>
                </div>
              )}
              {status === "loading" && (
                <div className="text-center py-8 flex items-center justify-center gap-2">
                  <span className="inline-block w-3.5 h-3.5 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                  <span className="font-mono text-[11px] text-white/30">Fetching {resource.name}...</span>
                </div>
              )}
              {(status === "ok" || status === "error") && resTab === "response" && json && (
                <pre className="font-mono text-[11.5px] leading-[1.8] whitespace-pre-wrap break-all"
                  dangerouslySetInnerHTML={{ __html: syntaxHighlight(json) }} />
              )}
              {(status === "ok" || status === "error") && resTab === "headers" && (
                <table className="w-full">
                  <tbody>
                    {Object.entries(respHdrs).map(([k, v]) => (
                      <tr key={k} className="border-b border-white/[0.04]">
                        <td className="font-mono text-[11px] text-white/35 py-1 pr-4 w-[40%]">{k}</td>
                        <td className="font-mono text-[11px] text-white/60 py-1">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full max-w-[1000px] mx-auto mt-14 h-px bg-white/[0.05]" />
    </section>
  );
}