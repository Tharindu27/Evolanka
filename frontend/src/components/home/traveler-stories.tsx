const stories = [
  {
    user: '@ella_explorer',
    location: 'Ella, Sri Lanka',
    caption:
      "Waking up to this view at the Nine Arch Bridge was a dream come true. The mist rolling over the tea plantations is something I'll never forget.",
    time: '2 hours ago',
    initials: 'EE',
  },
  {
    user: '@sun_lover_99',
    location: 'Mirissa Beach',
    caption:
      "Golden hour in Mirissa. The waves are perfect and the vibes are even better. If you haven't been to the south coast yet, what are you waiting for?",
    time: '5 hours ago',
    initials: 'SL',
  },
  {
    user: '@ancient_hunter',
    location: 'Sigiriya',
    caption:
      "Conquered the Lion Rock this morning. 1,200 steps later and the view is absolutely worth it. Sri Lanka's history is mind-blowing.",
    time: 'Yesterday',
    initials: 'AH',
    image: '/images/landing-page/sigiriya.png',
  },
];

export default function TravelerStories() {
  return (
    <section className="bg-[#f1f3ff] py-24">
      <div className="mx-auto max-w-[1440px] px-8 md:px-12">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-3xl font-bold text-[#041b3c]">Traveler Stories</h2>
          <p className="mx-auto max-w-xl text-lg text-slate-600">
            Real moments shared by our global community of explorers.
          </p>
        </div>

        <div className="mx-auto max-w-2xl space-y-8">
          {stories.map((story) => (
            <article key={story.user + story.time} className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dae2ff] text-xs font-bold text-[#003d9b]">
                    {story.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#041b3c]">{story.user}</p>
                    <p className="text-xs text-slate-500">{story.location}</p>
                  </div>
                </div>
              </div>

              <div className="aspect-video">
                <img src={story.image} alt={story.location} className="h-full w-full object-cover" />
              </div>

              <div className="p-4">
                <p className="text-sm leading-relaxed text-[#041b3c]">
                  <span className="font-bold">{story.user}</span> {story.caption}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-slate-500">{story.time}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
