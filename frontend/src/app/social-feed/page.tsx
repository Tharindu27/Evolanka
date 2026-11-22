import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import SocialFeed from '@/components/social/social-feed';

export default function SocialFeedPage() {
  return (
    <div className="bg-[#f9f9ff] text-[#001a43]">
      <Navbar />

      <main className="mx-auto max-w-[760px] px-6 pb-24 pt-32 md:px-8">
        <SocialFeed />
      </main>

      <Footer />
    </div>
  );
}
