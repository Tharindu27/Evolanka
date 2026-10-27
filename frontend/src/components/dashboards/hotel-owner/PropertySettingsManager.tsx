"use client";

import { useState } from "react";

export default function PropertySettingsManager() {
  const [activeTab, setActiveTab] = useState("general");
  const [policiesExpanded, setPoliciesExpanded] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form states
  const [propertyName, setPropertyName] = useState("Grand Azure Villa Colombo");
  const [propertyType, setPropertyType] = useState("Luxury Hotel & Resort");
  const [starRating, setStarRating] = useState("5-Star Luxury Stay");
  const [contactPhone, setContactPhone] = useState("+94 11 249 7272");
  const [businessEmail, setBusinessEmail] = useState("host@grandazurevilla.lk");
  const [streetAddress, setStreetAddress] = useState(
    "77 Galle Road, Kollupitiya, Colombo 03, Western Province, 00300"
  );

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }, 700);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* ── Top Configuration Header Bar ── */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-4 border-b border-outline-variant">
        <div className="space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-xs uppercase tracking-wider text-[#001a43] dark:text-primary font-bold">
              PROPERTY CONFIGURATION // OPERATIONS &amp; COMPLIANCE
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-xs font-semibold border border-outline-variant">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              SYNCED TO PMS ENGINE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-on-surface">
            Property Settings
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant font-medium max-w-2xl">
            Manage master hotel profile, operational policies, government compliance credentials, and property availability status across EVOLANKA network.
          </p>
        </div>

        <div className="flex sm:items-center gap-4 flex-col sm:flex-row self-start xl:self-end">
          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
            <span className="material-symbols-outlined text-[16px] text-[#001a43] dark:text-primary">schedule</span>
            <span>Last saved: Today at 10:42 AM • All systems live</span>
          </div>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md active:scale-[0.98] cursor-pointer ${
              savedSuccess
                ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40"
                : "bg-[#001a43] text-white hover:bg-[#002766] dark:bg-primary dark:text-on-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {savedSuccess ? "check" : "check_circle"}
            </span>
            <span>
              {isSaving ? "Saving Settings..." : savedSuccess ? "Settings Saved ✓" : "Save Changes"}
            </span>
          </button>
        </div>
      </div>

      {/* ── Main Workspace: 3 / 9 Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sub Navigation Sidebar (3 cols) */}
        <aside className="lg:col-span-3 sticky top-20 space-y-4">
          <nav className="bg-surface-container-low rounded-[24px] p-2 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-1">
            <button
              onClick={() => setActiveTab("general")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold transition-all group cursor-pointer ${
                activeTab === "general"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">apartment</span>
                <span className="text-xs">General Details</span>
              </div>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => setActiveTab("policies")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold transition-all group cursor-pointer ${
                activeTab === "policies"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">policy</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs leading-snug">Policies &amp; Rules</span>
                  <span className="text-[10px] text-on-surface-variant opacity-80">Flexible · 14:00 Check-in</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => setActiveTab("compliance")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold transition-all group cursor-pointer ${
                activeTab === "compliance"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <div className="flex flex-col text-left">
                  <span className="text-xs leading-snug">SLTDA Compliance</span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">SLTDA/HTL/2026/0491</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => setActiveTab("banking")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold transition-all group cursor-pointer ${
                activeTab === "banking"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
                <span className="text-xs">Banking &amp; Settlement</span>
              </div>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                chevron_right
              </span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-bold transition-all group cursor-pointer ${
                activeTab === "media"
                  ? "bg-[#001a43] text-white shadow-sm dark:bg-primary dark:text-on-primary"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px]">photo_library</span>
                <span className="text-xs">Media &amp; Gallery</span>
              </div>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100 transition-opacity">
                chevron_right
              </span>
            </button>
          </nav>

          {/* Quick Property Health Score Card */}
          <div className="bg-surface-container-low rounded-[24px] p-5 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
                Profile Completeness
              </span>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">96%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: "96%" }} />
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed font-medium">
              Your property listing has earned the <strong>Evolanka Premier Host</strong> badge.
            </p>
          </div>
        </aside>

        {/* Content Panel (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* General Tab */}
          {activeTab === "general" && (
            <div className="bg-surface-container-low rounded-[24px] p-6 sm:p-8 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-6">
              <div className="border-b border-outline-variant pb-4">
                <h3 className="text-lg font-black text-on-surface">Property Profile</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Public details shown to travelers on the EVOLANKA marketplace
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Property Trade Name
                  </label>
                  <input
                    type="text"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none focus:border-[#001a43] dark:focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Property Category
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none"
                  >
                    <option value="Luxury Hotel & Resort">Luxury Hotel &amp; Resort</option>
                    <option value="Boutique Villa">Boutique Villa</option>
                    <option value="Eco Safari Lodge">Eco Safari Lodge</option>
                    <option value="Heritage Tea Estate Bungalow">Heritage Tea Estate Bungalow</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Official Telephone
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Reservation Email
                  </label>
                  <input
                    type="email"
                    value={businessEmail}
                    onChange={(e) => setBusinessEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Physical Property Address
                  </label>
                  <input
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    className="w-full p-3 rounded-xl bg-surface-container border border-outline-variant text-sm text-on-surface focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === "policies" && (
            <div className="bg-surface-container-low rounded-[24px] p-6 sm:p-8 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-6">
              <div className="border-b border-outline-variant pb-4">
                <h3 className="text-lg font-black text-on-surface">Reservation &amp; Stay Policies</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Enforce standard operating rules, check-in windows, and cancellation terms
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant space-y-1">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Check-in Time
                  </span>
                  <div className="text-base font-bold text-on-surface">14:00 PM (2:00 PM)</div>
                  <p className="text-xs text-on-surface-variant">Early check-in subject to room vacancy</p>
                </div>

                <div className="p-4 rounded-xl bg-surface-container border border-outline-variant space-y-1">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Check-out Time
                  </span>
                  <div className="text-base font-bold text-on-surface">11:00 AM</div>
                  <p className="text-xs text-on-surface-variant">Late checkout allowed up to 14:00 upon request</p>
                </div>

                <div className="sm:col-span-2 p-4 rounded-xl bg-surface-container border border-outline-variant space-y-2">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Cancellation Policy
                  </span>
                  <div className="text-sm font-bold text-on-surface">
                    Flexible: Full refund up to 48 hours prior to arrival
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Cancellations made within 48 hours will incur a charge equal to the first night of the stay.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {activeTab === "compliance" && (
            <div className="bg-surface-container-low rounded-[24px] p-6 sm:p-8 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-6">
              <div className="border-b border-outline-variant pb-4">
                <h3 className="text-lg font-black text-on-surface">Government &amp; Tourism Board Credentials</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Verified license credentials issued by Sri Lanka Tourism Development Authority (SLTDA)
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[22px]">verified</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">SLTDA Registered License</div>
                      <div className="text-xs text-on-surface-variant">Registration No: SLTDA/HTL/2026/0491</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                    Active &amp; Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-surface-container border border-outline-variant">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#001a43]/10 dark:bg-primary/10 text-[#001a43] dark:text-primary flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[22px]">fire_extinguisher</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Fire Safety &amp; Municipal Clearance</div>
                      <div className="text-xs text-on-surface-variant">Colombo Municipal Council • Valid until Dec 2027</div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20">
                    Compliant
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Banking Tab */}
          {activeTab === "banking" && (
            <div className="bg-surface-container-low rounded-[24px] p-6 sm:p-8 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-6">
              <div className="border-b border-outline-variant pb-4">
                <h3 className="text-lg font-black text-on-surface">Disbursement Banking Details</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Bank accounts connected for automated payouts and remittances
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-surface-container border border-outline-variant space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-on-surface text-sm">Commercial Bank of Ceylon PLC</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
                    Primary Account
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant space-y-1">
                  <div>Account Number: •••• •••• •••• 8829</div>
                  <div>Branch: Kollupitiya Premier Branch</div>
                  <div>Currency: Sri Lankan Rupee (LKR)</div>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === "media" && (
            <div className="bg-surface-container-low rounded-[24px] p-6 sm:p-8 border border-outline-variant shadow-[0_10px_30px_rgba(0,26,67,0.04)] space-y-6">
              <div className="border-b border-outline-variant pb-4">
                <h3 className="text-lg font-black text-on-surface">Property Gallery &amp; Photos</h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  High-resolution imagery displayed to guests in search results and detail views
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=400&q=80",
                  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80",
                ].map((src, idx) => (
                  <div key={idx} className="relative h-36 rounded-2xl overflow-hidden border border-outline-variant group">
                    <img src={src} alt="Property gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
