import Link from "next/link";

interface Resource {
  title: string;
  url: string;
  href: string;
  icon: string;
  color: string;
}

const RESOURCES: Resource[] = [
  { title: "Products",  url: "fakeforge.vercel.app/api/products",    href: "/api/products",    icon: "ti-headphones",   color: "from-[#f97068] to-[#e63946]" },
  { title: "Carts",     url: "fakeforge.vercel.app/api/carts",       href: "/api/carts",       icon: "ti-shopping-cart", color: "from-[#4ecdc4] to-[#2a9d8f]" },
  { title: "Users",     url: "fakeforge.vercel.app/api/users",       href: "/api/users",       icon: "ti-user",         color: "from-[#7b6cf6] to-[#5a4fcf]" },
  { title: "Posts",     url: "fakeforge.vercel.app/api/posts",       href: "/api/posts",       icon: "ti-pencil",       color: "from-[#f4845f] to-[#e76f51]" },
  { title: "Comments",  url: "fakeforge.vercel.app/api/comments",    href: "/api/comments",    icon: "ti-message",      color: "from-[#4ecdc4] to-[#2a9d8f]" },
  { title: "Quotes",    url: "fakeforge.vercel.app/api/quotes",      href: "/api/quotes",      icon: "ti-quote",        color: "from-[#f97068] to-[#e63946]" },
  { title: "Todos",     url: "fakeforge.vercel.app/api/todos",       href: "/api/todos",       icon: "ti-list-check",   color: "from-[#7b6cf6] to-[#5a4fcf]" },
  { title: "Recipes",   url: "fakeforge.vercel.app/api/recipes",     href: "/api/recipes",     icon: "ti-flame",        color: "from-[#f4845f] to-[#e76f51]" },
  { title: "Image",     url: "fakeforge.vercel.app/api/image",       href: "/api/image/400x300", icon: "ti-photo",      color: "from-[#f97068] to-[#e63946]" },
  { title: "Auth",      url: "fakeforge.vercel.app/api/auth/login",  href: "/api/auth/login",  icon: "ti-lock",         color: "from-[#4ecdc4] to-[#2a9d8f]" },
];

export default function ResourceCards() {
  return (
    <section className="bg-[#0a0a0f] px-8 py-14">
      <div className="max-w-[860px] mx-auto">
        <div className="mb-8">
          <h2 className="text-[36px] font-bold text-white mb-1.5">Top Resources:</h2>
          <p className="text-[14px] text-white/40">
            Access fake data, fully organized and ready to use, all in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {RESOURCES.map((r) => (
            <a
              key={r.title}
              href={`https://fakeforge.vercel.app${r.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-4 px-6 py-5 rounded-[14px] bg-gradient-to-br ${r.color} hover:-translate-y-0.5 hover:brightness-110 transition-all duration-150 group`}
            >
              {/* Icon */}
              <div className="w-13 h-13 rounded-[12px] bg-white/15 flex items-center justify-center flex-shrink-0">
                <i className={`ti ${r.icon} text-white`} style={{ fontSize: 28 }} aria-hidden="true" />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="text-[18px] font-bold text-white mb-0.5">{r.title}</div>
                <div className="text-[11.5px] text-white/65 font-mono truncate">{r.url}</div>
              </div>

              {/* Arrow */}
              <i className="ti ti-arrow-up-right text-white/60 group-hover:text-white transition-colors" style={{ fontSize: 20 }} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}