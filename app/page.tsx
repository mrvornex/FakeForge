// app/page.tsx
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ApiExplorer from "@/components/ApiExplorer";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <ApiExplorer />
      <Footer />
    </main>
  );
}