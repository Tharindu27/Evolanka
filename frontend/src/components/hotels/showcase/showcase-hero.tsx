import Image from 'next/image';
import Link from 'next/link';
import type { HotelDetail } from '../hotel-data';

export default function ShowcaseHero({ hotel }: { hotel: HotelDetail }) {
  return (
    <header className="relative flex min-h-[680px] items-end overflow-hidden bg-[#001a43]">
      <Image src={hotel.image} alt={`${hotel.name} exterior`} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/90 via-[#001a43]/20 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 pb-20 md:px-12">
        <Link href="/hotels" className="mb-12 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/80 px-4 py-2 text-sm font-semibold text-[#001a43] backdrop-blur-md transition hover:bg-white">
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to hotels
        </Link>
        <div className="max-w-3xl text-white">
          <span className="mb-4 block text-xs font-bold uppercase tracking-[0.2em] text-[#b2c5ff]">{hotel.location}</span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">{hotel.heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/90">{hotel.tagline}</p>
        </div>
      </div>
    </header>
  );
}
