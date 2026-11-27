const paths = {
  shield: <><path d="M12 3 5 6v6c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6l-7-3z" /><path d="m9 12 2 2 4-4" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c.8-3.4 3.2-5 6-5s5.2 1.6 6 5" /><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18 15.3c1.6.7 2.6 2.1 3 4.7" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.5" cy="8.5" r="1.2" /></>,
  share: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" /></>,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M3.5 10h17M8 3v4M16 3v4" /></>,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z" />,
  bed: <><path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" /><circle cx="7" cy="11" r="1.6" /></>,
  map: <><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></>,
  car: <><path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3z" /><circle cx="7.5" cy="16" r="1" /><circle cx="16.5" cy="16" r="1" /></>,
  key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9M16 7l3 3" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  message: <><path d="M4 5h16v11H9l-5 4V5z" /></>,
  badge: <><circle cx="12" cy="9" r="5" /><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7" /></>,
  wallet: <><path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" /><path d="M3 7l12-3v3M17 14h2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 20c1.8-3.5 4.8-5 8-5s6.2 1.5 8 5" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" /></>,
  list: <><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" /></>,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
} as const;

export type IconName = keyof typeof paths;

export default function Icon({ name, className = 'h-5 w-5' }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
