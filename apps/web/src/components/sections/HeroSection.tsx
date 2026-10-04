export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4voi8795AC-RnQp2N0I522fa-Ckz63dfQxM3UmtliQW8zeMFg3nspdDfotmMNXK6eLsVGWms3jOjZ7wCkpkW6TGi8z_k9H5n0OR6JZLWeIjC9VYdUJnZr9xiLfdsBT7cP9G3w-CmLeluqVKPbWf4SFVG6A0jkYOXOvfhadf3QsrzS_3LEUSVir4UYhOxIzweBmq7kkoqrO_bY4MUsvrzEtfRbnQmLsQD6cPBZViAkmKxclC5GdRn14Q")',
          }}
        />
      </div>
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-white text-6xl md:text-7xl mb-6 drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] font-black">
          Sri Lanka is Yours to Explore
        </h1>
        <p className="text-white text-xl md:text-2xl mb-10 max-w-2xl mx-auto drop-shadow-md font-bold">
          Experience the intersection of soulful adventure and premium service in
          Sri Lanka. Connect with local guides, discover hidden gems, and build
          your legacy in island tourism.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto px-16 py-5 bg-secondary-container text-on-secondary-container font-bold rounded-xl text-xl shadow-xl hover:scale-105 transition-transform text-2xl">
            Plan Your Trip
          </button>
          <button className="w-full sm:w-auto px-16 py-5 bg-primary text-on-primary font-bold rounded-xl text-xl shadow-xl hover:scale-105 transition-transform text-2xl">
            Explore Sri Lanka
          </button>
          <button className="w-full sm:w-auto px-16 py-5 bg-white/20 backdrop-blur-md border border-white/40 text-white font-bold rounded-xl text-xl hover:bg-white/30 transition-colors text-2xl">
            Grow Your Business
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <span className="material-symbols-outlined text-white text-4xl drop-shadow-md">
          keyboard_double_arrow_down
        </span>
      </div>
    </section>
  );
}
