// app/page.tsx
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ApiExplorer from "@/components/ApiExplorer";
import Footer from "@/components/Footer";
import ResourceCards from "@/components/ResourceCards";


export default function Home() {
  return (
    <main className="bg-[#0a0a0f] min-h-screen">
      <HeroSection />
      <ResourceCards />
      <FeaturesSection />
      <ApiExplorer />
      <Footer />
    </main>
  );
}