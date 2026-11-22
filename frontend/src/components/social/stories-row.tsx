'use client';

import { useCallback, useEffect, useState } from 'react';

import { getFeedAuthor, type FeedStory } from '@/data/social-feed-data';

import FeedAvatar from './feed-avatar';

const FRAME_MS = 5000;
const TICK_MS = 50;

type StoriesRowProps = {
  stories: FeedStory[];
};

export default function StoriesRow({ stories }: StoriesRowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [viewed, setViewed] = useState<Set<string>>(new Set());

  const markViewed = useCallback((id: string) => {
    setViewed((current) => (current.has(id) ? current : new Set(current).add(id)));
  }, []);

  if (!stories.length) return null;

  return (
    <>
      <div
        className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-3 [scrollbar-color:#c5d1e8_transparent] [scrollbar-width:thin]"
        role="list"
        aria-label="Stories"
      >
        {stories.map((story, index) => {
          const author = getFeedAuthor(story.authorId);
          if (!author) return null;
          const seen = viewed.has(story.id);
          const isProvider = author.role === 'provider';
          const ring = seen
            ? 'bg-[#cfd7e6]'
            : isProvider
              ? 'bg-[linear-gradient(135deg,#f3dc8a,#a28116)]'
              : 'bg-[linear-gradient(135deg,#6f9bf0,#0d4abe)]';

          return (
            <button
              key={story.id}
              type="button"
              role="listitem"
              onClick={() => setActiveIndex(index)}
              className="group relative h-[210px] w-[130px] shrink-0 snap-start overflow-hidden rounded-[1.15rem] border border-[#dde6f4] bg-[#edf3ff] text-left shadow-[0_12px_28px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.14)] sm:w-[140px]"
            >
              <img
                src={story.frames[0].image}
                alt=""
                className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${seen ? 'opacity-70 saturate-50' : ''}`}
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#071a34]/50 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071a34]/80 to-transparent" />

              <span className={`absolute left-2.5 top-2.5 flex h-10 w-10 items-center justify-center rounded-full p-[2.5px] ${ring}`}>
                <span className="h-full w-full rounded-full bg-white p-[2px]">
                  <FeedAvatar author={author} size="lg" />
                </span>
              </span>

              <span
                className={`absolute right-2.5 top-2.5 rounded-full px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] ${
                  isProvider ? 'bg-[#fbf3d9] text-[#8a6d0f]' : 'bg-[#edf4ff] text-[#0f3d9c]'
                }`}
              >
                {isProvider ? 'Provider' : 'Tourist'}
              </span>

              <span className="absolute inset-x-2.5 bottom-2.5">
                <span className="block truncate text-[0.82rem] font-bold text-white">{author.name}</span>
                <span className="block truncate text-[0.68rem] text-white/75">{story.frames[0].postedAgo}</span>
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null ? (
        <StoryViewer
          stories={stories}
          startIndex={activeIndex}
          onSeen={markViewed}
          onClose={() => setActiveIndex(null)}
        />
      ) : null}
    </>
  );
}

type StoryViewerProps = {
  stories: FeedStory[];
  startIndex: number;
  onSeen: (id: string) => void;
  onClose: () => void;
};

function StoryViewer({ stories, startIndex, onSeen, onClose }: StoryViewerProps) {
  const [storyIndex, setStoryIndex] = useState(startIndex);
  const [frameIndex, setFrameIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const story = stories[storyIndex];
  const author = getFeedAuthor(story.authorId);
  const frame = story.frames[frameIndex];

  const next = useCallback(() => {
    setProgress(0);
    if (frameIndex < story.frames.length - 1) {
      setFrameIndex(frameIndex + 1);
    } else if (storyIndex < stories.length - 1) {
      onSeen(story.id);
      setStoryIndex(storyIndex + 1);
      setFrameIndex(0);
    } else {
      onSeen(story.id);
      onClose();
    }
  }, [frameIndex, story, storyIndex, stories.length, onSeen, onClose]);

  const previous = () => {
    setProgress(0);
    if (frameIndex > 0) {
      setFrameIndex(frameIndex - 1);
    } else if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
      setFrameIndex(0);
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(value + (TICK_MS / FRAME_MS) * 100, 100));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [storyIndex, frameIndex]);

  useEffect(() => {
    if (progress >= 100) next();
  }, [progress, next]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') next();
      if (event.key === 'ArrowLeft') previous();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  });

  if (!author) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#001a43]/80 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div role="dialog" aria-modal="true" aria-label={`${author.name} story`} className="relative aspect-[9/16] max-h-[90vh] w-full max-w-[380px] overflow-hidden rounded-[1.5rem] bg-black shadow-[0_30px_80px_rgba(0,26,67,0.5)]">
        <img src={frame.image} alt={frame.caption} className="h-full w-full object-cover" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute inset-x-3 top-3 flex gap-1.5">
          {story.frames.map((_, index) => (
            <span key={index} className="h-1 flex-1 overflow-hidden rounded-full bg-white/35">
              <span
                className="block h-full rounded-full bg-white"
                style={{ width: index < frameIndex ? '100%' : index === frameIndex ? `${progress}%` : '0%' }}
              />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-3 top-7 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full ring-2 ring-white">
            <FeedAvatar author={author} size="lg" />
          </div>
          <div className="min-w-0 flex-1 text-white">
            <div className="truncate text-sm font-bold">{author.name}</div>
            <div className="text-xs text-white/75">{frame.postedAgo}</div>
          </div>
          <button type="button" aria-label="Close story" onClick={onClose} className="rounded-full p-2 text-white transition hover:bg-white/20">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <p className="absolute inset-x-5 bottom-6 text-base font-semibold text-white">{frame.caption}</p>

        <button type="button" aria-label="Previous story" onClick={previous} className="absolute inset-y-20 left-0 w-1/3" />
        <button type="button" aria-label="Next story" onClick={next} className="absolute inset-y-20 right-0 w-2/3" />
      </div>
    </div>
  );
}
