import type { Review, SupportTicket } from "./types";

export const reviews: Review[] = [
  { id: "RV-1208", tourist: "Oliver James", provider: "Lanka Ride Co.", rating: 1, comment: "Total scam!!! Don't use these people, visit my site for better deals.", date: "2026-11-13", visibility: "Flagged" },
  { id: "RV-1207", tourist: "Amaya Perera", provider: "Sigiriya Safari Co.", rating: 5, comment: "Saw over 80 elephants. Our driver was fantastic.", date: "2026-11-10", visibility: "Visible" },
  { id: "RV-1206", tourist: "Sofia Rossi", provider: "Rohan Perera · Guide", rating: 5, comment: "Our guide made the history come alive.", date: "2026-11-06", visibility: "Visible" },
  { id: "RV-1205", tourist: "Promo Account 4471", provider: "Kandy Heritage Stay", rating: 5, comment: "Best hotel ever. Click the link in my profile for 90% off flights.", date: "2026-11-05", visibility: "Flagged" },
  { id: "RV-1204", tourist: "Nethmi Silva", provider: "Lanka Ride Co.", rating: 4, comment: "Smooth ride, on time.", date: "2026-11-02", visibility: "Visible" },
];

export const supportTickets: SupportTicket[] = [
  { id: "CS-334", subject: "Refund request for BK-8918", from: "Oliver James", priority: "High", message: "My driver never arrived and I had to book another taxi. I would like a full refund.", receivedOn: "2026-11-13" },
  { id: "CS-333", subject: "Unable to change my trip dates", from: "Mila Chen", priority: "Normal", message: "The reschedule button on BK-8917 does nothing. Could you move my stay by two days?", receivedOn: "2026-11-12" },
  { id: "CS-332", subject: "How do I add a new location?", from: "Sofia Rossi", priority: "Low", message: "I found a beautiful spot that is not on the map. Where do I submit it?", receivedOn: "2026-11-09" },
];
