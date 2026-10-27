'use client';

import { useEffect, useRef, useState } from 'react';

import type { PostItem } from '@/data/customer-post-data';

import PostCaption from './post-caption';

type PostCardProps = {
  post: PostItem;
  authorName: string;
  onEdit: (post: PostItem) => void;
  onDelete: (post: PostItem) => void;
};

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-4 w-4 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export default function PostCard({ post, authorName, onEdit, onDelete }: PostCardProps) {
  const initiallyLiked = post.likes > 0;
  const [liked, setLiked] = useState(initiallyLiked);
  const [saved, setSaved] = useState(false);
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const likeCount = post.likes - (initiallyLiked ? 1 : 0) + (liked ? 1 : 0);

  useEffect(() => {
    if (!menuOpen && !confirmOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (menuOpen && !menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setConfirmOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, confirmOpen]);

  const images = post.gallery?.length ? post.gallery : post.image ? [post.image] : [];
  const slides = [
    ...images.map((src) => ({ type: 'image' as const, src })),
    ...(post.video ? [{ type: 'video' as const, src: post.video }] : []),
  ];
  const current = slides[Math.min(slide, slides.length - 1)];

  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-[#dfe4f2] bg-white shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <header className="flex items-center justify-between gap-3 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f9d2a1,#d99162_45%,#a85a3d_75%)] text-sm font-bold text-[#2b1d16]">
            {authorName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold text-[#001a43]">{authorName}</span>
              <span className="text-xs text-[#6d7280]">&middot; {post.postedAgo}</span>
            </div>
            {post.location ? (
              <div className="mt-0.5 flex items-center gap-1 text-xs font-semibold text-[#0d4abe]">
                <svg {...iconProps} className="h-3 w-3 stroke-current">
                  <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
                {post.location}
              </div>
            ) : null}
          </div>
        </div>

        <div ref={menuRef} className="relative">
          <button
            type="button"
            aria-label="More options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={['rounded-full p-2 text-[#4f586e] transition hover:bg-[#eef3ff]', menuOpen ? 'bg-[#eef3ff]' : ''].join(' ')}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <circle cx="5" cy="12" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="19" cy="12" r="1.6" />
            </svg>
          </button>

          {menuOpen ? (
            <div
              role="menu"
              className="absolute right-0 top-full z-20 mt-1 w-44 overflow-hidden rounded-xl border border-[#dfe4f2] bg-white py-1 shadow-[0_18px_40px_rgba(0,26,67,0.16)]"
            >
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  onEdit(post);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#eef3ff]"
              >
                <svg {...iconProps}>
                  <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
                </svg>
                Edit Post
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmOpen(true);
                }}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-[#c4161c] transition hover:bg-[#fff1f1]"
              >
                <svg {...iconProps}>
                  <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
                </svg>
                Delete Post
              </button>
            </div>
          ) : null}
        </div>
      </header>

      {confirmOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#001a43]/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmOpen(false);
          }}
        >
          <div role="alertdialog" aria-modal="true" className="w-full max-w-sm rounded-[22px] bg-white p-6 shadow-[0_30px_80px_rgba(0,26,67,0.35)]">
            <h3 className="text-lg font-black tracking-[-0.03em] text-[#001a43]">Delete this post?</h3>
            <p className="mt-2 text-sm text-[#566277]">This post will be removed from your profile. This action cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-xl border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onDelete(post)}
                className="rounded-xl bg-[#c4161c] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a31217]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="border-y border-[#eef2f9] px-5 py-3 text-sm text-[#2b3347]">
        <PostCaption text={post.caption} />

        {post.tags?.length || post.service || post.visibility ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            {post.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-[#eef3ff] px-2.5 py-1 font-semibold text-[#0d4abe]">
                #{tag}
              </span>
            ))}
            {post.service ? (
              <span className="rounded-full bg-[#fff1e6] px-2.5 py-1 font-semibold text-[#c2410c]">
                Featured {post.service.type}: {post.service.name}
              </span>
            ) : null}
            {post.visibility ? (
              <span className="rounded-full bg-[#f1f3f8] px-2.5 py-1 font-semibold text-[#4f586e]">{post.visibility}</span>
            ) : null}
          </div>
        ) : null}
      </div>

      {current ? (
        <div className="group relative aspect-[2/1] w-full overflow-hidden bg-[#edf3ff]">
          {current.type === 'video' ? (
            <video src={current.src} controls className="h-full w-full bg-black object-contain" />
          ) : (
            <img src={current.src} alt={post.location || 'Post photo'} className="h-full w-full object-cover" />
          )}

          {slides.length > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={() => setSlide((slide - 1 + slides.length) % slides.length)}
                className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#001a43] shadow transition hover:bg-white"
              >
                <svg {...iconProps}>
                  <path d="m15 6-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => setSlide((slide + 1) % slides.length)}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#001a43] shadow transition hover:bg-white"
              >
                <svg {...iconProps}>
                  <path d="m9 6 6 6-6 6" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                {slides.map((_, index) => (
                  <span key={index} className={['h-1.5 w-1.5 rounded-full', index === slide ? 'bg-white' : 'bg-white/50'].join(' ')} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

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
            <span className="font-bold text-[#001a43]">{likeCount}</span> Likes
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
          className="text-[#4f586e] transition hover:text-[#001a43]"
        >
          <svg viewBox="0 0 24 24" className={['h-4 w-4 stroke-current', saved ? 'fill-current' : 'fill-none'].join(' ')} strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 4h12v17l-6-4-6 4V4Z" />
          </svg>
        </button>
      </footer>
    </article>
  );
}
