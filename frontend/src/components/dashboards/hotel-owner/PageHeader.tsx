interface Props {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: Props) {
  return (
    <div className="space-y-xs">
      <div className="flex items-center gap-xs">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
          Portfolio Management
        </span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-outline-variant" />
        <span className="font-label-sm text-label-sm text-tertiary font-semibold flex items-center gap-0.5">
          <span className="w-2 h-2 rounded-full bg-tertiary inline-block animate-pulse" />
          All Systems Operational
        </span>
      </div>

      <h1 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
        {title}
      </h1>

      <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
        {description}
      </p>
    </div>
  );
}