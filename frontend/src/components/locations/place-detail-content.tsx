'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Place } from '@/data/location-data/location-mock-data';

type PlaceDetailContentProps = {
  place: Place;
};

export default function PlaceDetailContent({ place }: PlaceDetailContentProps) {
  const latOffset = 0.08;
  const lngOffset = 0.08;
  const bbox = [
    place.coordinates.lng - lngOffset,
    place.coordinates.lat - latOffset,
    place.coordinates.lng + lngOffset,
    place.coordinates.lat + latOffset,
  ].join('%2C');
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${place.coordinates.lat}%2C${place.coordinates.lng}`;
  const mapLink = `https://www.openstreetmap.org/?mlat=${place.coordinates.lat}&mlon=${place.coordinates.lng}#map=13/${place.coordinates.lat}/${place.coordinates.lng}`;



  const galleryImages = [place.image, ...place.gallery].filter((image, index, array) => array.indexOf(image) === index);


  const hotelToSlug = (hotelName: string) =>
    hotelName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

  const router = useRouter();
  const pricingRows = [
    { label: 'Local Adults', value: place.ticketPricing.localAdults },
    { label: 'Local Children', value: place.ticketPricing.localChildren },
    { label: 'Foreign Adults', value: place.ticketPricing.foreignAdults },
    { label: 'Foreign Children', value: place.ticketPricing.foreignChildren },
  ];

  const visitRows = [
    { label: 'Days', value: place.visitTime.days },
    { label: 'Open Time', value: place.visitTime.openTime },
    { label: 'Close Time', value: place.visitTime.closeTime },
    {
      label: place.visitTime.access === 'Seasonal' ? 'Time Period' : 'Access',
      value: place.visitTime.access === 'Seasonal' ? place.visitTime.timePeriod ?? 'Seasonal' : 'Normal',
    },
  ];


  return (
    <>
      <section className="relative mb-12 overflow-hidden rounded-2xl">
        <div className="h-[620px] w-full">
          <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        <div className="absolute left-0 top-0 p-5">
          <button onClick={() => router.back()} className="inline-flex items-center rounded-xl bg-black/60 px-4 py-2 text-sm text-white" >
            Back
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-8 text-white md:p-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]">
            {place.district}, {place.city}
          </p>
          <h1 className="mb-3 text-6xl font-black">{place.name}</h1>
          <p className="max-w-2xl text-white/90">{place.shortDescription}</p>
        </div>
      </section>


      <section className="mb-16 overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-3xl font-black text-[#001a43]">Gallery</h2>
          <span className="text-sm text-slate-500">Scroll to view more</span>
        </div>
        <div className="-mx-2 flex gap-4 overflow-x-auto px-2 pb-2">
          {galleryImages.map((image, index) => (
            <img
              key={`${image}-${index}`}
              src={image}
              alt={`${place.name} gallery ${index + 1}`}
              className="h-72 w-[420px] min-w-[420px] rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>


      <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-3xl font-black text-[#001a43]">Overview</h2>
        <p className="leading-8 text-slate-700">{place.overview}</p>
      </section>

      <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-5 text-3xl font-black text-[#001a43]">Highlights</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {place.highlights.map((highlight) => (
            <div key={highlight} className="rounded-2xl bg-[#f4f7ff] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#003d9b]">Top Pick</p>
              <p className="mt-3 text-base leading-7 text-[#001a43]">{highlight}</p>
            </div>
          ))}
        </div>
      </section>


      <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-[#001a43]">Tickets and Pricing</h2>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Ticket Categories</p>
          <div className="space-y-3">
            {pricingRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl bg-[#f4f7ff] px-4 py-3"
              >
                <span className="text-sm font-semibold text-slate-600">{row.label}</span>
                <span className="text-sm font-black text-[#001a43]">{row.value}</span>
              </div>
            ))}
          </div>
          {place.ticketPricing.note ? (
            <p className="mt-4 text-sm leading-6 text-slate-500">{place.ticketPricing.note}</p>
          ) : null}
        </article>

        <article className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-black text-[#001a43]">Visit Time</h2>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Visiting Details</p>
          <div className="space-y-3">
            {visitRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3"
              >
                <span className="text-sm font-semibold text-slate-600">{row.label}</span>
                <span className="text-right text-sm font-black text-[#001a43]">{row.value}</span>
              </div>
            ))}
          </div>
          {place.visitTime.note ? (
            <p className="mt-4 text-sm leading-6 text-slate-500">{place.visitTime.note}</p>
          ) : null}
        </article>
      </section>


      <section className="mb-8 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-5 text-2xl font-black text-[#001a43]">Nearby Hotels</h2>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {place.nearbyHotels.map((hotel) => (
            <Link
              key={hotel.name}
              href={`/hotels/${hotelToSlug(hotel.name)}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-[#003d9b]/40 hover:bg-[#eef4ff]"
            >
              <div className="h-28 w-full overflow-hidden md:h-32">
                <img src={hotel.image} alt={hotel.name} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
              </div>
              <div className="px-3 py-3 md:px-4">
                <p className="line-clamp-2 text-sm font-bold leading-5 text-[#001a43] md:text-base">{hotel.name}</p>
                <p className="mt-1 text-xs font-semibold text-[#003d9b]">View hotel</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      <section className="mb-16 rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="mb-5 text-2xl font-black text-[#001a43]">Travel Tips</h2>
        <ul className="space-y-3 text-slate-700">
          {place.travelTips.map((tip) => (
            <li key={tip} className="rounded-2xl bg-slate-50 px-4 py-4 leading-7">
              {tip}
            </li>
          ))}
        </ul>
      </section>


      <section className="mb-16 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#003d9b]">Map</p>
          <h2 className="mt-2 text-3xl font-black text-[#001a43]">Find This Place</h2>
          <p className="mt-2 text-slate-600">{place.mapLabel}</p>
        </div>

        <div className="h-[460px] w-full overflow-hidden">
          <iframe title={`${place.name} map`} src={mapSrc} className="h-full w-full" loading="lazy" />
        </div>

        <div className="flex flex-col items-start justify-between gap-4 bg-[#0f172a] px-6 py-5 text-white md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/60">Location</p>
            <p className="mt-1 text-2xl font-black">{place.mapLabel}</p>
          </div>
          <Link
            href={mapLink}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#1d4ed8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#2563eb]"
          >
            Open Map
          </Link>
        </div>
      </section>
    </>
  );
}
