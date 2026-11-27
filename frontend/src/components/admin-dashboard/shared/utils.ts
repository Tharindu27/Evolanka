export const formatLkr = (value: number) => `LKR ${value.toLocaleString("en-US")}`;

export const getBookingServiceType = (provider: string, service: string, providerTypes: Map<string, string>) => {
  const providerType = providerTypes.get(provider);
  if (providerType === "Vehicle Rental") return "Rental";
  if (providerType) return providerType;
  if (provider.toLowerCase().includes("safari") || service.toLowerCase().includes("jeep")) return "Rental";
  return "Taxi";
};

export const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[month - 1]} ${day}, ${year}`;
};

export const inputClass =
  "w-full rounded-xl border border-outline-variant bg-surface px-3.5 py-2.5 text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-[#315b96] focus:ring-4 focus:ring-[#315b96]/10";
