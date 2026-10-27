'use client';

import { useMemo, useState } from 'react';

import {
  feedAuthors,
  feedPosts,
  feedStories,
  feedTabs,
  getFeedAuthor,
  type FeedRole,
} from '@/data/social-feed-data';

import FeedPostCard from './feed-post-card';
import StoriesRow from './stories-row';

export default function SocialFeed() {
  const [tab, setTab] = useState<FeedRole>('tourist');
  const [queries, setQueries] = useState<Record<FeedRole, string>>({ tourist: '', provider: '' });

  const query = queries[tab];
  const activeTab = feedTabs.find((item) => item.value === tab) ?? feedTabs[0];

  const stories = useMemo(
    () => feedStories.filter((story) => getFeedAuthor(story.authorId)?.role === tab),
    [tab],
  );

  const posts = useMemo(() => {
    const term = query.trim().toLowerCase();

    return feedPosts
      .filter((post) => getFeedAuthor(post.authorId)?.role === tab)
      .filter((post) => {
        if (!term) return true;
        const author = getFeedAuthor(post.authorId);
        const haystack = [author?.name, author?.providerType, author?.country, post.location, post.caption, ...post.tags, post.featuredService]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [tab, query]);

  const counts = useMemo(
    () => ({
      tourist: feedAuthors.filter((author) => author.role === 'tourist').length,
      provider: feedAuthors.filter((author) => author.role === 'provider').length,
    }),
    [],
  );

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>
      <header>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#a28116]">Community</p>
        <h1 className="brand-page-title mt-2 text-4xl font-black tracking-[-0.04em] md:text-5xl">Social Feed</h1>
        <p className="brand-page-subtitle mt-3 max-w-xl text-base">
          Stories, tips and travel moments from tourists and service providers across Sri Lanka.
        </p>
      </header>

      <section className="mt-8 rounded-[1.5rem] border border-[#dde6f4] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ring-1 ring-white/80">
        <h2 className="mb-4 text-sm font-black uppercase tracking-[0.14em] text-[#001a43]">Stories</h2>
        {stories.length ? <StoriesRow key={tab} stories={stories} /> : <p className="text-sm text-[#6d7280]">No stories right now.</p>}
      </section>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" aria-label="Feed type" className="inline-flex rounded-full border border-[#dce3f1] bg-white p-1 shadow-[0_10px_26px_rgba(0,26,67,0.06)]">
          {feedTabs.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={tab === item.value}
              onClick={() => setTab(item.value)}
              className={[
                'rounded-full px-5 py-2 text-sm font-bold transition',
                tab === item.value ? 'btn-primary text-white shadow-[0_8px_18px_rgba(13,74,190,0.25)]' : 'text-[#4e5568] hover:bg-[#f1f5ff] hover:text-[#001a43]',
              ].join(' ')}
            >
              {item.label}
              <span className={['ml-2 text-xs', tab === item.value ? 'text-white/80' : 'text-[#8a93a6]'].join(' ')}>{counts[item.value]}</span>
            </button>
          ))}
        </div>

        <label className="relative block md:w-[320px]">
          <span className="sr-only">Search {activeTab.label}</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-[#6d7280]" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQueries((current) => ({ ...current, [tab]: event.target.value }))}
            placeholder={activeTab.placeholder}
            className="w-full rounded-full border border-[#dce3f1] bg-white py-2.5 pl-11 pr-4 text-sm text-[#001a43] shadow-[0_10px_26px_rgba(0,26,67,0.06)] outline-none transition placeholder:text-[#8a93a6] focus:border-[#0d4abe] focus:ring-2 focus:ring-[#0d4abe]/15"
          />
        </label>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-black tracking-[-0.03em] text-[#001a43]">Latest posts</h2>
        <span className="text-xs font-semibold text-[#6d7280]">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      <div className="mt-4 space-y-6">
        {posts.length ? (
          posts.map((post) => <FeedPostCard key={post.id} post={post} />)
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#cdd8ee] bg-white p-10 text-center">
            <h3 className="text-lg font-black text-[#001a43]">No posts found</h3>
            <p className="mt-2 text-sm text-[#6d7280]">Try a different search in {activeTab.label}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
