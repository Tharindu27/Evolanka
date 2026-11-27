interface PanelProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export default function Panel({ title, subtitle, action, className = "", children }: PanelProps) {
  return (
    <section
      className={`overflow-hidden rounded-[22px] border border-outline-variant bg-surface-container-low shadow-[0_10px_30px_rgba(0,26,67,0.04)] ${className}`}
    >
      {title ? (
        <header className="flex flex-wrap items-start justify-between gap-3 border-b border-outline-variant px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-extrabold text-on-surface">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-on-surface-variant">{subtitle}</p> : null}
          </div>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}
