'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

import {
  feedPosts,
  feedStories,
  getFeedAuthor,
  type FeedAuthor,
  type FeedPost,
} from '@/data/social-feed-data';
import AddPostModal from '@/components/customer/post/add-post-modal';
import { emptyPostDraft, type PostDraft } from '@/data/customer-post-data';
import { useAuthUser } from '@/lib/use-auth-user';

import FeedPostCard from './feed-post-card';
import FeedLeftSidebar, { feedTopicTags, type FeedFilter } from './feed-left-sidebar';
import FeedRightSidebar from './feed-right-sidebar';
import StoriesRow from './stories-row';

const SAVED_STORAGE_KEY = 'evolanka-saved-posts';

const emptyMessages: Record<FeedFilter, string> = {
  all: 'Try a different search.',
  tourist: 'No tourist posts match your search.',
  provider: 'No provider posts match your search.',
  saved: 'Bookmark a post and it will show up here.',
};

export default function SocialFeed() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FeedFilter>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState<PostDraft>(emptyPostDraft);
  const [ownPosts, setOwnPosts] = useState<FeedPost[]>([]);
  const tourist = useAuthUser('tourist');
  const provider = useAuthUser('provider');
  const currentUser = tourist.user ?? provider.user;

  const ownAuthor = useMemo<FeedAuthor | null>(
    () =>
      currentUser
        ? { id: 'me', name: currentUser.name, role: currentUser.role, avatar: currentUser.profilePicture ?? undefined }
        : null,
    [currentUser],
  );

  const allPosts = useMemo(() => [...ownPosts, ...feedPosts], [ownPosts]);
  const authorOf = useCallback((post: FeedPost) => (post.authorId === 'me' ? ownAuthor ?? undefined : getFeedAuthor(post.authorId)), [ownAuthor]);

  const publish = (values: PostDraft) => {
    const post: FeedPost = {
      id: `own-${Date.now()}`,
      authorId: 'me',
      createdAt: new Date().toISOString(),
      postedAgo: 'Just now',
      isNew: true,
      location: values.location.trim() || 'Sri Lanka',
      caption: values.caption.trim(),
      images: values.media.filter((item) => item.type === 'image').map((item) => item.url),
      video: values.media.find((item) => item.type === 'video')?.url,
      tags: values.tags,
      featuredService: values.serviceName.trim() || undefined,
      likes: 0,
      comments: 0,
    };
    setOwnPosts((current) => [post, ...current]);
    setDraft(emptyPostDraft);
    setComposerOpen(false);
  };

  const stories = feedStories;

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(SAVED_STORAGE_KEY) ?? '[]');
      if (Array.isArray(stored)) setSavedIds(stored.filter((id): id is string => typeof id === 'string'));
    } catch {
      // Ignore unreadable saved posts.
    }
  }, []);

  const toggleSave = useCallback((postId: string) => {
    setSavedIds((current) => {
      const next = current.includes(postId) ? current.filter((id) => id !== postId) : [...current, postId];
      try {
        window.localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Bookmarks still work for this visit when storage is unavailable.
      }
      return next;
    });
  }, []);

  const counts = useMemo<Record<FeedFilter, number>>(
    () => ({
      all: allPosts.length,
      tourist: allPosts.filter((post) => authorOf(post)?.role === 'tourist').length,
      provider: allPosts.filter((post) => authorOf(post)?.role === 'provider').length,
      saved: allPosts.filter((post) => savedIds.includes(post.id)).length,
    }),
    [allPosts, authorOf, savedIds],
  );

  const tagCounts = useMemo(
    () => Object.fromEntries(feedTopicTags.map((tag) => [tag, allPosts.filter((post) => post.tags.includes(tag)).length])),
    [allPosts],
  );

  const posts = useMemo(() => {
    const term = query.trim().toLowerCase();

    return allPosts
      .filter((post) => {
        const author = authorOf(post);
        if ((filter === 'tourist' || filter === 'provider') && author?.role !== filter) return false;
        if (filter === 'saved' && !savedIds.includes(post.id)) return false;
        if (activeTag && !post.tags.includes(activeTag)) return false;
        if (!term) return true;
        const haystack = [author?.name, author?.providerType, author?.country, post.location, post.caption, ...post.tags, post.featuredService]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(term);
      })
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [query, filter, activeTag, savedIds, allPosts, authorOf]);

  return (
    <div
      className="grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)_260px] xl:grid-cols-[260px_minmax(0,1fr)_300px] xl:gap-8"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      <FeedLeftSidebar
        filter={filter}
        onFilterChange={setFilter}
        counts={counts}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        tagCounts={tagCounts}
      />

      <div className="mx-auto w-full min-w-0 max-w-[760px] lg:max-w-none">
      <header>
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#a28116]">Community</p>
        <h1 className="brand-page-title mt-2 text-4xl font-black tracking-[-0.04em] md:text-5xl">Social Feed</h1>
        <p className="brand-page-subtitle mt-3 max-w-xl text-base">
          Stories, tips and travel moments from tourists and service providers across Sri Lanka.
        </p>
      </header>

      <div className="mt-5">
        <label className="relative block w-full">
          <span className="sr-only">Search social feed</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-[#6d7280]" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m20 20-4-4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search people, places or posts"
            className="w-full rounded-full border border-[#dce3f1] bg-white py-3 pl-11 pr-4 text-sm text-[#001a43] shadow-[0_10px_26px_rgba(0,26,67,0.06)] outline-none transition placeholder:text-[#8a93a6] focus:border-[#0d4abe] focus:ring-2 focus:ring-[#0d4abe]/15"
          />
        </label>

        {currentUser ? (
          <button
            type="button"
            onClick={() => setComposerOpen(true)}
            className="btn-primary mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create Post
          </button>
        ) : (
          <Link
            href="/auth-main"
            className="btn-primary mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Create Post
          </Link>
        )}
      </div>

      <section className="mt-4 rounded-[1.5rem] border border-[#dde6f4] bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)] ring-1 ring-white/80">
        <h2 className="mb-4 text-sm font-black uppercase tracking-[0.14em] text-[#001a43]">Stories</h2>
        {stories.length ? <StoriesRow stories={stories} /> : <p className="text-sm text-[#6d7280]">No stories right now.</p>}
      </section>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-black tracking-[-0.03em] text-[#001a43]">Latest posts</h2>
          {activeTag ? (
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#c9a227] px-3 py-1 text-xs font-bold text-[#001a43]"
              aria-label={`Clear ${activeTag} filter`}
            >
              #{activeTag}
              <span aria-hidden="true">&times;</span>
            </button>
          ) : null}
        </div>
        <span className="text-xs font-semibold text-[#6d7280]">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'}
        </span>
      </div>

      <div className="mt-4 space-y-6">
        {posts.length ? (
          posts.map((post) => (
            <FeedPostCard key={post.id} post={post} author={authorOf(post)} saved={savedIds.includes(post.id)} onToggleSave={toggleSave} />
          ))
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-[#cdd8ee] bg-white p-10 text-center">
            <h3 className="text-lg font-black text-[#001a43]">No posts found</h3>
            <p className="mt-2 text-sm text-[#6d7280]">{activeTag ? 'Nothing matches this topic and filter.' : emptyMessages[filter]}</p>
          </div>
        )}
      </div>
      </div>

      <FeedRightSidebar />

      {composerOpen ? (
        <AddPostModal
          initialDraft={draft}
          onClose={() => setComposerOpen(false)}
          onPublish={publish}
          onSaveDraft={(values) => {
            setDraft(values);
            setComposerOpen(false);
          }}
        />
      ) : null}
    </div>
  );
}
