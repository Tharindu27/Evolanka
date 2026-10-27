"use client";

import Link from "next/link";

interface BottomWidgetsProps {
  hotelId: string;
}

export default function BottomWidgets({ hotelId }: BottomWidgetsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* ── Widget 1: Recent Guest Feedback ── */}
      <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-6 shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-black text-on-surface">Latest Guest Review</h4>
            <div className="flex items-center gap-0.5 text-[#c9a227] text-xs font-bold">
              ★ 5.0
            </div>
          </div>

          <blockquote className="text-xs text-on-surface-variant italic mb-4 leading-relaxed">
            &ldquo;The private infinity pool overlooking the Bentota lagoon was magical. Staff went
            above and beyond to arrange our private dinner under the stars!&rdquo;
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#001a43] text-white flex items-center justify-center text-xs font-black shadow-sm">
              CW
            </div>
            <div>
              <div className="text-xs font-bold text-on-surface">Charlotte &amp; William</div>
              <div className="text-[11px] text-on-surface-variant">UK · Stayed in Ocean Villa 102</div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
          <span className="text-[11px] text-on-surface-variant">Yesterday at 8:45 PM</span>
          <Link
            href={`/dashboard/hotel-owner/${hotelId}/reviews`}
            className="text-[#001a43] dark:text-primary hover:underline font-bold inline-flex items-center gap-1"
          >
            Reply now
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* ── Widget 2: Upcoming Payout ── */}
      <div className="rounded-[24px] border border-outline-variant bg-surface-container-low p-6 shadow-[0_10px_30px_rgba(0,26,67,0.04)] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-base font-black text-on-surface">Next Settlement Payout</h4>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
              account_balance
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mb-3">Scheduled automatic disbursement</p>

          <div className="rounded-xl bg-surface-container p-3.5 border border-outline-variant mb-3">
            <div className="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold mb-1">
              Estimated Net Payout
            </div>
            <div className="text-2xl font-black text-on-surface">LKR 1,120,500</div>
            <div className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">check_circle</span>
              Approved for processing
            </div>
          </div>

          <div className="text-xs space-y-1 text-on-surface-variant">
            <div className="flex justify-between">
              <span>Disbursement Date:</span>
              <span className="font-semibold text-on-surface">Friday, Oct 31</span>
            </div>
            <div className="flex justify-between">
              <span>Recipient:</span>
              <span className="font-semibold text-on-surface">Commercial Bank (...4409)</span>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-outline-variant flex items-center justify-between text-xs">
          <span className="text-on-surface-variant">Platform fee: 8.5%</span>
          <button className="text-[#001a43] dark:text-primary hover:underline font-bold inline-flex items-center gap-1 cursor-pointer">
            <span className="material-symbols-outlined text-[14px]">download</span>
            Statement
          </button>
        </div>
      </div>
    </div>
  );
}
