'use client';

import type { FilterGroup } from './hotel-data';

type FilterSectionProps = {
  group: FilterGroup;
  open: boolean;
  onToggle: () => void;
  selected: Set<string>;
  onSelect: (option: string) => void;
};

export default function FilterSection({ group, open, onToggle, selected, onSelect }: FilterSectionProps) {
  const visibleOptions = group.options.slice(0, 6);
  const hiddenOptions = group.options.slice(6);

  return (
    <div className="border-b border-[#c3c6d6]/30 pb-4 last:border-b-0">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between py-2 text-left">
        <span className="text-sm font-bold uppercase tracking-wider text-[#001a43]">{group.title}</span>
        <span className={`material-symbols-outlined text-[#434654] transition-transform ${open ? 'rotate-180' : ''}`}>expand_more</span>
      </button>
      {open && (
        <div className="space-y-3 pt-2">
          {[...visibleOptions, ...hiddenOptions].map((option, index) => (
            <label key={option} className={`${index >= 6 ? 'hidden sm:flex' : 'flex'} cursor-pointer items-center gap-3 text-sm text-[#434654]`}>
              <input type="checkbox" checked={selected.has(option)} onChange={() => onSelect(option)} className="h-4 w-4 rounded border-[#c3c6d6] text-[#003d9b] focus:ring-[#003d9b]" />
              <span>{option}</span>
            </label>
          ))}
          {hiddenOptions.length > 0 && <span className="block text-xs font-bold text-[#003d9b] sm:hidden">More options available on desktop</span>}
        </div>
      )}
    </div>
  );
}
