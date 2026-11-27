interface KpiCardProps {
  title: string;
  value: string;
  note: string;
  icon: string;
  accent: "navy" | "gold" | "blue" | "emerald";
  trend?: string;
}

const accentClass = {
  navy: "bg-primary/10 text-primary border-primary/20",
  gold: "bg-[#b08d1f]/12 text-[#ffd977] border-[#b08d1f]/20",
  blue: "bg-[#003d9b]/10 text-tertiary border-[#003d9b]/20",
  emerald: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
};

export default function KpiCard({ title, value, note, icon, accent, trend }: KpiCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-[22px] border border-outline-variant bg-surface-container-low p-5 shadow-[0_10px_30px_rgba(0,26,67,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,26,67,0.08)]">
      <div className="flex items-start justify-between">
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">{title}</p>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accentClass[accent]}`}>
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">{icon}</span>
        </div>
      </div>
      <h3 className="my-2 text-3xl font-black tracking-tight text-on-surface">{value}</h3>
      <p className="flex items-center gap-1.5 text-xs text-on-surface-variant">
        {trend ? <span className="font-bold text-emerald-600">{trend}</span> : null}
        {note}
      </p>
    </div>
  );
}
