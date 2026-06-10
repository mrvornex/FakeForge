import Link from "next/link";

const STATS = [
  { num: "10+",  suffix: "",  label: "Resources"   },
  { num: "100",  suffix: "%", label: "Free Forever" },
  { num: "0",    suffix: "ms",label: "Setup Time"   },
  { num: "50k",  suffix: "+", label: "Developers"   },
];

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

export default function HeroSection() {
  return (
    <section className="bg-[#0f1117] px-6 pt-16 pb-14 flex flex-col items-center text-center">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3.5 py-1.5 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
        <span className="font-mono text-[11px] text-blue-400 tracking-wide">
          Free Fake REST API — No auth required
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[48px] font-semibold text-slate-100 leading-[1.1] tracking-[-1.5px] mb-4 max-w-xl">
        Fake data,{" "}
        <span className="text-blue-500">real speed.</span>
      </h1>

      {/* Subtitle */}
      <p className="text-[16px] text-slate-500 leading-relaxed max-w-[440px] mb-8">
        FakeForge gives you instant{" "}
        <span className="text-slate-400">fake JSON APIs</span> for products, users,
        posts & more — prototype without a backend.
      </p>

      {/* Buttons */}
      <div className="flex items-center gap-2.5 mb-12">
        <Link href="/docs"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-[14px] font-medium px-5 py-2.5 rounded-[7px] transition-colors">
          Explore Docs
        </Link>
        <a href="https://github.com/yourusername/fakeforge" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-2 text-[14px] text-slate-400 hover:text-slate-200 border border-white/[0.1] hover:border-white/[0.2] px-5 py-2.5 rounded-[7px] transition-all">
          <GitHubIcon /> GitHub
        </a>
      </div>

      {/* Code window */}
      <div className="w-full max-w-[560px] bg-[#0d1117] border border-white/[0.08] rounded-[10px] overflow-hidden text-left">
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="font-mono text-[11px] text-slate-600 ml-auto">example.js</span>
        </div>
        <div className="px-5 py-4 font-mono text-[12px] leading-[1.75]">
          <div className="text-slate-600">{"// No setup needed — just fetch"}</div>
          <div>
            <span className="text-blue-400">fetch</span>
            <span className="text-slate-300">(</span>
            <span className="text-green-400">'https://fakeforge.vercel.app/api/products?limit=5'</span>
            <span className="text-slate-300">)</span>
          </div>
          <div>
            <span className="text-slate-400">  .then(res ={">"} res.</span>
            <span className="text-blue-400">json</span>
            <span className="text-slate-400">())</span>
          </div>
          <div>
            <span className="text-slate-400">  .then(data ={">"} console.</span>
            <span className="text-blue-400">log</span>
            <span className="text-slate-400">(data));</span>
          </div>
          <div className="mt-2.5 text-slate-600">{"// → { products: [...], total: 194, skip: 0, limit: 5 }"}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center mt-8">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className="flex flex-col items-center px-7">
              <span className="text-[20px] font-semibold text-slate-100">
                {s.num}<span className="text-blue-500">{s.suffix}</span>
              </span>
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wide mt-0.5">
                {s.label}
              </span>
            </div>
            {i < STATS.length - 1 && <div className="w-px h-8 bg-white/[0.06]" />}
          </div>
        ))}
      </div>
    </section>
  );
}