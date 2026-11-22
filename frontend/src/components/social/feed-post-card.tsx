'use client';

import { useState } from 'react';

import { getFeedAuthor, type FeedPost } from '@/data/social-feed-data';

import FeedAvatar from './feed-avatar';

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-4 w-4 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export default function FeedPostCard({ post }: { post: FeedPost }) {
  const author = getFeedAuthor(post.authorId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [slide, setSlide] = useState(0);

  if (!author) return null;

  const isProvider = author.role === 'provider';
  const count = post.images.length;

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[#dde6f4] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_40px_rgba(15,23,42,0.05)] ring-1 ring-white/80">
      <header className="flex items-center gap-3 px-5 py-4">
        <FeedAvatar author={author} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-bold text-[#001a43]">{author.name}</span>
            <span
              className={[
                'rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em]',
                isProvider ? 'bg-[#fbf3d9] text-[#8a6d0f]' : 'bg-[#edf4ff] text-[#0f3d9c]',
              ].join(' ')}
            >
              {isProvider ? author.providerType : 'Tourist'}
            </span>
            {post.isNew ? (
              <span className="rounded-full bg-[#e6f4ea] px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-[#0f9d58]">New</span>
            ) : null}
          </div>
          <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#6d7280]">
            <svg {...iconProps} className="h-3 w-3 stroke-current text-[#0d4abe]">
              <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <span className="font-semibold text-[#0d4abe]">{post.location}</span>
            <span>&middot; {post.postedAgo}</span>
          </div>
        </div>
      </header>

      <div className="px-5 pb-3">
        <p className="text-sm leading-6 text-[#2b3347]">{post.caption}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#eef3ff] px-2.5 py-1 font-semibold text-[#0d4abe]">
              #{tag}
            </span>
          ))}
          {post.featuredService ? (
            <span className="rounded-full bg-[#fff1e6] px-2.5 py-1 font-semibold text-[#c2410c]">Featured: {post.featuredService}</span>
          ) : null}
        </div>
      </div>

      <div className="group relative aspect-[16/10] w-full overflow-hidden bg-[#edf3ff]">
        <img src={post.images[slide]} alt={post.location} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#071a34]/35 to-transparent" />

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous"
              onClick={() => setSlide((slide - 1 + count) % count)}
              className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#001a43] shadow transition hover:bg-white"
            >
              <svg {...iconProps}>
                <path d="m15 6-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => setSlide((slide + 1) % count)}
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#001a43] shadow transition hover:bg-white"
            >
              <svg {...iconProps}>
                <path d="m9 6 6 6-6 6" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {post.images.map((_, index) => (
                <span key={index} className={['h-1.5 w-1.5 rounded-full', index === slide ? 'bg-white' : 'bg-white/50'].join(' ')} />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <footer className="flex items-center justify-between px-5 py-3.5 text-xs text-[#4f586e]">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setLiked((value) => !value)}
            aria-pressed={liked}
            className="inline-flex items-center gap-2 font-medium transition hover:text-[#001a43]"
          >
            <svg viewBox="0 0 24 24" className={['h-4 w-4', liked ? 'fill-[#c4161c] stroke-[#c4161c]' : 'fill-none stroke-current'].join(' ')} strokeWidth="1.8" aria-hidden="true">
              <path d="M12 20.5s-7.5-4.4-9-8.2C1.7 9.4 3.9 5 8.5 5c2 0 3.1 1.1 3.5 2.1.4-1 1.5-2.1 3.5-2.1 4.6 0 6.8 4.4 5.5 7.3-1.5 3.8-9 8.2-9 8.2Z" />
            </svg>
            <span className="font-bold text-[#001a43]">{post.likes + (liked ? 1 : 0)}</span> Likes
          </button>

          <span className="inline-flex items-center gap-2 font-medium">
            <svg {...iconProps}>
              <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.5-4.7A8 8 0 1 1 21 12Z" />
            </svg>
            <span className="font-bold text-[#001a43]">{post.comments}</span> Comments
          </span>

          <button type="button" className="inline-flex items-center gap-2 font-medium transition hover:text-[#001a43]">
            <svg {...iconProps}>
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
            </svg>
            Share
          </button>
        </div>

        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-pressed={saved}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark post'}
          className="transition hover:text-[#001a43]"
        >
          <svg viewBox="0 0 24 24" className={['h-4 w-4 stroke-current', saved ? 'fill-current' : 'fill-none'].join(' ')} strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 4h12v17l-6-4-6 4V4Z" />
          </svg>
        </button>
      </footer>
    </article>
  );
}
