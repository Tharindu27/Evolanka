import type { Provider } from "./types";

export const providers: Provider[] = [
  {
    id: "PR-1048", name: "Ceylon Ridge Villas", type: "Hotel", email: "hello@ceylonridge.lk", phone: "+94 77 214 8890", district: "Nuwara Eliya", rating: null, registeredOn: "2026-11-12", status: "Pending",
    documents: [
      { label: "NIC (owner)", reference: "NIC-902143874V" },
      { label: "Business Registration", reference: "PV 00214558" },
      { label: "SLTDA License", reference: "SLTDA/HT/2026/0412" },
    ],
  },
  {
    id: "PR-1047", name: "Island Trail Guides", type: "Tour Guide", email: "team@islandtrail.lk", phone: "+94 71 552 0193", district: "Kandy", rating: null, registeredOn: "2026-11-11", status: "Pending",
    documents: [
      { label: "NIC", reference: "NIC-881204567V" },
      { label: "SLTDA Guide License", reference: "SLTDA/GD/2026/1187" },
    ],
  },
  {
    id: "PR-1046", name: "Dilshan Safari Jeeps", type: "Vehicle Rental", email: "book@dilshansafari.lk", phone: "+94 76 330 4421", district: "Sigiriya", rating: null, registeredOn: "2026-11-10", status: "Pending",
    documents: [
      { label: "NIC", reference: "NIC-957311208V" },
      { label: "Business Registration", reference: "WA 00991204" },
      { label: "Vehicle Revenue License", reference: "REV-SG-4471" },
    ],
  },
  {
    id: "PR-1045", name: "Kandy Heritage Stay", type: "Hotel", email: "stay@kandyheritage.lk", phone: "+94 81 223 7710", district: "Kandy", rating: 4.7, registeredOn: "2026-08-02", status: "Active",
    documents: [
      { label: "NIC (owner)", reference: "NIC-784412093V" },
      { label: "Business Registration", reference: "PV 00178812" },
      { label: "SLTDA License", reference: "SLTDA/HT/2026/0199" },
    ],
  },
  {
    id: "PR-1044", name: "Lanka Ride Co.", type: "Taxi", email: "support@lankaride.lk", phone: "+94 11 245 9902", district: "Colombo", rating: 4.5, registeredOn: "2026-06-18", status: "Active",
    documents: [
      { label: "NIC", reference: "NIC-921108745V" },
      { label: "Driving License", reference: "B1234567" },
      { label: "Vehicle Revenue License", reference: "REV-WP-9023" },
    ],
  },
  {
    id: "PR-1043", name: "Southern Wave Taxis", type: "Taxi", email: "hi@southernwave.lk", phone: "+94 91 223 1180", district: "Galle", rating: 3.6, registeredOn: "2026-05-04", status: "Restricted",
    documents: [
      { label: "NIC", reference: "NIC-903321764V" },
      { label: "Driving License", reference: "B7654321" },
      { label: "Vehicle Revenue License", reference: "REV-SP-3318" },
    ],
  },
  {
    id: "PR-1042", name: "Rohan Perera · Guide", type: "Tour Guide", email: "rohan@guides.lk", phone: "+94 70 118 2204", district: "Ella", rating: 4.9, registeredOn: "2026-03-21", status: "Active",
    documents: [
      { label: "NIC", reference: "NIC-870031245V" },
      { label: "SLTDA Guide License", reference: "SLTDA/GD/2026/0231" },
    ],
  },
  {
    id: "PR-1041", name: "Blue Lagoon Rentals", type: "Vehicle Rental", email: "ops@bluelagoon.lk", phone: "+94 77 880 1245", district: "Negombo", rating: 2.9, registeredOn: "2026-02-09", status: "Banned",
    documents: [
      { label: "NIC", reference: "NIC-955218330V" },
      { label: "Business Registration", reference: "WA 00561187" },
      { label: "Vehicle Revenue License", reference: "REV-WP-1182" },
    ],
  },
];
