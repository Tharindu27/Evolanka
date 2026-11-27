"use client";

import { useState, type FormEvent } from "react";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import { inputClass } from "../shared/utils";

export default function CommissionSettings() {
  const [rate, setRate] = useState("10");
  const [savedRate, setSavedRate] = useState("10");
  const value = Number(rate);
  const valid = rate !== "" && value >= 0 && value <= 100;

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (valid) setSavedRate(rate);
  };

  return (
    <Panel title="Commission Settings" subtitle="Fee EVOLANKA keeps from every booking">
      <form onSubmit={save} className="space-y-4 p-5 sm:p-6">
        <div>
          <label htmlFor="commission-rate" className="mb-1.5 block text-xs font-bold text-on-surface-variant">
            Commission rate (%)
          </label>
          <div className="flex gap-2">
            <input
              id="commission-rate"
              type="number"
              min={0}
              max={100}
              step={0.5}
              value={rate}
              onChange={(event) => setRate(event.target.value)}
              className={inputClass}
            />
            <ActionButton type="submit" disabled={!valid || rate === savedRate}>Save</ActionButton>
          </div>
        </div>
        <p className="rounded-xl bg-surface-container p-3.5 text-xs leading-5 text-on-surface-variant">
          Current rate: <strong className="text-on-surface">{savedRate}%</strong>. A change applies to new bookings only.
        </p>
      </form>
    </Panel>
  );
}
