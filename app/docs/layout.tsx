// app/docs/layout.tsx
import DocsSidebar from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      <DocsSidebar />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}