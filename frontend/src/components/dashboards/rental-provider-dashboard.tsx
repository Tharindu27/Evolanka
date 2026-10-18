'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import {
  rentalProviders,
  rentalVehiclesByProvider,
  type RentalVehicleCategory,
} from '@/data/rentals';

type DashboardSection = 'overview' | 'fleet' | 'operations' | 'financials' | 'risk' | 'settings';
type FleetStatus = 'Available' | 'On rent' | 'Maintenance';
type RequestStatus = 'pending' | 'accepted' | 'declined';
type ClaimStatus = 'Assessment' | 'Settled' | 'Disputed' | 'Awaiting review' | 'Reviewed';
type IconName =
  | 'dashboard'
  | 'fleet'
  | 'operations'
  | 'financials'
  | 'risk'
  | 'settings'
  | 'search'
  | 'notifications'
  | 'add'
  | 'help'
  | 'signout'
  | 'check'
  | 'close'
  | 'arrow'
  | 'clock'
  | 'location'
  | 'trend'
  | 'download'
  | 'chevron'
  | 'filter'
  | 'money'
  | 'save'
  | 'more'
  | 'warning'
  | 'calendar'
  | 'edit'
  | 'eye';

type ManagedVehicle = {
  id: string;
  name: string;
  category: RentalVehicleCategory;
  dailyRate: number;
  seats: number;
  transmission: string;
  fuel: string;
  image: string;
  imageAlt: string;
  plate: string;
  status: FleetStatus;
  location: string;
  nextAvailable: string;
};

type BookingRequest = {
  id: string;
  renter: string;
  initials: string;
  renterType: string;
  vehicleId: string;
  vehicleName: string;
  pickup: string;
  durationDays: number;
  amount: number;
  status: RequestStatus;
};

type ActiveRental = {
  id: string;
  vehicleId: string;
  renter: string;
  status: string;
  returnIn: string;
  location: string;
};

type Claim = {
  id: string;
  vehicle: string;
  plate: string;
  renter: string;
  reported: string;
  estimate: number;
  status: ClaimStatus;
};

type VehicleDraft = {
  name: string;
  category: RentalVehicleCategory;
  dailyRate: string;
  seats: string;
  plate: string;
};

const rentalPreviewProvider = (() => {
  const provider = rentalProviders.find((item) => item.id === 'ceylon-rent-a-car');
  if (!provider) {
    throw new Error('The rental dashboard preview requires the Ceylon Rent-A-Car sample provider.');
  }
  return provider;
})();

const providerVehicles = rentalVehiclesByProvider[rentalPreviewProvider.id] ?? [];
if (providerVehicles.length === 0) {
  throw new Error('The rental dashboard preview requires sample fleet vehicles.');
}

const fleetAssignments: Record<
  string,
  Pick<ManagedVehicle, 'plate' | 'status' | 'location' | 'nextAvailable'>
> = {
  'toyota-prius': { plate: 'CBB-2413', status: 'On rent', location: 'Colombo 07', nextAvailable: 'Oct 22, 10:00' },
  'honda-vezel': { plate: 'WP CAD-4930', status: 'Available', location: 'Bandaranaike Airport', nextAvailable: 'Immediately' },
  'yamaha-nmax': { plate: 'WP BKE-2817', status: 'Maintenance', location: 'Colombo service centre', nextAvailable: 'Oct 24, 09:00' },
  'mitsubishi-montero': { plate: 'WP CAX-7231', status: 'On rent', location: 'Galle Fort', nextAvailable: 'Oct 21, 16:30' },
  'toyota-hiace': { plate: 'WP ND-8814', status: 'On rent', location: 'Negombo', nextAvailable: 'Oct 20, 12:00' },
  'suzuki-swift': { plate: 'WP CAA-1048', status: 'Available', location: 'Colombo 07', nextAvailable: 'Immediately' },
};

const initialFleet: ManagedVehicle[] = providerVehicles.map((vehicle) => {
  const assignment = fleetAssignments[vehicle.id];
  if (!assignment) {
    throw new Error(`The rental dashboard preview is missing sample fleet details for ${vehicle.id}.`);
  }

  return { ...vehicle, ...assignment };
});

const initialRequests: BookingRequest[] = [
  {
    id: 'REQ-2048',
    renter: 'Amaya Fernando',
    initials: 'AF',
    renterType: 'Returning renter',
    vehicleId: 'honda-vezel',
    vehicleName: 'Honda Vezel',
    pickup: 'Oct 21 · 10:00',
    durationDays: 2,
    amount: 36000,
    status: 'pending',
  },
  {
    id: 'REQ-2051',
    renter: 'Daniel Roberts',
    initials: 'DR',
    renterType: 'First-time renter',
    vehicleId: 'suzuki-swift',
    vehicleName: 'Suzuki Swift',
    pickup: 'Oct 23 · 09:30',
    durationDays: 1,
    amount: 10000,
    status: 'pending',
  },
];

const activeRentals: ActiveRental[] = [
  { id: 'RNT-8921', vehicleId: 'toyota-prius', renter: 'Sarah Jenkins', status: 'On route', returnIn: '2h 15m', location: 'Colombo 07' },
  { id: 'RNT-4402', vehicleId: 'mitsubishi-montero', renter: 'David Chen', status: 'On route', returnIn: '6h 45m', location: 'Galle Fort' },
  { id: 'RNT-2119', vehicleId: 'toyota-hiace', renter: 'Amara Perera', status: 'Return due', returnIn: 'Overdue · sample', location: 'Negombo' },
];

const overdueReturns = [
  { vehicleId: 'toyota-hiace', renter: 'Amara Perera', overdue: '1h 08m', location: 'Negombo' },
  { vehicleId: 'mitsubishi-montero', renter: 'David Chen', overdue: '45m', location: 'Galle Fort' },
];

const initialClaims: Claim[] = [
  { id: 'CLM-82941', vehicle: 'Toyota Prius', plate: 'CBB-2413', renter: 'Sarah Jenkins', reported: 'Oct 16, 2026', estimate: 24500, status: 'Assessment' },
  { id: 'CLM-82939', vehicle: 'Honda Vezel', plate: 'WP CAD-4930', renter: 'Nimal Perera', reported: 'Oct 14, 2026', estimate: 8500, status: 'Settled' },
  { id: 'CLM-82935', vehicle: 'Mitsubishi Montero', plate: 'WP CAX-7231', renter: 'David Chen', reported: 'Oct 12, 2026', estimate: 52000, status: 'Disputed' },
];

const initialSettings = {
  businessName: rentalPreviewProvider.name,
  serviceLocation: rentalPreviewProvider.location,
  serviceArea: 'Colombo, airport and western province',
  notifyBookings: true,
  notifyFleet: true,
};

