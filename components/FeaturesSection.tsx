// ─── Types ────────────────────────────────────────────────────────────────────
interface Feature {
  icon: React.ReactNode;
  title: string;
  desc: string;
  tag?: string;
  tagIcon?: React.ReactNode;
  chips?: { label: string; active?: boolean }[];
  wide?: boolean;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const icons = {
  Database: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  Filter: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
    </svg>
  ),
  Lock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Image: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Clock: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  Settings: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Globe: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  Rocket: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  ),
};

// ─── Features Data ────────────────────────────────────────────────────────────
const FEATURES: Feature[] = [
  {
    icon: icons.Database,
    title: "10+ Ready-to-use Resources",
    desc: "Products, users, posts, comments, carts, todos, quotes, recipes & more — all with realistic data.",
    chips: [
      { label: "/products", active: true },
      { label: "/users",    active: true },
      { label: "/posts",    active: true },
      { label: "/carts"   },
      { label: "/todos"   },
      { label: "/quotes"  },
      { label: "/recipes" },
      { label: "/comments"},
      { label: "/auth"    },
      { label: "/image"   },
    ],
    wide: true,
  },
  {
    icon: icons.Filter,
    title: "Pagination & Filtering",
    desc: "Limit, skip, sort, search & select specific fields from any resource.",
    tag: "?limit=10&skip=5&sortBy=price",
  },
  {
    icon: icons.Lock,
    title: "JWT Auth System",
    desc: "Login, get access & refresh tokens, and test authenticated endpoints just like a real app.",
    tag: "Bearer Token Support",
  },
  {
    icon: icons.Image,
    title: "Dynamic Images",
    desc: "Generate placeholder images with custom size, color, text, font, format & identicons on the fly.",
    tag: "/image/200x150?text=Hello",
  },
  {
    icon: icons.Clock,
    title: "Delay Simulation",
    desc: "Add artificial latency to any request to test loading states and skeleton UIs.",
    tag: "?delay=2000ms",
  },
  {
    icon: icons.Settings,
    title: "Custom Response",
    desc: "Send your own JSON, get a unique URL back. Perfect for mocking custom API shapes.",
    tag: "Your JSON → Unique URL",
  },
  {
    icon: icons.Globe,
    title: "Mock HTTP Status Codes",
    desc: "Test how your app handles different HTTP codes — just hit the right route and get the response you need.",
    chips: [
      { label: "200 OK",            active: true },
      { label: "201 Created"   },
      { label: "400 Bad Request"},
      { label: "401 Unauthorized"},
      { label: "403 Forbidden"  },
      { label: "404 Not Found"  },
      { label: "500 Server Error"},
    ],
    wide: true,
  },
  {
    icon: icons.Rocket,
    title: "Zero Setup",
    desc: "No API key, no registration, no rate limits. Just fetch and go — works with any frontend stack.",
    tag: "Works with React, Vue, Svelte...",
  },
];

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div
      className={[
        "group relative bg-[#0d0d14] border border-white/[0.07] rounded-[14px] p-6",
        "hover:border-orange-500/20 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden",
        feature.wide ? "col-span-2" : "",
      ].join(" ")}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: "radial-gradient(circle at 30% 30%, rgba(249,115,22,0.06), transparent 70%)" }}
      />

      {/* Icon */}
      <div className="relative w-10 h-10 rounded-[10px] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4">
        {feature.icon}
      </div>

      {/* Text */}
      <h3 className="relative font-['Syne',sans-serif] text-[15px] font-bold text-white mb-2 tracking-[-0.3px]">
        {feature.title}
      </h3>
      <p className="relative font-['Syne',sans-serif] text-[13px] text-white/40 leading-relaxed">
        {feature.desc}
      </p>

      {/* Tag */}
      {feature.tag && (
        <div className="relative inline-flex items-center gap-1.5 mt-3.5 font-mono text-[10px] text-orange-500 bg-orange-500/[0.08] border border-orange-500/15 px-2.5 py-[3px] rounded-full">
          {feature.tag}
        </div>
      )}

      {/* Chips */}
      {feature.chips && (
        <div className="relative flex flex-wrap gap-1.5 mt-3.5">
          {feature.chips.map((chip) => (
            <span
              key={chip.label}
              className={[
                "font-mono text-[10.5px] px-2.5 py-[3px] rounded-[5px] border",
                chip.active
                  ? "text-orange-500 bg-orange-500/[0.08] border-orange-500/20"
                  : "text-white/50 bg-white/[0.05] border-white/[0.08]",
              ].join(" ")}
            >
              {chip.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Features Section ─────────────────────────────────────────────────────────
export default function FeaturesSection() {
  return (
    <section className="bg-[#0a0a0f] px-6 py-20">

      {/* Label */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="w-8 h-px bg-orange-500/40" />
        <span className="font-mono text-[11px] text-orange-500 tracking-[1.5px] uppercase">
          Why FakeForge
        </span>
        <div className="w-8 h-px bg-orange-500/40" />
      </div>

      {/* Title */}
      <h2 className="font-['Syne',sans-serif] text-[40px] font-extrabold text-white text-center tracking-[-1.5px] leading-[1.1] mb-3">
        Everything you need to{" "}
        <span className="text-orange-500">prototype fast</span>
      </h2>
      <p className="font-['Syne',sans-serif] text-[15px] text-white/40 text-center max-w-[420px] mx-auto mb-14 leading-relaxed">
        No backend? No problem. FakeForge gives you realistic data instantly so you can focus on building.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4 max-w-[900px] mx-auto">
        {FEATURES.map((f) => (
          <FeatureCard key={f.title} feature={f} />
        ))}
      </div>

      {/* Divider */}
      <div className="w-full max-w-[900px] mx-auto mt-12 h-px bg-white/[0.05]" />
    </section>
  );
}