import Link from 'next/link';

const cards = [
  {
    title: 'Sigiriya Lion Rock',
    district: 'Matale',
    description: 'Ancient rock fortress and palace ruins surrounded by gardens and reservoirs.',
    image: '/images/landing-page/sigiriya.png',
  },
  {
    title: 'Mirissa Beach',
    district: 'Matara',
    description: 'Pristine beaches, whale watching, and vibrant sunset views on the southern coast.',
    image: '/images/landing-page/mirissabeach.png',
  },
  {
    title: 'Galle Fort',
    district: 'Galle',
    description: 'UNESCO World Heritage site featuring colonial architecture and ocean views.',
    image: '/images/landing-page/gallefort.png',
  },
];

export default function DiscoveryPreview() {
  return (
    <section className="mx-auto max-w-[1440px] bg-[#f9f9ff] px-8 py-20 md:px-12">
      <div className="mb-12 flex flex-col items-end justify-between gap-4 md:flex-row">
        <div>
          <h2 className="mb-2 text-3xl font-bold text-[#041b3c]">Discover Your Next Adventure</h2>
          <p className="max-w-xl text-lg text-slate-600">
            Join the feed where travelers share live updates from across Sri Lanka.
          </p>
        </div>
        <Link href="/locations" className="font-bold text-[#003d9b]">
          View More
        </Link>
      </div>

      <div className="-mx-4 flex gap-6 overflow-x-auto px-4 pb-8 md:mx-0 md:px-0">
        {cards.map((card) => (
          <article
            key={card.title}
            className="group min-w-[320px] overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all hover:shadow-md md:min-w-[400px]"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={card.image}
                alt={card.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-start justify-between">
                <h3 className="text-xl font-bold text-[#041b3c]">{card.title}</h3>
                <span className="text-sm font-bold text-[#003d9b]">{card.district}</span>
              </div>
              <p className="mb-4 text-sm text-slate-600">{card.description}</p>
              <Link href="/locations" className="text-sm font-bold text-[#003d9b]">
                Explore Guide
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
