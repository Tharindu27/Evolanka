import Link from 'next/link';
import { discoveryCards } from '@/data/landing-page/card-data';

export default function DiscoveryPreview() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-12">
      <div className="relative overflow-hidden rounded-[30px] border border-[#dfe4f2] bg-[#f4f7fb] p-6 shadow-[0_24px_70px_rgba(0,26,67,0.08)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-12 top-10 h-44 w-44 rounded-full bg-[#003d9b]/10 blur-3xl" />
          <div className="absolute -right-14 bottom-6 h-52 w-52 rounded-full bg-[#c9a227]/10 blur-3xl" />
        </div>

        <div className="relative mb-10 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Trending Now</p>
            <h2 className="mb-2 text-3xl font-black tracking-tight text-[#001a43] sm:text-4xl">Discover Your Next Adventure</h2>
            <p className="max-w-xl text-base text-[#4e5568] sm:text-lg">
            Join the feed where travelers share live updates from across Sri Lanka.
            </p>
          </div>
          <Link
            href="/locations"
            className="inline-flex items-center rounded-full border border-[#cfd8eb] bg-white px-5 py-2.5 text-sm font-bold text-[#001a43] shadow-[0_8px_22px_rgba(0,26,67,0.08)] transition-colors hover:border-[#001a43] hover:bg-[#001a43] hover:text-white"
          >
            View More
          </Link>
        </div>

        <div className="-mx-2 flex gap-5 overflow-x-auto px-2 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {discoveryCards.map((card) => (
            <Link
              key={card.title}
              href={`/locations/place/${card.id}`}
              className="group block min-w-[320px] md:min-w-[390px]"
            >
              <article className="overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_18px_50px_rgba(0,26,67,0.11)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,26,67,0.18)]">
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/92 via-[#001a43]/25 to-transparent" />

                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                    {card.district}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                    <p className="line-clamp-1 text-xl font-black tracking-tight text-white">{card.title}</p>
                    <span className="rounded-full border border-white/20 bg-white/15 px-2.5 py-1 text-xs font-semibold text-[#ffd977] backdrop-blur">
                      View
                    </span>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-white to-[#f7f9fc] p-5">
                  <p className="line-clamp-3 text-sm leading-relaxed text-[#4e5568]">{card.description}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#003d9b] transition-transform duration-300 group-hover:translate-x-1">
                    Explore details
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
