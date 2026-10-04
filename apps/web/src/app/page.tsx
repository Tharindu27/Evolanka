import TopNavBar from "@/components/layout/TopNavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import TrustRibbon from "@/components/sections/TrustRibbon";
import DiscoverySection from "@/components/sections/DiscoverySection";
import TravelerStories from "@/components/sections/TravelerStories";
import ServiceCategories from "@/components/sections/ServiceCategories";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-on-surface selection:bg-primary-container selection:text-on-primary">
      <TopNavBar />
      <main>
        <HeroSection />
        <TrustRibbon />
        <DiscoverySection />
        <TravelerStories />
        <ServiceCategories />
      </main>
      <Footer />
    </div>
  );
}
