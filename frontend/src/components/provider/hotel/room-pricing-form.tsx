'use client';

import { useEffect, useRef, useState, type DragEvent, type ReactNode } from 'react';

import HostSetupLayout from '@/components/provider/hotel/host-setup-layout';
import type { PropertyCategory } from '@/lib/hotel-setup';

const base = '/provider/verification-main/hotel-verification';

const MAX_PHOTO_BYTES = 2 * 1024 * 1024;
const MAX_GUESTS = 10;

const roomTypes = [
  'Single Room',
  'Double Room',
  'Twin Room',
  'Standard Room',
  'Superior Room',
  'Deluxe Room',
  'Family Room',
  'Suite',
];

const bedTypes = ['Single bed', 'Double bed', 'Queen bed', 'King bed', 'Bunk bed', 'Sofa bed'];

const mealPlans = [
  { key: 'roomOnly', label: 'Room Only' },
  { key: 'bedBreakfast', label: 'Bed & Breakfast' },
  { key: 'halfBoard', label: 'Half Board' },
  { key: 'breakfastLunch', label: 'Breakfast & Lunch' },
  { key: 'fullBoard', label: 'Full Board' },
] as const;

type MealKey = (typeof mealPlans)[number]['key'];

type PaxRate = { id: number; adults: number; prices: Record<MealKey, string> };
type Bed = { type: string; count: number };
type Photo = { id: string; name: string; url: string };

type Room = {
  id: number;
  roomType: string;
  name: string;
  beds: Bed[];
  size: string;
  bathrooms: string;
  quantity: string;
  rates: PaxRate[];
  photos: Photo[];
};

