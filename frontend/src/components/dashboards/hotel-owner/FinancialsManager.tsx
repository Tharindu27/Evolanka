"use client";

import { useState } from "react";

interface PayoutRecord {
  id: string;
  date: string;
  status: "success" | "settled" | "processing";
  method: string;
  accountMask: string;
  grossAmount: string;
  netPayout: string;
}

const mockPayouts: PayoutRecord[] = [
  {
    id: "#PO-9821",
    date: "Oct 18, 2026 · 14:30",
    status: "success",
    method: "ComBank",
    accountMask: "•••• 8829",
    grossAmount: "LKR 2,050,000",
    netPayout: "LKR 1,840,000",
  },
  {
    id: "#PO-9804",
    date: "Oct 11, 2026 · 09:15",
    status: "success",
    method: "ComBank",
    accountMask: "•••• 8829",
    grossAmount: "LKR 1,025,000",
    netPayout: "LKR 920,400",
  },
  {
    id: "#PO-9762",
    date: "Oct 04, 2026 · 11:42",
    status: "success",
    method: "Wise USD",
    accountMask: "Wise Transfer USD",
    grossAmount: "LKR 2,750,000",
    netPayout: "LKR 2,450,000",
  },
  {
    id: "#PO-9715",
    date: "Sep 27, 2026 · 16:20",
    status: "success",
    method: "ComBank",
    accountMask: "•••• 8829",
    grossAmount: "LKR 3,400,000",
    netPayout: "LKR 3,060,000",
  },
  {
    id: "#PO-9680",
    date: "Sep 20, 2026 · 18:05",
    status: "settled",
    method: "ComBank",
    accountMask: "•••• 8829",
    grossAmount: "LKR 1,600,000",
    netPayout: "LKR 1,424,000",
  },
];

