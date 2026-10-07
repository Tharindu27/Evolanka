import Image from 'next/image';
import type { HotelDetail } from '../hotel-data';

export default function LocationSection({ hotel }: { hotel: HotelDetail }) {
  return (
    <section className="bg-[#f8f9fa] px-6 py-20 md:px-12 md:py-24">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative h-[420px] overflow-hidden rounded-3xl"><Image src={hotel.locationImage} alt={`${hotel.name} location`} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" /><div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-xl bg-white/90 p-6 backdrop-blur-md"><div><p className="text-xl font-semibold text-[#001a43]">{hotel.location.split(',')[0]}</p><p className="text-sm text-[#434654]">A memorable destination in Sri Lanka</p></div><span className="material-symbols-outlined text-[#003d9b]">location_on</span></div></div>
        <div><h2 className="mb-8 text-3xl font-bold text-[#001a43] md:text-4xl">{hotel.locationTitle}</h2><p className="mb-6 leading-7 text-[#434654]">{hotel.locationDescription}</p><ul className="space-y-4">{hotel.nearby.map((place) => <li key={place.title} className="flex items-start gap-4"><span className="material-symbols-outlined text-[#003d9b]">directions_walk</span><div><p className="font-semibold text-[#001a43]">{place.title}</p><p className="text-sm text-[#434654]">{place.description}</p></div></li>)}</ul></div>
      </div>
    </section>
  );
}
