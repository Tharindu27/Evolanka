import Image from 'next/image';
import Link from 'next/link';
import type { Hotel } from './hotel-data';

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  const hotelSlug = hotel.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <article className="group overflow-hidden rounded-xl border border-[#c3c6d6]/50 bg-white transition-all duration-300 hover:border-[#003d9b] hover:shadow-md">
      <div className="relative h-64 overflow-hidden">
        <Image src={hotel.image} alt={`${hotel.name} in ${hotel.location}`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
        {hotel.badge && <span className="absolute right-4 top-4 rounded-full border border-[#c3c6d6] bg-white/90 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[#003d9b] backdrop-blur-md">{hotel.badge}</span>}
      </div>
      <div className="flex min-h-[230px] flex-col p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-7 text-[#001a43]">{hotel.name}</h3>
          <div className="flex shrink-0 items-center gap-1 text-[#e60073]">
            <span className="material-symbols-outlined text-[18px] fill-1">star</span>
            <span className="text-sm font-bold text-[#001a43]">{hotel.rating}</span>
            <span className="text-sm text-[#434654]">({hotel.reviews})</span>
          </div>
        </div>
        <p className="mb-6 flex items-center gap-1 text-sm text-[#434654]"><span className="material-symbols-outlined text-[16px]">location_on</span>{hotel.location}</p>
        <div className="mt-auto flex items-center justify-between gap-4 border-t border-[#c3c6d6] pt-6">
          <div className="flex flex-col"><span className="text-sm text-[#434654]">Starting from</span><span className="text-xl font-semibold text-[#001a43]">{hotel.price} <span className="text-sm font-normal">/ night</span></span></div>
          <div className="flex items-center gap-2">
            <Link
              href={`/hotels/${hotelSlug}`}
              className="rounded-lg border border-[#003d9b] px-4 py-3 text-sm font-bold text-[#003d9b] transition-colors hover:bg-[#003d9b]/5"
            >
              View More
            </Link>
            <button
              type="button"
              className="rounded-lg bg-[#003d9b] px-5 py-3 font-bold text-white transition-transform hover:brightness-110 active:scale-95"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
