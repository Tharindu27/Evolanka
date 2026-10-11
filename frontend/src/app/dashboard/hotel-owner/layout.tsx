import type { ReactNode } from "react";

/**
 * Root hotel-owner layout.
 * Intentionally thin — auth guard only. Each child route group
 * (listings, [propertyId]) owns its own shell.
 */
export default function HotelOwnerRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // TODO: auth guard — redirect to /provider/login if not authenticated
  return <>{children}</>;
}