import { Card } from "./Card";
import { actionItems } from "./constants";

export function QuickActions() {
  return (
    <Card className="p-md">
      <h2 className="mb-md font-title-sm text-title-sm text-on-surface">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-sm">
        {actionItems.map(([icon, label]) => (
          <button
            key={label}
            type="button"
            className="group flex flex-col items-center gap-2 rounded-xl border border-outline-variant p-4 transition-colors hover:bg-surface-container"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="material-symbols-outlined">{icon}</span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface">
              {label}
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
}