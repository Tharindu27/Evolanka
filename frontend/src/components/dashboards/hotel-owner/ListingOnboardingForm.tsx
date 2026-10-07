"use client";

import { useState, type InputHTMLAttributes } from "react";

const steps = [
  "Basic Info",
  "Category & Rooms",
  "Amenities",
  "Media & Verification",
  "Pricing & Policies",
];

const amenities = ["Free Wi-Fi", "Swimming pool", "Restaurant", "Air conditioning", "Parking", "Airport shuttle"];

function Field({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">{label}</span>
      <input
        {...props}
        className="w-full rounded-lg bg-surface-container-low px-3 py-3 font-body-md text-body-md text-on-surface shadow-inner outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}

export default function ListingOnboardingForm({ onCancel }: { onCancel: () => void }) {
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((current) =>
      current.includes(amenity) ? current.filter((item) => item !== amenity) : [...current, amenity],
    );
  };

  const next = () => setStep((current) => Math.min(current + 1, steps.length - 1));
  const previous = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-12 pt-20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-outline">Provider Hub / My Listings</p>
          <h1 className="mt-1 font-headline-md text-headline-md font-bold text-on-surface">Create a new listing</h1>
        </div>
        <button type="button" onClick={onCancel} className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 font-label-md text-label-md text-on-surface-variant transition hover:bg-surface-container hover:text-on-surface">
          <span className="material-symbols-outlined text-body-md">close</span>
          Exit onboarding
        </button>
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl bg-surface-container-lowest p-4 shadow-sm">
        <div className="flex min-w-[700px] items-center">
          {steps.map((label, index) => (
            <div key={label} className="flex flex-1 items-center">
              <button type="button" onClick={() => index <= step && setStep(index)} className="flex shrink-0 items-center gap-2 text-left">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${index < step ? "bg-tertiary text-on-tertiary" : index === step ? "bg-primary text-on-primary" : "bg-primary-fixed text-on-primary-fixed"}`}>
                  {index < step ? "✓" : index + 1}
                </span>
                <span className={`whitespace-nowrap font-label-sm text-label-sm ${index === step ? "font-bold text-primary" : "text-on-surface-variant"}`}>{label}</span>
              </button>
              {index < steps.length - 1 && <span className={`mx-3 h-px flex-1 ${index < step ? "bg-tertiary" : "bg-outline-variant"}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm lg:p-8">
        <div className="mb-8 flex items-start justify-between gap-4 border-b border-outline-variant pb-6">
          <div>
            <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary">Step {step + 1} of {steps.length}</span>
            <h2 className="mt-1 font-title-sm text-title-sm font-bold text-on-surface">{steps[step]}</h2>
            <p className="mt-1 text-sm text-on-surface-variant">Complete this section to continue setting up your property.</p>
          </div>
          <span className="hidden rounded-full bg-secondary-fixed px-3 py-1 text-xs font-bold text-on-secondary-fixed sm:block">{Math.round(((step + 1) / steps.length) * 100)}% Complete</span>
        </div>

        {step === 0 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Property name *" placeholder="e.g. Grand Horizon Heritage Villa" />
            <Field label="Official contact phone *" type="tel" placeholder="+94 77 123 4567" />
            <Field label="Business email *" type="email" placeholder="contact@example.com" />
            <Field label="Website (optional)" type="url" placeholder="https://" />
            <label className="block md:col-span-2"><span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">Property description *</span><textarea rows={5} placeholder="Describe what makes your property special..." className="w-full rounded-lg bg-surface-container-low px-3 py-3 font-body-md text-body-md text-on-surface shadow-inner outline-none transition focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary" /></label>
            <Field label="Province *" placeholder="Central Province" />
            <Field label="City / town *" placeholder="Sigiriya" />
          </div>
        )}

        {step === 1 && (
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block"><span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">Property category *</span><select className="w-full rounded-lg bg-surface-container-low px-3 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary"><option>Hotel & Resort</option><option>Boutique Villa</option><option>Bungalow</option><option>Guest House</option></select></label>
            <Field label="Number of rooms *" type="number" min="1" placeholder="12" />
            <Field label="Room types" placeholder="Deluxe, Suite, Family" />
            <Field label="Maximum guests" type="number" min="1" placeholder="24" />
            <label className="block md:col-span-2"><span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">Room and accommodation notes</span><textarea rows={4} placeholder="Explain your room options and sleeping arrangements..." className="w-full rounded-lg bg-surface-container-low px-3 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" /></label>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="mb-4 text-sm text-on-surface-variant">Select all facilities and services available to your guests.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {amenities.map((amenity) => <label key={amenity} className="flex cursor-pointer items-center gap-3 rounded-lg bg-surface-container-low p-4 text-sm font-semibold text-on-surface transition hover:bg-surface-container-high"><input type="checkbox" checked={selectedAmenities.includes(amenity)} onChange={() => toggleAmenity(amenity)} className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary" />{amenity}</label>)}
            </div>
            <label className="mt-5 block"><span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">Additional amenities</span><textarea rows={4} placeholder="List any other facilities..." className="w-full rounded-lg bg-surface-container-low px-3 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" /></label>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border-2 border-dashed border-outline-variant p-8 text-center md:col-span-2"><span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span><p className="mt-2 font-semibold text-on-surface">Upload property photos</p><p className="mt-1 text-sm text-on-surface-variant">Add at least 5 clear photos of your property.</p><button type="button" className="mt-4 rounded-lg bg-primary px-5 py-2.5 font-label-md text-label-md font-semibold text-on-primary">Choose files</button></div>
            <Field label="Google Maps link" placeholder="https://maps.google.com/..." />
            <Field label="Verification document" type="file" />
            <div className="rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant md:col-span-2"><span className="material-symbols-outlined mr-2 align-middle text-primary">verified</span>Verification documents help us confirm ownership and protect guest trust.</div>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Starting price per night *" type="number" min="0" placeholder="25000" />
            <label className="block"><span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">Currency</span><select className="w-full rounded-lg bg-surface-container-low px-3 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary"><option>LKR</option><option>USD</option></select></label>
            <Field label="Check-in time" type="time" />
            <Field label="Check-out time" type="time" />
            <label className="block md:col-span-2"><span className="mb-1.5 block font-label-md text-label-md font-semibold text-on-surface">Cancellation policy</span><textarea rows={4} placeholder="Describe your cancellation and booking policies..." className="w-full rounded-lg bg-surface-container-low px-3 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary" /></label>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-outline-variant pt-6">
          <button type="button" onClick={onCancel} className="rounded-lg px-4 py-2.5 font-label-md text-label-md text-on-surface-variant transition hover:bg-surface-container">Cancel Draft</button>
          <div className="flex gap-3">
            <button type="button" onClick={() => setSaved(true)} className="rounded-lg bg-surface-container-highest px-5 py-2.5 font-label-md text-label-md font-semibold text-on-surface transition hover:bg-surface-container">{saved ? "Draft Saved" : "Save as Draft"}</button>
            {step > 0 && <button type="button" onClick={previous} className="rounded-lg bg-surface-container-highest px-5 py-2.5 font-label-md text-label-md font-semibold text-on-surface transition hover:bg-surface-container">Back</button>}
            <button type="button" onClick={next} className="inline-flex items-center gap-2 rounded-lg bg-secondary-container px-6 py-2.5 font-label-md text-label-md font-semibold text-on-secondary-container transition hover:bg-secondary"><span>{step === steps.length - 1 ? "Submit Listing" : `Next: ${steps[step + 1]}`}</span><span className="material-symbols-outlined text-base">{step === steps.length - 1 ? "check" : "arrow_forward"}</span></button>
          </div>
        </div>
      </div>
    </section>
  );
}
