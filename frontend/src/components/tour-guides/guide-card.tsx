import Link from 'next/link';
import type { TourGuide } from '@/data/tour-guides';
import { guideHref, typeInfo } from '@/lib/tour-guides';
import type { GuideFilters } from '@/lib/tour-guides';
import { PinIcon, StarIcon } from '@/components/guides/icons';

const initials = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2);

export function GuidePhoto({
  name,
  src,
  className = '',
  textClass = 'text-5xl',
}: {
  name: string;
  src?: string;
  className?: string;
  textClass?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={name} className={`h-full w-full object-cover ${className}`} />;
  }
  return (
    <div
      role="img"
      aria-label={name}
      className={`flex h-full w-full items-center justify-center bg-gradient-to-br from-[#003d9b] to-[#4f7be0] font-black text-white/90 ${textClass} ${className}`}
    >
      {initials(name)}
    </div>
  );
}

export default function GuideCard({
  guide,
  filters,
}: {
  guide: TourGuide;
  filters: Pick<GuideFilters, 'start' | 'end' | 'guests'>;
}) {
  const type = typeInfo(guide.type);
  const chips = [...guide.languages.slice(0, 2), ...guide.tags.slice(0, 2)];
  const href = guideHref(guide.id, filters);

  return (
    <article className="group overflow-hidden rounded-xl border border-[#c3c6d6] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={href} className="block" aria-label={`View ${guide.name}'s profile`}>
        <div className="relative h-64 overflow-hidden">
          <GuidePhoto
            name={guide.name}
            src={guide.cardPhoto}
            className="transition-transform duration-500 group-hover:scale-110"
          />
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${type.badge}`}
          >
            {type.label}
          </span>
        </div>
      </Link>

      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="mb-1 text-2xl font-bold text-[#041b3c]">{guide.name}</h3>
            <p className="flex items-center gap-1.5 text-sm text-[#003d9b]">
              <PinIcon width={18} height={18} />
              {guide.location}
            </p>
          </div>
          <span className="flex shrink-0 items-center rounded bg-[#e0e8ff] px-2 py-1 text-sm font-semibold text-[#041b3c]">
            <StarIcon width={16} height={16} className="text-yellow-600" />
            <span className="ml-1">{guide.rating.toFixed(1)}</span>
          </span>
        </div>

        <ul className="mb-4 flex flex-wrap gap-2">
          {chips.map((chip) => (
            <li key={chip} className="rounded bg-[#e8edff] px-2 py-1 text-xs font-semibold text-[#434654]">
              {chip}
            </li>
          ))}
        </ul>

        <p className="mb-5 text-sm text-[#434654]">
          From <span className="text-lg font-bold text-[#003d9b]">${guide.pricePerDay}</span> / day
        </p>

        <Link
          href={href}
          className="block w-full rounded-lg border border-[#003d9b] py-3 text-center font-bold text-[#003d9b] transition-colors hover:bg-[#003d9b]/5"
        >
          View Profile
        </Link>
      </div>
    </article>
  );
}
