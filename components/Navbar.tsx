"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

interface SubLink {
  label: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { label: "Home",            href: "/"               },
  { label: "Docs",            href: "/docs"           },
  { label: "Custom Response", href: "/custom-response"},
  { label: "Dynamic Image",   href: "/docs/image"     },
  { label: "Mock HTTP",       href: "/docs/http", badge: "New" },
];

const SUB_LINKS: SubLink[] = [
  { label: "/test",     href: "/docs#intro-test"     },
  { label: "/products", href: "/docs/products"       },
  { label: "/users",    href: "/docs/users"          },
  { label: "/posts",    href: "/docs/posts"          },
  { label: "/carts",    href: "/docs/carts"          },
  { label: "/todos",    href: "/docs/todos"          },
  { label: "/quotes",   href: "/docs/quotes"         },
  { label: "/recipes",  href: "/docs/recipes"        },
  { label: "/comments", href: "/docs/comments"       },
  { label: "/auth",     href: "/docs/auth"           },
  { label: "/image",    href: "/docs/image"          },
  { label: "/http",     href: "/docs/http"           },
  { label: "/ip",       href: "/docs#intro-ip"       },
];

// ─── Icons (inline SVG — no extra dependency needed) ──────────────────────────
const Icons = {
  Home: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  Book: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Settings: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  ),
  Image: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
  Globe: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  GitHub: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  ),
  Terminal: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
  Dot: () => (
    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 inline-block" />
  ),
};

// ─── Icon map for nav links ────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.FC> = {
  "Home":            Icons.Home,
  "Docs":            Icons.Book,
  "Custom Response": Icons.Settings,
  "Dynamic Image":   Icons.Image,
  "Mock HTTP":       Icons.Globe,
};

// ─── Navbar Component ──────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ── Main Nav ── */}
      <nav className="bg-[#0F1117] border-b border-blue-100 px-6 h-[60px] flex items-center justify-between relative shadow-sm">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-[7px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-mono text-[13px] font-semibold text-white tracking-tighter select-none">
            FF
          </div>
          <span className="font-['Syne',sans-serif] text-[17px] font-bold text-white tracking-tight">
            Fake<span className="text-blue-600">Forge</span>
          </span>
        </Link>

        {/* Center Links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-0.5 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map((link) => {
            const Icon = NAV_ICONS[link.label];
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "flex items-center gap-1.5 px-3.5 py-1.5 rounded-[7px] text-[13.5px] font-['Syne',sans-serif] transition-all duration-150 border whitespace-nowrap",
                  active
                    ? "text-blue-600 bg-blue-50 border-blue-200"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-100 hover:border-gray-200",
                ].join(" ")}
              >
                {Icon && <Icon />}
                {link.label}
                {link.badge && (
                  <span className="font-mono text-[9px] font-semibold bg-blue-600 text-white px-1.5 py-px rounded uppercase tracking-wide">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
          <span className="font-mono text-[11px] text-gray-400 bg-gray-100 border border-gray-200 px-2 py-1 rounded-[5px] tracking-wide">
            v2.0.0
          </span>

          <div className="w-px h-[22px] bg-gray-200" />

          <a
            href="https://github.com/mrvornex/FakeForge"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[13px] font-['Syne',sans-serif] font-semibold text-gray-600 px-3 py-[7px] rounded-[7px] border border-gray-200 bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100 transition-all duration-150"
          >
            <Icons.GitHub />
            GitHub
          </a>

          <Link
            href="/docs"
            className="flex items-center gap-1.5 text-[13px] font-['Syne',sans-serif] font-semibold text-white px-4 py-[7px] rounded-[7px] bg-blue-600 hover:bg-blue-700 transition-all duration-150 border border-blue-600 hover:border-blue-700"
          >
            <Icons.Terminal />
            Try API
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="md:hidden text-gray-500 hover:text-gray-900 transition-colors p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </nav>

      {/* ── Sub Nav (API endpoints) ── */}
      <div className="bg-[#0F1117] border-b border-gray-200 px-6 h-[42px] flex items-center gap-0.5 overflow-x-auto scrollbar-none">
        {SUB_LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "flex items-center gap-1.5 px-3 py-[5px] rounded-[5px] font-mono text-[11.5px] whitespace-nowrap border transition-all duration-150",
                active
                  ? "text-blue-600 bg-blue-50 border-blue-200"
                  : "text-gray-400 border-transparent hover:text-gray-700 hover:bg-[gray-100]",
              ].join(" ")}
            >
              <Icons.Dot />
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* ── Mobile Dropdown ── */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => {
            const Icon = NAV_ICONS[link.label];
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "flex items-center gap-2 px-3 py-2.5 rounded-[7px] text-[14px] font-['Syne',sans-serif] border transition-all",
                  active
                    ? "text-blue-600 bg-blue-50 border-blue-200"
                    : "text-gray-500 border-transparent hover:text-gray-900 hover:bg-gray-50",
                ].join(" ")}
              >
                {Icon && <Icon />}
                {link.label}
                {link.badge && (
                  <span className="ml-auto font-mono text-[9px] font-semibold bg-blue-600 text-white px-1.5 py-px rounded uppercase">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="border-t border-gray-200 mt-2 pt-3 flex items-center gap-2">
            <a
              href="https://github.com/yourusername/fakeforge"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 text-[13px] font-['Syne',sans-serif] font-semibold text-gray-600 px-3 py-2 rounded-[7px] border border-gray-200 bg-gray-50"
            >
              <Icons.GitHub />
              GitHub
            </a>
            <Link
              href="/docs"
              onClick={() => setMobileOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 text-[13px] font-['Syne',sans-serif] font-semibold text-white px-3 py-2 rounded-[7px] bg-blue-600"
            >
              <Icons.Terminal />
              Try API
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}