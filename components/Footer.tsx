import Link from "next/link";

const LINKS = [
  { label: "Docs",       href: "/docs"                                          },
  { label: "Products",   href: "/docs/products"                                 },
  { label: "Users",      href: "/docs/users"                                    },
  { label: "Posts",      href: "/docs/posts"                                    },
  { label: "Auth",       href: "/docs/auth"                                     },
  { label: "GitHub",     href: "https://github.com/yourusername/fakeforge"      },
  { label: "Changelog",  href: "/changelog"                                     },
  { label: "Contact",    href: "mailto:hello@fakeforge.dev"                     },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="max-w-[960px] mx-auto flex flex-col items-center gap-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-[6px] bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-mono text-[12px] font-semibold text-white">
            FF
          </div>
          <span className="font-['Syne',sans-serif] text-[15px] font-bold text-black tracking-tight">
            Fake<span className="text-blue-400">Forge</span>
          </span>
        </Link>

        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {LINKS.map((l) => {
            const isExternal = l.href.startsWith("http") || l.href.startsWith("mailto");
            const Comp = isExternal ? "a" : Link;
            const extra = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};
            return (
              <Comp
                key={l.label}
                href={l.href}
                {...(extra as object)}
                className="font-mono text-[11.5px] text-black hover:text-blue-400 transition-colors duration-150"
              >
                {l.label}
              </Comp>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-black" />

        {/* Bottom */}
        <div className="flex items-center justify-between w-full flex-wrap gap-3">
          <span className="font-mono text-[10.5px] text-black">
            © 2025 <span className="text-blue-400">FakeForge</span> — MIT License
          </span>
          <div className="flex items-center gap-1.5 font-mono text-[10.5px] text-ff-dark bg-blue-400/[0.06] border border-green-400/[0.12] px-2.5 py-[5px] rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/80 animate-pulse" />
            All systems operational
          </div>
        </div>

      </div>
    </footer>
  );
}