import Image from 'next/image';
import type { HotelDetail } from '../hotel-data';

export default function HeritageSection({ hotel }: { hotel: HotelDetail }) {
  return (
    <section className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 md:py-24">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="mb-8 text-3xl font-bold text-[#001a43] md:text-4xl">{hotel.heritageTitle}</h2>
          <div className="space-y-6 leading-7 text-[#434654]">{hotel.heritage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
          <div className="mt-10 flex gap-4">
            <div className="rounded-xl border border-[#c3c6d6]/50 bg-[#f8f9fa] p-4"><span className="block text-3xl font-black text-[#003d9b]">{hotel.established}</span><span className="text-xs font-bold tracking-widest text-[#434654]">ESTABLISHED</span></div>
            <div className="rounded-xl border border-[#c3c6d6]/50 bg-[#f8f9fa] p-4"><span className="block text-3xl font-black text-[#003d9b]">{hotel.siteLabel}</span><span className="text-xs font-bold tracking-widest text-[#434654]">SITE LOCATION</span></div>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl md:col-span-6 md:col-start-8">
          <Image src={hotel.heritageImage} alt={`${hotel.name} heritage`} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
