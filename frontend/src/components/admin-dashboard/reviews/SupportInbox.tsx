"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import { formatDate, inputClass } from "../shared/utils";
import { supportTickets } from "@/data/admin-data/reviews";

const priorityClass = {
  High: "bg-rose-500/10 text-rose-500",
  Normal: "bg-[#003d9b]/10 text-[#2f6bd1]",
  Low: "bg-outline/10 text-on-surface-variant",
};

export default function SupportInbox() {
  const [replies, setReplies] = useState<Record<string, string>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [openId, setOpenId] = useState<string | null>(supportTickets[0]?.id ?? null);

  const send = (id: string) => {
    const text = drafts[id]?.trim();
    if (!text) return;
    setReplies((items) => ({ ...items, [id]: text }));
    setDrafts((items) => ({ ...items, [id]: "" }));
  };

  const openCount = supportTickets.filter((ticket) => !replies[ticket.id]).length;

  return (
    <Panel
      title="Customer Support"
      subtitle="Complaints and questions sent by users"
      action={<span className="rounded-full bg-rose-500/10 px-3 py-1 text-xs font-extrabold text-rose-500">{openCount} open</span>}
    >
      <ul className="divide-y divide-outline-variant">
        {supportTickets.map((ticket) => {
          const expanded = openId === ticket.id;
          const reply = replies[ticket.id];
          return (
            <li key={ticket.id}>
              <button
                type="button"
                onClick={() => setOpenId(expanded ? null : ticket.id)}
                aria-expanded={expanded}
                className="flex w-full items-start justify-between gap-3 p-5 text-left transition hover:bg-surface-container sm:px-6"
              >
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-on-surface">{ticket.subject}</span>
                  <span className="mt-0.5 block text-xs text-on-surface-variant">
                    {ticket.id} · {ticket.from} · {formatDate(ticket.receivedOn)}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${priorityClass[ticket.priority]}`}>{ticket.priority}</span>
                  <StatusBadge status={reply ? "Resolved" : "Pending"} />
                </span>
              </button>
              {expanded ? (
                <div className="space-y-3 px-5 pb-5 sm:px-6">
                  <p className="rounded-xl bg-surface-container p-4 text-xs leading-relaxed text-on-surface-variant">{ticket.message}</p>
                  {reply ? (
                    <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 p-4 text-xs leading-relaxed text-on-surface">
                      <span className="font-bold text-emerald-600">Your reply: </span>
                      {reply}
                    </p>
                  ) : (
                    <>
                      <label htmlFor={`reply-${ticket.id}`} className="sr-only">Reply to {ticket.from}</label>
                      <textarea
                        id={`reply-${ticket.id}`}
                        rows={3}
                        value={drafts[ticket.id] ?? ""}
                        onChange={(event) => setDrafts((items) => ({ ...items, [ticket.id]: event.target.value }))}
                        placeholder={`Reply to ${ticket.from}...`}
                        className={`${inputClass} resize-none`}
                      />
                      <div className="flex justify-end">
                        <ActionButton disabled={!drafts[ticket.id]?.trim()} onClick={() => send(ticket.id)}>Send reply</ActionButton>
                      </div>
                    </>
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}
