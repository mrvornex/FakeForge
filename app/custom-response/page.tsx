"use client";
import { useState } from "react";

export default function CustomResponsePage() {
  const [json, setJson]         = useState(`{\n  "user": {\n    "id": 1,\n    "name": "Ali Khan",\n    "role": "admin"\n  },\n  "token": "abc123xyz",\n  "expires": "2025-12-31"\n}`);
  const [url, setUrl]           = useState("");
  const [error, setError]       = useState("");
  const [copied, setCopied]     = useState(false);
  const [loading, setLoading]   = useState(false);

  const bytes = new Blob([json]).size;
  const size  = bytes > 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${bytes} bytes`;

  const generate = async () => {
    setError(""); setUrl("");
    try { JSON.parse(json); } catch {
      setError("Invalid JSON — please fix the syntax and try again."); return;
    }
    setLoading(true);
    try {
      const res  = await fetch("/api/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: JSON.parse(json) }),
      });
      const data = await res.json();
      if (data.url) setUrl(data.url);
      else setError(data.message ?? "Something went wrong.");
    } catch {
      setError("Network error — please try again.");
    }
    setLoading(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    });
  };

  const STEPS = [
    { n: "1", title: "Paste your JSON",  desc: "Any shape — objects, arrays, nested data."         },
    { n: "2", title: "Click Generate",   desc: "A unique ID is created and your JSON is stored."   },
    { n: "3", title: "Get your URL",     desc: "Share it or use it in fetch() directly."           },
    { n: "4", title: "Use anywhere",     desc: "Works in React, Vue, Postman, curl — any client."  },
  ];

  return (
    <main className="bg-[#0a0a0f] min-h-screen px-8 py-10">
      {/* Header */}
      <div className="max-w-[900px] mx-auto">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1.5 mb-5">
          <span className="font-mono text-[11px] text-orange-400">Custom Response</span>
        </div>
        <h1 className="font-['Syne',sans-serif] text-[32px] font-extrabold text-white tracking-[-1px] mb-2">
          Your JSON, <span className="text-orange-500">your URL.</span>
        </h1>
        <p className="text-[14px] text-white/40 leading-relaxed mb-8 max-w-[480px]">
          Paste any JSON — get a unique URL back. Use it as a custom API endpoint in your app. No login required.
        </p>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          {/* Input panel */}
          <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[12px] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
              <span className="font-mono text-[11px] text-white/30 uppercase tracking-[1px]">Your JSON</span>
              <span className="font-mono text-[10px] text-white/20">{size}</span>
            </div>
            <div className="p-4">
              <textarea
                value={json}
                onChange={(e) => setJson(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.07] focus:border-orange-500/30 rounded-[8px] p-3 font-mono text-[11.5px] text-white/75 resize-none h-[200px] outline-none transition-colors leading-[1.7]"
                placeholder='{ "key": "value" }'
              />
              <p className="font-mono text-[10px] text-white/20 mt-2">
                Paste any valid JSON. Max size: <span className="text-orange-500/50">5 MB</span>
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={generate}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-[#0a0a0f] font-['Syne',sans-serif] text-[13px] font-bold py-2.5 rounded-[7px] transition-colors"
                >
                  {loading ? (
                    <span className="inline-block w-3.5 h-3.5 border-2 border-[#0a0a0f]/20 border-t-[#0a0a0f] rounded-full animate-spin" />
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  )}
                  {loading ? "Generating..." : "Generate URL"}
                </button>
                <button
                  onClick={() => { setJson(""); setUrl(""); setError(""); }}
                  className="font-['Syne',sans-serif] text-[13px] text-white/40 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20 px-4 py-2.5 rounded-[7px] transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[12px] overflow-hidden">
            <div className="px-4 py-3 border-b border-white/[0.06]">
              <span className="font-mono text-[11px] text-white/30 uppercase tracking-[1px]">Your Unique URL</span>
            </div>
            <div className="p-4">
              {!url && !error && (
                <div className="flex flex-col items-center justify-center h-[240px] text-white/15 gap-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  <p className="font-mono text-[11px]">Paste JSON and click Generate URL</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/[0.08] border border-red-500/20 rounded-[8px] p-3 font-mono text-[11.5px] text-red-400">
                  ✗ {error}
                </div>
              )}

              {url && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-green-400 bg-green-400/[0.08] border border-green-400/20 px-2.5 py-px rounded-full">✓ Generated</span>
                    <span className="font-mono text-[10px] text-white/20 bg-white/[0.04] border border-white/[0.08] px-2.5 py-px rounded-full">{size}</span>
                  </div>
                  <div className="bg-orange-500/[0.06] border border-orange-500/15 rounded-[8px] p-3.5">
                    <p className="font-mono text-[9.5px] text-white/25 uppercase tracking-[1px] mb-1.5">Your URL</p>
                    <p className="font-mono text-[11.5px] text-orange-400 break-all">{url}</p>
                    <button
                      onClick={copyUrl}
                      className="mt-2 font-mono text-[10px] text-white/40 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/20 rounded-[4px] px-2.5 py-1 transition-all"
                    >
                      {copied ? "copied!" : "copy URL"}
                    </button>
                  </div>
                  <div className="bg-[#080810] border border-white/[0.06] rounded-[8px] overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/[0.05]">
                      <span className="font-mono text-[9.5px] text-white/20 uppercase tracking-[0.8px]">Use it in your app</span>
                    </div>
                    <pre className="px-4 py-3 font-mono text-[11px] text-white/60 leading-[1.7] overflow-x-auto">{`fetch('${url}')
  .then(res => res.json())
  .then(data => console.log(data));`}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[12px] p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[12px] font-medium text-white/40 uppercase tracking-[0.5px]">How it works</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full bg-orange-500/15 border border-orange-500/25 flex items-center justify-center font-mono text-[10px] text-orange-500 flex-shrink-0 mt-0.5">
                  {s.n}
                </div>
                <div>
                  <p className="text-[12.5px] font-semibold text-white/70 mb-0.5">{s.title}</p>
                  <p className="text-[11.5px] text-white/35 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}