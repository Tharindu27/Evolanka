import { bookings } from "./bookings";
import type { Tourist } from "./types";

const bookingsFor = (name: string) => bookings.filter((booking) => booking.tourist === name);

export const tourists: Tourist[] = [
  {
    id: "US-2081", name: "Amaya Perera", email: "amaya.p@gmail.com", country: "Sri Lanka", signupMethod: "Google", joinedOn: "2026-09-14", status: "Active",
    bookings: bookingsFor("Amaya Perera"),
    reviews: [{ service: "Minneriya Safari Jeep", rating: 5, comment: "Saw over 80 elephants. Our driver was fantastic." }],
  },
  {
    id: "US-2080", name: "Liam Walker", email: "liam.walker@icloud.com", country: "Australia", signupMethod: "Apple", joinedOn: "2026-10-02", status: "Active",
    bookings: bookingsFor("Liam Walker"),
    reviews: [],
  },
  {
    id: "US-2079", name: "Nethmi Silva", email: "nethmi.s@gmail.com", country: "Sri Lanka", signupMethod: "Google", joinedOn: "2026-10-19", status: "Active",
    bookings: bookingsFor("Nethmi Silva"),
    reviews: [{ service: "Airport transfer · Prius", rating: 4, comment: "Smooth ride, on time." }],
  },
  {
    id: "US-2078", name: "Oliver James", email: "oliver.james@email.com", country: "United Kingdom", signupMethod: "Email", joinedOn: "2026-11-01", status: "Restricted",
    bookings: bookingsFor("Oliver James"),
    reviews: [{ service: "Colombo to Kandy transfer", rating: 1, comment: "Driver never showed up. Terrible." }],
  },
  {
    id: "US-2077", name: "Mila Chen", email: "mila.chen@email.com", country: "Singapore", signupMethod: "Email", joinedOn: "2026-11-05", status: "Active",
    bookings: bookingsFor("Mila Chen"),
    reviews: [],
  },
  {
    id: "US-2076", name: "Sofia Rossi", email: "sofia.rossi@icloud.com", country: "Italy", signupMethod: "Apple", joinedOn: "2026-08-27", status: "Active",
    bookings: bookingsFor("Sofia Rossi"),
    reviews: [{ service: "Sigiriya & Dambulla Cultural Tour", rating: 5, comment: "Our guide made the history come alive." }],
  },
  {
    id: "US-2075", name: "Promo Account 4471", email: "deals.4471@mailinator.com", country: "Unknown", signupMethod: "Email", joinedOn: "2026-11-10", status: "Banned",
    bookings: [],
    reviews: [],
  },
];
