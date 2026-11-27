import type { LocationStatusCode, LocationSubmitterType } from "@/lib/locations-api";

export const statusLabel: Record<LocationStatusCode, string> = {
  DRAFT: "Draft",
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const submitterLabel: Record<LocationSubmitterType, string> = {
  TOURIST: "Tourist",
  PROVIDER: "Provider",
  ADMIN: "Admin",
};
