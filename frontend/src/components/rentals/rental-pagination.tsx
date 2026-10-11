import Link from 'next/link';
import { rentalsHref, type RentalFilters } from '@/lib/rentals';
import { ChevronIcon } from './rental-icons';

type Props = {
  filters: Omit<RentalFilters, 'page'>;
  page: number;
  pageCount: number;
};

const circle = 'flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs';

export default function RentalPagination({ filters, page, pageCount }: Props) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  const arrow = 'rounded-full border border-[#c3c6d6] bg-white p-2 text-[#434654] transition-colors hover:bg-[#e0e8ff]';
  const disabledArrow = `${arrow} pointer-events-none opacity-40`;

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-4">
      {page > 1 ? (
        <Link href={rentalsHref(filters, page - 1)} aria-label="Previous page" className={arrow}>
          <ChevronIcon direction="left" width={20} height={20} />
        </Link>
      ) : (
        <span aria-hidden="true" className={disabledArrow}>
          <ChevronIcon direction="left" width={20} height={20} />
        </span>
      )}

      <ul className="flex gap-2">
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={rentalsHref(filters, n)}
              aria-current={n === page ? 'page' : undefined}
              className={`${circle} ${
                n === page
                  ? 'bg-[#003d9b] text-white'
                  : 'border border-[#c3c6d6] bg-white text-[#434654] transition-colors hover:bg-[#e0e8ff]'
              }`}
            >
              {n}
            </Link>
          </li>
        ))}
      </ul>

      {page < pageCount ? (
        <Link href={rentalsHref(filters, page + 1)} aria-label="Next page" className={arrow}>
          <ChevronIcon direction="right" width={20} height={20} />
        </Link>
      ) : (
        <span aria-hidden="true" className={disabledArrow}>
          <ChevronIcon direction="right" width={20} height={20} />
        </span>
      )}
    </nav>
  );
}
