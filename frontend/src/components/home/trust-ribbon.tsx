const trustItems = [
  '25 Districts',
  'Local Premium Support',
  'Secure Island Bookings',
  '100k+ Local Community',
];

export default function TrustRibbon() {
  return (
    <section className="relative z-20 overflow-hidden border-y border-[#dce3f1] bg-gradient-to-r from-[#f7f9ff] via-[#eef3ff] to-[#f8fbff] py-7">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#003d9b]/10 blur-3xl" />
        <div className="absolute -right-16 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#c9a227]/15 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#001a43]/20 to-transparent" />
          <p className="text-xs font-bold uppercase tracking-[0.26em] text-[#001a43]/70">Trusted Across The Island</p>
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-[#001a43]/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-[0_10px_28px_rgba(0,26,67,0.08)] backdrop-blur"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#001a43] text-[#ffd977]">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2.2]">
                  <path d="M5 12.5 9.2 17 19 7.5" />
                </svg>
              </span>
              <span className="text-sm font-bold text-[#001a43]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
