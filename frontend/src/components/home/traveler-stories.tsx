import Link from 'next/link';
import { travelerStories } from '@/data/landing-page/traverler-story';

export default function TravelerStories() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 md:px-12">
      <div className="relative overflow-hidden rounded-[30px] border border-[#dfe4f2] bg-[#f4f7fb] p-6 shadow-[0_24px_70px_rgba(0,26,67,0.08)] sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-14 top-10 h-44 w-44 rounded-full bg-[#003d9b]/10 blur-3xl" />
          <div className="absolute -right-16 bottom-8 h-56 w-56 rounded-full bg-[#c9a227]/10 blur-3xl" />
        </div>

        <div className="relative mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#c9a227]">Community Moments</p>
          <h2 className="mb-3 text-3xl font-black tracking-tight text-[#001a43] sm:text-4xl">Traveler Stories</h2>
          <p className="mx-auto max-w-2xl text-base text-[#4e5568] sm:text-lg">
            Real moments shared by our global community of explorers.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-3">
          {travelerStories.map((story, index) => (
            <article
              key={story.user + story.time}
              className="group overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_18px_50px_rgba(0,26,67,0.11)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,26,67,0.18)]"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex items-center justify-between border-b border-[#edf1f8] bg-[#f9fbff] px-4 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={story.profileImage}
                    alt={`${story.name} profile`}
                    className="h-10 w-10 rounded-full border border-[#dce3f1] object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-[#001a43]">{story.name}</p>
                    <p className="text-xs text-[#5e667a]">{story.user} • {story.location}</p>
                  </div>
                </div>
                <span className="rounded-full border border-[#dbe3f2] bg-white px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#5e667a]">
                  {story.time}
                </span>
              </div>

              <div className="relative aspect-video overflow-hidden">
                <img
                  src={story.postImage}
                  alt={story.location}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a43]/80 via-[#001a43]/15 to-transparent" />
              </div>

              <div className="bg-gradient-to-b from-white to-[#f7f9fc] p-5">
                <p className="text-sm leading-relaxed text-[#4e5568]">
                  <span className="font-bold text-[#001a43]">{story.name}</span> {story.caption}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#e8edf7] pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2 text-xs font-semibold text-[#4e5568] transition-colors hover:bg-[#edf3ff] hover:text-[#001a43]"
                  >
                    <span aria-hidden="true">😍</span>
                    Emoji
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2 text-xs font-semibold text-[#4e5568] transition-colors hover:bg-[#edf3ff] hover:text-[#001a43]"
                  >
                    <span aria-hidden="true">💬</span>
                    Comment
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-2 py-2 text-xs font-semibold text-[#4e5568] transition-colors hover:bg-[#edf3ff] hover:text-[#001a43]"
                  >
                    <span aria-hidden="true">↗</span>
                    Share
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-10 flex justify-center">
          <Link
            href="/social-feed"
            className="inline-flex items-center justify-center rounded-full bg-[#001a43] px-7 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(0,26,67,0.2)] transition-all hover:bg-[#c9a227] hover:text-[#001a43]"
          >
            Go to Social Media Page
          </Link>
        </div>
      </div>
    </section>
  );
}
