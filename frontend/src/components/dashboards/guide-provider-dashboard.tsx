'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useSyncExternalStore, type FormEvent, type ReactNode } from 'react';
import { getTourGuide, getTourGuideProfile } from '../../data/tour-guides';

type DashboardSection = 'dashboard' | 'bookings' | 'calendar' | 'earnings' | 'reviews' | 'profile' | 'settings';
type IconName =
  | 'dashboard'
  | 'bookings'
  | 'calendar'
  | 'settings'
  | 'vehicle'
  | 'shield'
  | 'globe'
  | 'save'
  | 'earnings'
  | 'reviews'
  | 'profile'
  | 'plus'
  | 'help'
  | 'logout'
  | 'bell'
  | 'location'
  | 'clock'
  | 'message'
  | 'more'
  | 'search'
  | 'arrow'
  | 'check'
  | 'close'
  | 'chevron'
  | 'edit'
  | 'trend'
  | 'star'
  | 'eye';

type BookingSeed = {
  id: string;
  guest: string;
  initials: string;
  tour: string;
  location: string;
  dayOffset: number;
  durationDays: number;
  amount: number;
  statusLabel: string;
};

type PreviewBooking = BookingSeed & {
  startDate: Date;
  endDate: Date;
};

type RequestStatus = 'pending' | 'accepted' | 'declined';

const icons: Record<IconName, ReactNode> = {
  dashboard: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>,
  bookings: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="m9 15 2 2 4-4" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" /></>,
  settings: <><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="m19.4 15 .1.1 1.1.9-1.4 2.4-1.4-.5a8 8 0 0 1-1.4.8l-.3 1.5h-2.8l-.3-1.5a8 8 0 0 1-1.4-.8l-1.4.5-1.4-2.4 1.1-.9a7 7 0 0 1 0-1.6l-1.1-.9 1.4-2.4 1.4.5a8 8 0 0 1 1.4-.8l.3-1.5h2.8l.3 1.5a8 8 0 0 1 1.4.8l1.4-.5 1.4 2.4-1.1.9a7 7 0 0 1 0 1.6Z" /></>,
  vehicle: <><path d="m5 11 1.5-4h11L19 11" /><path d="M3 11h18v7H3zM6 18v2M18 18v2" /><circle cx="7" cy="14" r=".7" /><circle cx="17" cy="14" r=".7" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
  save: <><path d="M5 3h12l4 4v14H3V3h2Z" /><path d="M7 3v6h10V3M7 21v-8h10v8" /></>,
  earnings: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /><path d="M16 7h3v3" /></>,
  reviews: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.4l6.1-.9L12 3Z" /></>,
  profile: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.5 1.5c-1.2 1.1-2.1 1.4-2.1 3M12 17h.01" /></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  message: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  check: <><path d="m5 12 4 4L19 6" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></>,
  trend: <><path d="m3 17 6-6 4 4 8-9" /><path d="M15 6h6v6" /></>,
  star: <><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.4l6.1-.9L12 3Z" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
};

