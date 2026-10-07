import Image from 'next/image';
import type { HotelDetail } from '../hotel-data';

export default function AccommodationsSection({ hotel }: { hotel: HotelDetail }) {
  return (
    <section className="bg-[#f8f9fa] px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <h2 className="mb-12 text-center text-3xl font-bold text-[#001a43] md:text-4xl">Our Accommodations</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {hotel.accommodations.map((room) => (
            <article key={room.name} className="group flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d6]/50 bg-white shadow-sm">
              <div className="relative h-64 overflow-hidden">
                <Image src={room.image} alt={`${hotel.name} ${room.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#003d9b] backdrop-blur-md">{room.price} / night</span>
                {room.popular && <span className="absolute right-4 top-4 rounded-full bg-[#003d9b] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">Popular</span>}
              </div>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="mb-4 text-2xl font-semibold text-[#001a43]">{room.name}</h3>
                <p className="mb-6 text-[#434654]">{room.description}</p>
                <ul className="mb-8 space-y-2 text-sm font-semibold text-[#434654]">{room.features.map((feature) => <li key={feature.label} className="flex items-center gap-2"><span className="material-symbols-outlined text-lg text-[#003d9b]">{feature.icon}</span>{feature.label}</li>)}</ul>
                <button type="button" className="mt-auto w-full rounded-xl bg-[#003d9b] py-3 font-semibold text-white transition hover:brightness-110">Check Availability</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
