type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const toneClass: Record<Tone, string> = {
  success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  warning: "bg-[#c9a227]/12 text-[#ffd977] border-[#c9a227]/30",
  danger: "bg-rose-500/10 text-rose-400 border-rose-500/25",
  info: "bg-[#003d9b]/10 text-[#8cb5ff] border-[#003d9b]/25",
  neutral: "bg-outline/10 text-on-surface-variant border-outline/25",
};

const statusTone: Record<string, Tone> = {
  Active: "success",
  Approved: "success",
  Completed: "success",
  Paid: "success",
  Visible: "success",
  Resolved: "success",
  Confirmed: "info",
  Pending: "warning",
  Restricted: "warning",
  Flagged: "warning",
  Rejected: "danger",
  Banned: "danger",
  Cancelled: "danger",
  Failed: "danger",
  Refunded: "neutral",
  Hidden: "neutral",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-bold ${toneClass[statusTone[status] ?? "neutral"]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
