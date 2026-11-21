"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import { inputClass } from "../shared/utils";
import { useAdminData } from "../AdminDataProvider";
import { getErrorMessage } from "@/lib/api";
import { categories, provinces } from "@/data/location-data/location-taxonomy";
import { MAX_GALLERY_PHOTOS } from "@/lib/locations-api";

const MAX_PHOTOS = MAX_GALLERY_PHOTOS + 1;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

type Photo = { id: string; url: string; file: File };

const labelClass = "mb-1.5 block text-[11px] font-bold text-on-surface-variant";
const sectionClass = "rounded-2xl border border-outline-variant bg-surface-container-low p-4 sm:p-5";

export default function AddLocationForm() {
  const { addLocation } = useAdminData();
  const [name, setName] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [nearestTown, setNearestTown] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [highlights, setHighlights] = useState<string[]>([]);
  const [bestTime, setBestTime] = useState("");
  const [openingDays, setOpeningDays] = useState("");
  const [localAdultPrice, setLocalAdultPrice] = useState("");
  const [localChildPrice, setLocalChildPrice] = useState("");
  const [foreignAdultPrice, setForeignAdultPrice] = useState("");
  const [foreignChildPrice, setForeignChildPrice] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tips, setTips] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const previewUrls = useRef<string[]>([]);

  useEffect(() => {
    const urls = previewUrls;
    return () => urls.current.forEach((url) => URL.revokeObjectURL(url));
  }, []);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const addHighlight = () => {
    const value = highlightInput.trim();
    if (value && !highlights.includes(value)) setHighlights((items) => [...items, value]);
    setHighlightInput("");
  };

  const loadPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const added: Photo[] = [];
    let problem = "";
    Array.from(event.target.files ?? []).slice(0, MAX_PHOTOS - photos.length).forEach((file) => {
      if (!PHOTO_TYPES.includes(file.type)) problem = "Only PNG, JPG or WebP images are accepted.";
      else if (file.size > MAX_PHOTO_BYTES) problem = "Each image must be 10MB or smaller.";
      else {
        const url = URL.createObjectURL(file);
        previewUrls.current.push(url);
        added.push({ id: `${file.name}-${url}`, url, file });
      }
    });
    setPhotos((items) => [...items, ...added]);
    setMessage(problem ? { tone: "error", text: problem } : null);
    event.target.value = "";
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lat = latitude.trim();
    const lng = longitude.trim();
    if ((lat && Number.isNaN(Number(lat))) || (lng && Number.isNaN(Number(lng)))) {
      setMessage({ tone: "error", text: "Latitude and longitude must be numbers." });
      return;
    }

    setSubmitting(true);
    setMessage(null);
    try {
      await addLocation(
        {
          name: name.trim(),
          province: province.trim(),
          district: district.trim(),
          nearestTown: nearestTown.trim(),
          categories: selectedCategories,
          description: description.trim(),
          highlights,
          bestTime: bestTime.trim(),
          openingDays: openingDays.trim(),
          localAdultPrice: localAdultPrice.trim(),
          localChildPrice: localChildPrice.trim(),
          foreignAdultPrice: foreignAdultPrice.trim(),
          foreignChildPrice: foreignChildPrice.trim(),
          address: address.trim(),
          latitude: lat ? Number(lat) : undefined,
          longitude: lng ? Number(lng) : undefined,
          travelTips: tips.split("\n").map((item) => item.trim()).filter(Boolean),
        },
        photos.map((photo) => photo.file),
      );
      setMessage({ tone: "ok", text: `${name.trim()} was added and approved.` });
      setName(""); setProvince(""); setDistrict(""); setNearestTown(""); setSelectedCategories([]);
      setDescription(""); setHighlightInput(""); setHighlights([]); setBestTime(""); setOpeningDays("");
      setLocalAdultPrice(""); setLocalChildPrice(""); setForeignAdultPrice(""); setForeignChildPrice("");
      setAddress(""); setLatitude(""); setLongitude(""); setTips(""); setPhotos([]);
    } catch (error) {
      setMessage({ tone: "error", text: getErrorMessage(error) });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Panel title="Add Location" subtitle="Complete a destination profile before adding it to EVOLANKA">
      <form onSubmit={(event) => void submit(event)} className="space-y-4 p-4 sm:p-6">
        <section className={sectionClass}>
          <h3 className="mb-4 text-sm font-extrabold text-on-surface">1. Basic Location Information</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className={labelClass}>Location name *</span><input aria-label="Location name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Pidurangala Rock Sanctuary" required className={inputClass} /></label>
            <label><span className={labelClass}>Province *</span><select aria-label="Province" value={province} onChange={(event) => { setProvince(event.target.value); setDistrict(""); }} required className={inputClass}><option value="">Select province</option>{provinces.map((item) => <option key={item.id} value={item.name}>{item.name}</option>)}</select></label>
            <label><span className={labelClass}>District *</span><select aria-label="District" value={district} onChange={(event) => setDistrict(event.target.value)} disabled={!province} required className={inputClass}><option value="">{province ? "Select district" : "Select a province first"}</option>{provinces.find((item) => item.name === province)?.districts.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="sm:col-span-2"><span className={labelClass}>Nearest city / town *</span><input aria-label="Nearest city or town" value={nearestTown} onChange={(event) => setNearestTown(event.target.value)} placeholder="Sigiriya" required className={inputClass} /></label>
          </div>
          <div className="mt-4">
            <span className={labelClass}>Category & themes</span>
            <div className="flex flex-wrap gap-2">
              {categories.map(({ name: category }) => {
                const active = selectedCategories.includes(category);
                return <button key={category} type="button" aria-pressed={active} onClick={() => setSelectedCategories((items) => active ? items.filter((item) => item !== category) : [...items, category])} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${active ? "border-primary bg-primary/15 text-primary" : "border-outline-variant bg-surface text-on-surface-variant"}`}>{category}</button>;
              })}
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <h3 className="mb-4 text-sm font-extrabold text-on-surface">2. Description & Rich Content</h3>
          <label><span className={labelClass}>Quick overview *</span><textarea aria-label="Location description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Describe the destination, its history, highlights and what visitors can experience." required rows={4} className={inputClass} /></label>
          <div className="mt-4">
            <span className={labelClass}>Key highlights</span>
            <div className="flex gap-2">
              <input aria-label="Add a highlight" value={highlightInput} onChange={(event) => setHighlightInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addHighlight(); } }} placeholder="Type a highlight, e.g. panoramic sunrise view" className={inputClass} />
              <ActionButton type="button" variant="muted" onClick={addHighlight}>Add</ActionButton>
            </div>
            {highlights.length ? <ul className="mt-2 flex flex-wrap gap-2">{highlights.map((item) => <li key={item} className="rounded-full bg-primary/10 px-3 py-1 text-[11px] text-primary">{item}<button type="button" aria-label={`Remove ${item}`} onClick={() => setHighlights((items) => items.filter((entry) => entry !== item))} className="ml-2">×</button></li>)}</ul> : null}
          </div>
        </section>

        <section className={sectionClass}>
          <h3 className="mb-4 text-sm font-extrabold text-on-surface">3. Best Time & Entry Pricing</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label><span className={labelClass}>Best time to visit</span><input aria-label="Best time to visit" value={bestTime} onChange={(event) => setBestTime(event.target.value)} placeholder="December to April" className={inputClass} /></label>
            <label><span className={labelClass}>Opening days / hours</span><input aria-label="Opening days and hours" value={openingDays} onChange={(event) => setOpeningDays(event.target.value)} placeholder="Daily, 6:00 AM–6:00 PM" className={inputClass} /></label>
            <label><span className={labelClass}>Local adult ticket (LKR)</span><input aria-label="Local adult ticket" value={localAdultPrice} onChange={(event) => setLocalAdultPrice(event.target.value)} placeholder="200" className={inputClass} /></label>
            <label><span className={labelClass}>Local child ticket (LKR)</span><input aria-label="Local child ticket" value={localChildPrice} onChange={(event) => setLocalChildPrice(event.target.value)} placeholder="100" className={inputClass} /></label>
            <label><span className={labelClass}>Foreign adult ticket (LKR)</span><input aria-label="Foreign adult ticket" value={foreignAdultPrice} onChange={(event) => setForeignAdultPrice(event.target.value)} placeholder="1,000" className={inputClass} /></label>
            <label><span className={labelClass}>Foreign child ticket (LKR)</span><input aria-label="Foreign child ticket" value={foreignChildPrice} onChange={(event) => setForeignChildPrice(event.target.value)} placeholder="500" className={inputClass} /></label>
          </div>
        </section>

        <section className={sectionClass}>
          <h3 className="mb-4 text-sm font-extrabold text-on-surface">4. Location & Coordinates</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2"><span className={labelClass}>Address / landmark</span><input aria-label="Address or landmark" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Pidurangala Temple Road, Sigiriya" className={inputClass} /></label>
            <label><span className={labelClass}>Latitude</span><input aria-label="Latitude" value={latitude} onChange={(event) => setLatitude(event.target.value)} placeholder="7.9588" className={inputClass} /></label>
            <label><span className={labelClass}>Longitude</span><input aria-label="Longitude" value={longitude} onChange={(event) => setLongitude(event.target.value)} placeholder="80.7619" className={inputClass} /></label>
          </div>
        </section>

        <section className={sectionClass}>
          <h3 className="mb-4 text-sm font-extrabold text-on-surface">5. Travel Tips</h3>
          <label><span className={labelClass}>Travel tips (one per line)</span><textarea aria-label="Travel tips" value={tips} onChange={(event) => setTips(event.target.value)} rows={4} placeholder="Bring water and sun protection" className={inputClass} /></label>
        </section>

        <section className={sectionClass}>
          <h3 className="mb-2 text-sm font-extrabold text-on-surface">6. Media & Photography</h3>
          <p className="mb-3 text-[11px] text-on-surface-variant">Upload up to 11 destination photos (the first one is the cover). They are stored on Cloudinary.</p>
          <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-primary/50 bg-surface p-4 text-center">
            <span className="material-symbols-outlined text-2xl text-primary" aria-hidden="true">cloud_upload</span>
            <span className="mt-1 text-xs font-bold text-on-surface">Choose destination photos</span>
            <span className="mt-1 text-[10px] text-on-surface-variant">PNG, JPG or WebP · {photos.length}/{MAX_PHOTOS} uploaded</span>
            <input aria-label="Upload destination photos" type="file" accept={PHOTO_TYPES.join(",")} multiple onChange={loadPhotos} className="sr-only" />
          </label>
          {photos.length ? <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5">{photos.map((photo, index) => <div key={photo.id} className="relative"><img src={photo.url} alt={`Location upload ${index + 1}`} className="h-20 w-full rounded-lg object-cover" /><button type="button" aria-label={`Remove photo ${index + 1}`} onClick={() => setPhotos((items) => items.filter((item) => item.id !== photo.id))} className="absolute right-1 top-1 rounded-full bg-black/70 px-1.5 text-xs text-white">×</button></div>)}</div> : null}
        </section>

        {message ? (
          <p role="status" className={`text-xs font-semibold ${message.tone === "ok" ? "text-emerald-600" : "text-rose-500"}`}>
            {message.text}
          </p>
        ) : null}
        <div className="flex justify-end"><ActionButton type="submit" disabled={submitting} className="py-2.5"><span className="material-symbols-outlined text-base" aria-hidden="true">add_location_alt</span>{submitting ? "Publishing…" : "Add and publish location"}</ActionButton></div>
      </form>
    </Panel>
  );
}
