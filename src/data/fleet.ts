export interface FleetVehicle {
  id: string;
  category: "Sedan" | "SUV" | "Sprinter" | "Coach" | "Aviation & Maritime";
  name: string;
  passengers: number;
  luggage: number;
  image: string;
  features: string[];
  description: string;
}

export const FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: "escalade-esv",
    category: "SUV",
    name: "Cadillac Escalade ESV (Black Edition)",
    passengers: 6,
    luggage: 6,
    image: "/images/fleet/cadillac-escalade.jpg",
    features: [
      "Handcrafted Mulan Leather Seating",
      "Rear Seat Entertainment Curved OLED Displays",
      "High-Speed Wi-Fi Hotspot & USB-C Charging",
      "Acoustic Privacy Glass & Active Noise Cancellation",
      "Chilled Bottled Artesian Water & Refreshment Console"
    ],
    description: "The definitive executive SUV deployed across Miami, New York, Chicago, Los Angeles, and nationwide. Generous legroom, acoustic privacy, and commanding road presence for C-suite roadshows, diplomatic delegations, and private FBO airport arrivals."
  },
  {
    id: "mercedes-s-class",
    category: "Sedan",
    name: "Mercedes-Benz S-Class Sedan (W223)",
    passengers: 3,
    luggage: 3,
    image: "/images/fleet/mercedes-s-class-w223.jpg",
    features: [
      "Executive Rear Reclining Seating Package",
      "Heated & Ventilated Massaging Rear Seats",
      "Burmester® 3D High-End Surround Sound",
      "Active Ambient Multi-Color Mood Lighting",
      "Rear MBUX Tablet & Dual Entertainment Screens"
    ],
    description: "Unrivaled prestige and German engineering perfection for diplomatic dignitaries, keynote speakers, and private executive transit across our primary hubs and nationwide destinations."
  },
  {
    id: "sprinter-executive",
    category: "Sprinter",
    name: "Mercedes-Benz Sprinter Executive Jet Class (VS30)",
    passengers: 14,
    luggage: 14,
    image: "/images/fleet/mercedes-sprinter-vs30.jpg",
    features: [
      "Full Standing Headroom (6'4\") & High Roof",
      "Ergonomic Custom Leather Captain Recliners",
      "50-inch Smart 4K LED Display & HDMI Streaming",
      "High-Speed Commercial 5G Mobile Wi-Fi",
      "Dedicated Partitioned Rear Luggage Cargo Bay"
    ],
    description: "A mobile boardroom tailored for corporate leadership teams, convention delegations, and VIP airport transfers with executive white-glove hospitality."
  },
  {
    id: "private-aviation-fleet",
    category: "Aviation & Maritime",
    name: "Private Jet Aviation Partner Network",
    passengers: 16,
    luggage: 20,
    image: "/images/jet-hero-img.jpg",
    features: [
      "Direct OPF Hangar 5 Executive FBO Coordination",
      "Light, Midsize, Super-Mid & Heavy Cabin Aircraft",
      "Bespoke In-Flight Gourmet Sommelier Catering",
      "Global Flight Clearance & Ramp-Side Chauffeur Access"
    ],
    description: "Seamless on-demand private jet charters through our vetted Part 135 air carrier network based out of Miami Opa-locka Executive Airport (OPF) and Fort Lauderdale FXE."
  },
  {
    id: "luxury-yachts",
    category: "Aviation & Maritime",
    name: "Luxury Yacht Charters (50ft - 120ft)",
    passengers: 12,
    luggage: 10,
    image: "/images/yacht-img.jpg",
    features: [
      "Licensed USCG Master Captain & Professional Crew",
      "Expansive Flybridge Lounge, Sunpads & Swim Platform",
      "Private Chef Catering & Sommelier Curated Bar",
      "Biscayne Bay, Key Biscayne & Bahamas Itineraries"
    ],
    description: "Exclusive private yacht charters for executive corporate hospitality, sunset cocktail cruises, and VIP island day excursions departing from Miami Beach marinas."
  }
];
