import type { Destination, LocationRequest } from "./types";

export const locationRequests: LocationRequest[] = [
  { id: "LC-052", name: "Diyaluma Upper Falls", province: "Uva Province", district: "Badulla", nearestTown: "Koslanda", categories: ["Nature", "Hiking & Adventure"], description: "Second-highest waterfall in Sri Lanka with a natural infinity pool at the top.", highlights: ["Upper falls natural pool", "Panoramic mountain views"], bestTime: "December to April", openingDays: "Daily, 6:00 AM–5:00 PM", localAdultPrice: "LKR 200", localChildPrice: "LKR 100", foreignAdultPrice: "LKR 1,000", foreignChildPrice: "LKR 500", address: "Diyaluma Falls Road, Koslanda", latitude: "6.7598", longitude: "81.0322", nearbyStays: ["Koslanda Eco Lodge"], travelTips: ["Wear shoes with good grip", "Visit with a local guide"], photos: [], submittedBy: "Amaya Perera", type: "Tourist", submittedOn: "2026-11-12", status: "Pending" },
  { id: "LC-051", name: "Kudawa Rainforest Gate", province: "Sabaragamuwa Province", district: "Ratnapura", nearestTown: "Kalawana", categories: ["Wild & Nature", "Heritage"], description: "Quiet entrance to Sinharaja forest with local guides and bird watching.", highlights: ["Bird watching", "Guided rainforest walks"], bestTime: "January to March", openingDays: "Daily, 6:00 AM–4:00 PM", address: "Kudawa Entrance, Kalawana", latitude: "6.4180", longitude: "80.4550", nearbyStays: [], travelTips: ["Bring rain protection", "Carry drinking water"], photos: [], submittedBy: "Liam Walker", type: "Tourist", submittedOn: "2026-11-11", status: "Pending" },
  { id: "LC-050", name: "Hiriketiya Bay", province: "Southern Province", district: "Matara", nearestTown: "Dickwella", categories: ["Beach", "Wild & Nature"], description: "Horseshoe bay known for easy surf breaks and calm swimming.", highlights: ["Surfing", "Swimming"], bestTime: "December to April", address: "Hiriketiya Beach, Dickwella", submittedBy: "Sofia Rossi", type: "Tourist", submittedOn: "2026-11-07", status: "Approved" },
  { id: "LC-049", name: "My Cousin's Backyard", province: "Western Province", district: "Gampaha", nearestTown: "Gampaha", categories: ["Other"], description: "Private property, not a tourist destination.", submittedBy: "Promo Account 4471", type: "Tourist", submittedOn: "2026-11-05", status: "Rejected" },
];

export const initialDestinations: Destination[] = [
  { name: "Ella", district: "Badulla", source: "Admin" },
  { name: "Kandy", district: "Kandy", source: "Admin" },
  { name: "Sigiriya", district: "Matale", source: "Admin" },
  { name: "Galle", district: "Galle", source: "Admin" },
  { name: "Nuwara Eliya", district: "Nuwara Eliya", source: "Admin" },
  { name: "Hiriketiya Bay", district: "Matara", source: "Tourist" },
];

export const initialCategories = ["Hotels", "Vehicle Rentals", "Tour Guides", "Taxi Services", "Safari"];
