import Link from "next/link";

const RESOURCES = [
  { label: "Products",  href: "/docs/products",  icon: "ti-database"        },
  { label: "Users",     href: "/docs/users",     icon: "ti-users"           },
  { label: "Posts",     href: "/docs/posts",     icon: "ti-file-text"       },
  { label: "Comments",  href: "/docs/comments",  icon: "ti-message"         },
  { label: "Todos",     href: "/docs/todos",     icon: "ti-check"           },
  { label: "Carts",     href: "/docs/carts",     icon: "ti-shopping-cart"   },
  { label: "Quotes",    href: "/docs/quotes",    icon: "ti-quote"           },
  { label: "Recipes",   href: "/docs/recipes",   icon: "ti-tools-kitchen-2" },
];

const FEATURES = [
  { label: "API Explorer",      href: "/#explorer",            icon: "ti-terminal-2"   },
  { label: "Dynamic Image",     href: "/docs/image",           icon: "ti-photo"        },
  { label: "Custom Response",   href: "/custom-response",      icon: "ti-settings-2"   },
  { label: "Mock HTTP",         href: "/docs/http",            icon: "ti-world",  badge: "New" },
  { label: "JWT Auth",          href: "/docs/auth",            icon: "ti-lock"         },
  { label: "Delay Simulation",  href: "/docs#delay",           icon: "ti-clock"        },
  { label: "Pagination & Sort", href: "/docs#pagination",      icon: "ti-filter"       },
];

const DEV_LINKS = [
  { label: "Documentation", href: "/docs",                                    icon: "ti-book"         },
  { label: "GitHub",        href: "https://github.com/yourusername/fakeforge", icon: "ti-brand-github" },
  { label: "Report a Bug",  href: "https://github.com/yourusername/fakeforge/issues", icon: "ti-bug" },
  { label: "Sponsor",       href: "#",                                         icon: "ti-heart"        },
  { label: "Contact",       href: "mailto:hello@fakeforge.dev",                icon: "ti-mail"         },
  { label: "Changelog",     href: "/changelog",                                icon: "ti-rss"          },
];

const SOCIALS = [
  { icon: "ti-brand-github",  href: "https://github.com/yourusername/fakeforge", label: "GitHub"  },
  { icon: "ti-brand-twitter", href: "#",                                          label: "Twitter" },
  { icon: "ti-brand-discord", href: "#",                                          label: "Discord" },
  { icon: "ti-brand-npm",     href: "#",                                          label: "npm"     },
];

function ColLink({ label, href, icon, badge }: { label: string; href: string; icon: string; badge?: string }) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto");
  const Comp = isExternal ? "a" : Link;
  const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Comp
      href={href}
      {...(extraProps as object)}
      className="flex items-center gap-1.5 text-[13px] text-white/45 hover:text-orange-500 transition-colors duration-150"
    >
      <i className={`ti ${icon}`} style={{ fontSize: 14 }} aria-hidden="true" />
      {label}
      {badge && (
        <span className="font-mono text-[9px] bg-orange-500/15 border border-orange-500/30 text-orange-500 px-1.5 py-px rounded-[4px]">
          {badge}
        </span>
      )}
    </Comp>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#080810] border-t border-white/[0.06] px-6 pt-14 pb-8">

      {/* Top Grid */}
      <div className="grid grid-cols-4 gap-12 max-w-[960px] mx-auto mb-12">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-[7px] bg-orange-500 flex items-center justify-center font-mono text-[13px] font-semibold text-white flex-shrink-0">
              FF
            </div>
            <span className="font-['Syne',sans-serif] text-[17px] font-bold text-white tracking-tight">
              Fake<span className="text-orange-500">Forge</span>
            </span>
          </Link>
          <p className="font-['Syne',sans-serif] text-[13px] text-white/35 leading-[1.7] mb-5 max-w-[220px]">
            Free fake REST API for developers. No setup, no auth, no rate limits. Just fetch and build.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label} href={s.href} aria-label={s.label}
                target="_blank" rel="noopener noreferrer"
                className="w-[34px] h-[34px] rounded-[8px] border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/45 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-150"
              >
                <i className={`ti ${s.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <p className="font-mono text-[10px] text-white/25 tracking-[1.2px] uppercase mb-4">Resources</p>
          <div className="flex flex-col gap-2.5">
            {RESOURCES.map((r) => <ColLink key={r.label} {...r} />)}
          </div>
        </div>

        {/* Features */}
        <div>
          <p className="font-mono text-[10px] text-white/25 tracking-[1.2px] uppercase mb-4">Features</p>
          <div className="flex flex-col gap-2.5">
            {FEATURES.map((f) => <ColLink key={f.label} {...f} />)}
          </div>
        </div>

        {/* Developers */}
        <div>
          <p className="font-mono text-[10px] text-white/25 tracking-[1.2px] uppercase mb-4">Developers</p>
          <div className="flex flex-col gap-2.5">
            {DEV_LINKS.map((d) => <ColLink key={d.label} {...d} />)}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-[960px] mx-auto h-px bg-white/[0.06] mb-7" />

      {/* Bottom Bar */}
      <div className="max-w-[960px] mx-auto flex items-center justify-between flex-wrap gap-3">
        <span className="font-mono text-[11px] text-white/20">
          © 2025 <span className="text-orange-500/60">FakeForge</span> — Built with Next.js & ♥
        </span>

        {/* Status pill */}
        <div className="flex items-center gap-1.5 font-mono text-[11px] text-green-400/70 bg-green-400/[0.08] border border-green-400/15 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          All systems operational
        </div>

        <div className="flex gap-5">
          {["Privacy", "Terms", "License (MIT)"].map((t) => (
            <Link key={t} href="#" className="font-mono text-[11px] text-white/25 hover:text-white/60 transition-colors">
              {t}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}