const inputClass =
  'w-full rounded-xl border border-[#dce3f1] bg-white px-4 py-3 text-sm text-[#001a43] outline-none transition placeholder:text-[#8a93a8] focus:border-[#001a43] focus:ring-2 focus:ring-[#001a43]/10';

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-[#6c7387]';

let idCounter = 1;
const nextId = () => idCounter++;

const emptyPrices = (): Record<MealKey, string> => ({
  roomOnly: '',
  bedBreakfast: '',
  halfBoard: '',
  breakfastLunch: '',
  fullBoard: '',
});

const occupancyLabel = (adults: number) =>
  `${['Single', 'Double', 'Triple', 'Quadruple'][adults - 1] ?? 'Group'} Occupancy`;

function Field({
  label,
  required,
  className = '',
  children,
}: {
  label: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className={labelClass}>
        {label} {required && <span className="text-[#b08d1f]">*</span>}
      </span>
      {children}
    </label>
  );
}

function RoomCard({
  room,
  index,
  canRemove,
  onChange,
  onRemove,
}: {
  room: Room;
  index: number;
  canRemove: boolean;
  onChange: (update: (room: Room) => Room) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoError, setPhotoError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const availableBeds = bedTypes.filter((type) => !room.beds.some((bed) => bed.type === type));

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const accepted: Photo[] = [];
    let skipped = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/') || file.size > MAX_PHOTO_BYTES) {
        skipped += 1;
        return;
      }
      accepted.push({ id: `${nextId()}`, name: file.name, url: URL.createObjectURL(file) });
    });

    setPhotoError(skipped ? `${skipped} file(s) skipped. Only images up to 2 MB are allowed.` : '');
    if (accepted.length) onChange((current) => ({ ...current, photos: [...current.photos, ...accepted] }));
    if (fileRef.current) fileRef.current.value = '';
  };

  const removePhoto = (photo: Photo) => {
    URL.revokeObjectURL(photo.url);
    onChange((current) => ({ ...current, photos: current.photos.filter((item) => item.id !== photo.id) }));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFiles(event.dataTransfer.files);
  };

  const updateRate = (rateId: number, update: (rate: PaxRate) => PaxRate) =>
    onChange((current) => ({
      ...current,
      rates: current.rates.map((rate) => (rate.id === rateId ? update(rate) : rate)),
    }));

  const addRate = () =>
    onChange((current) => {
      const adults = Math.max(0, ...current.rates.map((rate) => rate.adults)) + 1;
      return { ...current, rates: [...current.rates, { id: nextId(), adults, prices: emptyPrices() }] };
    });

  return (
    <section className="rounded-[1.3rem] border border-[#e3e8f4] bg-white p-6 shadow-[0_18px_50px_rgba(0,26,67,0.08)] md:p-8">
      <div className="flex items-center justify-between gap-3 border-b border-[#e3e8f4] pb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black tracking-[-0.04em] text-[#001a43]">Room {index + 1}</h2>
          {index === 0 && (
            <span className="rounded-md border border-[#bfe3cf] bg-[#eaf7f0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2f9e6b]">
              Primary Unit
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#6c7387]">ID: #RM-{String(103 + index + 1).padStart(4, '0')}</span>
          {canRemove && (
            <button type="button" onClick={onRemove} className="text-xs font-semibold text-[#d64545] hover:underline">
              Remove room
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label="Room type" required className="md:col-span-2">
          <select
            value={room.roomType}
            onChange={(event) => onChange((current) => ({ ...current, roomType: event.target.value }))}
            className={`${inputClass} ${room.roomType ? '' : 'text-[#8a93a8]'}`}
          >
            <option value="">Select a room type...</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Room name" required className="md:col-span-2">
          <input
            type="text"
            value={room.name}
            onChange={(event) => onChange((current) => ({ ...current, name: event.target.value }))}
            placeholder="e.g. Deluxe Ocean View"
            className={inputClass}
          />
        </Field>

        <div className="md:col-span-2">
          <span className={labelClass}>Beds in this room</span>
          {room.beds.length > 0 && (
            <div className="mb-3 space-y-2">
              {room.beds.map((bed) => (
                <div
                  key={bed.type}
                  className="flex items-center justify-between rounded-xl border border-[#dce3f1] bg-[#f5f7fc] px-4 py-2.5"
                >
                  <span className="text-sm font-medium text-[#001a43]">{bed.type}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease ${bed.type}`}
                      disabled={bed.count <= 1}
                      onClick={() =>
                        onChange((current) => ({
                          ...current,
                          beds: current.beds.map((item) =>
                            item.type === bed.type ? { ...item, count: item.count - 1 } : item,
                          ),
                        }))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dce3f1] bg-white text-[#001a43] disabled:opacity-40"
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-sm font-bold text-[#001a43]">{bed.count}</span>
                    <button
                      type="button"
                      aria-label={`Increase ${bed.type}`}
                      onClick={() =>
                        onChange((current) => ({
                          ...current,
                          beds: current.beds.map((item) =>
                            item.type === bed.type ? { ...item, count: item.count + 1 } : item,
                          ),
                        }))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#dce3f1] bg-white text-[#001a43]"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      aria-label={`Remove ${bed.type}`}
                      onClick={() =>
                        onChange((current) => ({
                          ...current,
                          beds: current.beds.filter((item) => item.type !== bed.type),
                        }))
                      }
                      className="text-sm text-[#6c7387] hover:text-[#d64545]"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <select
            value=""
            disabled={availableBeds.length === 0}
            onChange={(event) => {
              const type = event.target.value;
              if (type) onChange((current) => ({ ...current, beds: [...current.beds, { type, count: 1 }] }));
            }}
            className={`${inputClass} text-[#8a93a8]`}
          >
            <option value="">+ Add a bed type...</option>
            {availableBeds.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <Field label="Room size (sqm)" required>
          <div className="relative">
            <input
              type="number"
              min="0"
              value={room.size}
              onChange={(event) => onChange((current) => ({ ...current, size: event.target.value }))}
              placeholder="e.g., 25"
              className={`${inputClass} pr-12`}
            />
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8a93a8]">
              m²
            </span>
          </div>
        </Field>

        <Field label="Bathrooms" required>
          <input
            type="number"
            min="0"
            value={room.bathrooms}
            onChange={(event) => onChange((current) => ({ ...current, bathrooms: event.target.value }))}
            placeholder="e.g., 1"
            className={inputClass}
          />
        </Field>

        <Field label="Quantity of this room type" required>
          <input
            type="number"
            min="1"
            value={room.quantity}
            onChange={(event) => onChange((current) => ({ ...current, quantity: event.target.value }))}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="mt-8 border-t border-[#e3e8f4] pt-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#001a43]">
              Pricing by Guest Count <span className="text-[#b08d1f]">*</span>
            </h3>
            <p className="mt-1 text-xs text-[#6c7387]">
              Define room rates across multiple meal configurations (in LKR).
            </p>
          </div>
          <button
            type="button"
            onClick={addRate}
            disabled={room.rates.length >= MAX_GUESTS}
            className="shrink-0 text-sm font-semibold text-[#001a43] hover:underline disabled:opacity-40"
          >
            + Add pax
          </button>
        </div>

        <div className="mt-5 space-y-4">
          {room.rates.map((rate, rateIndex) => (
            <div key={rate.id} className="rounded-xl border border-[#dce3f1] bg-[#f5f7fc] p-4 md:p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${rateIndex % 2 === 0 ? 'bg-[#001a43]' : 'bg-[#b08d1f]'}`} />
                  <span className="text-sm font-bold text-[#001a43]">
                    {rate.adults} Adult{rate.adults > 1 ? 's' : ''}
                  </span>
                  <span className="text-xs text-[#6c7387]">({occupancyLabel(rate.adults)})</span>
                </div>
                {room.rates.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      onChange((current) => ({
                        ...current,
                        rates: current.rates.filter((item) => item.id !== rate.id),
                      }))
                    }
                    className="text-xs font-semibold text-[#d64545] hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {mealPlans.map((meal) => (
                  <label key={meal.key} className="block">
                    <span className="mb-1.5 block text-xs text-[#6c7387]">{meal.label} (LKR)</span>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[11px] text-[#8a93a8]">
                        LKR
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={rate.prices[meal.key]}
                        onChange={(event) =>
                          updateRate(rate.id, (current) => ({
                            ...current,
                            prices: { ...current.prices, [meal.key]: event.target.value },
                          }))
                        }
                        placeholder="e.g., 10000"
                        className={`${inputClass} pl-12`}
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-[#e3e8f4] pt-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-[#001a43]">Room photos</h3>
            <p className="mt-1 text-xs text-[#6c7387]">Upload multiple photos. Max 2 MB per image.</p>
          </div>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="btn-primary shrink-0 rounded-lg px-4 py-2 text-sm font-bold"
          >
            Upload photos
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          aria-label="Upload room photos"
          onChange={(event) => addFiles(event.target.files)}
        />

        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={[
            'mt-4 rounded-xl border border-dashed p-5 transition-colors',
            isDragging ? 'border-[#001a43] bg-[#f0f4ff]' : 'border-[#c5cde0] bg-[#f9f9ff]',
          ].join(' ')}
        >
          {room.photos.length === 0 ? (
            <div className="flex flex-col items-center py-6 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dce3f1] bg-white text-base">
                📷
              </span>
              <p className="mt-3 text-sm font-semibold text-[#4e5568]">No photos uploaded yet.</p>
              <p className="mt-1 text-xs text-[#8a93a8]">Drag and drop room pictures here, or click upload</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {room.photos.map((photo) => (
                <div key={photo.id} className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-[#dce3f1]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.name} className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(photo)}
                    aria-label={`Remove ${photo.name}`}
                    className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-sm text-[#001a43] shadow hover:bg-white"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        {photoError && <p className="mt-2 text-xs text-[#d64545]">{photoError}</p>}
      </div>
    </section>
  );
}

export default function RoomPricingForm({ category }: { category: PropertyCategory }) {
  const createRoom = (): Room => ({
    id: nextId(),
    roomType: '',
    name: '',
    beds: [],
    size: '',
    bathrooms: '',
    quantity: '1',
    rates: [
      { id: nextId(), adults: 1, prices: emptyPrices() },
      { id: nextId(), adults: 2, prices: emptyPrices() },
    ],
    photos: [],
  });

  const [rooms, setRooms] = useState<Room[]>(() => [createRoom()]);

  // Release object URLs for any photos still held on unmount.
  const roomsRef = useRef(rooms);
  useEffect(() => {
    roomsRef.current = rooms;
  }, [rooms]);
  useEffect(
    () => () => roomsRef.current.forEach((room) => room.photos.forEach((photo) => URL.revokeObjectURL(photo.url))),
    [],
  );

  const isValid = rooms.every(
    (room) =>
      room.roomType &&
      room.name.trim() &&
      room.size &&
      room.bathrooms &&
      Number(room.quantity) >= 1 &&
      room.rates.length > 0 &&
      room.rates.every((rate) => Object.values(rate.prices).some((price) => price !== '')),
  );

  return (
    <HostSetupLayout
      backHref={`${base}/facilities?category=${category}`}
      nextHref={`${base}/upload-image?category=${category}`}
      nextDisabled={!isValid}
      helpText="Need assistance configuring inventory and meal options? Contact"
      helpLinkText="EVOLANKA Host Partner Support"
    >
      <div className="mx-auto max-w-[680px] text-center">
        <h1 className="brand-page-title text-4xl font-black tracking-[-0.06em] md:text-5xl">
          Room details and pricing
        </h1>
        <p className="brand-page-subtitle mt-4 text-sm md:text-base">
          Configure your room inventory, occupancy options, customizable meal plan rates in Sri Lankan Rupees (LKR),
          and upload gallery photos for travelers.
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-[800px] space-y-6">
        {rooms.map((room, index) => (
          <RoomCard
            key={room.id}
            room={room}
            index={index}
            canRemove={rooms.length > 1}
            onChange={(update) =>
              setRooms((prev) => prev.map((item) => (item.id === room.id ? update(item) : item)))
            }
            onRemove={() => {
              room.photos.forEach((photo) => URL.revokeObjectURL(photo.url));
              setRooms((prev) => prev.filter((item) => item.id !== room.id));
            }}
          />
        ))}

        <button
          type="button"
          onClick={() => setRooms((prev) => [...prev, createRoom()])}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#c5cde0] bg-white px-5 py-4 text-sm font-semibold text-[#001a43] transition-colors hover:border-[#001a43]"
        >
          <span>+</span>
          Add another room
        </button>
      </div>
    </HostSetupLayout>
  );
}
