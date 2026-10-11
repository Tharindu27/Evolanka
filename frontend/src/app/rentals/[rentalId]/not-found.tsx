import Link from 'next/link';
import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';

export default function RentalProviderNotFound() {
  return (
    <div className="bg-white text-[#041b3c]">
      <Navbar active="/rentals" />

      <main className="mx-auto flex min-h-screen max-w-[1280px] flex-col items-center justify-center px-6 pb-12 pt-28 text-center">
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-[#003d9b]">404</p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight">Rental provider not found</h1>
        <p className="mt-4 max-w-md text-[#434654]">
          We couldn&rsquo;t find the rental provider you&rsquo;re looking for. It may have been removed, or the link
          may be incorrect.
        </p>
        <Link
          href="/rentals"
          className="mt-8 rounded-lg bg-[#003d9b] px-8 py-3 font-bold text-white transition-all hover:opacity-90 active:scale-95"
        >
          Browse rental providers
        </Link>
      </main>

      <Footer />
    </div>
  );
}