const navigation: { id: DashboardSection; label: string; icon: IconName }[] = [
  { id: 'overview', label: 'Dashboard', icon: 'dashboard' },
  { id: 'fleet', label: 'Fleet management', icon: 'fleet' },
  { id: 'operations', label: 'Rental operations', icon: 'operations' },
  { id: 'financials', label: 'Financials', icon: 'financials' },
  { id: 'risk', label: 'Risk & safety', icon: 'risk' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
];

const sectionContent: Record<DashboardSection, { title: string; description: string }> = {
  overview: {
    title: 'Rental partner overview',
    description: 'A sample snapshot of your fleet, rental requests, and provider activity.',
  },
  fleet: {
    title: 'Fleet management',
    description: 'Review sample vehicle availability, rates, and maintenance status.',
  },
  operations: {
    title: 'Rental operations',
    description: 'Review sample booking requests, current rentals, and return alerts.',
  },
  financials: {
    title: 'Financial overview',
    description: 'Explore illustrative rental income, deposits, and claims.',
  },
  risk: {
    title: 'Risk & safety',
    description: 'Review sample fleet readiness and incident records.',
  },
  settings: {
    title: 'Provider settings',
    description: 'Manage the business details displayed in this local dashboard preview.',
  },
};

const icons: Record<IconName, ReactNode> = {
  dashboard: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="5" rx="1.5" /><rect x="13" y="10" width="8" height="11" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /></>,
  fleet: <><path d="m5 11 1.5-4h11L19 11" /><path d="M3 11h18v7H3zM6 18v2M18 18v2" /><circle cx="7" cy="14" r=".7" /><circle cx="17" cy="14" r=".7" /></>,
  operations: <><rect x="4" y="4" width="16" height="17" rx="2" /><path d="M9 4V2h6v2M8 10h8M8 14h8M8 18h4" /></>,
  financials: <><path d="M4 19V5M4 19h17" /><path d="m7 15 4-4 3 2 5-6" /><path d="M16 7h3v3" /></>,
  risk: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  settings: <><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="m19.4 15 .1.1 1.1.9-1.4 2.4-1.4-.5a8 8 0 0 1-1.4.8l-.3 1.5h-2.8l-.3-1.5a8 8 0 0 1-1.4-.8l-1.4.5-1.4-2.4 1.1-.9a7 7 0 0 1 0-1.6l-1.1-.9 1.4-2.4 1.4.5a8 8 0 0 1 1.4-.8l.3-1.5h2.8l.3 1.5a8 8 0 0 1 1.4.8l1.4-.5 1.4 2.4-1.1.9a7 7 0 0 1 0 1.6Z" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  notifications: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
  add: <><path d="M12 5v14M5 12h14" /></>,
  help: <><circle cx="12" cy="12" r="9" /><path d="M9.6 9a2.5 2.5 0 1 1 4.5 1.5c-1.2 1.1-2.1 1.4-2.1 3M12 17h.01" /></>,
  signout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  trend: <><path d="m3 17 6-6 4 4 8-9" /><path d="M15 6h6v6" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5M4 20h16" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  filter: <><path d="M4 6h16M7 12h10M10 18h4" /><circle cx="8" cy="6" r="1.5" /><circle cx="15" cy="12" r="1.5" /></>,
  money: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M8 15h3" /></>,
  save: <><path d="M5 3h12l4 4v14H3V3h2Z" /><path d="M7 3v6h10V3M7 21v-8h10v8" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  warning: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v4M12 16h.01" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  edit: <><path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" /></>,
  eye: <><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
};

const initialVehicleDraft: VehicleDraft = {
  name: '',
  category: 'car',
  dailyRate: '',
  seats: '5',
  plate: '',
};

const revenueSeries = {
  month: { labels: ['1–5', '6–10', '11–15', '16–20', '21–25', '26–31'], values: [38, 52, 47, 73, 62, 89] },
  quarter: { labels: ['Jul', 'Aug', 'Sep'], values: [58, 76, 91] },
  year: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], values: [42, 68, 84, 72] },
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
}

function formatRupees(amount: number) {
  return `Rs. ${amount.toLocaleString('en-LK')}`;
}

function categoryLabel(category: RentalVehicleCategory) {
  const labels: Record<RentalVehicleCategory, string> = {
    car: 'Car',
    motorbike: 'Motorbike',
    suv: 'SUV',
    van: 'Van',
  };
  return labels[category];
}

function fleetStatusClass(status: FleetStatus) {
  return status.toLowerCase().replace(' ', '-');
}

function claimStatusClass(status: ClaimStatus) {
  return status.toLowerCase().replaceAll(' ', '-');
}

function IconButton({
  icon,
  label,
  onClick,
  expanded,
}: {
  icon: IconName;
  label: string;
  onClick: () => void;
  expanded?: boolean;
}) {
  return (
    <button className="rental-provider-icon-button" type="button" aria-label={label} aria-expanded={expanded} onClick={onClick}>
      <Icon name={icon} size={19} />
    </button>
  );
}

