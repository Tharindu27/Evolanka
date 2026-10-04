export default function TopNavBar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-outline-variant/30 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex justify-between items-center px-gutter md:px-12 py-4">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-black text-primary tracking-tighter uppercase">
            EVOLANKA
          </span>
          <div className="hidden md:flex gap-8 items-center">
            <a
              className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Home
            </a>
            <a
              className="text-primary font-bold border-b-2 border-primary pb-1 text-sm hover:text-primary transition-colors"
              href="#"
            >
              Locations
            </a>
            <a
              className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Hotels
            </a>
            <a
              className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Tour Guides
            </a>
            <a
              className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Rentals
            </a>
            <a
              className="text-on-surface-variant text-sm font-medium hover:text-primary transition-colors"
              href="#"
            >
              Taxis
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold text-sm shadow-sm hover:brightness-110 transition-all">
            Post
          </button>
          <button className="px-6 py-2 border-2 border-primary text-primary font-bold text-sm rounded-full hover:bg-primary/5 transition-all">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}
