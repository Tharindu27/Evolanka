const services = [
  {
    icon: "location_on",
    title: "Locations",
    description: "Sri Lankan destination guides and insights.",
  },
  {
    icon: "hotel",
    title: "Hotels",
    description: "Best Sri Lankan stays for every style.",
  },
  {
    icon: "local_see",
    title: "Tour Guides",
    description: "Expert locals for authentic trips.",
  },
  {
    icon: "car_rental",
    title: "Rentals",
    description: "Quality vehicles for your freedom.",
  },
  {
    icon: "local_taxi",
    title: "Taxis",
    description: "Instant on-demand island transport.",
  },
];

export default function ServiceCategories() {
  return (
    <section className="py-24 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 text-center mb-16">
        <h2 className="text-3xl font-bold text-on-surface mb-3">
          Everything You Need
        </h2>
        <p className="text-lg text-on-surface-variant max-w-xl mx-auto">
          One centralized dashboard on EVOLANKA to manage your entire Sri Lankan
          itinerary or your service empire.
        </p>
      </div>
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-surface-container-lowest p-8 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-outline-variant/30 group"
          >
            <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-3xl">
                {service.icon}
              </span>
            </div>
            <h3 className="text-xl font-bold text-on-surface mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-on-surface-variant">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
