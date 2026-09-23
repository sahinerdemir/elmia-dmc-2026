export interface VIPProgram {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overviewParagraphs: string[];
  image: string;
  heroImage: string;
  highlights: string[];
  inclusions: string[];
  features: string[];
}

export const VIP_PROGRAMS: VIPProgram[] = [
  {
    id: "private-yacht-charters",
    slug: "private-yacht-charters",
    title: "Private Yacht Charters",
    subtitle: "Biscayne Bay, Key West & Bahamas Luxury Voyages",
    description: "Embark on pristine motor yachts ranging from 55ft sport cruisers to 130ft tri-deck superyachts. Fully crewed with USCG-licensed captains, private chefs, and tenders, perfect for executive sunset mixers or multi-day island itineraries.",
    overviewParagraphs: [
      "Experience South Florida and the Caribbean from the most exclusive vantage point: the deck of a private superyacht. ELMIA DMC curates bespoke maritime experiences tailored for executive retreats, high-profile celebrations, and private family getaways.",
      "Our fleet ranges from agile 55ft sport cruisers perfect for Biscayne Bay sunset mixers, to majestic 130ft tri-deck superyachts designed for multi-day Bahamas itineraries. Every charter is fully crewed with USCG-licensed captains, seasoned deckhands, and bilingual stewardesses.",
      "Beyond the vessel, we handle every detail, from pre-provisioning your preferred vintage champagnes and caviar, to sourcing private chefs who craft personalized tasting menus onboard."
    ],
    image: "/images/yacht-img.jpg",
    heroImage: "/images/yacht-img.jpg",
    highlights: ["Millionaire's Row & Star Island Cruises", "Sandbar anchorages & watersports toys", "Private chef customized menus", "Same-day Bahamas / Bimini runs"],
    inclusions: [
      "Vetted luxury motor yacht with fully licensed crew",
      "Customized itinerary planning and routing",
      "Premium catering, private chef, and sommelier services",
      "Watersports equipment and tender access",
      "VIP port transfers via executive sprinter or SUV"
    ],
    features: ["Capacity: 6 to 12 Guests", "Bespoke Beverage & Caviar Service", "Bilingual Stewardess & Deck Crew"]
  },
  {
    id: "vip-dining-nightlife",
    slug: "vip-dining-nightlife",
    title: "VIP Dining & Nightlife Access",
    subtitle: "Priority Tables & Private Dining Rooms in Miami, New York, Chicago & Los Angeles",
    description: "Bypass standard reservation barriers with ELMIA's direct concierge access to the most coveted Michelin-starred restaurants, private members clubs, and world-renowned nightlife venues across Miami, New York, Chicago, and Los Angeles.",
    overviewParagraphs: [
      "From Miami's vibrant beachfront lounges and New York's private supper clubs to Chicago's culinary institutions and Los Angeles celebrity venues, access to premier tiers remains heavily guarded. ELMIA DMC’s deep-rooted relationships with elite hospitality groups allow our clients to bypass standard reservation barriers.",
      "Whether you require a discreet Private Dining Room (PDR) buyout for a sensitive corporate negotiation, or a prime-hour center table at a high-energy Michelin-starred venue, our concierge team orchestrates seamless entry and impeccable service.",
      "We pair your dining experience with discreet VIP table hosting, bespoke bottle service liaisons, and secure transport integration to ensure your evening is flawless from door to door."
    ],
    image: "/images/slide-experience.jpg",
    heroImage: "/images/slide-experience.jpg",
    highlights: ["Prime-hour table reservations (Carbone, Papi Steak, Sexy Fish, Kaseya)", "Private dining room (PDR) buyouts", "VIP table host & bottle service liaison", "Direct door access with zero wait times"],
    inclusions: [
      "Priority prime-time restaurant reservations",
      "Private Dining Room (PDR) sourcing and buyouts",
      "Customized Chef's tasting menus and wine pairings",
      "VIP nightlife access with zero wait times",
      "Dedicated on-site host and security liaison"
    ],
    features: ["Dedicated Hospitality Concierge", "Curated Chef Tasting Menus", "Discreet Security Transport Integration"]
  },
  {
    id: "luxury-villa-rentals",
    slug: "luxury-villa-rentals",
    title: "Luxury Villa & Estate Buyouts",
    subtitle: "Exclusive Estates in Miami, the Hamptons, Aspen & Nationwide",
    description: "Immerse your executive delegation or high-profile family in total privacy. We curate vetted waterfront estates, mountain compounds, and private ranches across Miami, New York, Aspen, Los Angeles, and premier destinations nationwide.",
    overviewParagraphs: [
      "For clients who demand absolute privacy, unparalleled space, and the comforts of home paired with ultra-luxury hotel amenities, ELMIA DMC curates the finest private estates in Miami and premier destinations nationwide.",
      "Our portfolio includes gated waterfront compounds in Star Island, modern architectural masterpieces on the Venetian Islands, historic mansions in Palm Beach, luxury penthouses in Manhattan, and private equestrian estates in Texas. These properties feature deep-water docks, private tennis courts, infinity pools, and strict perimeter security.",
      "We transform these estates into private sanctuaries, providing on-demand private chefs, highly trained butlers, daily housekeeping, and pre-arrival staging to ensure your specific preferences are met before you even step through the door."
    ],
    image: "/images/luxury-villa-buyout.jpg",
    heroImage: "/images/luxury-villa-buyout.jpg",
    highlights: ["Gated waterfront estates with deep-water docks", "On-demand private chefs, housekeepers, and butlers", "Strict NDA security and high perimeter privacy", "Complete pre-arrival provisioning and staging"],
    inclusions: [
      "Exclusive buyout of vetted luxury estate",
      "24/7 dedicated property concierge and security",
      "Pre-arrival grocery and luxury provisioning",
      "Daily housekeeping and turndown service",
      "On-demand private chef and sommelier (optional)"
    ],
    features: ["Bedrooms: 5 to 12 Suites", "24/7 Concierge & Security Services", "Direct Helipad / Boat Transfer Options"]
  },
  {
    id: "custom-florida-excursions",
    slug: "custom-florida-excursions",
    title: "Custom Florida Excursions",
    subtitle: "Helicopter Tours, Private Everglades Safaris & Championship Golf",
    description: "Escape the conventional tourist paths with handcrafted Florida adventures. From private doors-off helicopter flyovers above South Beach to custom hovercraft expeditions deep into untouched Everglades territory and tee times at PGA National.",
    overviewParagraphs: [
      "Discover the hidden, thrilling side of Florida far beyond the conventional tourist circuits. ELMIA DMC handcrafts bespoke excursions that blend high-adrenaline adventure with refined luxury.",
      "Take to the skies for a private doors-off helicopter charter over the glittering Miami coastline at sunset, or board a custom hovercraft with a master naturalist for a private safari deep into the untouched wetlands of the Everglades.",
      "For sports enthusiasts, we secure VIP tee times at Florida’s premier championship golf courses, orchestrating every detail from luxury clubhouse access to post-game private dining."
    ],
    image: "/images/slide-luxury.jpg",
    heroImage: "/images/slide-luxury.jpg",
    highlights: ["Exclusive Everglades hovercraft tours with master naturalists", "Miami skyline and coastal helicopter charters", "VIP tee times at premier championship golf courses", "Private seaplane day flights to the Dry Tortugas"],
    inclusions: [
      "Private charter transportation (air, land, or sea)",
      "Expert local guides, naturalists, or sports pros",
      "All necessary equipment, permits, and VIP access passes",
      "Curated gourmet picnic or post-excursion dining",
      "Seamless door-to-door luxury transfers"
    ],
    features: ["Door-to-Door Chauffeur Coordination", "Personalized Field Guides & Naturalists", "Custom Gourmet Picnic Provisioning"]
  },
  {
    id: "private-aviation-transfers",
    slug: "private-aviation-transfers",
    title: "Private Aviation & Helipad Airside Transfers",
    subtitle: "Tarmac-to-Destination Logistics across Miami, NY, Chicago, LA & Nationwide",
    description: "Experience absolute seamlessness with our Private Aviation handling. We coordinate direct airside tarmac access for executive motorcades across Miami (OPF/MIA), New York (TEB/HPN), Chicago (PWK/MDW), Los Angeles (VNY/LAX), and nationwide FBOs, plus helipad transfers.",
    overviewParagraphs: [
      "Time is the ultimate luxury for our elite clientele. ELMIA DMC’s aviation logistics team eliminates transit friction by providing direct airside tarmac access at major Fixed-Base Operators (FBOs) nationwide, including Miami Opa-locka (OPF), Teterboro (TEB), Chicago Executive (PWK), and Van Nuys (VNY).",
      "Your executive motorcade will be waiting planeside the moment your jet engines spool down. We handle all aircraft coordination, baggage logistics, and FBO clearances behind the scenes.",
      "For ultimate speed, we arrange direct helicopter transfers from the runway directly to your downtown high-rise helipad or private superyacht, ensuring your journey continues without a single disruption."
    ],
    image: "/images/jet-hero-img.jpg",
    heroImage: "/images/jet-hero-img.jpg",
    highlights: ["Planeside SUV motorcade greeting at OPF, TMB, FXE", "Luggage logistics and discreet handling", "Helicopter transfers to private yachts/estates", "FBO concierge coordination"],
    inclusions: [
      "Direct tarmac access and planeside greetings",
      "Executive SUV or Sprinter ground transfers",
      "FBO coordination and flight tracking",
      "Discreet luggage management directly to destination",
      "Helicopter charter integration upon request"
    ],
    features: ["Tarmac Access", "FBO Coordination", "Helicopter Integration"]
  },
  {
    id: "marquee-global-events",
    slug: "marquee-global-events",
    title: "Marquee Global Events & Paddock Access",
    subtitle: "F1 Miami, Art Basel & High-Stakes Tournaments",
    description: "Secure the impossible. ELMIA provides ultimate VIP access to Miami's most exclusive global events. From Formula 1 Paddock Club passes and trackside hospitality to VIP Vernissage access at Art Basel.",
    overviewParagraphs: [
      "Miami is the epicenter for globally renowned mega-events, drawing the world’s elite. ELMIA DMC guarantees that our clients experience these high-stakes moments from the best possible vantage points.",
      "During the Miami Grand Prix, we secure coveted Formula 1 Paddock Club passes, private trackside hospitality suites, and access to the most exclusive after-parties. For Art Basel, our clients receive VIP Vernissage credentials, private art advisor tours, and invitations to closed-door gallery dinners.",
      "We manage the entire ecosystem of your event experience, combining ultra-luxury transport, close-protection security, and flawless event ticketing into one seamless package."
    ],
    image: "/images/vip-f1-hospitality.jpg",
    heroImage: "/images/vip-f1-hospitality.jpg",
    highlights: ["F1 Miami Paddock Club & Trackside Suites", "Art Basel VIP Vernissage & Private Dinners", "Miami Open Tennis VIP Boxes", "Exclusive Super Bowl & Concours d'Elegance Access"],
    inclusions: [
      "Hard-to-source VIP tickets and credentials",
      "Private suite or box reservations",
      "Dedicated event concierge and host",
      "Priority routing and secure event transport",
      "Access to private after-parties and closed events"
    ],
    features: ["Paddock Access", "VIP Vernissage", "Suite Reservations"]
  },
  {
    id: "executive-protection",
    slug: "executive-protection",
    title: "Executive Protection & Diplomatic Security",
    subtitle: "Discreet, Elite Security Details for High-Profile Principals",
    description: "For visiting diplomats, royalty, and high-net-worth individuals, ELMIA deploys tier-one executive protection. We offer low-profile armed agents, armored motorcades, and comprehensive threat assessments for total peace of mind.",
    overviewParagraphs: [
      "Security is paramount for our high-profile, UHNW, and diplomatic clients. ELMIA DMC’s specialized security division provides world-class executive protection tailored to the unique threat profiles of our principals.",
      "Our agents are sourced from elite tier-one military and federal law enforcement backgrounds. We offer a sliding scale of visibility, from highly discreet, low-profile advance teams to robust, visible close-protection details and armored SUV motorcades.",
      "Before your arrival, our team conducts comprehensive route reconnaissance, venue threat assessments, and coordinates with local law enforcement to ensure an impenetrable, yet entirely seamless, protective bubble during your stay."
    ],
    image: "/images/executive-protection.jpg",
    heroImage: "/images/executive-protection.jpg",
    highlights: ["Tier-1 Armed or Unarmed Close Protection", "Armored SUV Motorcades", "Venue Threat Assessments & Advance Teams", "Discreet & Low-Profile Operations"],
    inclusions: [
      "Dedicated Executive Protection (EP) Agents",
      "Armored or standard luxury SUV motorcades",
      "Pre-arrival venue reconnaissance and risk analysis",
      "Secure encrypted communications",
      "Local law enforcement coordination when required"
    ],
    features: ["Armored Motorcades", "Advance Teams", "Low-Profile Operations"]
  }
];
