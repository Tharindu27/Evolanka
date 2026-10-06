import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const DashboardIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="9" rx="1" />
    <rect x="14" y="3" width="7" height="5" rx="1" />
    <rect x="14" y="12" width="7" height="9" rx="1" />
    <rect x="3" y="16" width="7" height="5" rx="1" />
  </Icon>
);

export const AnalyticsIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 3v18h18" />
    <path d="M7 15l4-4 3 3 5-6" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4" />
  </Icon>
);

export const BookingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M8 2v4M16 2v4M9 14l2 2 4-4" />
  </Icon>
);

export const SettingsIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
  </Icon>
);

export const BellIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const ChatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Icon>
);

export const MoreIcon = (p: IconProps) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <circle cx="12" cy="5" r="1.8" />
    <circle cx="12" cy="12" r="1.8" />
    <circle cx="12" cy="19" r="1.8" />
  </Icon>
);

export const ChevronLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
);

export const ChevronRightIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 18l6-6-6-6" />
  </Icon>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
);

export const TrendUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 17l6-6 4 4 8-8" />
    <path d="M15 7h6v6" />
  </Icon>
);

export const PlusCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </Icon>
);

export const HelpIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01" />
  </Icon>
);

export const LogoutIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="M16 17l5-5-5-5M21 12H9" />
  </Icon>
);

export const BlockedDatesIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 9h18M8 2v4M16 2v4M10 13l4 4M14 13l-4 4" />
  </Icon>
);

export const PricingIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M14.5 9.5c-.4-.9-1.3-1.5-2.5-1.5-1.4 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1.1 2-2.5 2c-1.2 0-2.1-.6-2.5-1.5M12 6v2M12 16v2" />
  </Icon>
);

export const DownloadIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3v12M7 10l5 5 5-5M4 21h16" />
  </Icon>
);

export const WalletIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" />
    <path d="M21 12h-5a2 2 0 0 0 0 4h5z" />
  </Icon>
);

export const PaymentsIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <circle cx="12" cy="12" r="2.5" />
    <path d="M6 12h.01M18 12h.01" />
  </Icon>
);

export const HourglassIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 2h12M6 22h12M7 2v4l5 6-5 6v4M17 2v4l-5 6 5 6v4" />
  </Icon>
);

export const BankIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 21h18" />
  </Icon>
);

export const ArrowUpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </Icon>
);

export const SearchIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" />
  </Icon>
);

export const FilterIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 5h18M6 12h12M10 19h4" />
  </Icon>
);

export const LightbulbIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V17h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />
  </Icon>
);

export const BlockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6l12.8 12.8" />
  </Icon>
);

export const RestartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </Icon>
);

export const CopyIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </Icon>
);

export const SyncIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16M3 12a9 9 0 0 1 15.5-6.2L21 8" />
    <path d="M21 3v5h-5M3 21v-5h5" />
  </Icon>
);

export const SaveIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <path d="M17 21v-8H7v8M7 3v5h8" />
  </Icon>
);

export const VerifiedIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2l2.4 2 3.1-.3 1 3 2.7 1.7-1 3 1 3-2.7 1.7-1 3-3.1-.3L12 22l-2.4-2-3.1.3-1-3L2.8 15.6l1-3-1-3 2.7-1.7 1-3 3.1.3z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Icon>
);

export const TimerIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2M9 2h6" />
  </Icon>
);

export const ShieldCheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M8.5 12l2.5 2.5 4.5-5" />
  </Icon>
);

export const SecurityIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M12 8v5M12 16h.01" />
  </Icon>
);

export const CarIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 17H3v-5l2-5h14l2 5v5h-2M5 17a2 2 0 1 0 4 0M15 17a2 2 0 1 0 4 0M9 17h6M3 12h18" />
  </Icon>
);

export const UserIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </Icon>
);

export const LockIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);

export const EditIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </Icon>
);

export const CheckIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 12l5 5 9-10" />
  </Icon>
);

export const CloseIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Icon>
);

export const PlusIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 5v14M5 12h14" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon fill="currentColor" {...p}>
    <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
  </Icon>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </Icon>
);

export const CameraIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <circle cx="12" cy="13" r="3.5" />
  </Icon>
);

export const LeafIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 21c0-9 5-15 16-16 0 11-6 16-14 16" />
    <path d="M5 21c2-5 5-8 9-10" />
  </Icon>
);

export const MountainIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 20l6-11 4 7 3-4 5 8z" />
  </Icon>
);

export const FoodIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 3v8M4 3v5a3 3 0 0 0 6 0V3M7 11v10M17 21V3c-2.5 1.5-4 4-4 8h4" />
  </Icon>
);

export const SnowflakeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2v20M4.2 7l15.6 10M4.2 17L19.8 7" />
  </Icon>
);

export const WifiIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2 21c0-3.5 3-6 7-6s7 2.5 7 6M16 4.5a3.5 3.5 0 0 1 0 7M18 15c2.5.6 4 2.6 4 6" />
  </Icon>
);

export const PlugIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0zM12 18v4" />
  </Icon>
);

export const CheckCircleIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 12.5l3 3 5-6" />
  </Icon>
);
