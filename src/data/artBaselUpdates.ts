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
  },
  {
    id: "ab-02",
    slug: "monumental-art-meridians-galleries-lineup-2026",
    title: "Meridians & Main Sectors: The Standout Art, Monumental Sculptures & Galleries at Art Basel 2026",
    subtitle: "From museum-scale installations in the Grand Ballroom to groundbreaking presentations in Nova and Positions, here is what to look out for on the exhibition floor.",
    publishDate: "November 25, 2026",
    publishDateISO: "2026-11-25",
    countdownDays: 7,
    countdownLabel: "7 Days to VIP Opening",
    category: "Artists & Works",
    author: "ELMIA Event Intelligence Desk",
    readTime: "5 min read",
    coverImage: "/images/slide-luxury.jpg",
    excerpt: "Explore the curatorial architecture of Art Basel Miami Beach 2026: how the Meridians sector transforms the Grand Ballroom with colossal installations, and which artists are creating buzz across Galleries, Nova, and Positions.",
    highlights: [
      "Over 20 museum-scale monumental sculptures and performance projects debuting inside the Meridians sector",
      "280+ premier international galleries representing established masters and emerging innovators from 38 nations",
      "Nova & Positions sectors spotlighting bold solo booths and works created within the last three years",
      "Key artistic trends: monumental textiles, kinetic metalwork, eco-material sculpture, and historical retrospectives"
    ],
    content: [
      {
        sectionTitle: "Meridians in the Grand Ballroom: Art That Defies the Booth",
        paragraphs: [
          "Occupying the vast, column-free Grand Ballroom on the second level of the Miami Beach Convention Center, Meridians remains the fair’s most ambitious platform. Unlike standard gallery booths bound by standard partition walls, Meridians invites artists to push spatial boundaries at an architectural scale.",
          "This year’s sector gathers over twenty colossal presentations, including multi-story suspended fiber sculptures, massive interactive sound environments, and live performance works that unfold across the room at scheduled intervals throughout the day. Institutional curators and private foundation directors often begin their mornings here to evaluate pieces intended for public plazas, sculpture parks, and museum atriums."
        ],
        callout: {
          title: "Curatorial Highlight",
          text: "Look for site-specific kinetic metal sculptures and organic woven installations that address global trade, climate resilience, and indigenous craftsmanship—a major unifying theme across the 2026 Meridians lineup."
        }
      },
      {
        sectionTitle: "Nova & Positions: The Vanguard of Emerging Voices",
        paragraphs: [
          "For collectors seeking early discoveries and energetic conceptual work, the perimeter sectors offer the most thrilling discoveries:",
          "• Nova: Dedicated to galleries presenting works made strictly within the last three years by up to three artists. Expect daring, newly dry canvases, dynamic mixed-media collages, and video art addressing contemporary digital culture.",
          "• Positions: The fair's premiere solo platform, where emerging galleries dedicate an entire booth to a single visionary artist. This format allows visitors to delve deep into one artist's creative universe rather than viewing a fragmented survey.",
          "Keep an eye out for pioneering young galleries hailing from São Paulo, Lagos, Seoul, Berlin, and Mexico City, whose artists frequently transition into major international biennales following their Miami Beach debut."
        ]
      },
      {
        sectionTitle: "The Main Galleries: Blue-Chip Powerhouses & Modern Masterpieces",
        paragraphs: [
          "At the core of Halls A, B, C, and D lie the heavyweight international titans—such as Gagosian, Hauser & Wirth, David Zwirner, Pace, and White Cube. Here, museum-quality 20th-century modernism dialogues with the most sought-after contemporary painters of our era.",
          "In addition to marquee secondary market canvases by masters like Willem de Kooning, Joan Mitchell, and Jean-Michel Basquiat, prominent booths feature solo spotlights on contemporary painters known for intense figurative narrative and sculptural ceramics."
        ]
      }
    ],
    keyTakeaway: "Begin your tour in the Meridians sector for an awe-inspiring look at monumental works before crowds peak, then navigate through Nova and Positions for cutting-edge discoveries, leaving the bustling central aisles for your afternoon walk.",
    serviceNote: "Navigating Miami Art Week with an art advisory group, cultural delegation, or private patrons? ELMIA DMC coordinates dedicated executive chauffeur standby, airport tarmac greetings at Opa-locka (OPF), and seamless ground transit."
  }
];

export function getArtBaselUpdateBySlug(slug: string): ArtBaselUpdate | undefined {
  return ART_BASEL_UPDATES.find((u) => u.slug === slug);
}

export function getAllArtBaselUpdates(): ArtBaselUpdate[] {
  // Returns currently published updates
  return ART_BASEL_UPDATES;
}
