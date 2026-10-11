import type { SVGProps } from 'react';
import { CarIcon, PlugIcon } from '@/components/guides/icons';
import type { FleetKind } from '@/data/rentals';

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export const BusIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="16" height="13" rx="2" />
    <path d="M4 11h16M8 17v2M16 17v2" />
    <circle cx="8" cy="14" r=".6" />
    <circle cx="16" cy="14" r=".6" />
  </svg>
);

export const ScooterIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="6" cy="17" r="3" />
    <circle cx="18" cy="17" r="3" />
    <path d="M9 17h6l-3-9H9M15 17l2-9h2" />
  </svg>
);

export const ChevronIcon = ({ direction, ...p }: IconProps & { direction: 'left' | 'right' }) => (
  <svg {...base} {...p}>
    <path d={direction === 'left' ? 'M15 6l-6 6 6 6' : 'M9 6l6 6-6 6'} />
  </svg>
);

export const SuvIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 17v-5.5L5.5 7h10L19 11.5h2V17h-2M3 17h2M9 17h6" />
    <path d="M11 7v4.5M3 11.5h16" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export const VanIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M3 17V7h12v10M15 10h3.5L21 13v4h-2M3 17h2M9 17h6" />
    <path d="M6.5 10h5" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

export const BikeIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="5.5" cy="16" r="3.5" />
    <circle cx="18.5" cy="16" r="3.5" />
    <path d="M5.5 16L9 8h5.5l4 8M9 8l3 8h6.5M14.5 8l-.5-2h2" />
  </svg>
);

const icons = {
  sedan: CarIcon,
  suv: SuvIcon,
  van: VanIcon,
  bus: BusIcon,
  scooter: ScooterIcon,
  bike: BikeIcon,
  electric: PlugIcon,
};

export function FleetIcon({ kind, ...props }: IconProps & { kind: FleetKind }) {
  const Icon = icons[kind];
  return <Icon width={24} height={24} {...props} />;
}
