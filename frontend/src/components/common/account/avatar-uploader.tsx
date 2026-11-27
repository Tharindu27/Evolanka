"use client";

import { useRef, useState, type ChangeEvent } from 'react';
import { getErrorMessage, uploadProfilePicture, type AuthProfile, type AuthRole } from '@/lib/api';
import { getInitials } from '@/lib/initials';

const MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

type AvatarUploaderProps = {
  role: AuthRole;
  name: string;
  picture: string | null;
  onUploaded: (profile: AuthProfile) => void;
  // Size and colours of the circle, so each portal keeps its own look.
  className?: string;
  fallbackClassName?: string;
};

export default function AvatarUploader({
  role,
  name,
  picture,
  onUploaded,
  className = 'h-20 w-20',
  fallbackClassName = 'bg-[#d8a669] text-white',
}: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) return setError('Use a JPG, PNG or WebP image.');
    if (file.size > MAX_BYTES) return setError('Image must be 5 MB or smaller.');

    setError('');
    setUploading(true);
    try {
      onUploaded(await uploadProfilePicture(role, file));
    } catch (uploadError) {
      setError(getErrorMessage(uploadError));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex shrink-0 flex-col items-center gap-1.5">
      <div className={`relative ${className}`}>
        <div className="h-full w-full overflow-hidden rounded-full shadow-inner ring-4 ring-white">
          {picture ? (
            // Remote Cloudinary image; next/image would need the host whitelisted.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={picture} alt={`${name} profile picture`} className="h-full w-full object-cover" />
          ) : (
            <div className={`flex h-full w-full items-center justify-center text-2xl font-bold ${fallbackClassName}`}>
              {getInitials(name)}
            </div>
          )}
          {uploading ? (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#001a43]/55 text-[0.65rem] font-bold text-white">
              Uploading…
            </div>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          aria-label="Change profile picture"
          className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#001a43] text-white shadow transition hover:bg-[#0d4abe] disabled:opacity-60"
        >
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current stroke-[1.8]" aria-hidden="true">
            <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" />
            <circle cx="12" cy="13" r="3.2" />
          </svg>
        </button>

        <input ref={inputRef} type="file" accept={ALLOWED_TYPES.join(',')} onChange={handleFile} className="sr-only" tabIndex={-1} />
      </div>

      {error ? (
        <p role="alert" className="max-w-[9rem] text-center text-[0.7rem] font-semibold leading-tight text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
