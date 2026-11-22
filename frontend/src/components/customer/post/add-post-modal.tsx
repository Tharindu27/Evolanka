'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';

import {
  postCategoryTags,
  postLocationSuggestions,
  postServiceOptions,
  postVisibilityOptions,
  type PostDraft,
  type PostServiceType,
} from '@/data/customer-post-data';

type AddPostModalProps = {
  initialDraft: PostDraft;
  mode?: 'create' | 'edit';
  onClose: () => void;
  onPublish: (draft: PostDraft) => void;
  onSaveDraft?: (draft: PostDraft) => void;
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

const serviceTypes = Object.keys(postServiceOptions) as PostServiceType[];

const fieldClass =
  'w-full rounded-xl border border-[#dfe7f5] bg-white px-3.5 py-2.5 text-sm text-[#001a43] outline-none transition placeholder:text-[#9aa3b5] focus:border-[#0d4abe] focus:ring-2 focus:ring-[#0d4abe]/15';

function SectionTitle({ children }: { children: string }) {
  return <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#6d7280]">{children}</h3>;
}

export default function AddPostModal({ initialDraft, mode = 'create', onClose, onPublish, onSaveDraft }: AddPostModalProps) {
  const isEdit = mode === 'edit';
  const [draft, setDraft] = useState<PostDraft>(initialDraft);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const update = <K extends keyof PostDraft>(key: K, value: PostDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));


  const edit = (build: (selected: string) => string) => {
    const area = textareaRef.current;
    if (!area) return;

    const { selectionStart, selectionEnd } = area;
    const replacement = build(draft.caption.slice(selectionStart, selectionEnd));

    update('caption', draft.caption.slice(0, selectionStart) + replacement + draft.caption.slice(selectionEnd));
    requestAnimationFrame(() => {
      area.focus();
      area.setSelectionRange(selectionStart, selectionStart + replacement.length);
    });
  };

  const wrap = (marker: string, placeholder: string) => edit((selected) => `${marker}${selected || placeholder}${marker}`);

  const bullets = () => edit((selected) => (selected || 'List item').split('\n').map((line) => `- ${line}`).join('\n'));

  const addLink = () => {
    const url = linkUrl.trim();
    if (!/^https?:\/\/\S+$/.test(url)) return;

    edit((selected) => `[${selected || 'link text'}](${url})`);
    setLinkUrl('');
    setLinkOpen(false);
  };

  const onFiles = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const media = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
      type: file.type.startsWith('video/') ? ('video' as const) : ('image' as const),
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setDraft((current) => ({ ...current, media: [...current.media, ...media] }));
    event.target.value = '';
  };

  const toggleTag = (tag: string) =>
    update('tags', draft.tags.includes(tag) ? draft.tags.filter((item) => item !== tag) : [...draft.tags, tag]);

  const imageCount = draft.media.filter((item) => item.type === 'image').length;
  const canPublish = draft.caption.trim().length > 0 || draft.media.length > 0;

  const toolbarButton =
    'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm text-[#3d4455] transition hover:bg-[#eef3ff] hover:text-[#001a43]';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#001a43]/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-post-title"
        className="flex max-h-[92vh] w-full max-w-[680px] flex-col overflow-hidden rounded-[22px] bg-white shadow-[0_30px_80px_rgba(0,26,67,0.35)]"
      >
        <header className="flex items-center justify-between border-b border-[#eef2f9] px-6 py-4">
          <h2 id="add-post-title" className="brand-page-title text-lg font-black tracking-[-0.03em]">
            {isEdit ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-full p-2 text-[#4f586e] transition hover:bg-[#eef3ff] hover:text-[#001a43]"
          >
            <svg {...iconProps}>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </header>

        <div className="space-y-6 overflow-y-auto px-6 py-5">
          <section>
            <SectionTitle>Caption / Description</SectionTitle>
            <div className="rounded-xl border border-[#dfe7f5] transition focus-within:border-[#0d4abe] focus-within:ring-2 focus-within:ring-[#0d4abe]/15">
              <div className="flex items-center gap-1 border-b border-[#eef2f9] px-2 py-1.5">
                <button type="button" aria-label="Bold" title="Bold" onClick={() => wrap('**', 'bold text')} className={`${toolbarButton} font-black`}>
                  B
                </button>
                <button type="button" aria-label="Italic" title="Italic" onClick={() => wrap('*', 'italic text')} className={`${toolbarButton} italic`}>
                  I
                </button>
                <button type="button" aria-label="Bullet points" title="Bullet points" onClick={bullets} className={toolbarButton}>
                  <svg {...iconProps}>
                    <path d="M9 6h11M9 12h11M9 18h11" />
                    <circle cx="4.5" cy="6" r="1" />
                    <circle cx="4.5" cy="12" r="1" />
                    <circle cx="4.5" cy="18" r="1" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Add link"
                  title="Add link"
                  onClick={() => setLinkOpen((open) => !open)}
                  className={[toolbarButton, linkOpen ? 'bg-[#eef3ff] text-[#001a43]' : ''].join(' ')}
                >
                  <svg {...iconProps}>
                    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
                    <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
                  </svg>
                </button>
              </div>

              {linkOpen ? (
                <div className="flex items-center gap-2 border-b border-[#eef2f9] bg-[#f8fbff] px-3 py-2">
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(event) => setLinkUrl(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        event.preventDefault();
                        addLink();
                      }
                    }}
                    placeholder="https://example.com"
                    className="min-w-0 flex-1 rounded-lg border border-[#dfe7f5] bg-white px-3 py-1.5 text-xs outline-none focus:border-[#0d4abe]"
                  />
                  <button type="button" onClick={addLink} className="rounded-lg bg-[#001a43] px-3 py-1.5 text-xs font-semibold text-white">
                    Insert
                  </button>
                </div>
              ) : null}

              <textarea
                ref={textareaRef}
                value={draft.caption}
                onChange={(event) => update('caption', event.target.value)}
                rows={5}
                placeholder="Share your travel story..."
                className="block w-full resize-none rounded-b-xl bg-transparent px-3.5 py-3 text-sm text-[#001a43] outline-none placeholder:text-[#9aa3b5]"
              />
            </div>
          </section>

          <section>
            <SectionTitle>Photos &amp; Videos</SectionTitle>
            <label className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#c9d6ee] bg-[#f8fbff] px-4 py-6 text-center transition hover:border-[#0d4abe] hover:bg-[#eef3ff]">
              <svg {...iconProps} className="h-6 w-6 stroke-[#0d4abe]">
                <path d="M12 16V4M7 9l5-5 5 5" />
                <path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
              </svg>
              <span className="text-sm font-semibold text-[#001a43]">Upload photos or videos</span>
              <span className="text-xs text-[#6d7280]">Select several photos to publish them as a carousel</span>
              <input type="file" accept="image/*,video/*" multiple onChange={onFiles} className="sr-only" />
            </label>

            {draft.media.length > 0 ? (
              <>
                <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {draft.media.map((item) => (
                    <div key={item.id} className="group relative aspect-square overflow-hidden rounded-xl bg-[#edf3ff]">
                      {item.type === 'video' ? (
                        <video src={item.url} className="h-full w-full object-cover" muted />
                      ) : (
                        <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                      )}
                      {item.type === 'video' ? (
                        <span className="absolute left-1.5 top-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[0.6rem] font-bold text-white">VIDEO</span>
                      ) : null}
                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => update('media', draft.media.filter((entry) => entry.id !== item.id))}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                      >
                        <svg {...iconProps} className="h-3 w-3 stroke-current">
                          <path d="M6 6l12 12M18 6 6 18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
                {imageCount > 1 ? <p className="mt-2 text-xs font-semibold text-[#0d4abe]">{imageCount} photos will be published as a carousel.</p> : null}
              </>
            ) : null}
          </section>

          <section className="grid gap-5 sm:grid-cols-2">
            <div>
              <SectionTitle>Location</SectionTitle>
              <input
                list="post-location-suggestions"
                value={draft.location}
                onChange={(event) => update('location', event.target.value)}
                placeholder="e.g. Ella, Sri Lanka"
                className={fieldClass}
              />
              <datalist id="post-location-suggestions">
                {postLocationSuggestions.map((place) => (
                  <option key={place} value={place} />
                ))}
              </datalist>
            </div>

            <div>
              <SectionTitle>Visibility</SectionTitle>
              <select
                value={draft.visibility}
                onChange={(event) => update('visibility', event.target.value as PostDraft['visibility'])}
                className={fieldClass}
              >
                {postVisibilityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value} - {option.description}
                  </option>
                ))}
              </select>
            </div>
          </section>

          <section>
            <SectionTitle>Category / Tags</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {postCategoryTags.map((tag) => {
                const active = draft.tags.includes(tag);

                return (
                  <button
                    key={tag}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleTag(tag)}
                    className={[
                      'rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                      active
                        ? 'border-[#001a43] bg-[#001a43] text-white'
                        : 'border-[#dfe7f5] bg-white text-[#3d4455] hover:border-[#0d4abe] hover:text-[#0d4abe]',
                    ].join(' ')}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <SectionTitle>Tag Services Property / Provider </SectionTitle>
            <div className="grid gap-3 sm:grid-cols-[180px_1fr]">
              <select
                value={draft.serviceType}
                onChange={(event) => setDraft((current) => ({ ...current, serviceType: event.target.value as PostServiceType, serviceName: '' }))}
                className={fieldClass}
              >
                {serviceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                list="post-service-suggestions"
                value={draft.serviceName}
                onChange={(event) => update('serviceName', event.target.value)}
                placeholder={`Featured ${draft.serviceType.toLowerCase()} (optional)`}
                className={fieldClass}
              />
              <datalist id="post-service-suggestions">
                {postServiceOptions[draft.serviceType].map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>
          </section>
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-[#eef2f9] bg-[#f8fbff] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#4f586e] transition hover:bg-[#eef3ff] hover:text-[#001a43]"
          >
            Cancel
          </button>
          {onSaveDraft && !isEdit ? (
            <button
              type="button"
              disabled={!canPublish}
              onClick={() => onSaveDraft(draft)}
              className="rounded-xl border border-[#dfe7f5] bg-white px-5 py-2.5 text-sm font-semibold text-[#001a43] transition hover:bg-[#f4f8ff] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save as Draft
            </button>
          ) : null}
          <button
            type="button"
            disabled={!canPublish}
            onClick={() => onPublish(draft)}
            className="btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold shadow-[0_12px_25px_rgba(13,74,190,0.28)] transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isEdit ? 'Save Changes' : 'Publish'}
          </button>
        </footer>
      </div>
    </div>
  );
}
