'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import RouteClusters from '@/components/trip-plan/route-clusters';
import { getCategoryById, getPlaceById, getProvinceById, places, type Place } from '@/data/location-data/location-mock-data';
import { buildClusters, getItinerary, getStartPoint, saveItinerary, type Itinerary } from '@/lib/itinerary';

type Stop = {
  key: number;
  query: string;
  submitted: string;
  place: Place | null;
};

const cardClass = 'rounded-[1.5rem] border border-[#dfe8f4] bg-white shadow-[0_18px_50px_rgba(0,26,67,0.06)]';
const inputClass =
  'w-full rounded-xl border border-[#dfe7f5] bg-[#f3f6fc] px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#9aa3b5] focus:border-[#001a43]/30 focus:bg-white focus:ring-4 focus:ring-[#001a43]/5';
const labelClass = 'mb-1.5 block text-[0.72rem] font-bold uppercase tracking-[0.06em] text-[#4e5568]';

const areaOf = (place: Place) => `${place.city} · ${getProvinceById(place.provinceId)?.name ?? place.district}`;

const searchPlaces = (term: string) => {
  const needle = term.trim().toLowerCase();
  if (!needle) return [];
  return places.filter((place) => {
    const haystack = [
      place.name,
      place.city,
      place.district,
      place.shortDescription,
      getProvinceById(place.provinceId)?.name,
      getCategoryById(place.categoryId)?.name,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(needle);
  });
};

function StepBadge({ n, last }: { n: number; last?: boolean }) {
  return (
    <div className="hidden flex-col items-center md:flex">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#001a43] text-sm font-black text-white">{n}</span>
      {last ? null : <span className="mt-2 w-px flex-1 border-l-2 border-dashed border-[#c9d5ea]" />}
    </div>
  );
}

export default function TripPlanner({ editId }: { editId?: string }) {
  const router = useRouter();
  const [existing] = useState<Itinerary | null>(() => (editId ? (getItinerary(editId) ?? null) : null));

  const [name, setName] = useState(existing?.name ?? 'Southern Coastal Tour');
  const [timing, setTiming] = useState<'exact' | 'flexible'>(existing?.timing ?? 'exact');
  const [startDate, setStartDate] = useState(existing?.startDate ?? '');
  const [endDate, setEndDate] = useState(existing?.endDate ?? '');
  const [inSriLanka, setInSriLanka] = useState(existing?.inSriLanka ?? true);
  const [stops, setStops] = useState<Stop[]>(() => {
    const savedPlaces = (existing?.clusters.flat() ?? []).flatMap((id) => {
      const place = getPlaceById(id);
      return place ? [place] : [];
    });
    return savedPlaces.length > 0
      ? savedPlaces.map((place, index) => ({ key: index + 1, query: '', submitted: '', place }))
      : [{ key: 1, query: '', submitted: '', place: null }];
  });
  const [view, setView] = useState<'plan' | 'route'>('plan');
  const [clusters, setClusters] = useState<string[][]>([]);
  const [addedHotels, setAddedHotels] = useState<string[]>(existing?.hotels ?? []);

  const nextKey = useRef(stops.length + 1);
  const lastStopRef = useRef<HTMLElement>(null);
  const previousCount = useRef(stops.length);

  useEffect(() => {
    if (stops.length > previousCount.current) {
      lastStopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    previousCount.current = stops.length;
  }, [stops.length]);

  const chosenIds = stops.flatMap((stop) => (stop.place ? [stop.place.id] : []));

  const updateStop = (key: number, patch: Partial<Stop>) =>
    setStops((current) => current.map((stop) => (stop.key === key ? { ...stop, ...patch } : stop)));

  const addStop = () => {
    setStops((current) => [...current, { key: nextKey.current++, query: '', submitted: '', place: null }]);
  };

  const removeStop = (key: number) =>
    setStops((current) =>
      current.length === 1 ? [{ key, query: '', submitted: '', place: null }] : current.filter((stop) => stop.key !== key),
    );

  const startPoint = getStartPoint(inSriLanka);

  const optimizeRoute = () => {
    setClusters(buildClusters(chosenIds, inSriLanka));
    setView('route');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleHotel = (hotelName: string) =>
    setAddedHotels((current) => (current.includes(hotelName) ? current.filter((item) => item !== hotelName) : [...current, hotelName]));

  const saveTrip = () => {
    saveItinerary({
      id: existing?.id ?? crypto.randomUUID(),
      name: name.trim() || 'Untitled itinerary',
      timing,
      startDate: timing === 'exact' ? startDate : '',
      endDate: timing === 'exact' ? endDate : '',
      inSriLanka,
      clusters,
      hotels: addedHotels,
      savedAt: Date.now(),
    });
    router.push('/customer/profile/itinerary');
  };

  if (view === 'route') {
    const saveButton = (
      <button
        type="button"
        onClick={saveTrip}
        className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,26,67,0.2)] transition hover:text-white"
      >
        Save Itinerary
      </button>
    );

    return (
      <div>
        <span className="inline-flex rounded-full border border-[#dfe8f4] bg-white px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#a28116]">
          Transit efficiency optimization
        </span>

        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43] md:text-5xl">Optimized Route Clusters</h1>
            <p className="mt-3 max-w-xl text-base text-[#48566d]">
              Geographically sequenced travel clusters designed to minimize transit times and eliminate backtrack driving.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setView('plan')}
              className="rounded-full border border-[#dfe7f5] bg-white px-5 py-3 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
            >
              Back to edit
            </button>
            {saveButton}
          </div>
        </div>

        <div className="mt-8">
          <RouteClusters
            startLabel={startPoint.label}
            startTag={startPoint.tag}
            clusters={clusters}
            addedHotels={addedHotels}
            onToggleHotel={toggleHotel}
          />
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-[#dfe8f4] pt-8">
          {saveButton}
          <p className="text-xs text-[#6d7280]">
            All {clusters.length + 1} route clusters will be archived to your EVOLANKA account
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-black tracking-[-0.06em] text-[#001a43] md:text-5xl">
        {existing ? 'Edit Your Itinerary' : 'Build Your Sri Lankan Adventure'}
      </h1>
      <p className="mt-3 text-base text-[#48566d]">Map out your journey across the pearl of the Indian Ocean.</p>

      <section className={`${cardClass} mt-8 p-6`}>
        <label htmlFor="trip-name" className={labelClass}>
          Itinerary Name
        </label>
        <input id="trip-name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />

        <p className={`${labelClass} mt-5`}>Trip Timing</p>
        <div className="inline-flex rounded-full border border-[#dfe7f5] bg-[#f3f6fc] p-1">
          {(['exact', 'flexible'] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setTiming(option)}
              className={[
                'rounded-full px-5 py-2 text-sm font-semibold transition',
                timing === option ? 'bg-[#001a43] text-white' : 'text-[#4e5568] hover:text-[#001a43]',
              ].join(' ')}
            >
              {option === 'exact' ? 'Exact Time Period' : 'Flexible'}
            </button>
          ))}
        </div>

        {timing === 'exact' ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="start-date" className={labelClass}>
                Start Date
              </label>
              <input id="start-date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className={inputClass} />
            </div>
            <div>
              <label htmlFor="end-date" className={labelClass}>
                End Date
              </label>
              <input id="end-date" type="date" min={startDate} value={endDate} onChange={(event) => setEndDate(event.target.value)} className={inputClass} />
            </div>
          </div>
        ) : (
          <p className="mt-5 rounded-xl bg-[#f3f6fc] px-4 py-3 text-sm text-[#566277]">
            No fixed dates. We will suggest the best order of stops and the ideal season for them.
          </p>
        )}
      </section>

      <div className="mt-8 flex gap-5">
        <StepBadge n={1} />
        <section className={`${cardClass} flex-1 p-6`}>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#a28116]">Starting point setup</p>
          <h2 className="mt-1 text-xl font-black tracking-[-0.03em] text-[#001a43]">Are you currently in Sri Lanka?</h2>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {[
              { value: true, title: 'Yes, in Sri Lanka', note: 'Use current live location (GPS)' },
              { value: false, title: 'No, arriving from abroad', note: 'Start at CMB Airport (Katunayake)' },
            ].map((option) => {
              const active = inSriLanka === option.value;
              return (
                <button
                  key={option.title}
                  type="button"
                  onClick={() => setInSriLanka(option.value)}
                  className={[
                    'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition',
                    active ? 'border-[#001a43] bg-[#f3f6fc]' : 'border-[#dfe7f5] bg-white hover:bg-[#f8fafd]',
                  ].join(' ')}
                >
                  <span>
                    <span className="block text-sm font-bold text-[#001a43]">{option.title}</span>
                    <span className="block text-xs text-[#6d7280]">{option.note}</span>
                  </span>
                  <span
                    className={[
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                      active ? 'border-[#001a43] bg-[#001a43]' : 'border-[#c9d5ea]',
                    ].join(' ')}
                  >
                    {active ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-[#dfe8f4] bg-[#f8fafd] px-5 py-4">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#0b6b3a]">
              {inSriLanka ? 'Live geolocation detected' : 'Arrival airport'}
            </p>
            <p className="mt-1 text-xl font-black tracking-[-0.03em] text-[#001a43]">
              {inSriLanka ? 'Colombo Fort (Western Province)' : 'Bandaranaike International Airport (CMB)'}
            </p>
            <p className="mt-1 text-xs text-[#6d7280]">
              {inSriLanka ? 'Current coordinates: 6.9344° N, 79.8428° E · Ready for route optimization' : 'Katunayake · Gampaha District'}
            </p>
          </div>
        </section>
      </div>

      <div className="mt-8 flex gap-5">
        <StepBadge n={2} last />
        <div className="min-w-0 flex-1 space-y-5">
          {stops.map((stop, index) => {
            const searched = stop.submitted.trim().length > 0;
            const results = searchPlaces(stop.submitted);
            const isLast = index === stops.length - 1;

            return (
              <section key={stop.key} ref={isLast ? lastStopRef : undefined} className={`${cardClass} p-6`}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#a28116]">Stop {index + 1}</p>
                  {stops.length > 1 || stop.place ? (
                    <button
                      type="button"
                      onClick={() => removeStop(stop.key)}
                      className="text-xs font-semibold text-[#c4161c] hover:underline"
                    >
                      Remove stop
                    </button>
                  ) : null}
                </div>

                {stop.place ? (
                  <div className="mt-3 flex flex-wrap items-center gap-4 rounded-xl border border-[#dfe8f4] bg-[#f8fafd] p-3">
                    <img src={stop.place.image} alt={stop.place.name} className="h-16 w-16 shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-black text-[#001a43]">{stop.place.name}</h3>
                      <p className="mt-0.5 text-xs text-[#6d7280]">{areaOf(stop.place)}</p>
                      <p className="mt-1 line-clamp-1 text-xs text-[#566277]">{stop.place.shortDescription}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <Link
                        href={`/locations/place/${stop.place.id}`}
                        className="rounded-lg border border-[#dfe7f5] bg-white px-3 py-2 text-xs font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
                      >
                        View Details
                      </Link>
                      <button
                        type="button"
                        onClick={() => updateStop(stop.key, { place: null })}
                        className="rounded-lg border border-[#dfe7f5] bg-white px-3 py-2 text-xs font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        updateStop(stop.key, { submitted: stop.query });
                      }}
                      className="mt-3 flex flex-col gap-3 sm:flex-row"
                    >
                      <input
                        value={stop.query}
                        onChange={(event) => updateStop(stop.key, { query: event.target.value })}
                        placeholder="Search EVOLANKA locations, e.g. Sigiriya, beach, Kandy"
                        aria-label={`Search locations for stop ${index + 1}`}
                        className={inputClass}
                      />
                      <button type="submit" className="btn-primary rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:text-white">
                        Search
                      </button>
                    </form>

                    {searched ? (
                      <div className="mt-3 flex items-center justify-between text-xs text-[#6d7280]">
                        <span>Searching verified EVOLANKA database for "{stop.submitted.trim()}"</span>
                        <span>
                          {results.length} {results.length === 1 ? 'match' : 'matches'} found
                        </span>
                      </div>
                    ) : (
                      <p className="mt-3 text-xs text-[#6d7280]">Search a place, city, province or category to see matching EVOLANKA locations.</p>
                    )}

                    {searched ? (
                    <div className="mt-4 rounded-2xl border border-[#dfe8f4] bg-[#f8fafd] p-4">
                      <p className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-[#001a43]">Verified EVOLANKA locations</p>

                      <div className="mt-3 max-h-[22rem] space-y-3 overflow-y-auto pr-1">
                        {results.length === 0 ? (
                          <p className="py-6 text-center text-sm text-[#6d7280]">No locations match your search.</p>
                        ) : null}

                        {results.map((place) => {
                          const taken = chosenIds.includes(place.id);
                          return (
                            <article key={place.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-[#dfe8f4] bg-white p-3">
                              <img src={place.image} alt={place.name} className="h-14 w-14 shrink-0 rounded-lg object-cover" />

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h3 className="text-sm font-black text-[#001a43]">{place.name}</h3>
                                  <span className="rounded-full bg-[#fbf3d9] px-2 py-0.5 text-[0.62rem] font-bold uppercase text-[#8a6d0f]">
                                    {getCategoryById(place.categoryId)?.name}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-xs text-[#6d7280]">{areaOf(place)}</p>
                                <p className="mt-1 line-clamp-1 text-xs text-[#566277]">{place.shortDescription}</p>
                              </div>

                              <div className="flex shrink-0 gap-2">
                                <Link
                                  href={`/locations/place/${place.id}`}
                                  className="rounded-lg border border-[#dfe7f5] bg-white px-3 py-2 text-xs font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
                                >
                                  View Details
                                </Link>
                                <button
                                  type="button"
                                  disabled={taken}
                                  onClick={() => updateStop(stop.key, { place })}
                                  className="btn-primary rounded-lg px-3 py-2 text-xs font-bold text-white transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                  {taken ? 'Added' : '+ Add to Itinerary'}
                                </button>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    </div>
                    ) : null}
                  </>
                )}
              </section>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-sm flex-col gap-3">
        <button
          type="button"
          disabled={chosenIds.length < 2}
          onClick={optimizeRoute}
          className="btn-primary rounded-full px-6 py-3.5 text-sm font-bold text-white shadow-[0_18px_42px_rgba(0,26,67,0.2)] transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Optimize Route
        </button>
        <button
          type="button"
          onClick={addStop}
          className="rounded-full border-2 border-dashed border-[#c9d5ea] px-6 py-3 text-sm font-bold text-[#001a43] transition hover:bg-[#f4f8ff]"
        >
          + Add More Stops
        </button>
      </div>
    </div>
  );
}
