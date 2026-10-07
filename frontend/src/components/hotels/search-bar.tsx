'use client';

type SearchBarProps = { destination: string; onDestinationChange: (value: string) => void };

export default function SearchBar({ destination, onDestinationChange }: SearchBarProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-[#c3c6d6]/50 bg-white p-2 shadow-lg md:flex-row md:items-center md:rounded-full">
      <label className="flex min-w-0 flex-1 items-center gap-3 border-b border-[#c3c6d6]/30 px-4 py-3 md:border-b-0 md:border-r"><span className="material-symbols-outlined text-[#003d9b]">location_on</span><span className="flex min-w-0 flex-col"><span className="text-xs font-medium uppercase tracking-widest text-[#8b90a0]">Destination</span><input value={destination} onChange={(event) => onDestinationChange(event.target.value)} placeholder="Where are you going?" className="w-full border-none bg-transparent p-0 text-base text-[#001a43] outline-none placeholder:text-[#434654] focus:ring-0" /></span></label>
      <label className="flex min-w-0 flex-1 items-center gap-3 border-b border-[#c3c6d6]/30 px-4 py-3 md:border-b-0 md:border-r"><span className="material-symbols-outlined text-[#003d9b]">calendar_today</span><span className="flex min-w-0 flex-col"><span className="text-xs font-medium uppercase tracking-widest text-[#8b90a0]">Check-in</span><input type="date" aria-label="Check-in date" className="w-full border-none bg-transparent p-0 text-base text-[#001a43] outline-none focus:ring-0" /></span></label>
      <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3"><span className="material-symbols-outlined text-[#003d9b]">group</span><span className="flex min-w-0 flex-col"><span className="text-xs font-medium uppercase tracking-widest text-[#8b90a0]">Guests</span><input type="number" min="1" placeholder="How many?" aria-label="Number of guests" className="w-full border-none bg-transparent p-0 text-base text-[#001a43] outline-none placeholder:text-[#434654] focus:ring-0" /></span></label>
      <button type="button" className="rounded-full bg-[#003d9b] px-10 py-4 font-bold text-white transition-transform hover:brightness-110 active:scale-95">Search</button>
    </div>
  );
}
