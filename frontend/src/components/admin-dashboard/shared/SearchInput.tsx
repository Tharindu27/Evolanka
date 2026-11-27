interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchInput({ value, onChange, placeholder }: SearchInputProps) {
  return (
    <label className="relative block w-full sm:w-64">
      <span className="sr-only">{placeholder}</span>
      <span
        className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-on-surface-variant"
        aria-hidden="true"
      >
        search
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-outline-variant bg-surface py-2 pl-9 pr-3 text-xs text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-[#315b96] focus:ring-4 focus:ring-[#315b96]/10"
      />
    </label>
  );
}
