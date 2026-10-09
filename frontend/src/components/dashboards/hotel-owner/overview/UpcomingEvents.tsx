import { Card } from "./Card";

export function UpcomingEvents() {
  return (
    <Card className="p-md">
      <div className="mb-sm flex items-center justify-between">
        <h2 className="font-label-md text-label-md uppercase text-on-surface-variant">
          Upcoming Events
        </h2>
        <span className="material-symbols-outlined text-primary">
          calendar_today
        </span>
      </div>

      <div className="space-y-4">
        {[
          ["15", "Lankan Food Festival", "In-house event • 6:00 PM"],
          ["18", "Pool Maintenance", "South Wing • 08:00 AM"],
        ].map(([date, title, details]) => (
          <div key={title} className="group flex items-start gap-4">
            <div className="flex w-12 flex-col items-center justify-center rounded-lg bg-surface-container-high py-2 font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="text-[10px] uppercase">Oct</span>
              <span className="text-lg leading-none">{date}</span>
            </div>
            <div>
              <p className="font-body-md text-body-md font-bold text-on-surface">
                {title}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}