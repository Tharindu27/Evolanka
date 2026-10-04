const destinations = [
  {
    title: "Sigiriya Lion Rock",
    region: "Matale",
    description:
      "Ancient rock fortress and palace ruins surrounded by gardens and reservoirs.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLuqZOAetABPvxwNHq6cUC6QjYI8AS3jK1csVcaJ2bA3a3OATaejGwW7J4XKzpaPH7Z34lRlSW8ee3xpCugMdvoDG9y8xNiznGDHxJjoHJXiL6hl9YzfrKDSop3ivixV6bWJieBFpccC8Qfkvc7UZQWSiw1gJKPvVbog4KKrNS0klXHPtXjTI22joctjOjZe56791Q6G-dkicWcNjeyP__nrWbmdTJV0jUaJso1CnjWzOWcUBx9tWXIjQY1M",
    alt: "Sigiriya Lion Rock",
  },
  {
    title: "Mirissa Beach",
    region: "Matara",
    description:
      "Pristine beaches, whale watching, and vibrant sunset views on the southern coast.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLu2BloVpt8FR1WJysrCDBGei_dD0ha8CM84_5D-0bXoZFhgDeYS1U1og5lkabZAY2Wft4FZYvVKnXdBVRqFJqyc3KgvbtnSUiUeTDTEFkN8k6nlhcEZlZuRJizbzjNeeJ7GZ6XSFCj4BGWLJ0txUGiPlBzN2vHyOR9SDrzhRsw4mPwCHstqcXSLve-933K3ZaOdVzZS9rorpPr-A53R9YlqYmdkdx_qqBzqt-D2fLGxpJKaZ96BK5Pon3o",
    alt: "Mirissa Beach",
  },
  {
    title: "Galle Fort",
    region: "Galle",
    description:
      "UNESCO World Heritage site featuring colonial architecture and ocean views.",
    image:
      "https://lh3.googleusercontent.com/aida/AP1WRLsQbo8l515AoolckOhSBnNV_SYxG-fbt4ho63A3HSQQ354wwU74ur5noRKXlpDc01bRaM8GomFaOcnpGVoRzEHHbcfeqGBxRbqpw9aBbvNdWgBh8c8_5_Z7RrKiUjLyEdg324XCbe3fygEMkalCVed0OYNWtC4E5Man0BrbCyVpYU6Kpv1ZDouI5kUvVAfrfmANk1GNPk-ZN0OtvXdKpmz9g0Xa4jw9XRfsMYdNKYCjbWYdSSBIAA8KJKHy",
    alt: "Galle Fort",
  },
];

export default function DiscoverySection() {
  return (
    <section className="py-20 max-w-[1440px] mx-auto px-8 md:px-12 bg-background">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold text-on-surface mb-2">
            Discover Your Next Adventure
          </h2>
          <p className="text-lg text-on-surface-variant max-w-xl">
            Join the feed where travelers share live updates from across Sri
            Lanka.
          </p>
        </div>
        <button className="mt-6 md:mt-0 flex items-center gap-2 text-primary font-bold group">
          View More{" "}
          <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
            arrow_forward
          </span>
        </button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-8 scroll-smooth px-4 md:px-0 -mx-4 md:mx-0">
        {destinations.map((dest) => (
          <div
            key={dest.title}
            className="min-w-[320px] md:min-w-[400px] bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/40 overflow-hidden hover:shadow-md transition-all group"
          >
            <div className="aspect-video overflow-hidden">
              <img
                alt={dest.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                src={dest.image}
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-on-surface">
                  {dest.title}
                </h3>
                <span className="text-primary font-bold text-sm">
                  {dest.region}
                </span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">
                {dest.description}
              </p>
              <div className="flex items-center gap-2 text-primary font-bold text-sm cursor-pointer">
                Explore Guide{" "}
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
