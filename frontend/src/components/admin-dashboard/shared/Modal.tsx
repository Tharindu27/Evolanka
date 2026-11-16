"use client";

import { useEffect } from "react";

interface ModalProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function Modal({ title, subtitle, onClose, footer, children }: ModalProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#001a43]/50 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[88vh] w-full max-w-xl flex-col overflow-hidden rounded-[24px] border border-outline-variant bg-surface-container-lowest shadow-[0_30px_80px_rgba(0,26,67,0.3)]"
      >
        <header className="flex items-start justify-between gap-4 border-b border-outline-variant px-6 py-4">
          <div>
            <h2 className="text-lg font-black text-on-surface">{title}</h2>
            {subtitle ? <p className="mt-0.5 text-xs text-on-surface-variant">{subtitle}</p> : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-on-surface-variant transition hover:bg-surface-container-high hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">close</span>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
        {footer ? (
          <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-outline-variant bg-surface-container px-6 py-3.5">
            {footer}
          </footer>
        ) : null}
      </div>
    </div>
  );
}
