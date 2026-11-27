interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export default function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div className="space-y-1.5">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-secondary">{eyebrow}</p>
        <h1 className="text-2xl font-black tracking-tight text-on-surface sm:text-3xl">{title}</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-on-surface-variant">{description}</p>
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