const navigation: { id: DashboardSection; label: string; icon: IconName }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'bookings', label: 'Bookings', icon: 'bookings' },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'earnings', label: 'Earnings', icon: 'earnings' },
  { id: 'reviews', label: 'Reviews', icon: 'reviews' },
  { id: 'profile', label: 'Profile', icon: 'profile' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

const upcomingSeeds: BookingSeed[] = [
  {
    id: 'TR-8821',
    guest: 'James & Sarah Mitchell',
    initials: 'JM',
    tour: 'Yala National Park Safari',
    location: 'Yala National Park',
    dayOffset: 3,
    durationDays: 3,
    amount: 450,
    statusLabel: 'Confirmed',
  },
  {
    id: 'TR-9042',
    guest: 'Elena Rodriguez',
    initials: 'ER',
    tour: 'Ella Tea Plantation Hike',
    location: 'Ella, Badulla',
    dayOffset: 7,
    durationDays: 1,
    amount: 120,
    statusLabel: 'Arriving soon',
  },
  {
    id: 'TR-7712',
    guest: 'Oliver & friends',
    initials: 'OF',
    tour: 'Colombo street food walk',
    location: 'Colombo Fort',
    dayOffset: 12,
    durationDays: 1,
    amount: 180,
    statusLabel: 'Confirmed',
  },
];

const requestSeeds: BookingSeed[] = [
  {
    id: 'TR-9216',
    guest: 'Amelia Chen',
    initials: 'AC',
    tour: 'Kandy heritage day tour',
    location: 'Kandy',
    dayOffset: 5,
    durationDays: 1,
    amount: 95,
    statusLabel: 'New request',
  },
  {
    id: 'TR-9380',
    guest: 'Noah Williams',
    initials: 'NW',
    tour: 'Galle Fort & coastal stories',
    location: 'Galle',
    dayOffset: 10,
    durationDays: 2,
    amount: 210,
    statusLabel: 'New request',
  },
  {
    id: 'TR-9403',
    guest: 'Sofia Martin',
    initials: 'SM',
    tour: 'Sigiriya sunrise experience',
    location: 'Sigiriya',
    dayOffset: 16,
    durationDays: 1,
    amount: 150,
    statusLabel: 'New request',
  },
];

const sectionContent: Record<DashboardSection, { title: string; description: string }> = {
  dashboard: {
    title: 'Your guide dashboard',
    description: 'A quick look at your tours, requests, and provider activity.',
  },
  bookings: {
    title: 'Bookings & schedule',
    description: 'Manage upcoming tours and review new traveler requests.',
  },
  calendar: {
    title: 'Availability calendar',
    description: 'Manage tour dates and review your upcoming confirmed expeditions.',
  },
  earnings: {
    title: 'Earnings',
    description: 'Track your sample earnings and payout activity.',
  },
  reviews: {
    title: 'Traveler reviews',
    description: 'See what travelers are saying about their guide experience.',
  },
  profile: {
    title: 'Guide profile',
    description: 'Review your public profile and account details.',
  },
  settings: {
    title: 'Settings',
    description: 'Manage your guide profile, vehicle details, and availability preferences.',
  },
};

function getSettingsGuideData() {
  const guide = getTourGuide('nilu-jayawardena');
  const profile = getTourGuideProfile('nilu-jayawardena');
  if (!guide || !profile) {
    throw new Error('The guide dashboard preview requires the Nilu Jayawardena sample profile.');
  }
  return { guide, profile };
}

const { guide: settingsGuide, profile: settingsGuideProfile } = getSettingsGuideData();

const settingsDefaults = {
  specialization: settingsGuide.specializations[0] ?? 'Wildlife',
  languages: [...settingsGuide.languages],
  bio: settingsGuide.summary.slice(0, 150),
  vehicleModel: settingsGuideProfile.vehicle.name,
  vehicleDetails: settingsGuideProfile.vehicle.details,
  vehicleCapacity: settingsGuideProfile.vehicle.features.find((feature) => /seats/i.test(feature)) ?? '',
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);

const formatLongDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date);

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function dateKey(date: Date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function getCurrentDateKey() {
  return dateKey(new Date());
}

function getServerDateKey() {
  return '';
}

function subscribeToDateChange(onStoreChange: () => void) {
  const now = new Date();
  const nextDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const timeout = window.setTimeout(onStoreChange, Math.max(nextDay.getTime() - now.getTime() + 50, 1000));
  return () => window.clearTimeout(timeout);
}

function dateFromKey(key: string) {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function createPreviewBookings(today: Date, seeds: BookingSeed[]): PreviewBooking[] {
  return seeds.map((booking) => ({
    ...booking,
    startDate: addDays(today, booking.dayOffset),
    endDate: addDays(today, booking.dayOffset + booking.durationDays - 1),
  }));
}

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

export default function GuideProviderDashboard() {
  const [section, setSection] = useState<DashboardSection>('bookings');
  const [bookingTab, setBookingTab] = useState<'upcoming' | 'requests'>('upcoming');
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDateKey, setSelectedDateKey] = useState('');
  const [blackoutDates, setBlackoutDates] = useState<string[]>([]);
  const [requestStatuses, setRequestStatuses] = useState<Record<string, RequestStatus>>({});
  const [selectedBooking, setSelectedBooking] = useState<PreviewBooking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [offerModalOpen, setOfferModalOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [profileName, setProfileName] = useState('Nilu Jayawardena');
  const [profileLocation, setProfileLocation] = useState('Yala & Southern Parks');
  const [profileBio, setProfileBio] = useState(settingsDefaults.bio);
  const [vehicleAvailable, setVehicleAvailable] = useState(true);
  const [vehicleModel, setVehicleModel] = useState(settingsDefaults.vehicleModel);
  const [vehicleDetails, setVehicleDetails] = useState(settingsDefaults.vehicleDetails);
  const [vehicleCapacity, setVehicleCapacity] = useState(settingsDefaults.vehicleCapacity);
  const [guideSpecialization, setGuideSpecialization] = useState(settingsDefaults.specialization);
  const [guideLanguages, setGuideLanguages] = useState(settingsDefaults.languages);
  const [newLanguage, setNewLanguage] = useState('');
  const [settingsBio, setSettingsBio] = useState(settingsDefaults.bio);

  const currentDateKey = useSyncExternalStore(subscribeToDateChange, getCurrentDateKey, getServerDateKey);
  const today = currentDateKey ? dateFromKey(currentDateKey) : null;

  const baseUpcomingBookings = today ? createPreviewBookings(today, upcomingSeeds) : [];
  const requests = today ? createPreviewBookings(today, requestSeeds) : [];
  const acceptedRequests = requests
    .filter((request) => requestStatuses[request.id] === 'accepted')
    .map((request) => ({ ...request, statusLabel: 'Accepted · preview' }));
  const upcomingBookings = [...baseUpcomingBookings, ...acceptedRequests];
  const scheduledBookings = upcomingBookings;
  const pendingRequestsCount = requests.filter((request) => (requestStatuses[request.id] ?? 'pending') === 'pending').length;
  const activeSelectedDateKey = selectedDateKey || (today ? dateKey(today) : '');
  const selectedCalendarDate = activeSelectedDateKey ? dateFromKey(activeSelectedDateKey) : today;
  const isSelectedDateBlocked = activeSelectedDateKey !== '' && blackoutDates.includes(activeSelectedDateKey);
  const selectedDateBookings = selectedCalendarDate
    ? scheduledBookings.filter((booking) => selectedCalendarDate >= booking.startDate && selectedCalendarDate <= booking.endDate)
    : [];

  const pageContent = sectionContent[section];

  function setRequestStatus(id: string, status: RequestStatus) {
    setRequestStatuses((current) => ({ ...current, [id]: status }));
    setNotice(status === 'accepted' ? 'Request accepted in this preview only.' : 'Request declined in this preview only.');
  }

  function toggleBlackoutDate() {
    if (!activeSelectedDateKey) return;
    if (today && selectedCalendarDate && selectedCalendarDate < today) {
      setNotice('Only future dates can be updated in this preview.');
      return;
    }
    if (selectedDateBookings.length > 0) {
      setNotice('A tour is already scheduled for this date in the preview.');
      return;
    }

    setBlackoutDates((current) =>
      current.includes(activeSelectedDateKey)
        ? current.filter((date) => date !== activeSelectedDateKey)
        : [...current, activeSelectedDateKey],
    );
    setNotice(isSelectedDateBlocked ? 'Date reopened in this preview.' : 'Date blocked in this preview.');
  }

  function handleOfferSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOfferModalOpen(false);
    setNotice('Offer saved in this preview only; it has not been published.');
  }

  function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Profile changes saved in this preview only.');
  }

  function handleSettingsSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Guide profile changes saved in this preview only.');
  }

  function handleVehicleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Vehicle details saved in this preview only.');
  }

  function discardSettingsChanges() {
    setGuideSpecialization(settingsDefaults.specialization);
    setGuideLanguages([...settingsDefaults.languages]);
    setSettingsBio(settingsDefaults.bio);
    setVehicleModel(settingsDefaults.vehicleModel);
    setVehicleDetails(settingsDefaults.vehicleDetails);
    setVehicleCapacity(settingsDefaults.vehicleCapacity);
    setVehicleAvailable(true);
    setNotice('Unsaved settings were reset in this preview.');
  }

  function addGuideLanguage() {
    const language = newLanguage.trim();
    if (!language) return;
    if (guideLanguages.length >= 5) {
      setNotice('The preview supports up to five languages.');
      return;
    }
    if (guideLanguages.some((currentLanguage) => currentLanguage.toLowerCase() === language.toLowerCase())) {
      setNotice('That language is already listed.');
      return;
    }
    setGuideLanguages((current) => [...current, language]);
    setNewLanguage('');
  }

  function removeGuideLanguage(language: string) {
    setGuideLanguages((current) => current.filter((currentLanguage) => currentLanguage !== language));
  }

  function blockVisibleMonthWeekends() {
    if (!today) return;
    const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const newBlockedDates = Array.from({ length: daysInMonth }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1))
      .filter((date) => (date.getDay() === 0 || date.getDay() === 6) && date >= today)
      .filter((date) => !scheduledBookings.some((booking) => date >= booking.startDate && date <= booking.endDate))
      .map(dateKey);

    setBlackoutDates((current) => [...new Set([...current, ...newBlockedDates])]);
    setNotice('Available weekends in the displayed month were blocked in this preview.');
  }

  function clearVisibleMonthAvailability() {
    if (!today) return;
    const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    setBlackoutDates((current) => current.filter((key) => {
      const date = dateFromKey(key);
      return date.getFullYear() !== month.getFullYear() || date.getMonth() !== month.getMonth();
    }));
    setNotice('Availability blocks for the displayed month were cleared in this preview.');
  }

  function copyPreviousMonthAvailability() {
    if (!today) return;
    const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const previousMonth = new Date(month.getFullYear(), month.getMonth() - 1, 1);
    const previousMonthPrefix = `${previousMonth.getFullYear()}-${String(previousMonth.getMonth() + 1).padStart(2, '0')}-`;
    const blockedDays = blackoutDates
      .filter((key) => key.startsWith(previousMonthPrefix))
      .map((key) => dateFromKey(key).getDate());
    if (blockedDays.length === 0) {
      setNotice('No saved availability pattern exists for the previous month in this preview.');
      return;
    }

    const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const copiedDates = blockedDays
      .map((day) => new Date(month.getFullYear(), month.getMonth(), Math.min(day, daysInMonth)))
      .filter((date) => date >= today)
      .filter((date) => !scheduledBookings.some((booking) => date >= booking.startDate && date <= booking.endDate))
      .map(dateKey);

    setBlackoutDates((current) => [...new Set([...current, ...copiedDates])]);
    setNotice('The previous month’s blocked dates were copied into this preview month.');
  }

  function renderCalendar(compact = false) {
    if (!today) return null;

    const month = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const leadingDays = month.getDay();
    const monthLength = new Date(year, monthIndex + 1, 0).getDate();
    const totalCells = Math.ceil((leadingDays + monthLength) / 7) * 7;
    const calendarCells = Array.from({ length: totalCells }, (_, index) => {
      const date = new Date(year, monthIndex, index - leadingDays + 1);
      return { date, isCurrentMonth: date.getMonth() === monthIndex };
    });

    return (
      <section className={`guide-panel guide-calendar-panel${compact ? ' guide-calendar-panel-compact' : ' guide-calendar-panel-full'}`}>
        <div className="guide-calendar-heading">
          <div>
            <p className="guide-panel-eyebrow">Availability</p>
            <h2>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(month)}</h2>
          </div>
          <div className="guide-calendar-controls">
            <button type="button" aria-label="Previous month" onClick={() => setMonthOffset((value) => value - 1)}>
              <span className="guide-chevron-left"><Icon name="chevron" size={16} /></span>
            </button>
            <button type="button" aria-label="Next month" onClick={() => setMonthOffset((value) => value + 1)}>
              <Icon name="chevron" size={16} />
            </button>
          </div>
        </div>

        <div className={`guide-calendar-grid guide-calendar-weekdays${compact ? '' : ' guide-calendar-full-grid guide-calendar-full-weekdays'}`} aria-hidden="true">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className={`guide-calendar-grid${compact ? '' : ' guide-calendar-full-grid guide-calendar-full-days'}`}>
          {calendarCells.map(({ date, isCurrentMonth }) => {
            const key = dateKey(date);
            const dateBookings = scheduledBookings.filter((booking) => date >= booking.startDate && date <= booking.endDate);
            const isBooked = dateBookings.length > 0;
            const isBlocked = blackoutDates.includes(key);
            const isSelected = key === activeSelectedDateKey;
            const isToday = key === dateKey(today);
            const classes = [
              'guide-calendar-day',
              isBooked ? 'guide-calendar-day-booked' : '',
              isBlocked ? 'guide-calendar-day-blocked' : '',
              isSelected ? 'guide-calendar-day-selected' : '',
              isToday ? 'guide-calendar-day-today' : '',
              !isCurrentMonth ? 'guide-calendar-day-outside' : '',
            ].filter(Boolean).join(' ');

            return (
              <button
                key={key}
                type="button"
                className={classes}
                aria-label={`${formatLongDate(date)}${dateBookings.length ? `, ${dateBookings.map((booking) => booking.tour).join(', ')}` : ''}${isBlocked ? ', unavailable' : ''}`}
                aria-pressed={isSelected}
                onClick={() => {
                  setSelectedDateKey(key);
                  if (!isCurrentMonth) {
                    setMonthOffset((date.getFullYear() - today.getFullYear()) * 12 + date.getMonth() - today.getMonth());
                  }
                }}
              >
                <span className="guide-calendar-day-number">{date.getDate()}</span>
                {!compact && dateBookings[0] ? <span className="guide-calendar-event">{dateBookings[0].tour}</span> : null}
                {!compact && dateBookings.length > 1 ? <span className="guide-calendar-event-overflow">+{dateBookings.length - 1} more</span> : null}
                {!compact && !isBooked && isBlocked ? <span className="guide-calendar-blocked-label">Blocked</span> : null}
                {!compact && isCurrentMonth && !isBooked && !isBlocked ? <span className="guide-calendar-available-label">Available</span> : null}
              </button>
            );
          })}
        </div>

        {compact ? (
          <div className="guide-calendar-legend">
            <span><i className="guide-legend-dot guide-legend-tour" />Tour scheduled</span>
            <span><i className="guide-legend-dot guide-legend-blocked" />Unavailable</span>
          </div>
        ) : null}
        {compact ? (
          <button className="guide-text-button guide-calendar-open" type="button" onClick={() => setSection('calendar')}>
            Manage calendar <Icon name="chevron" size={14} />
          </button>
        ) : null}
      </section>
    );
  }

  function renderBookingCard(booking: PreviewBooking, isRequest = false) {
    const status = isRequest ? requestStatuses[booking.id] ?? 'pending' : null;
    const statusLabel = status === 'accepted'
      ? 'Accepted · preview'
      : status === 'declined'
        ? 'Declined · preview'
        : isRequest
          ? booking.statusLabel
          : booking.statusLabel;

    return (
      <article className="guide-booking-card" key={booking.id}>
        <div className="guide-guest-avatar" aria-hidden="true">{booking.initials}</div>
        <div className="guide-booking-main">
          <div className="guide-booking-meta">
            <span className={`guide-status-pill${status === 'accepted' ? ' guide-status-accepted' : status === 'declined' ? ' guide-status-declined' : ''}`}>
              {statusLabel}
            </span>
            <span className="guide-booking-reference">#{booking.id}</span>
          </div>
          <h3>{booking.guest}</h3>
          <p className="guide-booking-tour"><Icon name="location" size={15} />{booking.tour}</p>
          <p className="guide-booking-region">{booking.location}</p>
        </div>
        <div className="guide-booking-end">
          <p className="guide-booking-date">{formatDate(booking.startDate)}{booking.durationDays > 1 ? ` – ${formatDate(booking.endDate)}` : ' · one day'}</p>
          <p className="guide-booking-amount">{formatCurrency(booking.amount)}</p>
          <div className="guide-booking-actions">
            <button type="button" aria-label={`View ${booking.guest} booking details`} onClick={() => setSelectedBooking(booking)}>
              <Icon name="eye" size={16} />
              <span>Details</span>
            </button>
            {isRequest && status === 'pending' ? (
              <>
                <button className="guide-action-accept" type="button" onClick={() => setRequestStatus(booking.id, 'accepted')}>
                  <Icon name="check" size={15} />
                  <span>Accept</span>
                </button>
                <button className="guide-action-decline" type="button" aria-label={`Decline ${booking.guest} request`} onClick={() => setRequestStatus(booking.id, 'declined')}>
                  <Icon name="close" size={15} />
                  <span className="guide-visually-hidden">Decline</span>
                </button>
              </>
            ) : null}
            {isRequest && status !== 'pending' ? (
              <button type="button" onClick={() => setRequestStatus(booking.id, 'pending')}>Undo</button>
            ) : null}
          </div>
        </div>
      </article>
    );
  }

  function renderQuickActions() {
    return (
      <section className="guide-quick-actions">
        <h2>Quick actions</h2>
        <button type="button" onClick={() => setSection('calendar')}>
          <span><Icon name="calendar" size={18} />Update blackout dates</span>
          <Icon name="chevron" size={16} />
        </button>
        <button type="button" onClick={() => setOfferModalOpen(true)}>
          <span><Icon name="edit" size={18} />Manage tour pricing</span>
          <Icon name="chevron" size={16} />
        </button>
      </section>
    );
  }

  function renderDashboardOverview() {
    const stats = [
      { icon: 'bookings' as const, label: 'Upcoming tours', value: '3', detail: 'In this sample' },
      { icon: 'calendar' as const, label: 'New requests', value: String(pendingRequestsCount), detail: 'Needs your attention' },
      { icon: 'star' as const, label: 'Guide rating', value: '4.9', detail: 'From sample reviews' },
      { icon: 'earnings' as const, label: 'This month', value: '$3,840', detail: 'Sample earnings' },
    ];

    return (
      <>
        <section className="guide-welcome-panel">
          <div>
            <p className="guide-panel-eyebrow">Provider overview</p>
            <h2>Welcome back, {profileName.split(' ')[0]}</h2>
            <p>Your next tour is coming up soon. Here&apos;s a snapshot of your guide activity.</p>
          </div>
          <button className="guide-primary-button" type="button" onClick={() => setOfferModalOpen(true)}>
            <Icon name="plus" size={17} />Post a new offer
          </button>
        </section>
        <div className="guide-stat-grid">
          {stats.map((stat) => (
            <article className="guide-stat-card" key={stat.label}>
              <div className="guide-stat-top"><span className="guide-stat-icon"><Icon name={stat.icon} size={18} /></span><span>{stat.label}</span></div>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          ))}
        </div>
        <div className="guide-dashboard-grid">
          <section className="guide-panel guide-overview-bookings">
            <div className="guide-panel-heading">
              <div><p className="guide-panel-eyebrow">Coming up</p><h2>Next tours</h2></div>
              <button className="guide-text-button" type="button" onClick={() => setSection('bookings')}>All bookings <Icon name="chevron" size={14} /></button>
            </div>
            <div className="guide-booking-list">{upcomingBookings.slice(0, 2).map((booking) => renderBookingCard(booking))}</div>
          </section>
          <aside className="guide-dashboard-side">
            {renderCalendar(true)}
            <section className="guide-earnings-summary">
              <p className="guide-panel-eyebrow">Sample earnings</p>
              <strong>$3,840.50</strong>
              <span><Icon name="trend" size={15} />12% from last month</span>
              <button className="guide-text-button" type="button" onClick={() => setSection('earnings')}>View earnings <Icon name="chevron" size={14} /></button>
            </section>
          </aside>
        </div>
      </>
    );
  }

  function renderBookings() {
    const list = bookingTab === 'upcoming' ? upcomingBookings : requests;
    const matching = list.filter((booking) =>
      `${booking.guest} ${booking.tour} ${booking.location} ${booking.id}`.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
      <div className="guide-bookings-layout">
        <section className="guide-panel guide-booking-manager">
          <div className="guide-booking-tabs" role="tablist" aria-label="Booking type">
            <button type="button" role="tab" aria-selected={bookingTab === 'upcoming'} className={bookingTab === 'upcoming' ? 'is-active' : ''} onClick={() => setBookingTab('upcoming')}>
              Upcoming bookings <span>{upcomingBookings.length}</span>
            </button>
            <button type="button" role="tab" aria-selected={bookingTab === 'requests'} className={bookingTab === 'requests' ? 'is-active' : ''} onClick={() => setBookingTab('requests')}>
              Booking requests <span>{pendingRequestsCount}</span>
            </button>
          </div>
          <div className="guide-booking-toolbar">
            <label className="guide-search-field">
              <Icon name="search" size={17} />
              <span className="guide-visually-hidden">Search bookings</span>
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search traveler or tour" />
            </label>
            <span className="guide-preview-inline">Preview data</span>
          </div>
          <div className="guide-booking-list">
            {matching.length > 0
              ? matching.map((booking) => renderBookingCard(booking, bookingTab === 'requests'))
              : <div className="guide-empty-state"><Icon name="search" size={22} /><strong>No matching bookings</strong><span>Try a different name, tour, or reference.</span></div>}
          </div>
        </section>
        <aside className="guide-bookings-side">
          {renderCalendar(true)}
          <section className="guide-earnings-summary">
            <p className="guide-panel-eyebrow">Sample earnings</p>
            <strong>$3,840.50</strong>
            <span><Icon name="trend" size={15} />12% from last month</span>
            <button className="guide-text-button" type="button" onClick={() => setSection('earnings')}>View earnings <Icon name="chevron" size={14} /></button>
          </section>
          {renderQuickActions()}
        </aside>
      </div>
    );
  }

  function renderCalendarSection() {
    const cannotBlock = selectedDateBookings.length > 0;
    return (
      <div className="guide-calendar-layout">
        <div className="guide-calendar-main-column">
          <div className="guide-calendar-page-heading">
            <div><p className="guide-panel-eyebrow">Monthly planner</p><h2>Availability calendar</h2></div>
            <span className="guide-preview-inline">Sample bookings</span>
          </div>
          {renderCalendar()}
        </div>
        <aside className="guide-calendar-sidebar">
          <section className="guide-panel guide-date-details">
            <p className="guide-panel-eyebrow">Selected date</p>
            <h2>{selectedCalendarDate ? formatLongDate(selectedCalendarDate) : 'Choose a date'}</h2>
            {selectedDateBookings.length > 0 ? (
              <div className="guide-scheduled-list">
                {selectedDateBookings.map((booking) => (
                  <article key={booking.id}>
                    <span className="guide-schedule-dot" />
                    <div><strong>{booking.tour}</strong><p>{booking.guest}</p><small>{booking.id} · sample booking</small></div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="guide-schedule-empty">{isSelectedDateBlocked ? 'This date is unavailable in the local preview.' : 'No sample tours are scheduled for this date.'}</p>
            )}
            <button className="guide-primary-button guide-block-date-button" type="button" onClick={toggleBlackoutDate} disabled={cannotBlock}>
              <Icon name={isSelectedDateBlocked ? 'check' : 'calendar'} size={17} />
              {isSelectedDateBlocked ? 'Reopen selected date' : 'Block selected date'}
            </button>
          </section>

          <section className="guide-panel guide-calendar-quick-actions">
            <h2>Quick actions</h2>
            <button type="button" onClick={blockVisibleMonthWeekends}><span><Icon name="calendar" size={17} />Block all weekends</span><Icon name="chevron" size={15} /></button>
            <button type="button" onClick={clearVisibleMonthAvailability}><span><Icon name="close" size={17} />Clear this month</span><Icon name="chevron" size={15} /></button>
            <button type="button" onClick={copyPreviousMonthAvailability}><span><Icon name="calendar" size={17} />Copy past month</span><Icon name="chevron" size={15} /></button>
          </section>

          <section className="guide-panel guide-calendar-legend-panel">
            <h2>Calendar legend</h2>
            <span><i className="guide-legend-dot guide-legend-available" />Available for booking</span>
            <span><i className="guide-legend-dot guide-legend-blocked" />Blocked / unavailable</span>
            <span><i className="guide-legend-dot guide-legend-tour" />Confirmed tour</span>
            <span><i className="guide-legend-dot guide-legend-multi" />Multi-day tour</span>
          </section>

          <section className="guide-calendar-sync-panel">
            <div><Icon name="globe" size={18} /><strong>External calendar</strong></div>
            <p>Google Calendar and Outlook are not connected in this preview.</p>
            <button type="button" disabled>Connect calendar</button>
          </section>
          <button className="guide-primary-button guide-calendar-save-button" type="button" onClick={() => setNotice('Calendar changes are only in this preview; nothing was synced or saved.')}>
            <Icon name="save" size={17} />Save changes
          </button>
        </aside>
      </div>
    );
  }

  function renderEarnings() {
    const bars = [46, 62, 54, 78, 59, 88, 70, 96];
    const currentMonthLabel = today
      ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(today)
      : 'Current month';
    return (
      <>
        <div className="guide-stat-grid guide-stat-grid-earnings">
          <article className="guide-stat-card"><div className="guide-stat-top"><span className="guide-stat-icon"><Icon name="earnings" /></span><span>{currentMonthLabel} estimate</span></div><strong>$3,840.50</strong><small>Sample data only</small></article>
          <article className="guide-stat-card"><div className="guide-stat-top"><span className="guide-stat-icon"><Icon name="bookings" /></span><span>Completed tours</span></div><strong>18</strong><small>Example count</small></article>
          <article className="guide-stat-card"><div className="guide-stat-top"><span className="guide-stat-icon"><Icon name="trend" /></span><span>Change from last month</span></div><strong className="guide-positive-value">+12%</strong><small>Illustrative comparison</small></article>
        </div>
        <section className="guide-panel guide-chart-panel">
          <div className="guide-panel-heading"><div><p className="guide-panel-eyebrow">Earnings overview</p><h2>Monthly performance</h2></div><span className="guide-preview-inline">Sample chart</span></div>
          <div className="guide-chart" role="img" aria-label="Illustrative earnings chart for the past eight months">
            {bars.map((height, index) => <div className="guide-chart-column" key={`${height}-${index}`}><span style={{ height: `${height}%` }} /><small>{['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'][index]}</small></div>)}
          </div>
        </section>
        <section className="guide-panel guide-payout-panel">
          <div className="guide-panel-heading"><div><p className="guide-panel-eyebrow">Activity</p><h2>Recent sample payouts</h2></div><button className="guide-secondary-button" type="button" disabled>Download statement</button></div>
          <div className="guide-payout-row"><span className="guide-payout-icon"><Icon name="check" size={17} /></span><div><strong>Yala Safari booking</strong><small>Completed · sample transaction</small></div><b>{formatCurrency(450)}</b><span className="guide-status-pill guide-status-accepted">Paid</span></div>
          <div className="guide-payout-row"><span className="guide-payout-icon"><Icon name="clock" size={17} /></span><div><strong>Ella Tea Plantation Hike</strong><small>Upcoming · sample transaction</small></div><b>{formatCurrency(120)}</b><span className="guide-status-pill">Pending</span></div>
        </section>
      </>
    );
  }

  function renderReviews() {
    const reviews = [
      { initials: 'JM', guest: 'James Mitchell', tour: 'Yala National Park Safari', rating: 5, ago: '2 weeks ago', text: 'A thoughtful guide with a great eye for wildlife. We learned so much and felt well looked after throughout the day.' },
      { initials: 'ER', guest: 'Elena Rodriguez', tour: 'Ella Tea Plantation Hike', rating: 5, ago: '1 month ago', text: 'The views were incredible, and the pace was perfect. Nilu shared stories about the region that we would never have found on our own.' },
      { initials: 'AC', guest: 'Amelia Chen', tour: 'Kandy heritage day tour', rating: 4, ago: '2 months ago', text: 'A lovely day exploring Kandy. Clear communication and lots of interesting local recommendations.' },
    ];
    return (
      <>
        <section className="guide-review-summary">
          <div className="guide-review-score"><Icon name="star" size={21} /><strong>4.9</strong><span>Sample average · 94 reviews</span></div>
          <p>Review examples are shown for layout preview only; they are not connected to a provider account.</p>
        </section>
        <div className="guide-review-list">
          {reviews.map((review) => (
            <article className="guide-panel guide-review-card" key={review.guest}>
              <div className="guide-review-card-heading"><div className="guide-guest-avatar">{review.initials}</div><div><strong>{review.guest}</strong><span>{review.tour} · {review.ago}</span></div><div className="guide-review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Icon key={index} name="star" size={15} />)}</div></div>
              <p>“{review.text}”</p>
              <button className="guide-text-button" type="button" onClick={() => setNotice('Review replies are not published from this preview.')}>
                <Icon name="message" size={15} />Reply to review
              </button>
            </article>
          ))}
        </div>
      </>
    );
  }

    function renderSettings() {
      const specializationOptions = Array.from(new Set([
        ...settingsGuide.specializations,
        'Wildlife',
        'Bird Watching',
        'Heritage Sites',
        'History',
        'Food',
        'Local Culture',
        'Adventure',
        'Hiking',
        'City Tours',
        'Airport Transfers',
        'Coastal & Beach Tours',
      ]));
      const vehicleImage = settingsGuideProfile.vehicle.image;

      return (
        <div className="guide-settings-page">
          <div className="guide-settings-summary">
            <section className="guide-settings-status-card">
              <span className="guide-settings-status-icon"><Icon name="shield" size={26} /></span>
              <div>
                <p className="guide-panel-eyebrow">Guide profile status</p>
                <h2>Sample guide information</h2>
                <p>Guide category and service details are shown from the directory preview. Provider verification is not connected.</p>
                <span className="guide-settings-status-badge">Preview account</span>
              </div>
            </section>
            <section className="guide-settings-earnings-card">
              <p className="guide-panel-eyebrow">Sample earnings this month</p>
              <strong>$3,840.50</strong>
              <span><Icon name="trend" size={15} />Illustrative summary only</span>
              <div className="guide-settings-earnings-track"><span /></div>
            </section>
          </div>

          <div className="guide-settings-layout">
            <section className="guide-panel guide-vehicle-settings">
              <div className="guide-settings-panel-heading">
                <div><Icon name="vehicle" size={19} /><h2>Vehicle control</h2></div>
                <span className="guide-preview-inline">Preview status</span>
              </div>
              <div className="guide-vehicle-toggle-row">
                <div><strong>Vehicle availability</strong><small>{vehicleAvailable ? 'Shown as available in this preview' : 'Shown as unavailable in this preview'}</small></div>
                <label className="guide-toggle-switch">
                  <span className="guide-visually-hidden">Vehicle available for bookings</span>
                  <input
                    type="checkbox"
                    checked={vehicleAvailable}
                    onChange={(event) => {
                      setVehicleAvailable(event.target.checked);
                      setNotice('Vehicle availability changed in this preview only.');
                    }}
                  />
                  <span aria-hidden="true" />
                </label>
              </div>
              {vehicleImage ? (
                <Image
                  className="guide-vehicle-settings-image"
                  src={vehicleImage}
                  alt={`${settingsGuideProfile.vehicle.name} tour vehicle`}
                  width={720}
                  height={420}
                />
              ) : (
                <div className="guide-vehicle-settings-no-image">No vehicle photo has been supplied.</div>
              )}
              <form className="guide-vehicle-settings-form" onSubmit={handleVehicleSubmit}>
                <label>Vehicle model<input value={vehicleModel} onChange={(event) => setVehicleModel(event.target.value)} required /></label>
                <label>Vehicle details<input value={vehicleDetails} onChange={(event) => setVehicleDetails(event.target.value)} required /></label>
                <label>Passenger capacity<input value={vehicleCapacity} onChange={(event) => setVehicleCapacity(event.target.value)} required /></label>
                <div className="guide-vehicle-features">
                  <span className="guide-panel-eyebrow">Vehicle features</span>
                  <div>{settingsGuideProfile.vehicle.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
                </div>
                <button className="guide-secondary-button" type="submit"><Icon name="edit" size={16} />Update vehicle specs</button>
              </form>
              <p className="guide-small-note">Availability and vehicle edits are local to this preview and do not affect the public listings.</p>
            </section>

            <div className="guide-settings-profile-column">
              <section className="guide-panel guide-settings-profile">
                <div className="guide-settings-panel-heading">
                  <div><Icon name="profile" size={19} /><h2>Profile details</h2></div>
                </div>
                <form onSubmit={handleSettingsSubmit}>
                  <div className="guide-settings-fields">
                    <label>Guide category
                      <span className="guide-locked-setting"><strong>{settingsGuide.guideType}</strong><Icon name="shield" size={16} /></span>
                      <small>Category details come from the guide listing preview.</small>
                    </label>
                    <label>Specialization
                      <select value={guideSpecialization} onChange={(event) => setGuideSpecialization(event.target.value)}>
                        {specializationOptions.map((specialization) => <option key={specialization}>{specialization}</option>)}
                      </select>
                    </label>
                  </div>

                  <div className="guide-language-settings">
                    <label>Languages spoken</label>
                    <div className="guide-language-chips">
                      {guideLanguages.map((language) => (
                        <span key={language}>
                          {language}
                          <button type="button" aria-label={`Remove ${language}`} onClick={() => removeGuideLanguage(language)}><Icon name="close" size={13} /></button>
                        </span>
                      ))}
                      {guideLanguages.length === 0 ? <small>No languages added yet.</small> : null}
                    </div>
                    <div className="guide-language-add">
                      <input aria-label="Add a language" value={newLanguage} onChange={(event) => setNewLanguage(event.target.value)} placeholder="Add a language" />
                      <button type="button" onClick={addGuideLanguage} disabled={guideLanguages.length >= 5}><Icon name="plus" size={15} />Add</button>
                    </div>
                    <small>Add up to five languages in this preview.</small>
                  </div>

                  <label className="guide-settings-bio-label">Bio snippet
                    <textarea value={settingsBio} maxLength={150} rows={4} onChange={(event) => setSettingsBio(event.target.value)} placeholder="Describe your guide experience in 150 characters." />
                    <small>{settingsBio.length}/150 characters</small>
                  </label>

                  <div className="guide-settings-form-actions">
                    <button className="guide-secondary-button" type="button" onClick={discardSettingsChanges}>Discard changes</button>
                    <button className="guide-primary-button" type="submit"><Icon name="save" size={16} />Save profile</button>
                  </div>
                </form>
              </section>

              <section className="guide-settings-safety">
                <span><Icon name="shield" size={20} /></span>
                <div><strong>Data protection &amp; compliance</strong><p>Provider verification, insurance checks, and account security are not connected in this preview. No compliance status is being asserted.</p></div>
              </section>
            </div>
          </div>
        </div>
      );
    }

    function renderProfile() {
    return (
      <div className="guide-profile-layout">
        <section className="guide-panel guide-profile-form-panel">
          <div className="guide-panel-heading"><div><p className="guide-panel-eyebrow">Public information</p><h2>Your profile</h2></div><span className="guide-preview-inline">Preview account</span></div>
          <form className="guide-profile-form" onSubmit={handleProfileSubmit}>
            <label>Full name<input value={profileName} onChange={(event) => setProfileName(event.target.value)} required /></label>
            <label>Primary region<input value={profileLocation} onChange={(event) => setProfileLocation(event.target.value)} required /></label>
            <label>About your tours<textarea rows={5} value={profileBio} onChange={(event) => setProfileBio(event.target.value)} required /></label>
            <div className="guide-profile-readonly"><span>Email address</span><strong>nilu.guide@example.com</strong><small>Sample account detail; sign-in is not connected.</small></div>
            <button className="guide-primary-button" type="submit"><Icon name="check" size={17} />Save preview changes</button>
          </form>
        </section>
        <aside className="guide-profile-aside">
          <section className="guide-panel guide-profile-preview">
            <p className="guide-panel-eyebrow">Public profile preview</p>
            <Image src="/images/guides/nilu-jayawardena.jpg" alt="Nilu Jayawardena" width={72} height={72} className="guide-profile-image" />
            <h2>{profileName || 'Your name'}</h2>
            <p>{profileLocation || 'Your region'}</p>
            <span className="guide-profile-rating"><Icon name="star" size={15} />4.9 <small>· sample rating</small></span>
            <p className="guide-profile-bio">{profileBio || 'Add a short introduction to your tours.'}</p>
            <span className="guide-guide-type">Tour guide · sample profile</span>
          </section>
          <section className="guide-security-note"><Icon name="help" size={18} /><p><strong>Account security</strong><span>Provider authentication is not connected in this front-end preview.</span></p></section>
        </aside>
      </div>
    );
  }

  const renderActiveSection = () => {
    if (!today) {
      return <div className="guide-dashboard-loading" aria-live="polite">Preparing the sample dashboard…</div>;
    }

    switch (section) {
      case 'dashboard':
        return renderDashboardOverview();
      case 'bookings':
        return renderBookings();
      case 'calendar':
        return renderCalendarSection();
      case 'earnings':
        return renderEarnings();
      case 'reviews':
        return renderReviews();
      case 'profile':
        return renderProfile();
      case 'settings':
        return renderSettings();
    }
  };

  return (
    <div className="guide-provider-app">
      <aside className="guide-provider-sidebar">
        <Link className="guide-brand" href="/" aria-label="EVOLANKA home">
          <span className="guide-brand-mark">E</span>
          <span><strong>EVOLANKA</strong><small>Guide partner hub</small></span>
        </Link>
        <div className="guide-account-card">
          <Image src="/images/guides/nilu-jayawardena.jpg" alt="" width={44} height={44} className="guide-account-image" />
          <span className="guide-account-text"><strong>{profileName}</strong><small>Tour guide · preview</small></span>
          <span className="guide-account-status" aria-label="Preview account" />
        </div>
        <nav className="guide-sidebar-nav" aria-label="Provider dashboard">
          <span className="guide-nav-section-label">WORKSPACE</span>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`guide-nav-item${section === item.id ? ' is-active' : ''}`}
              type="button"
              aria-current={section === item.id ? 'page' : undefined}
              onClick={() => setSection(item.id)}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.id === 'bookings' && pendingRequestsCount > 0 ? <small>{pendingRequestsCount}</small> : null}
            </button>
          ))}
        </nav>
        <div className="guide-sidebar-footer">
          <button className="guide-new-offer-button" type="button" onClick={() => setOfferModalOpen(true)}><Icon name="plus" size={17} />Post new offer</button>
          <button className="guide-sidebar-footer-link" type="button" onClick={() => setNotice('Help resources will be connected with provider accounts later.')}><Icon name="help" size={17} />Help center</button>
          <Link className="guide-sidebar-footer-link" href="/provider/login"><Icon name="logout" size={17} />Back to provider sign in</Link>
        </div>
      </aside>

      <main className="guide-provider-main">
        <header className="guide-provider-header">
          <div>
            <p className="guide-header-eyebrow">Tour guide workspace</p>
            <h1>{pageContent.title}</h1>
            <p>{pageContent.description}</p>
          </div>
          <div className="guide-header-actions">
            <span className="guide-preview-chip"><span />Preview mode</span>
            <div className="guide-notification-wrap">
              <button className="guide-notification-button" type="button" aria-label="Show sample notifications" aria-expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)}>
                <Icon name="bell" size={19} />
                <span className="guide-notification-dot" />
              </button>
              {notificationsOpen ? (
                <div className="guide-notification-popover">
                  <strong>Sample alerts</strong>
                  <p>{pendingRequestsCount} booking requests are waiting for a response.</p>
                  <button type="button" onClick={() => { setSection('bookings'); setBookingTab('requests'); setNotificationsOpen(false); }}>Review requests</button>
                </div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="guide-preview-banner" role="note">
          <span className="guide-preview-banner-icon">i</span>
          <p><strong>Preview data only.</strong> These bookings, reviews, and earnings are examples. Changes stay in this browser session and are not saved to a provider account.</p>
        </div>

        <div className="guide-provider-content">{renderActiveSection()}</div>
        <footer className="guide-dashboard-footer">EVOLANKA provider preview <span>·</span> No real bookings or payments are connected</footer>
      </main>

      <nav className="guide-mobile-nav" aria-label="Mobile provider dashboard">
        {navigation.filter((item) => ['dashboard', 'bookings', 'calendar', 'profile', 'settings'].includes(item.id)).map((item) => (
          <button className={section === item.id ? 'is-active' : ''} key={item.id} type="button" aria-current={section === item.id ? 'page' : undefined} onClick={() => setSection(item.id)}>
            <Icon name={item.icon} size={19} /><span>{item.label}</span>
          </button>
        ))}
      </nav>

      {selectedBooking ? (
        <div className="guide-modal-backdrop" role="presentation" onClick={() => setSelectedBooking(null)}>
          <section className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-booking-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="guide-modal-close" type="button" aria-label="Close booking details" onClick={() => setSelectedBooking(null)}><Icon name="close" size={19} /></button>
            <p className="guide-panel-eyebrow">Sample booking · #{selectedBooking.id}</p>
            <h2 id="guide-booking-modal-title">{selectedBooking.tour}</h2>
            <p className="guide-modal-location"><Icon name="location" size={16} />{selectedBooking.location}</p>
            <dl>
              <div><dt>Traveler</dt><dd>{selectedBooking.guest}</dd></div>
              <div><dt>Tour dates</dt><dd>{formatDate(selectedBooking.startDate)}{selectedBooking.durationDays > 1 ? ` – ${formatDate(selectedBooking.endDate)}` : ''}</dd></div>
              <div><dt>Duration</dt><dd>{selectedBooking.durationDays} {selectedBooking.durationDays === 1 ? 'day' : 'days'}</dd></div>
              <div><dt>Sample amount</dt><dd>{formatCurrency(selectedBooking.amount)}</dd></div>
            </dl>
            <p className="guide-small-note">Traveler messages and booking changes are not connected in preview mode.</p>
            <button className="guide-primary-button" type="button" onClick={() => setSelectedBooking(null)}>Close details</button>
          </section>
        </div>
      ) : null}

      {offerModalOpen ? (
        <div className="guide-modal-backdrop" role="presentation" onClick={() => setOfferModalOpen(false)}>
          <section className="guide-modal" role="dialog" aria-modal="true" aria-labelledby="guide-offer-modal-title" onClick={(event) => event.stopPropagation()}>
            <button className="guide-modal-close" type="button" aria-label="Close new offer form" onClick={() => setOfferModalOpen(false)}><Icon name="close" size={19} /></button>
            <p className="guide-panel-eyebrow">Preview only</p>
            <h2 id="guide-offer-modal-title">Create a tour offer</h2>
            <p className="guide-modal-intro">Try the form layout. Offers are not published or saved.</p>
            <form className="guide-offer-form" onSubmit={handleOfferSubmit}>
              <label>Tour title<input name="title" placeholder="e.g. Sunrise at Sigiriya" required /></label>
              <label>Location<input name="location" placeholder="e.g. Sigiriya" required /></label>
              <label>Price per traveler<input name="price" type="number" min="1" placeholder="95" required /></label>
              <button className="guide-primary-button" type="submit"><Icon name="check" size={17} />Save preview offer</button>
            </form>
          </section>
        </div>
      ) : null}

      {notice ? <div className="guide-toast" role="status"><span>{notice}</span><button type="button" aria-label="Dismiss message" onClick={() => setNotice('')}><Icon name="close" size={15} /></button></div> : null}
    </div>
  );
}
