export interface ArtBaselSection {
  sectionTitle?: string;
  paragraphs: string[];
  callout?: {
    title: string;
    text: string;
  };
}

export interface ArtBaselUpdate {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  publishDate: string;
  publishDateISO: string; // YYYY-MM-DD
  countdownDays: number;
  countdownLabel: string;
  category: "Visitor Guide" | "Artists & Works" | "Fair Sectors" | "Public Art" | "Transit & Access";
  author: string;
  readTime: string;
  coverImage: string;
  excerpt: string;
  highlights: string[];
  content: ArtBaselSection[];
  keyTakeaway: string;
  serviceNote?: string;
}

export const ART_BASEL_UPDATES: ArtBaselUpdate[] = [
  {
    id: "ab-01",
    slug: "art-basel-miami-beach-2026-dates-tickets-mbcc-guide",
    title: "Art Basel Miami Beach 2026: Official Dates, Tickets, Hours & How to Access MBCC",
    subtitle: "Everything you need to know about attending this year's fair: venue layout, public hours, ticket pricing, and transit tips.",
    publishDate: "November 23, 2026",
    publishDateISO: "2026-11-23",
    countdownDays: 9,
    countdownLabel: "9 Days to Opening",
    category: "Visitor Guide",
    author: "ELMIA Event Intelligence Desk",
    readTime: "4 min read",
    coverImage: "/images/events/art-basel-miami-beach.jpg",
    excerpt: "Planning your trip to Art Basel Miami Beach 2026? Here is the essential visitor guide covering opening dates, ticket tiers, convention center entrance halls, parking garages, and shuttle transit.",
    highlights: [
      "Dates: VIP Preview Days Dec 2–3 | Public Days Dec 4–6, 2026",
      "Venue: Miami Beach Convention Center (MBCC), 1901 Convention Center Drive",
      "Tickets: Online-only through the official Art Basel app; no box-office sales on-site",
      "Transit: Free Art Week city shuttles, dedicated drop-off gates, and MBCC parking garages"
    ],
    content: [
      {
        sectionTitle: "Fair Schedule & Opening Hours",
        paragraphs: [
          "Art Basel Miami Beach 2026 will take place at the newly renovated Miami Beach Convention Center (MBCC). The fair operates on a phased admission schedule separating invitation-only collector previews from general public entry:",
          "• Private Preview Days (By Invitation Only): Wednesday, December 2 (First Choice 11:00 AM – 8:00 PM, Preview 2:00 PM – 8:00 PM) and Thursday, December 3 (Vernissage 11:00 AM – 7:00 PM).",
          "• Public Days (Open to General Ticket Holders): Friday, December 4 (11:00 AM – 7:00 PM), Saturday, December 5 (11:00 AM – 7:00 PM), and Sunday, December 6 (11:00 AM – 6:00 PM)."
        ],
        callout: {
          title: "Crucial Admission Rule",
          text: "Paper tickets are not issued at the venue. All attendees must purchase electronic passes through the official Art Basel app or website and present their mobile digital QR code at security checkpoints."
        }
      },
      {
        sectionTitle: "Ticket Categories & Booking Advice",
        paragraphs: [
          "General admission tickets are sold in designated entry time slots to manage hall capacity. Key options include:",
          "1. Single-Day Day Ticket: Grants entry for a single designated day during public hours (starts at approximately $82 USD).",
          "2. Reduced Day Ticket: Discounted passes available for senior citizens (62+), students, and Miami Beach residents with valid government identification.",
          "3. Premium / Multi-Day Pass: Offers flexible multi-day admission across Friday, Saturday, and Sunday.",
          "Because peak afternoon slots (1:00 PM – 4:00 PM) routinely sell out days in advance, visitors are strongly encouraged to lock in tickets online prior to arriving in South Florida."
        ]
      },
      {
        sectionTitle: "How to Access MBCC: Transit, Parking & Shuttles",
        paragraphs: [
          "The Miami Beach Convention Center occupies a central position on the barrier island, bordered by Washington Avenue, 17th Street, and Convention Center Drive. Arriving smoothly requires planning around Art Week traffic:",
          "• City of Miami Beach Art Week Shuttle: The city operates a free dedicated Art Week shuttle connecting MBCC with adjacent satellite fairs (Untitled Art on Ocean Drive, Scope on the beach, and Design Miami on Pride Park). Shuttles run every 15–20 minutes.",
          "• Public Parking Garages: On-site MBCC rooftop parking has limited spaces. Recommended municipal garages include the 17th Street Garage (1755 Meridian Ave) and the Pennsylvania Avenue Garage (1661 Pennsylvania Ave), both within a 4-minute walk.",
          "• Rideshare & Chauffeur Drop-Offs: Designated passenger staging and drop-off zones are established along Convention Center Drive (West Lobby) and 19th Street. Causeway traffic across the Julia Tuttle (I-195) and MacArthur (I-395) bridges peaks between 11:00 AM and 1:00 PM."
        ]
      }
    ],
    keyTakeaway: "Book your electronic mobile tickets well in advance, target morning entry hours (11:00 AM) to avoid entry lines, and utilize the free city shuttles or pre-arranged drop-offs to bypass parking garage queues.",
    serviceNote: "Attending with an executive group, private collection advisory, or corporate delegation? ELMIA DMC coordinates dedicated executive chauffeur standby, private airport tarmac pickups at Opa-locka (OPF), and turnkey logistics for Miami Art Week."
  }
];

export function getArtBaselUpdateBySlug(slug: string): ArtBaselUpdate | undefined {
  return ART_BASEL_UPDATES.find((u) => u.slug === slug);
}

export function getAllArtBaselUpdates(): ArtBaselUpdate[] {
  // Returns currently published updates
  return ART_BASEL_UPDATES;
}
