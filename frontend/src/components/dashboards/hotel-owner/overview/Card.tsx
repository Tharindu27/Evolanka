import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-outline-variant bg-surface shadow-[0_2px_8px_rgba(0,82,204,0.08)] ${className}`}
    >
      {children}
    </section>
  );
}