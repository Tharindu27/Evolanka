"use client";

import { useState } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import StatusBadge from "../shared/StatusBadge";
import TableShell from "../shared/TableShell";
import { formatLkr } from "../shared/utils";
import { payouts as initialPayouts } from "@/data/admin-data/payments";

const COMMISSION_RATE = 0.1;

export default function ProviderPayouts() {
  const [payouts, setPayouts] = useState(initialPayouts);

  const markPaid = (id: string) =>
    setPayouts((items) => items.map((item) => (item.id === id ? { ...item, status: "Paid" } : item)));

  return (
    <Panel title="Provider Payouts" subtitle="Earnings owed to providers after commission">
      <TableShell headers={["Provider", "Period", "Gross", "Commission", "Net payout", "Method", "Status", "Action"]}>
        {payouts.map((payout) => (
          <tr key={payout.id}>
            <td className="font-bold text-on-surface">{payout.provider}</td>
            <td>{payout.period}</td>
            <td>{formatLkr(payout.gross)}</td>
            <td>{formatLkr(payout.gross * COMMISSION_RATE)}</td>
            <td className="font-bold text-on-surface">{formatLkr(payout.gross * (1 - COMMISSION_RATE))}</td>
            <td>{payout.method}</td>
            <td><StatusBadge status={payout.status} /></td>
            <td>
              {payout.status === "Pending" ? (
                <ActionButton onClick={() => markPaid(payout.id)}>Mark as paid</ActionButton>
              ) : (
                <span>Recorded</span>
              )}
            </td>
          </tr>
        ))}
      </TableShell>
    </Panel>
  );
}
