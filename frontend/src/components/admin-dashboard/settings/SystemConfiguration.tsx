"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import ActionButton from "../shared/ActionButton";
import Panel from "../shared/Panel";
import { inputClass } from "../shared/utils";
import { useAdminData } from "../AdminDataProvider";
import { initialCategories } from "@/data/admin-data/locations";

export default function SystemConfiguration() {
  const { destinations } = useAdminData();
  const [categories, setCategories] = useState(initialCategories);
  const [category, setCategory] = useState("");

  const addCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = category.trim();
    if (!name || categories.some((item) => item.toLowerCase() === name.toLowerCase())) return;
    setCategories((items) => [...items, name]);
    setCategory("");
  };

  return (
    <Panel title="System Configuration" subtitle="Destinations and service categories used across EVOLANKA">
      <div className="space-y-6 p-5 sm:p-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-on-surface">Destinations ({destinations.length})</h3>
            <Link href="/dashboard/admin/locations" className="text-xs font-bold text-primary hover:underline">
              Manage locations
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2">
            {destinations.map((destination) => (
              <li key={destination.name} className="rounded-full bg-surface-container px-3 py-1.5 text-xs font-semibold text-on-surface">
                {destination.name}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-extrabold text-on-surface">Categories ({categories.length})</h3>
          <ul className="mb-3 flex flex-wrap gap-2">
            {categories.map((item) => (
              <li key={item} className="rounded-full border border-outline-variant px-3 py-1.5 text-xs font-semibold text-on-surface">
                {item}
              </li>
            ))}
          </ul>
          <form onSubmit={addCategory} className="flex gap-2">
            <label htmlFor="new-category" className="sr-only">New category</label>
            <input id="new-category" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="e.g. Wildlife Experiences" className={inputClass} />
            <ActionButton type="submit" disabled={!category.trim()}>Add</ActionButton>
          </form>
        </div>
      </div>
    </Panel>
  );
}
