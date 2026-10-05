const trustItems = [
  '25 Districts',
  'Local Premium Support',
  'Secure Island Bookings',
  '100k+ Local Community',
];

export default function TrustRibbon() {
  return (
    <section className="relative z-20 border-y border-slate-200/80 bg-[#f1f3ff] py-6">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-8 md:px-12">
        {trustItems.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#003d9b]" />
            <span className="text-sm font-bold text-[#041b3c]">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
