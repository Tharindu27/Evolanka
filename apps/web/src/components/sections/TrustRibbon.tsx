export default function TrustRibbon() {
  return (
    <div className="bg-surface-container-low py-6 relative z-20 border-y border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex flex-wrap justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            map
          </span>
          <span className="text-sm font-bold text-on-surface">25 Districts</span>
        </div>
        <div className="h-4 w-px bg-outline-variant hidden md:block" />
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            support_agent
          </span>
          <span className="text-sm font-bold text-on-surface">
            Local Premium Support
          </span>
        </div>
        <div className="h-4 w-px bg-outline-variant hidden md:block" />
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            verified_user
          </span>
          <span className="text-sm font-bold text-on-surface">
            Secure Island Bookings
          </span>
        </div>
        <div className="h-4 w-px bg-outline-variant hidden md:block" />
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            groups
          </span>
          <span className="text-sm font-bold text-on-surface">
            100k+ Local Community
          </span>
        </div>
      </div>
    </div>
  );
}
