export function PremiumPromo() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-on-primary-container shadow-[0_2px_8px_rgba(0,82,204,0.08)]">
      <div className="relative z-10">
        <p className="mb-2 font-label-sm text-label-sm font-bold uppercase tracking-wider opacity-80">
          Provider Premium
        </p>
        <h2 className="mb-4 font-title-sm text-title-sm">
          Unlock advanced AI booking insights
        </h2>
        <button
          type="button"
          className="rounded-lg bg-white px-4 py-2 font-label-md text-label-md text-primary transition-transform hover:scale-105"
        >
          Upgrade Now
        </button>
      </div>

      <span className="material-symbols-outlined absolute -bottom-4 -right-4 rotate-12 text-[120px] opacity-10">
        rocket_launch
      </span>
    </section>
  );
}