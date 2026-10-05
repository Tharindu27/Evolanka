import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import DiscoveryPreview from '@/components/home/discovery-preview';
import HeroSection from '@/components/home/hero-section';
import ServiceCategories from '@/components/home/service-categories';
import TravelerStories from '@/components/home/traveler-stories';
import TrustRibbon from '@/components/home/trust-ribbon';

export default function Home() {
  return (
    <main className="bg-[#f9f9ff] text-[#041b3c]">
      <Navbar />
      <HeroSection />
      <TrustRibbon />
      <DiscoveryPreview />
      <TravelerStories />
      <ServiceCategories />
      <Footer />
    </main>
  );
}