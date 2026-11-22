import type { WishlistItem } from '@/data/customer-wishlist-data';

type WishlistCardProps = {
  item: WishlistItem;
  onRemove: (id: string) => void;
};

const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-3.5 w-3.5 stroke-current',
  fill: 'none',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function MetaIcon({ type }: { type: WishlistItem['metaIcon'] }) {
  if (type === 'verified') {
    return (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="m8.5 12.2 2.4 2.4 4.6-4.9" />
      </svg>
    );
  }

  if (type === 'boat') {
    return (
      <svg {...iconProps}>
        <path d="M3 17l2 3h14l2-3H3Z" />
        <path d="M12 3v10M12 5l6 8h-6M10 8l-4 5h4" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M12 21s7-5.6 7-11a7 7 0 0 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export default function WishlistCard({ item, onRemove }: WishlistCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.25rem] border border-[#e3eaf6] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      <div className="relative h-[150px] w-full overflow-hidden bg-[#edf3ff]">
        <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#071a34]/40 to-transparent" />

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.title} from wishlist`}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-[0_6px_16px_rgba(15,23,42,0.18)] transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-[#c4161c] stroke-[#c4161c]" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 20.5s-7.5-4.4-9-8.2C1.7 9.4 3.9 5 8.5 5c2 0 3.1 1.1 3.5 2.1.4-1 1.5-2.1 3.5-2.1 4.6 0 6.8 4.4 5.5 7.3-1.5 3.8-9 8.2-9 8.2Z" />
          </svg>
        </button>

        <span
          className={[
            'absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[0.68rem] font-semibold text-white backdrop-blur-sm',
            item.tagTone === 'green' ? 'bg-[#0f9d58]/90' : 'bg-[#1f2d4a]/85',
          ].join(' ')}
        >
          {item.tag}
        </span>
      </div>

      <div className="px-4 pb-4 pt-3">
        <div className="flex items-center justify-between gap-2 text-[0.72rem]">
          <span className="flex items-center gap-1 font-bold text-[#8a5a00]">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#8a5a00]" aria-hidden="true">
              <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
            </svg>
            {item.rating.toFixed(1)}
            <span className="font-medium text-[#6d7280]">({item.reviewCount})</span>
          </span>
          <span className="flex items-center gap-1 font-medium text-[#6d7280]">
            <MetaIcon type={item.metaIcon} />
            {item.meta}
          </span>
        </div>

        <h3 className="mt-2 truncate text-[1.15rem] font-black tracking-[-0.03em] text-[#001a43]">{item.title}</h3>
        <p className="mt-1 text-[0.72rem] font-semibold leading-snug text-[#3d4455]">{item.subtitle}</p>
      </div>
    </article>
  );
}
