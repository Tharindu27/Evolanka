import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";
import HotelsContent from "@/components/hotels/hotels-content";

export const metadata = {
  title: "Hotels & Stays in Sri Lanka | EVOLANKA",
  description:
    "Discover verified luxury hotels, heritage villas, and scenic resorts with full facility filters across Sri Lanka.",
};

export default function HotelsPage() {
  return (
    <div className="min-h-screen bg-[#f8fbff] text-[#001a43] flex flex-col justify-between">
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] px-4 sm:px-6 md:px-12 pt-28 pb-20 flex-1">
        <HotelsContent />
      </main>

      <Footer />
    </div>
  );
}

