interface TabItem<T extends string> {
  id: T;
  label: string;
  count?: number;
}

interface TabsProps<T extends string> {
  tabs: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
}

export default function Tabs<T extends string>({ tabs, value, onChange }: TabsProps<T>) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1.5">
      {tabs.map((tab) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
              active
                ? "bg-primary-container text-white shadow-sm"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {tab.label}
            {tab.count !== undefined ? (
              <span className={`rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-white/20 text-[#ffd977]" : "bg-outline/15"}`}>
                {tab.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
