"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SideItem {
  label: string; href: string;
  color: string; count?: string;
}

interface SideSection {
  title: string; items: SideItem[];
}

const SECTIONS: SideSection[] = [
  {
    title: "Getting Started",
    items: [
      { label: "Introduction",   href: "/docs",             color: "#94a3b8" },
      { label: "Authentication", href: "/docs/auth",        color: "#94a3b8" },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "Products",  href: "/docs/products",  color: "#f97316", count: "194"  },
      { label: "Users",     href: "/docs/users",     color: "#60a5fa", count: "208"  },
      { label: "Posts",     href: "/docs/posts",     color: "#4ade80", count: "251"  },
      { label: "Comments",  href: "/docs/comments",  color: "#e879f9", count: "340"  },
      { label: "Todos",     href: "/docs/todos",     color: "#34d399", count: "254"  },
      { label: "Carts",     href: "/docs/carts",     color: "#facc15", count: "20"   },
      { label: "Quotes",    href: "/docs/quotes",    color: "#a78bfa", count: "100"  },
      { label: "Recipes",   href: "/docs/recipes",   color: "#fb7185", count: "50"   },
    ],
  },
  {
    title: "Special",
    items: [
      { label: "Auth / Login",   href: "/docs/auth-login",  color: "#f97316" },
      { label: "Dynamic Image",  href: "/docs/image",       color: "#38bdf8" },
      { label: "Mock HTTP",      href: "/docs/http",        color: "#f87171" },
      { label: "IP Address",     href: "/docs/ip",          color: "#94a3b8" },
    ],
  },
];

export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] flex-shrink-0 border-r border-black sticky top-[102px] h-[calc(100vh-102px)] overflow-y-auto">
      <nav className="py-5">
        {SECTIONS.map((section) => (
          <div key={section.title} className="px-3 mb-1">
            <p className="font-mono text-[9.5px] text-black tracking-[1.2px] uppercase px-2 py-2.5">
              {section.title}
            </p>
            {section.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href} href={item.href}
                  className={[
                    "flex items-center gap-2 px-2 py-[7px] rounded-[7px] border transition-all duration-150 mb-0.5",
                    active
                      ? "bg-blue-500/10 border-blue-500/20"
                      : "border-transparent hover:bg-black/[0.04]",
                  ].join(" ")}
                >
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className={`text-[12.5px] flex-1 ${active ? "text-blue-400" : "text-black"}`}>
                    {item.label}
                  </span>
                  {item.count && (
                    <span className={`font-mono text-[9px] ${active ? "text-blue-400/50" : "text-black"}`}>
                      {item.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}