'use client';

import { useEffect, useRef, useState, type DragEvent } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import { propertyCategoryHeading, type PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

const MIN_PHOTOS = 3;
const MAX_PHOTOS = 20;
const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const photoTags = ['Exterior', 'Lobby', 'Pool Area', 'Room', 'Restaurant', 'Garden', 'Other'];

type Photo = { id: number; label: string; size: number; url: string; tag: string };

let idCounter = 1;

const formatSize = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

export default function UploadImageForm({ category }: { category: PropertyCategory }) {
  const heading = propertyCategoryHeading[category];

  const fileRef = useRef<HTMLInputElement>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  // Release object URLs for any photos still held on unmount.
  const photosRef = useRef(photos);
  useEffect(() => {
    photosRef.current = photos;
  }, [photos]);
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.url)), []);

  const addFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const room = MAX_PHOTOS - photos.length;
    const accepted: Photo[] = [];
    let skipped = 0;

    Array.from(files).forEach((file) => {
      const isValid = ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_BYTES;
      if (!isValid || accepted.length >= room) {
        skipped += 1;
        return;
      }
      accepted.push({
        id: idCounter++,
        label: file.name.replace(/\.[^.]+$/, ''),
        size: file.size,
        url: URL.createObjectURL(file),
        tag: '',
      });
    });

    setError(
      skipped ? `${skipped} file(s) skipped. Use JPG, PNG or WebP up to 10 MB each (max ${MAX_PHOTOS} photos).` : '',
    );
    if (accepted.length) setPhotos((prev) => [...prev, ...accepted]);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removePhoto = (photo: Photo) => {
    URL.revokeObjectURL(photo.url);
    setPhotos((prev) => prev.filter((item) => item.id !== photo.id));
  };

  const setTag = (id: number, tag: string) =>
    setPhotos((prev) => prev.map((photo) => (photo.id === id ? { ...photo, tag } : photo)));

  const handleDropzoneDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const handleReorder = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    setPhotos((prev) => {
      const next = [...prev];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
    setDragIndex(null);
  };

  return (
    <HostSetupLayout
      backHref={`${base}/room-pricing?category=${category}`}
      nextHref={`${base}/account-details?category=${category}`}
      nextDisabled={photos.length < MIN_PHOTOS}
      helpText="Need assistance? Consult the"
      helpLinkText="EVOLANKA Photo Guidelines"
    >
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0f4ff] text-base">🖼️</span>
          <h1 className="brand-page-title text-3xl font-black tracking-[-0.06em] md:text-4xl">{heading} images</h1>
        </div>
        <p className="brand-page-subtitle mt-3 max-w-[560px] text-sm md:text-base">
          Upload high-quality photographs of your property, exterior, lobby, and surroundings to showcase to
          travelers.
        </p>

        <section className="mt-8 rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e3e8f4] pb-5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-[#001a43]">Property Photos</h2>
              <span className="rounded-md border border-[#e6d9a8] bg-[#fbf6e4] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#b08d1f]">
                Mandatory • Min {MIN_PHOTOS} photos
              </span>
            </div>
            <span className="text-xs text-[#6c7387]">JPG, PNG or WebP • Max 10MB each</span>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            multiple
            className="sr-only"
            aria-label="Add property photos"
            onChange={(event) => addFiles(event.target.files)}
          />

          <div
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDropzoneDrop}
            onClick={() => fileRef.current?.click()}
            className={[
              'mt-6 flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors',
              isDragging ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#c5cde0] bg-[#f9f9ff] hover:border-[#001a43]/50',
            ].join(' ')}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-[#dce3f1] bg-white text-2xl">
              ☁️
            </span>
            <p className="mt-5 text-sm font-bold text-[#001a43]">Click to upload or drag and drop</p>
            <p className="mt-1 text-xs text-[#6c7387]">JPG, PNG &amp; WebP supported (Up to {MAX_PHOTOS} photos)</p>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                fileRef.current?.click();
              }}
              disabled={photos.length >= MAX_PHOTOS}
              className="btn-primary mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>🖼️</span>
              Add Photos
            </button>
          </div>
          {error && <p className="mt-3 text-xs text-[#d64545]">{error}</p>}

          {photos.length > 0 && (
            <div className="mt-7">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]">
                  Uploaded gallery ({photos.length} of {MAX_PHOTOS} photos added)
                </span>
                <span className="text-xs text-[#8a93a8]">Drag thumbnails to reorder</span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    draggable
                    onDragStart={() => setDragIndex(index)}
                    onDragEnd={() => setDragIndex(null)}
                    onDragOver={(event) => {
                      if (dragIndex !== null) event.preventDefault();
                    }}
                    onDrop={(event) => {
                      if (dragIndex === null) return;
                      event.preventDefault();
                      event.stopPropagation();
                      handleReorder(index);
                    }}
                    className={[
                      'relative aspect-[4/3] cursor-grab overflow-hidden rounded-xl border border-[#dce3f1] bg-[#f5f7fc] active:cursor-grabbing',
                      dragIndex === index ? 'opacity-50' : '',
                    ].join(' ')}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.label}
                      draggable={false}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/70 to-transparent" />

                    <div className="absolute left-2 top-2 flex items-center gap-1.5">
                      {index === 0 && (
                        <span className="rounded-md bg-[#b08d1f] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          ★ Cover photo
                        </span>
                      )}
                      <select
                        value={photo.tag}
                        onChange={(event) => setTag(photo.id, event.target.value)}
                        aria-label={`Tag for ${photo.label}`}
                        className="max-w-[110px] rounded-md border border-white/40 bg-black/50 px-1.5 py-1 text-[10px] font-semibold text-white outline-none"
                      >
                        <option value="">Add tag</option>
                        {photoTags.map((tag) => (
                          <option key={tag} value={tag} className="text-[#001a43]">
                            {tag}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => removePhoto(photo)}
                      aria-label={`Remove ${photo.label}`}
                      className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-sm text-[#001a43] shadow hover:bg-white"
                    >
                      ×
                    </button>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3 pb-2 text-xs text-white">
                      <span className="truncate font-medium">{photo.label}</span>
                      <span className="shrink-0 text-[10px] opacity-80">{formatSize(photo.size)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8a93a8]">
          EVOLANKA Host Platform • All system assets compliant • Secure cloud storage
        </p>
      </div>
    </HostSetupLayout>
  );
}
