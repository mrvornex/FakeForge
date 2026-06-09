// app/docs/image/page.tsx
import { DocsPageHeader, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";

const PARAMS = [
  { name: "width x height", desc: "Image dimensions in pixels (e.g. 200x150)" },
  { name: "text",           desc: "Text to display on the image" },
  { name: "bgColor",        desc: "Background color (name or hex without #)" },
  { name: "textColor",      desc: "Text color (name or hex without #)" },
  { name: "fontSize",       desc: "Font size in pixels" },
  { name: "format",         desc: "Image format: png, jpg, webp, svg" },
];

const EXAMPLES = [
  { url: "/image/200x150",                        desc: "Simple 200×150 placeholder" },
  { url: "/image/400x200?text=FakeForge",         desc: "Custom text" },
  { url: "/image/300x300?bgColor=1a1a2e&textColor=f97316&text=FF", desc: "Custom colors" },
  { url: "/image/600x400?format=svg",             desc: "SVG format" },
  { url: "/image/100x100?fontSize=40&text=:)",    desc: "Custom font size" },
];

export default function ImageDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Dynamic Image" title="Dynamic Image"
          description="Generate placeholder images on the fly with custom dimensions, text, colors and format. No setup needed — just use the URL directly in your img src." />

        <SectionTitle title="URL Format" />
        <div className="bg-[#0d0d14] border border-white/[0.07] rounded-[9px] p-4 mb-6">
          <p className="font-mono text-[13px] text-white/60">
            <span className="text-white/30">fakeforge.vercel.app</span>
            <span className="text-orange-400">/image/</span>
            <span className="text-green-400">{"<width>"}x{"<height>"}</span>
            <span className="text-white/30">?param=value</span>
          </p>
        </div>

        <SectionTitle title="Parameters" />
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr>
              {["Parameter","Description"].map(h => (
                <th key={h} className="font-mono text-[9.5px] text-white/20 text-left px-2 pb-2 uppercase tracking-[0.8px] font-normal">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PARAMS.map(p => (
              <tr key={p.name} className="border-b border-white/[0.04] last:border-0">
                <td className="font-mono text-[11px] text-orange-400 px-2 py-[6px] whitespace-nowrap">{p.name}</td>
                <td className="font-mono text-[11px] text-white/45 px-2 py-[6px]">{p.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <SectionTitle title="Examples" />
        <div className="flex flex-col gap-3 mb-6">
          {EXAMPLES.map(ex => (
            <div key={ex.url} className="bg-[#0d0d14] border border-white/[0.07] rounded-[9px] p-3.5">
              <p className="font-mono text-[11px] text-white/30 mb-1.5">{ex.desc}</p>
              <p className="font-mono text-[12px] text-orange-400">
                <span className="text-white/25">fakeforge.vercel.app</span>{ex.url}
              </p>
            </div>
          ))}
        </div>

        <SectionTitle title="Usage in HTML" />
        <div className="bg-[#080810] border border-white/[0.06] rounded-[8px] overflow-hidden">
          <div className="flex items-center px-3 py-2 border-b border-white/[0.05]">
            <span className="font-mono text-[9.5px] text-white/25 uppercase tracking-[0.8px]">html</span>
          </div>
          <pre className="px-4 py-3.5 font-mono text-[11.5px] leading-[1.75] text-white/65 overflow-x-auto">{`<img src="https://fakeforge.vercel.app/image/400x300?text=Hello" alt="placeholder" />

// In React
<img
  src={\`https://fakeforge.vercel.app/image/\${width}x\${height}?text=\${title}\`}
  alt={title}
/>`}</pre>
        </div>
      </div>
      <OnThisPage items={["URL Format","Parameters","Examples","Usage in HTML"]} />
    </div>
  );
}