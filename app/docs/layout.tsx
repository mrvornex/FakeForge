// app/docs/layout.tsx
import DocsSidebar from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F0F6FF]">
      <DocsSidebar />
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}