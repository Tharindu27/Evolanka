const posts = [
  {
    initials: "EE",
    handle: "@ella_explorer",
    location: "Ella, Sri Lanka",
    avatarBg: "bg-primary-container",
    avatarText: "text-on-primary-container",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLtcWZ_dQdbBpVEhAIaTKZATGzf2Nb5jfQCdHTPO40DyfIJt4SPaCtGNBZe52AXtIQsseY776nM4Rk6dt0VEJMi2Jbf5J67sI8lIBnlHZq1xCbkIxHfRqVo6dBT_oFliKd8yNOwESvz19C8E1iDaIDNKD-WOtF9cKC9oLmzsWyRNWvftfZyK-mvt-Znj3jQC043Cqn6e6y0gFFSzd5TODrnw2HUY1Tj1XTieH4VWoZK5-xeJd-R7leHihhAJ",
    imageAlt: "Nine Arch Bridge",
    content:
      "Waking up to this view at the Nine Arch Bridge was a dream come true. The mist rolling over the tea plantations is something I'll never forget. #SriLanka #Ella #Travel",
    time: "2 hours ago",
  },
  {
    initials: "SL",
    handle: "@sun_lover_99",
    location: "Mirissa Beach",
    avatarBg: "bg-secondary-container",
    avatarText: "text-on-secondary-container",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLu2BloVpt8FR1WJysrCDBGei_dD0ha8CM84_5D-0bXoZFhgDeYS1U1og5lkabZAY2Wft4FZYvVKnXdBVRqFJqyc3KgvbtnSUiUeTDTEFkN8k6nlhcEZlZuRJizbzjNeeJ7GZ6XSFCj4BGWLJ0txUGiPlBzN2vHyOR9SDrzhRsw4mPwCHstqcXSLve-933K3ZaOdVzZS9rorpPr-A53R9YlqYmdkdx_qqBzqt-D2fLGxpJKaZ96BK5Pon3o",
    imageAlt: "Mirissa Beach Sunset",
    content:
      "Golden hour in Mirissa. The waves are perfect and the vibes are even better. If you haven't been to the south coast yet, what are you waiting for? 🥥🌅",
    time: "5 hours ago",
  },
  {
    initials: "AH",
    handle: "@ancient_hunter",
    location: "Sigiriya",
    avatarBg: "bg-tertiary-fixed-dim",
    avatarText: "text-on-tertiary-fixed-variant",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuqZOAetABPvxwNHq6cUC6QjYI8AS3jK1csVcaJ2bA3a3OATaejGwW7J4XKzpaPH7Z34lRlSW8ee3xpCugMdvoDG9y8xNiznGDHxJjoHJXiL6hl9YzfrKDSop3ivixV6bWJieBFpccC8Qfkvc7UZQWSiw1gJKPvVbog4KKrNS0klXHPtXjTI22joctjOjZe56791Q6G-dkicWcNjeyP__nrWbmdTJV0jUaJso1CnjWzOWcUBx9tWXIjQY1M",
    imageAlt: "Sigiriya Lion Rock",
    content:
      "Conquered the Lion Rock this morning. 1,200 steps later and the view is absolutely worth it. Sri Lanka's history is mind-blowing. 🦁🏰",
    time: "Yesterday",
  },
];

export default function TravelerStories() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-on-surface mb-3">
            Traveler Stories
          </h2>
          <p className="text-lg text-on-surface-variant max-w-xl mx-auto">
            Real moments shared by our global community of explorers.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-8">
          {posts.map((post) => (
            <div
              key={post.handle}
              className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 overflow-hidden shadow-sm"
            >
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${post.avatarBg} flex items-center justify-center ${post.avatarText} font-bold text-xs`}
                  >
                    {post.initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">
                      {post.handle}
                    </p>
                    <p className="text-xs text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">
                        location_on
                      </span>
                      {post.location}
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
                  more_horiz
                </span>
              </div>
              <div className="aspect-video">
                <img
                  alt={post.imageAlt}
                  className="w-full h-full object-cover"
                  src={post.image}
                />
              </div>
              <div className="p-4">
                <div className="flex gap-4 mb-3">
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                    favorite
                  </span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                    chat_bubble
                  </span>
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors">
                    share
                  </span>
                </div>
                <p className="text-sm text-on-surface leading-relaxed">
                  <span className="font-bold">{post.handle}</span> {post.content}
                </p>
                <p className="text-xs text-on-surface-variant mt-2 uppercase tracking-wider">
                  {post.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary/5 transition-all">
            Load More Stories
          </button>
        </div>
      </div>
    </section>
  );
}