export default function FinancialsManager() {
  const [chartMode, setChartMode] = useState<"monthly" | "weekly">("monthly");
  const [methodFilter, setMethodFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [withdrawing, setWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const filteredPayouts = mockPayouts.filter((p) => {
    const matchMethod =
      methodFilter === "all" ||
      (methodFilter === "combank" && p.method.includes("ComBank")) ||
      (methodFilter === "wise" && p.method.includes("Wise"));
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchMethod && matchStatus;
  });

  const handleWithdrawNow = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setWithdrawSuccess(true);
      setTimeout(() => setWithdrawSuccess(false), 3500);
    }, 900);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-outline-variant">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Financials &amp; Settlements
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1">
            Real-time cashflow, verified bank account disbursements, and transparent commission audit
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleWithdrawNow}
            disabled={withdrawing}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-95 cursor-pointer ${
              withdrawSuccess
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                : "bg-[#001a43] hover:bg-[#002766] text-white dark:bg-primary dark:text-on-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {withdrawSuccess ? "check" : "account_balance_wallet"}
            </span>
            <span>
              {withdrawing
                ? "Disbursing..."
                : withdrawSuccess
                ? "Disbursement Scheduled ✓"
                : "Request Instant Payout"}
            </span>
          </button>
        </div>
      </div>

      {/* ── 3 Big KPI Metric Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Total Gross Revenue */}
        <div className="p-6 rounded-[22px] bg-surface-container-low border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
              Total Gross Revenue
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#001a43]/10 dark:bg-primary/10 flex items-center justify-center text-[#001a43] dark:text-primary">
              <span className="material-symbols-outlined text-[22px]">monetization_on</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm text-[#001a43] dark:text-primary font-bold">LKR</span>
            <span className="text-3xl sm:text-4xl font-black text-on-surface">42.5M</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              +14.8%
            </span>
            <span className="text-on-surface-variant font-medium">vs last quarter</span>
          </div>
        </div>

        {/* KPI 2: Pending Settlement Balance */}
        <div className="p-6 rounded-[22px] bg-surface-container-low border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
              Pending Settlement Balance
            </span>
            <div className="w-10 h-10 rounded-xl bg-[#c9a227]/15 flex items-center justify-center text-[#b08d1f] dark:text-[#ffd977]">
              <span className="material-symbols-outlined text-[22px]">hourglass_top</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm text-[#b08d1f] dark:text-[#ffd977] font-bold">LKR</span>
            <span className="text-3xl sm:text-4xl font-black text-on-surface">3.8M</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c9a227]/15 text-[#b08d1f] dark:text-[#ffd977] font-bold border border-[#c9a227]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a227] animate-ping" />
              Disbursing in 3 days (Oct 31)
            </span>
          </div>
        </div>

        {/* KPI 3: Platform Fees & Commission */}
        <div className="p-6 rounded-[22px] bg-surface-container-low border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
              Platform Fees &amp; Commission
            </span>
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant border border-outline-variant">
              <span className="material-symbols-outlined text-[22px]">receipt_long</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-sm text-on-surface-variant font-bold">LKR</span>
            <span className="text-3xl sm:text-4xl font-black text-on-surface">4.7M</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface font-bold border border-outline-variant">
              Rate: 11.05%
            </span>
            <span className="text-on-surface-variant font-medium">Standard Tier Agreement</span>
          </div>
        </div>
      </div>

      {/* ── Main Content Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Revenue Breakdown Chart & History */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chart Header Card */}
          <div className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-on-surface">Revenue Performance</h3>
                <p className="text-xs text-on-surface-variant font-medium">Gross booking value vs net received payouts</p>
              </div>

              <div className="inline-flex p-1 rounded-full bg-surface-container border border-outline-variant">
                <button
                  onClick={() => setChartMode("monthly")}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    chartMode === "monthly"
                      ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Monthly View
                </button>
                <button
                  onClick={() => setChartMode("weekly")}
                  className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    chartMode === "weekly"
                      ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Weekly View
                </button>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-64 w-full flex items-end justify-between gap-3 pt-8 pb-4 px-2 border-b border-outline-variant">
              {[
                { label: "May", gross: 60, net: 52 },
                { label: "Jun", gross: 75, net: 65 },
                { label: "Jul", gross: 88, net: 76 },
                { label: "Aug", gross: 95, net: 84 },
                { label: "Sep", gross: 70, net: 61 },
                { label: "Oct (MTD)", gross: 90, net: 80, current: true },
              ].map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-full">
                    {/* Gross Bar */}
                    <div
                      className="w-1/2 max-w-[28px] rounded-t-lg bg-[#001a43]/20 dark:bg-primary/20 transition-all group-hover:bg-[#001a43]/30"
                      style={{ height: `${bar.gross}%` }}
                      title={`Gross: ${bar.gross}%`}
                    />
                    {/* Net Bar */}
                    <div
                      className={`w-1/2 max-w-[28px] rounded-t-lg transition-all ${
                        bar.current
                          ? "bg-[#c9a227] shadow-[0_4px_12px_rgba(201,162,39,0.35)]"
                          : "bg-[#001a43] dark:bg-primary"
                      }`}
                      style={{ height: `${bar.net}%` }}
                      title={`Net: ${bar.net}%`}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      bar.current ? "text-[#c9a227] font-black" : "text-on-surface-variant"
                    }`}
                  >
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#001a43]/30 dark:bg-primary/30" />
                  Gross Sales
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#001a43] dark:bg-primary" />
                  Net Payout
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#c9a227]" />
                  Current Month
                </span>
              </div>
              <span className="font-bold text-[#001a43] dark:text-primary">Audited Real-time</span>
            </div>
          </div>

          {/* Historical Payouts Table */}
          <div className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-on-surface">Payout Ledger</h3>
                <p className="text-xs text-on-surface-variant font-medium">Automatic bi-weekly and on-demand disbursements</p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={methodFilter}
                  onChange={(e) => setMethodFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant text-xs text-on-surface font-semibold"
                >
                  <option value="all">All Accounts</option>
                  <option value="combank">Commercial Bank</option>
                  <option value="wise">Wise USD</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-full bg-surface-container border border-outline-variant text-xs text-on-surface font-semibold"
                >
                  <option value="all">All Status</option>
                  <option value="success">Success</option>
                  <option value="settled">Settled</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    <th className="py-2.5 px-3">Reference</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Destination</th>
                    <th className="py-2.5 px-3">Gross</th>
                    <th className="py-2.5 px-3">Net Payout</th>
                    <th className="py-2.5 px-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayouts.map((po) => (
                    <tr
                      key={po.id}
                      className="bg-surface-container/50 hover:bg-surface-container transition-colors rounded-xl"
                    >
                      <td className="py-3 px-3 font-mono text-xs font-bold text-[#001a43] dark:text-primary rounded-l-xl">
                        {po.id}
                      </td>
                      <td className="py-3 px-3 text-xs text-on-surface font-medium">{po.date}</td>
                      <td className="py-3 px-3 text-xs font-semibold text-on-surface">
                        {po.method}{" "}
                        <span className="text-[11px] text-on-surface-variant font-normal">
                          ({po.accountMask})
                        </span>
                      </td>
                      <td className="py-3 px-3 text-xs text-on-surface-variant font-medium">
                        {po.grossAmount}
                      </td>
                      <td className="py-3 px-3 text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {po.netPayout}
                      </td>
                      <td className="py-3 px-3 rounded-r-xl text-right">
                        <button
                          className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer"
                          title="Download Tax Invoice"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Settlement Destination & Account Cards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Bank Card */}
          <div className="rounded-[24px] p-6 bg-gradient-to-br from-[#001534] via-[#001a43] to-[#022d6f] text-white shadow-[0_20px_50px_rgba(0,26,67,0.2)] space-y-5 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-[#c9a227]/20 blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs uppercase tracking-wider text-[#ffd977] font-black">
                Primary Payout Account
              </span>
              <span className="material-symbols-outlined text-white text-[24px]">contactless</span>
            </div>

            <div className="space-y-1 relative z-10 pt-4">
              <div className="text-xs text-white/70">Commercial Bank of Ceylon</div>
              <div className="text-xl font-bold tracking-widest font-mono">•••• •••• •••• 8829</div>
            </div>

            <div className="flex items-end justify-between relative z-10 pt-2 border-t border-white/15 text-xs">
              <div>
                <span className="text-[10px] text-white/60 block">Account Holder</span>
                <span className="font-bold">Grand Azure Hospitality Ltd</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[11px]">
                Verified Active
              </span>
            </div>
          </div>

          {/* Quick Bank Switcher */}
          <div className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-4">
            <h4 className="text-sm font-black text-on-surface">Registered Payout Methods</h4>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#001a43] text-white flex items-center justify-center font-bold text-xs">
                    CB
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Commercial Bank (LKR)</div>
                    <div className="text-[11px] text-on-surface-variant font-mono">••• 8829 · Default</div>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container border border-outline-variant opacity-80 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    WS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface">Wise Business (USD)</div>
                    <div className="text-[11px] text-on-surface-variant font-mono">••• 3041 · Secondary</div>
                  </div>
                </div>
                <button className="text-xs text-[#001a43] dark:text-primary font-bold hover:underline cursor-pointer">
                  Set Primary
                </button>
              </div>
            </div>

            <button className="w-full mt-2 py-2.5 px-3 rounded-xl border border-dashed border-outline-variant hover:border-[#001a43] dark:hover:border-primary text-xs font-bold text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">add</span>
              <span>Add Bank Account</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
