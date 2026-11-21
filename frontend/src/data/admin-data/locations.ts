import type { Destination } from "./types";

// Seed destinations; approved locations from the database are added on top of these.
export const initialDestinations: Destination[] = [
  { name: "Ella", district: "Badulla", source: "Admin" },
  { name: "Kandy", district: "Kandy", source: "Admin" },
  { name: "Sigiriya", district: "Matale", source: "Admin" },
  { name: "Galle", district: "Galle", source: "Admin" },
  { name: "Nuwara Eliya", district: "Nuwara Eliya", source: "Admin" },
  { name: "Hiriketiya Bay", district: "Matara", source: "Tourist" },
];

export const initialCategories = ["Hotels", "Vehicle Rentals", "Tour Guides", "Taxi Services", "Safari"];
