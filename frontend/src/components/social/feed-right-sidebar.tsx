'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { rentalProviders } from '@/data/rentals';
import { feedPosts } from '@/data/social-feed-data';
import { tourGuides } from '@/data/tour-guides';
import { fetchPlaces, type Place } from '@/lib/places';

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

const cardClass = 'rounded-[1.5rem] border border-[#dde6f4] bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]';
const headingClass = 'text-[0.7rem] font-black uppercase tracking-[0.14em] text-[#6d7280]';

const travelTips = [
  { title: 'East coast season', text: 'Calmest seas from May to September (Trincomalee, Arugam Bay).' },
  { title: 'South & west coast', text: 'Best between December and March, with dry, sunny days.' },
  { title: 'Hill country hikes', text: 'Start early: afternoon showers are common above 1,500 m.' },
];

type FeaturedProvider = { id: string; name: string; type: string; rating: number; image?: string; href: string };

function getFeaturedProviders(): FeaturedProvider[] {
  const rentals = ['lanka-wheels', 'hill-country-expeditions'].flatMap((id) => {
    const item = rentalProviders.find((provider) => provider.id === id);
    return item ? [{ id: item.id, name: item.name, type: 'Rental Vehicle', rating: item.rating, image: item.image, href: `/rentals/${item.id}` }] : [];
  });
  const guide = tourGuides.find((item) => item.id === 'kasun-wijesinghe');
  const guides = guide
    ? [{ id: guide.id, name: guide.name, type: 'Tour Guide', rating: guide.rating, image: guide.image, href: `/tour-guides/${guide.id}` }]
    : [];
  return [...guides, ...rentals];
}

export default function FeedRightSidebar() {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    let active = true;
    fetchPlaces()
      .then((items) => active && setPlaces(items))
      .catch(() => {
        // Trending links fall back to the locations page when places can't be loaded.
      });
    return () => {
      active = false;
    };
  }, []);

  const trending = useMemo(() => {
    const stats = new Map<string, { name: string; posts: number; likes: number }>();
    feedPosts.forEach((post) => {
      const entry = stats.get(post.location) ?? { name: post.location, posts: 0, likes: 0 };
      entry.posts += 1;
      entry.likes += post.likes;
      stats.set(post.location, entry);
    });
    return [...stats.values()].sort((a, b) => b.posts - a.posts || b.likes - a.likes).slice(0, 4);
  }, []);

  const placeHref = (name: string) => {
    const needle = normalize(name);
    const match = places.find((place) => {
      const label = normalize(place.name);
      return label === needle || label.includes(needle) || needle.includes(label);
    });
    return match ? `/locations/place/${match.id}` : '/locations';
  };

  const featured = useMemo(getFeaturedProviders, []);

  return (
    <aside className="hidden lg:sticky lg:top-24 lg:block lg:max-h-[calc(100vh-7rem)] lg:space-y-5 lg:self-start lg:overflow-y-auto lg:pl-1 [scrollbar-width:none]">
      <section className={cardClass}>
        <h2 className={headingClass}>Trending Destinations</h2>
        <ol className="mt-3 space-y-1">
          {trending.map((item, index) => (
            <li key={item.name}>
              <Link href={placeHref(item.name)} className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-[#f1f5ff]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eef3ff] text-xs font-black text-[#0d4abe]">{index + 1}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-[#001a43] group-hover:text-[#0d4abe]">{item.name}</span>
                  <span className="text-[0.7rem] text-[#8a93a6]">
                    {item.posts} {item.posts === 1 ? 'post' : 'posts'} &middot; {item.likes} likes
                  </span>
                </span>
                <svg {...iconProps} className="h-4 w-4 stroke-[#b3bccf] transition group-hover:stroke-[#0d4abe]">
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={cardClass}>
        <h2 className={headingClass}>Featured Providers</h2>
        <ul className="mt-3 space-y-1">
          {featured.map((provider) => (
            <li key={provider.id}>
              <Link href={provider.href} className="group flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-[#f1f5ff]">
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#eef3ff] ring-2 ring-[#f1f5ff]">
                  {provider.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={provider.image} alt="" className="h-full w-full object-cover" />
                  ) : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-sm font-bold text-[#001a43] group-hover:text-[#0d4abe]">{provider.name}</span>
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0 fill-[#0d4abe]" aria-label="Verified">
                      <path d="M12 2 9.5 4.2l-3.3-.1-.9 3.2-2.9 1.6 1 3.1L2 14.7l2.4 2.3.3 3.3 3.2.7L9.6 23l2.4-1.9 2.4 1.9 1.7-2 3.2-.7.3-3.3 2.4-2.3-1.4-2.8 1-3.1-2.9-1.6-.9-3.2-3.3.1L12 2Zm-1.2 14.2-3.4-3.4 1.4-1.4 2 2 4.4-4.4 1.4 1.4-5.8 5.8Z" />
                    </svg>
                  </span>
                  <span className="text-[0.7rem] text-[#8a93a6]">
                    {provider.type} &middot; <span className="font-semibold text-[#a28116]">&#9733; {provider.rating.toFixed(1)}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className={cardClass}>
        <h2 className={headingClass}>Travel Tips</h2>
        <ul className="mt-3 space-y-3">
          {travelTips.map((tip) => (
            <li key={tip.title} className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#c9a227]" />
              <p className="text-xs leading-5 text-[#4f586e]">
                <span className="block text-[0.8rem] font-bold text-[#001a43]">{tip.title}</span>
                {tip.text}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden rounded-[1.5rem] bg-[#001a43] p-5 text-white shadow-[0_22px_44px_rgba(0,26,67,0.25)]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#c9a227]/20 blur-2xl" />
        <p className="relative text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[#ffd977]">Plan Your Trip</p>
        <h2 className="relative mt-2 text-lg font-black leading-snug tracking-[-0.02em]">Turn inspiration into an itinerary</h2>
        <p className="relative mt-2 text-xs leading-5 text-white/70">Pick places, dates and a budget, and we&apos;ll shape the route.</p>
        <Link href="/trip-plan" className="btn-primary relative mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-xs font-bold text-white">
          Start planning
        </Link>
      </section>
    </aside>
  );
}
