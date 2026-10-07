export default function ProviderHeader() {
  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex items-center justify-between px-6">
      <div className="flex items-center gap-sm flex-1 max-w-md">
        <span className="material-symbols-outlined text-outline">search</span>
        <input
          type="search"
          placeholder="Search bookings, guests, or listings..."
          className="w-full bg-transparent border-0 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
        />
      </div>

      <div className="flex items-center gap-md">
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-xs rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
        </button>

        <div className="h-6 w-px bg-outline-variant" />

        <div className="flex items-center gap-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XUTFdim7AOXeJnLSX8nV_ob9z_6NOq8iymbT_tEJaQVsvc7motsSeCcUYPK9uDQamCKAzX0y2dgCryvdxDKTFq6XTuMHiZXAkSmEBzpSSXQFhEK5m6iEEosYj6gXa6h_Vkhe8s7uSlR_EtgYDAb_dI_p8MDBIsD6zb3rOVapYkDj9I4X8DI3WY7ICrUgGA6vwUP8Qt0XyY8AUySIxikv9-9szzjtOLTEUTuEOSNbRwnzd9OuRql3n9uK2YbD6jcW4wRoLyXWc"
          />
          <div className="hidden md:flex flex-col text-left">
            <span className="font-label-md text-label-md text-on-surface font-medium leading-tight">
              Ceylon Horizons
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
              Provider Account
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}