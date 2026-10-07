import type { HotelDetail } from '../hotel-data';

export default function AmenitiesSection({ hotel }: { hotel: HotelDetail }) {
  return (
    <section className="px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-12 text-center"><h2 className="text-3xl font-bold text-[#001a43] md:text-4xl">World-Class Amenities</h2><p className="mx-auto mt-4 max-w-2xl text-[#434654]">Immerse yourself in the tranquility of our curated facilities, designed for relaxation and cultural immersion.</p></div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {hotel.amenities.map((amenity) => <article key={amenity.name} className="rounded-2xl border border-[#c3c6d6]/50 bg-white p-8 text-center shadow-sm"><div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#003d9b]/10"><span className="material-symbols-outlined text-3xl text-[#003d9b]">{amenity.icon}</span></div><h3 className="mb-2 text-xl font-semibold text-[#001a43]">{amenity.name}</h3><p className="text-sm leading-6 text-[#434654]">{amenity.description}</p></article>)}
        </div>
      </div>
    </section>
  );
}
