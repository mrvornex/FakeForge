import Link from "next/link";

// ─── Stats Data ───────────────────────────────────────────────────────────────
const STATS = [
  { num: "10+",   label: "Resources"   },
  { num: "100%",  label: "Free Forever"},
  { num: "0ms",   label: "Setup Time"  },
  { num: "50k+",  label: "Developers"  },
];

// ─── Code Preview Lines ───────────────────────────────────────────────────────
const CODE_LINES = [
  { ln: "1", parts: [{ t: "comment", v: "// Fetch fake products — no setup needed" }] },
  { ln: "2", parts: [{ t: "fn", v: "fetch" }, { t: "plain", v: "(" }, { t: "str", v: "'https://fakeforge.vercel.app/products?limit=5'" }, { t: "plain", v: ")" }] },
  { ln: "3", parts: [{ t: "plain", v: "  ." }, { t: "fn", v: "then" }, { t: "plain", v: "(" }, { t: "key", v: "res" }, { t: "plain", v: " => res." }, { t: "fn", v: "json" }, { t: "plain", v: "())" }] },
  { ln: "4", parts: [{ t: "plain", v: "  ." }, { t: "fn", v: "then" }, { t: "plain", v: "(" }, { t: "key", v: "data" }, { t: "plain", v: " => console." }, { t: "fn", v: "log" }, { t: "plain", v: "(data));" }] },
  { ln: "5", parts: [{ t: "comment", v: "// Response ↓" }], gap: true },
  { ln: "6", parts: [{ t: "plain", v: "{ " }, { t: "key", v: "products" }, { t: "plain", v: ": [{ " }, { t: "key", v: "id" }, { t: "plain", v: ": " }, { t: "num", v: "1" }, { t: "plain", v: ", " }, { t: "key", v: "title" }, { t: "plain", v: ": " }, { t: "str", v: '"iPhone 9"' }, { t: "plain", v: ", " }, { t: "key", v: "price" }, { t: "plain", v: ": " }, { t: "num", v: "549" }, { t: "plain", v: ", ... }]," }] },
  { ln: "7", parts: [{ t: "plain", v: "  " }, { t: "key", v: "total" }, { t: "plain", v: ": " }, { t: "num", v: "194" }, { t: "plain", v: ", " }, { t: "key", v: "skip" }, { t: "plain", v: ": " }, { t: "num", v: "0" }, { t: "plain", v: ", " }, { t: "key", v: "limit" }, { t: "plain", v: ": " }, { t: "num", v: "5" }, { t: "plain", v: " }" }] },
];

// ─── Syntax color map ─────────────────────────────────────────────────────────
const syntaxClass: Record<string, string> = {
  comment : "text-white/25",
  key     : "text-orange-400",
  str     : "text-green-400",
  fn      : "text-blue-400",
  num     : "text-fuchsia-400",
  plain   : "text-white/75",
};

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconTerminal() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative bg-[#0a0a0f] overflow-hidden px-6 pt-20 pb-16 flex flex-col items-center text-center">

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)" }}
      />

      {/* Badge */}
      <div className="relative inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-4 py-1.5 mb-7">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
        <span className="font-mono text-[11.5px] text-orange-400 tracking-wide">
          Free Fake REST API — No auth required
        </span>
      </div>

      {/* Heading */}
      <h1 className="relative font-['Syne',sans-serif] text-[58px] font-extrabold leading-[1.08] tracking-[-2px] text-white mb-5 max-w-2xl">
        Fake data,{" "}
        <span className="text-orange-500">real speed.</span>
        <br />
        <span className="text-white/35">Build faster.</span>
      </h1>

      {/* Subtitle */}
      <p className="relative font-['Syne',sans-serif] text-[17px] text-white/50 leading-relaxed max-w-lg mb-10">
        FakeForge gives you instant{" "}
        <strong className="text-white/80 font-semibold">fake JSON APIs</strong> for
        products, users, posts, carts, todos & more — so you can prototype without a backend.
      </p>

      {/* CTA Buttons */}
      <div className="relative flex items-center gap-3 mb-14 flex-wrap justify-center">
        <Link
          href="/docs"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-[#0a0a0f] font-['Syne',sans-serif] text-sm font-bold px-6 py-3 rounded-[9px] transition-all hover:-translate-y-px"
        >
          <IconTerminal />
          Explore the Docs
        </Link>
        <a
          href="https://github.com/mrvornex/FakeForge"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-transparent hover:bg-white/[0.05] text-white/65 hover:text-white font-['Syne',sans-serif] text-sm font-semibold px-6 py-3 rounded-[9px] border border-white/[0.12] hover:border-white/25 transition-all"
        >
          <IconGitHub />
          View on GitHub
        </a>
      </div>

      {/* Code Window */}
      <div className="relative w-full max-w-[620px] bg-[#0d0d14] border border-white/[0.08] rounded-xl overflow-hidden text-left">

        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0d0d14]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="font-mono text-[11px] text-white/25 ml-auto">example.js</span>
        </div>

        {/* Code lines */}
        <div className="px-6 py-5 font-mono text-[12.5px] leading-[1.8]">
          {CODE_LINES.map((line) => (
            <div key={line.ln} className={line.gap ? "mt-3" : ""}>
              <span className="text-white/15 mr-5 select-none">{line.ln}</span>
              {line.parts.map((part, i) => (
                <span key={i} className={syntaxClass[part.t]}>
                  {part.v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="relative flex items-center gap-6 mt-7 flex-wrap justify-center">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-0.5">
              <span className="font-['Syne',sans-serif] text-[22px] font-extrabold text-white">
                {s.num.replace(/(\d+)([^0-9]*)/, (_, n, suf) => n)}<span className="text-orange-500">{s.num.replace(/^[\d]+/, "")}</span>
              </span>
              <span className="font-mono text-[10px] text-white/30 uppercase tracking-wide">{s.label}</span>
            </div>
            {i < STATS.length - 1 && (
              <div className="w-px h-8 bg-white/[0.08]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}