export default function RentalProviderDashboard() {
  const [section, setSection] = useState<DashboardSection>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [fleetFilter, setFleetFilter] = useState<'all' | FleetStatus>('all');
  const [requestFilter, setRequestFilter] = useState<'all' | RequestStatus>('all');
  const [requests, setRequests] = useState(initialRequests);
  const [fleet, setFleet] = useState(initialFleet);
  const [claims, setClaims] = useState(initialClaims);
  const [timeRange, setTimeRange] = useState<keyof typeof revenueSeries>('month');
  const [notice, setNotice] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState<ManagedVehicle | null>(null);
  const [vehicleDraft, setVehicleDraft] = useState(initialVehicleDraft);
  const [settings, setSettings] = useState(initialSettings);

  const pendingRequests = requests.filter((request) => request.status === 'pending');
  const fleetCounts = {
    all: fleet.length,
    available: fleet.filter((vehicle) => vehicle.status === 'Available').length,
    onRent: fleet.filter((vehicle) => vehicle.status === 'On rent').length,
    maintenance: fleet.filter((vehicle) => vehicle.status === 'Maintenance').length,
  };
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredFleet = useMemo(
    () =>
      fleet.filter((vehicle) => {
        const matchesStatus = fleetFilter === 'all' || vehicle.status === fleetFilter;
        const matchesQuery = `${vehicle.name} ${vehicle.plate} ${vehicle.location}`.toLowerCase().includes(normalizedQuery);
        return matchesStatus && matchesQuery;
      }),
    [fleet, fleetFilter, normalizedQuery],
  );
  const filteredRequests = requests.filter((request) => {
    const matchesStatus = requestFilter === 'all' || request.status === requestFilter;
    const matchesQuery = `${request.renter} ${request.vehicleName} ${request.id}`.toLowerCase().includes(normalizedQuery);
    return matchesStatus && matchesQuery;
  });
  const filteredRentals = activeRentals.filter((rental) =>
    `${rental.renter} ${rental.location} ${rental.id}`.toLowerCase().includes(normalizedQuery),
  );
  const content = sectionContent[section];

  function changeSection(nextSection: DashboardSection) {
    setSection(nextSection);
    setMobileMoreOpen(false);
    setNotificationsOpen(false);
    setSearchQuery('');
  }

  function respondToRequest(id: string, status: RequestStatus) {
    const request = requests.find((item) => item.id === id);
    if (!request) return;

    setRequests((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    if (status === 'accepted') {
      setFleet((current) => current.map((vehicle) =>
        vehicle.id === request.vehicleId ? { ...vehicle, status: 'On rent', nextAvailable: request.pickup } : vehicle,
      ));
    } else if (request.status === 'accepted') {
      setFleet((current) => current.map((vehicle) =>
        vehicle.id === request.vehicleId ? { ...vehicle, status: 'Available', nextAvailable: 'Immediately' } : vehicle,
      ));
    }

    const message = status === 'pending'
      ? 'Request response reset in this preview; no renter was notified.'
      : `Request ${status} in this preview only; no renter was notified.`;
    setNotice(message);
  }

  function toggleMaintenanceStatus(vehicle: ManagedVehicle) {
    if (vehicle.status === 'On rent') {
      setNotice('A rented vehicle cannot be changed in this preview.');
      return;
    }

    const nextStatus: FleetStatus = vehicle.status === 'Maintenance' ? 'Available' : 'Maintenance';
    setFleet((current) => current.map((item) =>
      item.id === vehicle.id
        ? { ...item, status: nextStatus, nextAvailable: nextStatus === 'Available' ? 'Immediately' : 'Oct 24, 09:00' }
        : item,
    ));
    setNotice(`${vehicle.name} marked ${nextStatus.toLowerCase()} in this preview only.`);
  }

  function addVehicle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const vehicle: ManagedVehicle = {
      id: `preview-${Date.now()}`,
      name: vehicleDraft.name.trim(),
      category: vehicleDraft.category,
      dailyRate: Number(vehicleDraft.dailyRate),
      seats: Number(vehicleDraft.seats),
      transmission: 'Automatic',
      fuel: 'Not specified',
      image: '',
      imageAlt: `${vehicleDraft.name.trim()} sample vehicle`,
      plate: vehicleDraft.plate.trim() || 'PREVIEW',
      status: 'Available',
      location: settings.serviceLocation,
      nextAvailable: 'Immediately',
    };

    setFleet((current) => [...current, vehicle]);
    setVehicleDraft(initialVehicleDraft);
    setAddVehicleOpen(false);
    setNotice('Vehicle added to this local preview only; no public fleet listing was changed.');
  }

  function updateClaim(id: string, status: ClaimStatus) {
    setClaims((current) => current.map((claim) => claim.id === id ? { ...claim, status } : claim));
    setNotice(`Claim marked ${status.toLowerCase()} in this preview only.`);
  }

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('Provider settings updated in this preview only; nothing was sent to an account.');
  }

  function discardSettings() {
    setSettings(initialSettings);
    setNotice('Unsaved provider settings were reset in this preview.');
  }

  function renderVehicleThumb(vehicle: ManagedVehicle) {
    if (!vehicle.image) {
      return <span className="rental-provider-vehicle-placeholder"><Icon name="fleet" size={22} /></span>;
    }

    return (
      <Image
        src={vehicle.image}
        alt={vehicle.imageAlt}
        width={72}
        height={52}
        className="rental-provider-vehicle-thumb"
      />
    );
  }

  function renderStatus(status: FleetStatus) {
    return <span className={`rental-provider-status rental-provider-status-${fleetStatusClass(status)}`}>{status}</span>;
  }

  function renderRequestStatus(status: RequestStatus) {
    const label = status === 'pending' ? 'Pending' : `${status[0].toUpperCase()}${status.slice(1)} · preview`;
    return <span className={`rental-provider-status rental-provider-request-${status}`}>{label}</span>;
  }

  function renderClaimStatus(status: ClaimStatus) {
    return <span className={`rental-provider-status rental-provider-claim-${claimStatusClass(status)}`}>{status}</span>;
  }

  function renderRequestCard(request: BookingRequest) {
    const vehicle = fleet.find((item) => item.id === request.vehicleId);

    return (
      <article className="rental-provider-request-card" key={request.id}>
        <div className="rental-provider-request-top">
          <span className="rental-provider-avatar">{request.initials}</span>
          <div className="rental-provider-request-renter">
            <strong>{request.renter}</strong>
            <span>{request.renterType} · {request.id}</span>
          </div>
          <div className="rental-provider-request-amount">
            <strong>{formatRupees(request.amount)}</strong>
            <span>{request.durationDays} day{request.durationDays === 1 ? '' : 's'}</span>
          </div>
        </div>
        <div className="rental-provider-request-vehicle">
          <Icon name="fleet" size={16} />
          <span>{request.vehicleName}</span>
          <span className="rental-provider-request-date">{request.pickup}</span>
        </div>
        <div className="rental-provider-request-actions">
          {request.status === 'pending' ? (
            <>
              <button className="rental-provider-button rental-provider-button-primary" type="button" onClick={() => respondToRequest(request.id, 'accepted')}>
                <Icon name="check" size={15} />Accept request
              </button>
              <button className="rental-provider-button rental-provider-button-danger" type="button" onClick={() => respondToRequest(request.id, 'declined')}>
                <Icon name="close" size={15} />Decline
              </button>
            </>
          ) : (
            <>
              {renderRequestStatus(request.status)}
              <button className="rental-provider-text-button" type="button" onClick={() => respondToRequest(request.id, 'pending')}>Undo response</button>
            </>
          )}
        </div>
        {vehicle ? <span className="rental-provider-visually-hidden">{vehicle.status} in fleet preview</span> : null}
      </article>
    );
  }

  function renderOverview() {
    const stats = [
      { title: 'Fleet vehicles', value: String(fleetCounts.all), detail: 'Sample inventory', icon: 'fleet' as const, tone: 'blue' },
      { title: 'Available', value: String(fleetCounts.available), detail: 'Ready in preview', icon: 'check' as const, tone: 'green' },
      { title: 'On rent', value: String(fleetCounts.onRent), detail: 'Sample agreements', icon: 'operations' as const, tone: 'gold' },
      { title: 'Pending requests', value: String(pendingRequests.length), detail: 'Need a response', icon: 'calendar' as const, tone: 'orange' },
    ];

    return (
      <>
        <div className="rental-provider-stat-grid">
          {stats.map((stat) => (
            <article className="rental-provider-stat-card" key={stat.title}>
              <div className="rental-provider-stat-heading">
                <span className={`rental-provider-stat-icon rental-provider-stat-icon-${stat.tone}`}><Icon name={stat.icon} size={19} /></span>
                <span>{stat.title}</span>
              </div>
              <strong>{stat.value}</strong>
              <small>{stat.detail}</small>
            </article>
          ))}
        </div>

        <div className="rental-provider-overview-grid">
          <section className="rental-provider-panel">
            <div className="rental-provider-panel-heading">
              <div><p className="rental-provider-eyebrow">Needs attention</p><h2>New booking requests</h2></div>
              <button className="rental-provider-text-button" type="button" onClick={() => changeSection('operations')}>
                Review all <Icon name="chevron" size={15} />
              </button>
            </div>
            <div className="rental-provider-request-list">
              {pendingRequests.length > 0
                ? pendingRequests.slice(0, 2).map(renderRequestCard)
                : <div className="rental-provider-empty">No sample requests are waiting for review.</div>}
            </div>
          </section>

          <aside className="rental-provider-overview-aside">
            <section className="rental-provider-panel rental-provider-utilization-card">
              <div className="rental-provider-panel-heading">
                <div><p className="rental-provider-eyebrow">Fleet snapshot</p><h2>Availability</h2></div>
                <button className="rental-provider-icon-button" type="button" aria-label="Open fleet management" onClick={() => changeSection('fleet')}><Icon name="arrow" size={17} /></button>
              </div>
              <div className="rental-provider-utilization-value"><strong>{fleetCounts.all ? Math.round((fleetCounts.onRent / fleetCounts.all) * 100) : 0}%</strong><span>Sample utilization</span></div>
              <div className="rental-provider-progress"><span style={{ width: `${fleetCounts.all ? (fleetCounts.onRent / fleetCounts.all) * 100 : 0}%` }} /></div>
              <div className="rental-provider-utilization-legend">
                <span><i className="rental-provider-dot rental-provider-dot-available" />Available <b>{fleetCounts.available}</b></span>
                <span><i className="rental-provider-dot rental-provider-dot-rented" />On rent <b>{fleetCounts.onRent}</b></span>
                <span><i className="rental-provider-dot rental-provider-dot-service" />Service <b>{fleetCounts.maintenance}</b></span>
              </div>
            </section>
            <section className="rental-provider-panel rental-provider-quick-actions">
              <p className="rental-provider-eyebrow">Shortcuts</p>
              <button type="button" onClick={() => { changeSection('fleet'); setAddVehicleOpen(true); }}>
                <span><Icon name="add" size={17} />Add vehicle</span><Icon name="chevron" size={15} />
              </button>
              <button type="button" onClick={() => changeSection('financials')}>
                <span><Icon name="financials" size={17} />Review finances</span><Icon name="chevron" size={15} />
              </button>
            </section>
          </aside>
        </div>
        <section className="rental-provider-panel rental-provider-recent-panel">
          <div className="rental-provider-panel-heading">
            <div><p className="rental-provider-eyebrow">Sample agreements</p><h2>Current rentals</h2></div>
            <button className="rental-provider-text-button" type="button" onClick={() => changeSection('operations')}>Open operations <Icon name="chevron" size={15} /></button>
          </div>
          {renderActiveRentalsTable(activeRentals.slice(0, 3))}
        </section>
      </>
    );
  }

  function renderFleet() {
    return (
      <>
        <div className="rental-provider-stat-grid rental-provider-stat-grid-compact">
          <article className="rental-provider-stat-card"><div className="rental-provider-stat-heading"><span className="rental-provider-stat-icon rental-provider-stat-icon-blue"><Icon name="fleet" /></span><span>Vehicles</span></div><strong>{fleetCounts.all}</strong><small>Local sample inventory</small></article>
          <article className="rental-provider-stat-card"><div className="rental-provider-stat-heading"><span className="rental-provider-stat-icon rental-provider-stat-icon-green"><Icon name="check" /></span><span>Available</span></div><strong>{fleetCounts.available}</strong><small>Ready in this preview</small></article>
          <article className="rental-provider-stat-card"><div className="rental-provider-stat-heading"><span className="rental-provider-stat-icon rental-provider-stat-icon-gold"><Icon name="operations" /></span><span>On rent</span></div><strong>{fleetCounts.onRent}</strong><small>Sample agreements</small></article>
          <article className="rental-provider-stat-card"><div className="rental-provider-stat-heading"><span className="rental-provider-stat-icon rental-provider-stat-icon-red"><Icon name="warning" /></span><span>Maintenance</span></div><strong>{fleetCounts.maintenance}</strong><small>Sample service status</small></article>
        </div>

        <section className="rental-provider-panel rental-provider-fleet-panel">
          <div className="rental-provider-panel-heading rental-provider-fleet-heading">
            <div><p className="rental-provider-eyebrow">Sample inventory</p><h2>Fleet availability tracker</h2></div>
            <div className="rental-provider-fleet-tools">
              <label>
                <span className="rental-provider-visually-hidden">Filter fleet by status</span>
                <select value={fleetFilter} onChange={(event) => setFleetFilter(event.target.value as 'all' | FleetStatus)}>
                  <option value="all">All statuses</option>
                  <option value="Available">Available</option>
                  <option value="On rent">On rent</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </label>
              <button className="rental-provider-button rental-provider-button-secondary" type="button" onClick={() => setAddVehicleOpen(true)}>
                <Icon name="add" size={16} />Add vehicle
              </button>
            </div>
          </div>
          <div className="rental-provider-table-scroll">
            <table className="rental-provider-table rental-provider-fleet-table">
              <thead><tr><th>Vehicle</th><th>Status</th><th>Location</th><th>Daily rate</th><th>Next available</th><th><span className="rental-provider-visually-hidden">Actions</span></th></tr></thead>
              <tbody>
                {filteredFleet.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>
                      <div className="rental-provider-vehicle-cell">
                        {renderVehicleThumb(vehicle)}
                        <span><strong>{vehicle.name}</strong><small>{vehicle.plate} · {categoryLabel(vehicle.category)}</small></span>
                      </div>
                    </td>
                    <td>{renderStatus(vehicle.status)}</td>
                    <td><span className="rental-provider-table-main">{vehicle.location}</span><small className="rental-provider-table-secondary">{vehicle.seats} seats · {vehicle.transmission}</small></td>
                    <td><strong>{formatRupees(vehicle.dailyRate)}</strong><small className="rental-provider-table-secondary">per day</small></td>
                    <td>{vehicle.nextAvailable}</td>
                    <td>
                      <div className="rental-provider-row-actions">
                        <button className="rental-provider-icon-button" type="button" aria-label={`View ${vehicle.name} details`} onClick={() => setVehicleDetails(vehicle)}><Icon name="eye" size={17} /></button>
                        <button
                          className="rental-provider-icon-button"
                          type="button"
                          aria-label={vehicle.status === 'Maintenance' ? `Mark ${vehicle.name} available` : `Mark ${vehicle.name} for maintenance`}
                          disabled={vehicle.status === 'On rent'}
                          onClick={() => toggleMaintenanceStatus(vehicle)}
                        >
                          <Icon name={vehicle.status === 'Maintenance' ? 'check' : 'settings'} size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredFleet.length === 0 ? <tr><td className="rental-provider-empty-cell" colSpan={6}>No sample vehicles match your search and status filters.</td></tr> : null}
              </tbody>
            </table>
          </div>
          <div className="rental-provider-table-footer">
            <span>Showing {filteredFleet.length} of {fleet.length} sample vehicles</span>
            <span>Availability does not update public rental listings.</span>
          </div>
        </section>
        <div className="rental-provider-fleet-health">
          <section className="rental-provider-panel">
            <p className="rental-provider-eyebrow">Service readiness</p>
            <h2>Fleet health pulse</h2>
            <div className="rental-provider-health-item"><div><span>Maintenance status</span><strong>{Math.max(fleetCounts.all - fleetCounts.maintenance, 0)} / {fleetCounts.all} sample vehicles ready</strong></div><div className="rental-provider-progress"><span style={{ width: `${fleetCounts.all ? ((fleetCounts.all - fleetCounts.maintenance) / fleetCounts.all) * 100 : 0}%` }} /></div></div>
            <div className="rental-provider-insight"><Icon name="warning" size={18} /><p><strong>Preview insight</strong><span>Service schedules and vehicle inspections are not connected to a live fleet system.</span></p></div>
          </section>
          <section className="rental-provider-panel rental-provider-fleet-location">
            <p className="rental-provider-eyebrow">Sample pickup locations</p>
            <h2>Regional distribution</h2>
            <div><Icon name="location" size={18} /><span>Colombo 07</span><strong>{fleet.filter((vehicle) => vehicle.location.includes('Colombo')).length}</strong></div>
            <div><Icon name="location" size={18} /><span>Airport / Negombo</span><strong>{fleet.filter((vehicle) => /airport|negombo/i.test(vehicle.location)).length}</strong></div>
            <p>GPS positioning and live vehicle tracking are not connected.</p>
          </section>
        </div>
      </>
    );
  }

  function renderOperations() {
    return (
      <>
        <section className="rental-provider-panel rental-provider-alert-panel">
          <div className="rental-provider-panel-heading">
            <div className="rental-provider-alert-title"><span><Icon name="warning" size={20} /></span><div><p className="rental-provider-eyebrow">Sample return alerts</p><h2>Overdue return review</h2></div></div>
            <span className="rental-provider-alert-count">{overdueReturns.length} SAMPLE ALERTS</span>
          </div>
          <div className="rental-provider-alert-grid">
            {overdueReturns.map((alert) => {
              const vehicle = fleet.find((item) => item.id === alert.vehicleId);
              return (
                <article className="rental-provider-alert-card" key={alert.vehicleId}>
                  <span className="rental-provider-alert-car"><Icon name="fleet" size={21} /></span>
                  <div><strong>{vehicle?.name ?? 'Sample vehicle'}</strong><span>Return overdue by {alert.overdue}</span><small>{alert.renter} · {alert.location}</small></div>
                  <button className="rental-provider-icon-button" type="button" aria-label={`Review ${vehicle?.name ?? 'vehicle'} return alert`} onClick={() => changeSection('risk')}><Icon name="arrow" size={16} /></button>
                </article>
              );
            })}
          </div>
          <p className="rental-provider-panel-note">All return alerts are illustrative; no customer or vehicle tracking is connected.</p>
        </section>

        <div className="rental-provider-operations-grid">
          <section className="rental-provider-panel rental-provider-requests-panel">
            <div className="rental-provider-panel-heading">
              <div><p className="rental-provider-eyebrow">Renter requests</p><h2>Booking requests</h2></div>
              <span className="rental-provider-count-pill">{pendingRequests.length} pending</span>
            </div>
            <div className="rental-provider-request-toolbar">
              <label>
                <span className="rental-provider-visually-hidden">Filter booking requests</span>
                <select value={requestFilter} onChange={(event) => setRequestFilter(event.target.value as 'all' | RequestStatus)}>
                  <option value="all">All requests</option>
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="declined">Declined</option>
                </select>
              </label>
              <span>Sample requests only</span>
            </div>
            <div className="rental-provider-request-list">
              {filteredRequests.length > 0
                ? filteredRequests.map(renderRequestCard)
                : <div className="rental-provider-empty">No sample booking requests match these filters.</div>}
            </div>
          </section>
          <section className="rental-provider-panel rental-provider-active-panel">
            <div className="rental-provider-panel-heading">
              <div><p className="rental-provider-eyebrow">Current agreements</p><h2>Active rentals</h2></div>
              <span className="rental-provider-tracking-chip"><span />Tracking unavailable</span>
            </div>
            {renderActiveRentalsTable(filteredRentals)}
            <p className="rental-provider-panel-note">Return estimates and renter names are sample content, not live tracking.</p>
          </section>
        </div>
      </>
    );
  }

  function renderActiveRentalsTable(rentals: ActiveRental[]) {
    return (
      <div className="rental-provider-table-scroll">
        <table className="rental-provider-table rental-provider-active-table">
          <thead><tr><th>Vehicle</th><th>Renter</th><th>Status</th><th>Return</th><th>Location</th><th><span className="rental-provider-visually-hidden">Details</span></th></tr></thead>
          <tbody>
            {rentals.map((rental) => {
              const vehicle = fleet.find((item) => item.id === rental.vehicleId);
              if (!vehicle) return null;
              return (
                <tr key={rental.id}>
                  <td><div className="rental-provider-vehicle-cell">{renderVehicleThumb(vehicle)}<span><strong>{vehicle.name}</strong><small>{vehicle.plate} · {rental.id}</small></span></div></td>
                  <td>{rental.renter}</td>
                  <td><span className={`rental-provider-status ${rental.status === 'Return due' ? 'rental-provider-status-overdue' : 'rental-provider-status-on-rent'}`}>{rental.status}</span></td>
                  <td>{rental.returnIn}</td>
                  <td>{rental.location}</td>
                  <td><button className="rental-provider-icon-button" type="button" aria-label={`View ${vehicle.name} rental details`} onClick={() => setVehicleDetails(vehicle)}><Icon name="more" size={17} /></button></td>
                </tr>
              );
            })}
            {rentals.length === 0 ? <tr><td className="rental-provider-empty-cell" colSpan={6}>No sample rentals match your search.</td></tr> : null}
          </tbody>
        </table>
      </div>
    );
  }

  function renderFinancials() {
    const selectedSeries = revenueSeries[timeRange];
    const income = timeRange === 'month' ? 2450000 : timeRange === 'quarter' ? 6840000 : 22450000;

    return (
      <>
        <div className="rental-provider-financial-summary">
          <article className="rental-provider-financial-total">
            <span><Icon name="financials" size={20} />Sample rental income</span>
            <strong>{formatRupees(income)}</strong>
            <small>Illustrative gross revenue · {timeRange}</small>
          </article>
          <article className="rental-provider-financial-stat"><span>Security deposits</span><strong>{formatRupees(428500)}</strong><small>Sample amount held</small></article>
          <article className="rental-provider-financial-stat"><span>Pending refunds</span><strong>2</strong><small>Example transactions</small></article>
          <article className="rental-provider-financial-stat"><span>Active agreements</span><strong>{activeRentals.length}</strong><small>Sample contracts</small></article>
        </div>

        <div className="rental-provider-financial-grid">
          <section className="rental-provider-panel rental-provider-revenue-panel">
            <div className="rental-provider-panel-heading rental-provider-revenue-heading">
              <div><p className="rental-provider-eyebrow">Illustrative trend</p><h2>Rental income analytics</h2><p>Sample revenue by reporting period</p></div>
              <div className="rental-provider-range-tabs" role="group" aria-label="Revenue reporting period">
                {(['month', 'quarter', 'year'] as const).map((range) => (
                  <button className={timeRange === range ? 'is-active' : ''} type="button" key={range} aria-pressed={timeRange === range} onClick={() => setTimeRange(range)}>
                    {range[0].toUpperCase()}{range.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="rental-provider-chart" role="img" aria-label={`Sample rental revenue chart for the ${timeRange}`}>
              <div className="rental-provider-chart-y-labels"><span>High</span><span>Mid</span><span>Low</span></div>
              <div className="rental-provider-chart-grid">
                {[0, 1, 2].map((line) => <i key={line} />)}
                <div className="rental-provider-chart-bars">
                  {selectedSeries.values.map((value, index) => (
                    <div className="rental-provider-chart-column" key={`${selectedSeries.labels[index]}-${value}`}>
                      <span style={{ height: `${value}%` }} />
                      <small>{selectedSeries.labels[index]}</small>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="rental-provider-panel-note">This chart is a static illustration, not a transaction report.</p>
          </section>

          <section className="rental-provider-panel rental-provider-deposits-panel">
            <div className="rental-provider-panel-heading"><div><p className="rental-provider-eyebrow">Sample balances</p><h2>Security deposits</h2></div><Icon name="money" size={21} /></div>
            <p className="rental-provider-deposit-caption">Illustrative amount held for example agreements</p>
            <strong className="rental-provider-deposit-total">{formatRupees(428500)}</strong>
            <span className="rental-provider-deposit-change"><Icon name="trend" size={15} />Example month-on-month movement</span>
            <div className="rental-provider-deposit-breakdown"><span>Active contracts <b>{activeRentals.length}</b></span><span>Pending refunds <b>2</b></span></div>
            <button className="rental-provider-button rental-provider-button-secondary" type="button" onClick={() => setNotice('Escrow and refund management are not connected; no funds were changed.')}>Review sample deposits</button>
          </section>
        </div>

        <section className="rental-provider-panel rental-provider-claims-panel">
          <div className="rental-provider-panel-heading">
            <div><p className="rental-provider-eyebrow">Sample incident log</p><h2>Damage claims &amp; deductions</h2></div>
            <button className="rental-provider-button rental-provider-button-secondary" type="button" onClick={() => setNotice('A financial export is not connected; these figures are sample values.')}>
              <Icon name="download" size={16} />Export preview
            </button>
          </div>
          {renderClaimsTable()}
        </section>

        <div className="rental-provider-payout-grid">
          <section className="rental-provider-panel">
            <p className="rental-provider-eyebrow">Example timetable</p>
            <h2>Payout schedule</h2>
            <div className="rental-provider-payout-item"><i /><div><strong>Next settlement</strong><span>Oct 30, 2026 · sample date</span></div><b>{formatRupees(128490)}</b></div>
            <div className="rental-provider-payout-item"><i /><div><strong>Tax reserve filing</strong><span>Nov 15, 2026 · sample date</span></div><b>{formatRupees(22040)}</b></div>
            <button className="rental-provider-text-button" type="button" onClick={() => setNotice('Payout schedules and transfers are not connected in this preview.')}>View payout details <Icon name="chevron" size={15} /></button>
          </section>
          <section className="rental-provider-insight">
            <span className="rental-provider-insight-icon"><Icon name="risk" size={20} /></span>
            <div><p className="rental-provider-eyebrow">Financial safety</p><h2>Keep claims reviewable</h2><p>Incident costs, deposits, and settlements are sample values. The dashboard is not connected to payment processing or an accounting system.</p><button className="rental-provider-text-button" type="button" onClick={() => changeSection('risk')}>Review sample claims <Icon name="chevron" size={15} /></button></div>
          </section>
        </div>
      </>
    );
  }

  function renderClaimsTable() {
    return (
      <div className="rental-provider-table-scroll">
        <table className="rental-provider-table rental-provider-claims-table">
          <thead><tr><th>Claim ID</th><th>Vehicle / plate</th><th>Renter</th><th>Reported</th><th>Estimate</th><th>Status</th><th><span className="rental-provider-visually-hidden">Action</span></th></tr></thead>
          <tbody>
            {claims.map((claim) => (
              <tr key={claim.id}>
                <td><strong>#{claim.id}</strong></td>
                <td><span className="rental-provider-table-main">{claim.vehicle}</span><small className="rental-provider-table-secondary">{claim.plate}</small></td>
                <td>{claim.renter}</td>
                <td>{claim.reported}</td>
                <td><strong>{formatRupees(claim.estimate)}</strong></td>
                <td>{renderClaimStatus(claim.status)}</td>
                <td><button className="rental-provider-text-button" type="button" onClick={() => updateClaim(claim.id, claim.status === 'Reviewed' ? 'Assessment' : 'Reviewed')}>{claim.status === 'Reviewed' ? 'Undo' : 'Review'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function renderRisk() {
    const maintenanceVehicles = fleet.filter((vehicle) => vehicle.status === 'Maintenance');
    const openClaims = claims.filter((claim) => claim.status !== 'Settled' && claim.status !== 'Reviewed');

    return (
      <>
        <section className="rental-provider-risk-banner">
          <span><Icon name="risk" size={22} /></span>
          <div><p className="rental-provider-eyebrow">Preview only</p><h2>Risk indicators are not connected to live systems</h2><p>Vehicle GPS, insurance verification, identity checks, and payment risk services are not available in this demo.</p></div>
        </section>
        <div className="rental-provider-risk-stats">
          <article className="rental-provider-panel"><span>Sample return alerts</span><strong>{overdueReturns.length}</strong><small>No renter notifications were sent.</small></article>
          <article className="rental-provider-panel"><span>Vehicles in maintenance</span><strong>{maintenanceVehicles.length}</strong><small>Local preview status only.</small></article>
          <article className="rental-provider-panel"><span>Claims needing review</span><strong>{openClaims.length}</strong><small>Example incident log entries.</small></article>
        </div>
        <div className="rental-provider-risk-layout">
          <section className="rental-provider-panel">
            <div className="rental-provider-panel-heading"><div><p className="rental-provider-eyebrow">Sample incidents</p><h2>Claims review queue</h2></div><span className="rental-provider-count-pill">{openClaims.length} open examples</span></div>
            {renderClaimsTable()}
          </section>
          <section className="rental-provider-panel rental-provider-risk-checklist">
            <p className="rental-provider-eyebrow">Fleet safeguards</p>
            <h2>Readiness checklist</h2>
            <div><Icon name="check" size={16} /><span>Vehicle availability sample reviewed</span><b>Preview</b></div>
            <div><Icon name="warning" size={16} /><span>Insurance status integration</span><b>Not connected</b></div>
            <div><Icon name="warning" size={16} /><span>GPS and return alerts</span><b>Not connected</b></div>
            <div><Icon name="warning" size={16} /><span>Payment risk signals</span><b>Not connected</b></div>
            <button className="rental-provider-button rental-provider-button-secondary" type="button" onClick={() => setNotice('Compliance and risk audits are not available in this preview.')}>View sample risk notes</button>
          </section>
        </div>
      </>
    );
  }

  function renderSettings() {
    return (
      <div className="rental-provider-settings-grid">
        <section className="rental-provider-panel rental-provider-settings-panel">
          <div className="rental-provider-panel-heading"><div><p className="rental-provider-eyebrow">Business profile</p><h2>Provider details</h2></div><span className="rental-provider-preview-pill">Preview account</span></div>
          <form onSubmit={saveSettings}>
            <label>Business name<input value={settings.businessName} onChange={(event) => setSettings((current) => ({ ...current, businessName: event.target.value }))} required /></label>
            <label>Primary service location<input value={settings.serviceLocation} onChange={(event) => setSettings((current) => ({ ...current, serviceLocation: event.target.value }))} required /></label>
            <label>Service area<textarea rows={3} value={settings.serviceArea} onChange={(event) => setSettings((current) => ({ ...current, serviceArea: event.target.value }))} required /></label>
            <div className="rental-provider-settings-actions">
              <button className="rental-provider-button rental-provider-button-secondary" type="button" onClick={discardSettings}>Discard</button>
              <button className="rental-provider-button rental-provider-button-primary" type="submit"><Icon name="save" size={16} />Save preview settings</button>
            </div>
          </form>
        </section>
        <div className="rental-provider-settings-aside">
          <section className="rental-provider-panel rental-provider-settings-notifications">
            <p className="rental-provider-eyebrow">Local preferences</p>
            <h2>Notification preferences</h2>
            <label><span><strong>Booking request alerts</strong><small>Sample setting; no notification service connected.</small></span><input type="checkbox" checked={settings.notifyBookings} onChange={(event) => setSettings((current) => ({ ...current, notifyBookings: event.target.checked }))} /></label>
            <label><span><strong>Fleet maintenance reminders</strong><small>Sample setting; no service calendar connected.</small></span><input type="checkbox" checked={settings.notifyFleet} onChange={(event) => setSettings((current) => ({ ...current, notifyFleet: event.target.checked }))} /></label>
          </section>
          <section className="rental-provider-settings-safety">
            <Icon name="risk" size={20} />
            <div><strong>Account &amp; data status</strong><p>Provider sign-in, business verification, and persistent settings are not connected to this front-end preview.</p></div>
          </section>
        </div>
      </div>
    );
  }

  function renderActiveSection() {
    switch (section) {
      case 'overview':
        return renderOverview();
      case 'fleet':
        return renderFleet();
      case 'operations':
        return renderOperations();
      case 'financials':
        return renderFinancials();
      case 'risk':
        return renderRisk();
      case 'settings':
        return renderSettings();
    }
  }

  const primaryMobileNavigation = navigation.slice(0, 4);
  const secondaryMobileNavigation = navigation.slice(4);

  return (
    <div className="rental-provider-app">
      <aside className="rental-provider-sidebar">
        <Link className="rental-provider-brand" href="/" aria-label="EVOLANKA home">
          <span className="rental-provider-brand-mark">E</span>
          <span><strong>EVOLANKA</strong><small>Rental partner hub</small></span>
        </Link>
        <div className="rental-provider-business-card">
          <Image src={rentalPreviewProvider.image} alt="" width={46} height={46} className="rental-provider-business-image" />
          <span><strong>{settings.businessName}</strong><small>Rental provider · preview</small></span>
          <i aria-label="Preview account" />
        </div>
        <nav className="rental-provider-sidebar-nav" aria-label="Rental provider dashboard">
          <span className="rental-provider-nav-label">WORKSPACE</span>
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`rental-provider-nav-item${section === item.id ? ' is-active' : ''}`}
              type="button"
              aria-current={section === item.id ? 'page' : undefined}
              onClick={() => changeSection(item.id)}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
              {item.id === 'operations' && pendingRequests.length > 0 ? <small>{pendingRequests.length}</small> : null}
            </button>
          ))}
        </nav>
        <div className="rental-provider-sidebar-footer">
          <button className="rental-provider-sidebar-link" type="button" onClick={() => setNotice('Provider support is not connected in this preview.')}><Icon name="help" size={17} />Support</button>
          <Link className="rental-provider-sidebar-link" href="/provider/login"><Icon name="signout" size={17} />Back to provider sign in</Link>
        </div>
      </aside>

      <div className="rental-provider-main">
        <header className="rental-provider-header">
          <label className="rental-provider-search">
            <Icon name="search" size={17} />
            <span className="rental-provider-visually-hidden">Search sample fleet and requests</span>
            <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search fleet or rental requests" />
          </label>
          <div className="rental-provider-header-actions">
            <span className="rental-provider-preview-chip"><i />Preview mode</span>
            <div className="rental-provider-notification-wrap">
              <IconButton icon="notifications" label="Show sample notifications" expanded={notificationsOpen} onClick={() => setNotificationsOpen((open) => !open)} />
              {notificationsOpen ? (
                <div className="rental-provider-notification-popover">
                  <strong>Sample alerts</strong>
                  <p>{pendingRequests.length} booking requests are waiting for review.</p>
                  <button type="button" onClick={() => changeSection('operations')}>Open rental operations <Icon name="chevron" size={14} /></button>
                  <small>No external notifications are connected.</small>
                </div>
              ) : null}
            </div>
            <div className="rental-provider-header-account"><Image src={rentalPreviewProvider.image} alt="" width={38} height={38} /><span><strong>{settings.businessName}</strong><small>Sample account</small></span></div>
          </div>
        </header>

        <main className="rental-provider-content">
          <div className="rental-provider-page-heading">
            <div><p className="rental-provider-page-eyebrow">RENTAL SERVICE PROVIDER</p><h1>{content.title}</h1><p>{content.description}</p></div>
            {section === 'fleet' ? (
              <button className="rental-provider-button rental-provider-button-primary" type="button" onClick={() => setAddVehicleOpen(true)}><Icon name="add" size={17} />Add vehicle</button>
            ) : null}
            {section === 'operations' ? (
              <span className="rental-provider-preview-pill">Sample operations</span>
            ) : null}
          </div>

          <div className="rental-provider-preview-banner" role="note">
            <span>i</span>
            <p><strong>Preview data only.</strong> Fleet records, rental requests, return alerts, and financial figures are examples. Actions stay in this browser session and do not notify customers or update public listings.</p>
          </div>

          <div className="rental-provider-section-content">{renderActiveSection()}</div>
          <footer className="rental-provider-footer">EVOLANKA rental provider preview <span>·</span> No live bookings, tracking, payments, or verification are connected</footer>
        </main>
      </div>

      <nav className="rental-provider-mobile-nav" aria-label="Mobile rental dashboard">
        {primaryMobileNavigation.map((item) => (
          <button className={section === item.id ? 'is-active' : ''} key={item.id} type="button" aria-current={section === item.id ? 'page' : undefined} onClick={() => changeSection(item.id)}>
            <Icon name={item.icon} size={18} /><span>{item.label === 'Rental operations' ? 'Operations' : item.label === 'Fleet management' ? 'Fleet' : item.label === 'Financials' ? 'Finance' : item.label}</span>
          </button>
        ))}
        <button className={secondaryMobileNavigation.some((item) => item.id === section) ? 'is-active' : ''} type="button" aria-expanded={mobileMoreOpen} onClick={() => setMobileMoreOpen((open) => !open)}>
          <Icon name="more" size={18} /><span>More</span>
        </button>
      </nav>
      {mobileMoreOpen ? (
        <div className="rental-provider-mobile-more" role="menu">
          {secondaryMobileNavigation.map((item) => (
            <button key={item.id} type="button" role="menuitem" onClick={() => changeSection(item.id)}><Icon name={item.icon} size={17} />{item.label}</button>
          ))}
        </div>
      ) : null}

      {addVehicleOpen ? (
        <div className="rental-provider-modal-backdrop" role="presentation" onClick={() => setAddVehicleOpen(false)}>
          <section className="rental-provider-modal" role="dialog" aria-modal="true" aria-labelledby="rental-provider-add-title" onClick={(event) => event.stopPropagation()}>
            <button className="rental-provider-modal-close" type="button" aria-label="Close add vehicle form" onClick={() => setAddVehicleOpen(false)}><Icon name="close" size={18} /></button>
            <p className="rental-provider-eyebrow">Local preview only</p>
            <h2 id="rental-provider-add-title">Add a fleet vehicle</h2>
            <p>Try the fleet form. This vehicle will not be published or saved to a provider account.</p>
            <form className="rental-provider-modal-form" onSubmit={addVehicle}>
              <label>Vehicle name<input value={vehicleDraft.name} onChange={(event) => setVehicleDraft((current) => ({ ...current, name: event.target.value }))} placeholder="e.g. Toyota Corolla" required /></label>
              <label>Category<select value={vehicleDraft.category} onChange={(event) => setVehicleDraft((current) => ({ ...current, category: event.target.value as RentalVehicleCategory }))}><option value="car">Car</option><option value="suv">SUV</option><option value="motorbike">Motorbike</option><option value="van">Van</option></select></label>
              <div className="rental-provider-modal-form-row">
                <label>Daily rate (LKR)<input type="number" min="1" step="1" value={vehicleDraft.dailyRate} onChange={(event) => setVehicleDraft((current) => ({ ...current, dailyRate: event.target.value }))} required /></label>
                <label>Seats<input type="number" min="1" max="50" step="1" value={vehicleDraft.seats} onChange={(event) => setVehicleDraft((current) => ({ ...current, seats: event.target.value }))} required /></label>
              </div>
              <label>Registration / plate<input value={vehicleDraft.plate} onChange={(event) => setVehicleDraft((current) => ({ ...current, plate: event.target.value }))} placeholder="Optional sample value" /></label>
              <button className="rental-provider-button rental-provider-button-primary" type="submit"><Icon name="add" size={16} />Add to preview fleet</button>
            </form>
          </section>
        </div>
      ) : null}

      {vehicleDetails ? (
        <div className="rental-provider-modal-backdrop" role="presentation" onClick={() => setVehicleDetails(null)}>
          <section className="rental-provider-modal rental-provider-vehicle-modal" role="dialog" aria-modal="true" aria-labelledby="rental-provider-vehicle-title" onClick={(event) => event.stopPropagation()}>
            <button className="rental-provider-modal-close" type="button" aria-label="Close vehicle details" onClick={() => setVehicleDetails(null)}><Icon name="close" size={18} /></button>
            <div className="rental-provider-vehicle-modal-image">{renderVehicleThumb(vehicleDetails)}</div>
            <p className="rental-provider-eyebrow">Sample fleet record · {vehicleDetails.plate}</p>
            <h2 id="rental-provider-vehicle-title">{vehicleDetails.name}</h2>
            <div className="rental-provider-vehicle-modal-details"><span>Category <b>{categoryLabel(vehicleDetails.category)}</b></span><span>Status <b>{vehicleDetails.status}</b></span><span>Daily rate <b>{formatRupees(vehicleDetails.dailyRate)}</b></span><span>Seats <b>{vehicleDetails.seats}</b></span><span>Transmission <b>{vehicleDetails.transmission}</b></span><span>Fuel <b>{vehicleDetails.fuel}</b></span></div>
            <p className="rental-provider-panel-note">Sample vehicle information only. Editing here does not change the public vehicle listing.</p>
            <button className="rental-provider-button rental-provider-button-primary" type="button" onClick={() => setVehicleDetails(null)}>Close details</button>
          </section>
        </div>
      ) : null}

      {notice ? <div className="rental-provider-toast" role="status" aria-live="polite"><span>{notice}</span><button type="button" aria-label="Dismiss message" onClick={() => setNotice('')}><Icon name="close" size={15} /></button></div> : null}
    </div>
  );
}
