export default function AddPropertyCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-surface-container-low/70 hover:bg-surface-container-high/80 rounded-xl p-md flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 min-h-[420px] group shadow-sm hover:shadow-md">
      <div className="w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-on-primary text-primary flex items-center justify-center transition-all duration-300 mb-md shadow-sm">
        <span className="material-symbols-outlined text-headline-md transition-transform group-hover:scale-110">
          add_business
        </span>
      </div>

      <h3 className="font-title-sm text-title-sm font-bold text-on-surface mb-xs group-hover:text-primary transition-colors">
        Create Another Property
      </h3>

      <p className="font-body-md text-body-md text-on-surface-variant max-w-4xl mb-lg">
        List a new hotel, villa, retreat, or campsite to reach thousands of
        international travelers.
      </p>

      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center gap-xs bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md px-5 py-2.5 rounded-lg transition-transform active:scale-95 shadow-sm shadow-primary/20"
      >
        <span className="material-symbols-outlined text-body-md">
          add_circle
        </span>
        <span>+ Start Onboarding</span>
      </button>

      <div className="mt-md flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
        <span className="material-symbols-outlined text-tertiary text-body-md">
          bolt
        </span>
        <span>Avg. setup time: under 12 minutes</span>
      </div>
    </div>
  );
}