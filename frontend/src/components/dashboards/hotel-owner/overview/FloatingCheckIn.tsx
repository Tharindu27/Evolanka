export function FloatingCheckIn() {
  return (
    <button
      type="button"
      className="fixed bottom-8 right-8 z-40 flex items-center gap-3 rounded-2xl bg-secondary-container p-4 pr-6 font-label-md text-label-md font-bold text-on-secondary-container shadow-xl transition-transform hover:scale-105 active:scale-95"
    >
      <span className="material-symbols-outlined text-[28px]">add</span>
      Quick Check-in
    </button>
  );
}