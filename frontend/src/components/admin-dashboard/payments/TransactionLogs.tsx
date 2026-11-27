"use client";

import { useState } from "react";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import Tabs from "../shared/Tabs";
import { formatDate, formatLkr } from "../shared/utils";
import { transactions } from "@/data/admin-data/payments";
import type { TransactionStatus } from "@/data/admin-data/types";

type Tab = "all" | TransactionStatus;

export default function TransactionLogs() {
  const [tab, setTab] = useState<Tab>("all");
  const rows = transactions.filter((item) => tab === "all" || item.status === tab);
  const count = (status: TransactionStatus) => transactions.filter((item) => item.status === status).length;

  return (
    <Panel title="Transaction Logs" subtitle="Payment gateway records for every booking">
      <div className="border-b border-outline-variant px-5 py-3 sm:px-6">
        <Tabs<Tab>
          value={tab}
          onChange={setTab}
          tabs={[
            { id: "all", label: "All", count: transactions.length },
            { id: "Paid", label: "Paid", count: count("Paid") },
            { id: "Pending", label: "Pending", count: count("Pending") },
            { id: "Failed", label: "Failed", count: count("Failed") },
            { id: "Refunded", label: "Refunded", count: count("Refunded") },
          ]}
        />
      </div>
      <TableShell headers={["Transaction", "Booking", "Method", "Gateway", "Amount", "Date", "Status"]} isEmpty={rows.length === 0} empty="No transactions.">
        {rows.map((item) => (
          <tr key={item.id}>
            <td className="font-bold text-on-surface">{item.id}</td>
            <td>{item.bookingId}</td>
            <td>{item.method}</td>
            <td>{item.gateway}</td>
            <td className="font-bold text-on-surface">{formatLkr(item.amount)}</td>
            <td>{formatDate(item.date)}</td>
            <td><StatusBadge status={item.status} /></td>
          </tr>
        ))}
      </TableShell>
    </Panel>
  );
}
