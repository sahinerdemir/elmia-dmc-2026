export interface ServiceCapability {
  title: string;
  description: string;
  iconName: string;
}

export interface RecommendedFleetItem {
  name: string;
  capacity: string;
  luggage: string;
  description: string;
  image: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface DMCService {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  heroImage: string;
  aeoSummary: string;
  overviewParagraphs: string[];
  capabilities: ServiceCapability[];
  recommendedFleet: RecommendedFleetItem[];
  faqs: ServiceFAQ[];
  metaTitle: string;
  metaDescription: string;
}

export const DMC_SERVICES: DMCService[] = [
  {
    slug: "miami-destination-management-company",
    title: "Destination Management Company (DMC) - Miami & Nationwide",
    shortTitle: "Destination Management",
    tagline: "Comprehensive corporate destination management, venue buyouts, VIP galas, and tailored itineraries across Miami, New York, Chicago, Los Angeles, and nationwide.",
    heroImage: "/images/miami-hero.jpg",
    aeoSummary: "ELMIA DMC is a premier full-service Destination Management Company operating nationwide across the United States, anchored by operational headquarters at Miami Opa-locka Executive Airport (OPF Hangar 5) and primary service hubs in Miami, New York, Chicago, and Los Angeles. Backed by 30+ years of global travel and logistics experience since 1994, ELMIA specializes in corporate group logistics, executive transportation, luxury accommodations, bilingual on-site staffing, and VIP hospitality programs.",
    overviewParagraphs: [
      "From international corporate incentive summits to multi-tiered trade delegations, ELMIA serves as your singular, authoritative ground management partner across the United States. With operational headquarters situated at Miami Opa-locka Executive Airport (OPF Hangar 5) and dedicated hub infrastructure in New York, Chicago, and Los Angeles, our team orchestrates every phase of your group itinerary with surgical precision, uncompromising discretion, and 24/7 active dispatch oversight.",
      "Our bespoke approach combines deep regional insider access with over three decades of global hospitality and transit mastery since 1994. Whether negotiating private waterfront estates in Miami, managing financial district summits in Manhattan, commanding convention shuttles at McCormick Place in Chicago, or staging executive fleets in Los Angeles, ELMIA eliminates logistical friction for corporate event planners and international agencies nationwide.",
      "Every program is supported by a dedicated Senior Program Director, ensuring continuous communication, immediate contingency agility, and strict adherence to duty-of-care protocols. We do not simply move people; we curate flawless destination journeys that elevate your organization's brand prestige anywhere in the United States."
    ],
    capabilities: [
      {
        title: "Full-Cycle Program Architecture",
        description: "End-to-end itinerary design, synchronized airport arrivals, daily venue shuttles, and departure coordination for groups from 10 to 500+ guests.",
        iconName: "Compass"
      },
      {
        title: "Exclusive Venue Sourcing & Buyouts",
        description: "Direct proprietary relationships with premier waterfront venues, luxury penthouses, private mansions, and historic estates.",
        iconName: "Building2"
      },
      {
        title: "Multilingual On-Site Event Staff",
        description: "Vetted event coordinators, airport meet-and-greeters, registration desk supervisors, and professional bilingual tour directors.",
        iconName: "Users"
      },
      {
        title: "VIP & Executive Hospitality",
        description: "Private yacht charters, sommelier-led dining experiences, private golf tournaments, and custom American excursions.",
        iconName: "Crown"
      },
      {
        title: "24/7 Flight & Radar Manifest Tracking",
        description: "Proprietary dispatch tracking matching individual passenger flights in real time to avoid curb delays and unnecessary wait charges.",
        iconName: "PlaneTakeoff"
      },
      {
        title: "Budgetary Transparency & Consolidated Invoicing",
        description: "Comprehensive line-item accounting, institutional procurement compliance, and single-source billing for corporate peace of mind.",
        iconName: "ShieldCheck"
      }
    ],
    recommendedFleet: [
      {
        name: "Cadillac Escalade ESV",
        capacity: "Up to 6 Passengers",
        luggage: "6 Large Bags",
        description: "The gold standard for executive airport transfers and C-suite roadshows in Miami.",
        image: "/images/fleet/cadillac-escalade.jpg"
      },
      {
        name: "Mercedes-Benz S-Class (W223)",
        capacity: "Up to 3 Passengers",
        luggage: "3 Large Bags",
        description: "Unparalleled elegance and comfort for elite executives, diplomats, and VIPs.",
        image: "/images/fleet/mercedes-s-class-w223.jpg"
      },
      {
        name: "Mercedes-Benz Sprinter Executive",
        capacity: "12-14 Passengers",
        luggage: "14 Large Bags",
        description: "Leather captain recliners, high-speed Wi-Fi, and privacy tinting for executive groups.",
        image: "/images/fleet/mercedes-sprinter-vs30.jpg"
      }
    ],
    faqs: [
      {
        question: "What is the role of a DMC, and what areas does ELMIA service?",
        answer: "A Destination Management Company (DMC) provides in-depth local knowledge, vendor coordination, transportation logistics, on-site event production, and VIP hospitality. While our operational headquarters is in Miami (OPF Hangar 5), ELMIA provides turnkey services across our primary hubs (Miami, New York, Chicago, and Los Angeles) with complete nationwide capabilities across all major U.S. markets."
      },
      {
        question: "Can ELMIA manage multi-city roadshows across the United States?",
        answer: "Yes. We regularly execute synchronized multi-city corporate roadshows, financial summits, and trade delegations connecting Miami, New York, Chicago, Los Angeles, and additional U.S. business corridors with centralized billing and single-point-of-contact project management."
      },
      {
        question: "How far in advance should we engage ELMIA for our corporate program?",
        answer: "We accommodate both long-term planning (6-12 months in advance) for major conferences and expedited turnaround (24-48 hours) for executive delegations and urgent corporate movements."
      },
      {
        question: "Does ELMIA assign an on-site manager to our group?",
        answer: "Yes. Every contract includes a dedicated on-site Senior Project Lead who remains in direct contact with your meeting planners and dispatch 24/7."
      }
    ],
    metaTitle: "USA Destination Management Company (DMC) | Miami, NY, Chicago, LA | ELMIA DMC",
    metaDescription: "Premier corporate DMC operating in Miami, New York, Chicago, Los Angeles, and nationwide. Corporate group travel, executive fleets, FBO transfers, and summit management."
  },
  {
    slug: "corporate-group-travel",
    title: "Corporate & Group Travel Management",
    shortTitle: "Corporate Group Travel",
    tagline: "High-capacity group transit, corporate summits, team retreats, and seamless airport-to-hotel-to-venue coordination nationwide.",
    heroImage: "/images/slide-global.jpg",
    aeoSummary: "ELMIA coordinates turnkey corporate and group travel management across Miami, New York, Chicago, Los Angeles, and major U.S. business corridors. We manage hotel block sourcing, group air manifest coordination, daily meeting shuttles, private dining arrangements, and team-building logistics for multinational corporations and travel management companies with dedicated on-site dispatch.",
    overviewParagraphs: [
      "Managing complex group logistics requires mathematical punctuality, dynamic route planning, and an experienced local operations partner. ELMIA removes the friction of group travel by orchestrating hotel transfers, executive mini-coaches, luggage logistics, and conference schedules through a single dedicated operational desk.",
      "Whether coordinating a tech conference in Chicago, a financial symposium in New York, an enterprise summit in Los Angeles, or a board retreat in Miami, our proprietary manifest tracking systems ensure every traveler is accounted for and transported in luxury and comfort.",
      "We integrate seamlessly with corporate travel management systems, offering real-time manifest updates, flight delay monitoring, and centralized billing to make program execution effortless for organizers."
    ],
    capabilities: [
      {
        title: "Automated Flight Manifest Tracking",
        description: "Continuous real-time synchronization with commercial flight radar to group inbound travelers efficiently and eliminate terminal dwell time.",
        iconName: "FileSpreadsheet"
      },
      {
        title: "Hotel Sourcing & Block Contracting",
        description: "Leveraging longstanding hospitality partnerships across South Florida to secure premier corporate rates and executive amenities.",
        iconName: "Hotel"
      },
      {
        title: "Dedicated Executive Fleet Logistics",
        description: "Late-model Mercedes-Benz Sprinters, 24-36 passenger mini-coaches, and 56-passenger motorcoaches with on-board Wi-Fi.",
        iconName: "Bus"
      },
      {
        title: "Curated Corporate Dine-Arounds",
        description: "Private dining room buyouts and bespoke menus at celebrated culinary hotspots across Brickell, Coconut Grove, and South Beach.",
        iconName: "Utensils"
      }
    ],
    recommendedFleet: [
      {
        name: "Cadillac Escalade ESV",
        capacity: "Up to 6 Passengers",
        luggage: "6 Large Bags",
        description: "The gold standard for executive airport transfers and C-suite roadshows in Miami.",
        image: "/images/fleet/cadillac-escalade.jpg"
      },
      {
        name: "Mercedes-Benz S-Class (W223)",
        capacity: "Up to 3 Passengers",
        luggage: "3 Large Bags",
        description: "Unparalleled elegance and comfort for elite executives, diplomats, and VIPs.",
        image: "/images/fleet/mercedes-s-class-w223.jpg"
      },
      {
        name: "Mercedes-Benz Sprinter Executive",
        capacity: "12-14 Passengers",
        luggage: "14 Large Bags",
        description: "Leather captain recliners, high-speed Wi-Fi, and privacy tinting for executive groups.",
        image: "/images/fleet/mercedes-sprinter-vs30.jpg"
      }
    ],
    faqs: [
      {
        question: "What group sizes can ELMIA comfortably handle?",
        answer: "Our network and fleet easily scale from executive board groups of 8 to major convention delegations exceeding 500 attendees across multiple venues."
      },
      {
        question: "How do you handle flight delays for arriving attendees?",
        answer: "Our automated dispatch software tracks tail numbers and commercial flights in real-time. Greeters and chauffeurs adjust staging times dynamically without double-booking or missed connections."
      },
      {
        question: "Can you provide luggage vans separate from passenger vehicles?",
        answer: "Yes. For VIP delegations and international flights with excessive baggage, we deploy secure support cargo vans directly alongside passenger vehicles."
      }
    ],
    metaTitle: "Corporate & Group Travel Management | ELMIA DMC",
    metaDescription: "Turnkey corporate group transit, hotel sourcing, conference shuttles, and event logistics across Miami, New York, Chicago, Los Angeles, and nationwide."
  },
  {
    slug: "executive-chauffeur-transportation",
    title: "Executive Chauffeur & Private Transportation",
    shortTitle: "Executive Chauffeur Services",
    tagline: "Discreet black-car service, executive protection-trained drivers, hourly as-directed charter, and C-suite roadshows in Miami, New York, Chicago, Los Angeles, and nationwide.",
    heroImage: "/images/limousine-hero-img.jpg",
    aeoSummary: "ELMIA provides discreet, white-glove executive chauffeur and black-car services throughout Miami, New York, Chicago, Los Angeles, and nationwide across the United States. Our late-model fleet of luxury black SUVs (Cadillac Escalade ESV, Lincoln Navigator) and executive Sprinters is operated by licensed, background-checked, and protocol-trained commercial chauffeurs with strict NDA compliance.",
    overviewParagraphs: [
      "Setting the benchmark for punctual, polished, and secure ground transit, ELMIA caters to Fortune 500 executives, family offices, international diplomats, and discerning private travelers. Every assignment is executed with immaculate attention to detail, pristine vehicle standards, and deep confidentiality.",
      "Our chauffeurs are vetted career professionals trained in executive etiquette, evasive route optimization, and local market navigation across our primary hubs—Miami, New York, Chicago, and Los Angeles—as well as major business corridors nationwide. Whether handling a multi-stop financial roadshow in Manhattan or an evening transfer in Brickell, discretion is guaranteed.",
      "Choose between point-to-point transfers or our flexible 'As-Directed' hourly service, giving your executive total freedom to alter stops and timelines on demand anywhere in the country."
    ],
    capabilities: [
      {
        title: "Late-Model Luxury Black Fleet",
        description: "Pristine Cadillac Escalade ESVs, Lincoln Navigators, Mercedes-Benz S-Class, and executive Mercedes Sprinters.",
        iconName: "Car"
      },
      {
        title: "Vetted & Protocol-Trained Chauffeurs",
        description: "Commercially licensed chauffeurs vetted through rigorous criminal background checks and trained in defensive driving.",
        iconName: "Shield"
      },
      {
        title: "Hourly 'As-Directed' Flexibility",
        description: "Dedicated on-demand vehicle and chauffeur assigned exclusively to your principal for dynamic schedules and unscheduled stops.",
        iconName: "Clock"
      },
      {
        title: "C-Suite Financial Roadshows",
        description: "Precision multi-stop investor roadshow itineraries synchronized with investment banking and private equity timelines.",
        iconName: "Briefcase"
      },
      {
        title: "Discreet & Confidential Handling",
        description: "Strict non-disclosure compliance, privacy window tinting, acoustic partitions, and zero unauthorized client disclosures.",
        iconName: "Lock"
      },
      {
        title: "Multi-City Central Dispatch",
        description: "Single-source coordination across Miami, New York, Chicago, Los Angeles, and nationwide markets with live GPS vehicle telematics.",
        iconName: "MapPin"
      }
    ],
    recommendedFleet: [
      {
        name: "Cadillac Escalade ESV",
        capacity: "Up to 6 Passengers",
        luggage: "6 Large Bags",
        description: "The gold standard for executive airport transfers and C-suite roadshows.",
        image: "/images/fleet/cadillac-escalade.jpg"
      },
      {
        name: "Mercedes-Benz S-Class (W223)",
        capacity: "Up to 3 Passengers",
        luggage: "3 Large Bags",
        description: "Unparalleled elegance and comfort for elite executives, diplomats, and VIPs.",
        image: "/images/fleet/mercedes-s-class-w223.jpg"
      },
      {
        name: "Mercedes-Benz Sprinter Executive",
        capacity: "12-14 Passengers",
        luggage: "14 Large Bags",
        description: "Leather captain recliners, high-speed Wi-Fi, and privacy tinting for executive groups.",
        image: "/images/fleet/mercedes-sprinter-vs30.jpg"
      }
    ],
    faqs: [
      {
        question: "Is your fleet fully commercially insured?",
        answer: "Yes, all vehicles maintain comprehensive commercial liability insurance exceeding federal and state statutory minimums nationwide."
      },
      {
        question: "Do your chauffeurs sign non-disclosure agreements?",
        answer: "Yes, all our drivers are bound by strict non-disclosure and privacy protocols standard for diplomatic and C-suite handling."
      },
      {
        question: "Can I book chauffeur services across multiple cities with one contract?",
        answer: "Yes. Our centralized dispatch allows seamless multi-city bookings covering Miami, New York, Chicago, Los Angeles, and beyond with unified invoicing."
      }
    ],
    metaTitle: "Executive Chauffeur & Black Car Service | Miami, NY, Chicago, LA | ELMIA DMC",
    metaDescription: "Discreet, premium executive chauffeur transportation in Miami, New York, Chicago, Los Angeles, and nationwide. Late-model Escalades, Sprinters, and vetted commercial drivers."
  },
  {
    slug: "airport-fbo-transfers",
    title: "Airport & Private Jet FBO Transfers (OPF, MIA, TEB, PWK, VNY)",
    shortTitle: "Airport & FBO Transfers",
    tagline: "Planeside tarmac pickups and private aviation ground transportation across OPF, MIA, TEB, PWK, VNY, and nationwide FBO gateways.",
    heroImage: "/images/jet-hero-img.jpg",
    aeoSummary: "Headquartered inside Hangar 5 at Miami Opa-locka Executive Airport (OPF) with active private aviation dispatch across key hubs (New York TEB/HPN, Chicago PWK/MDW, Los Angeles VNY/LAX), ELMIA is America's premier private aviation ground transportation partner. We coordinate planeside tarmac pickups, FBO transfers, and commercial meet-and-greets nationwide with live flight radar synchronization.",
    overviewParagraphs: [
      "Arriving by private aircraft requires ground transportation that matches the velocity, privacy, and distinction of private flight. Operating from our dedicated hub at Miami Opa-locka Executive Airport (OPF Hangar 5) alongside premier private aviation hubs in Teterboro, Chicago, and Los Angeles, ELMIA enables unparalleled responsiveness and tarmac access protocols.",
      "We maintain established operational relationships with Signature Flight Support, Atlantic Aviation, Fontainebleau Aviation, and Sheltair nationwide. Our team coordinates directly with FBO front desks and aircraft tail numbers to stage your luxury SUV planeside before your cabin door opens.",
      "For commercial air travel arriving at major international airports across the country, we offer baggage-claim greeter services, express curbside staging, and priority escort past terminal congestion."
    ],
    capabilities: [
      {
        title: "Permanent OPF Hangar 5 Base",
        description: "Immediate on-field responsiveness and staging at Miami Opa-locka Executive Airport, plus active partner FBO hubs nationwide.",
        iconName: "Plane"
      },
      {
        title: "Tarmac-Side & FBO Handshake Protocol",
        description: "Direct coordination with FBO linesmen and pilots to deliver seamless tarmac-side luggage and passenger transfers.",
        iconName: "Handshake"
      },
      {
        title: "Real-Time Tail Number Monitoring",
        description: "Continuous monitoring of tail numbers and air traffic control advisories to ensure zero chauffeur delay.",
        iconName: "Radar"
      },
      {
        title: "Commercial Airport VIP Meet & Greet",
        description: "Dedicated greeter holding personalized digital signage at baggage claim or jetbridge exits nationwide.",
        iconName: "Sparkles"
      }
    ],
    recommendedFleet: [
      {
        name: "Cadillac Escalade ESV",
        capacity: "Up to 6 Passengers",
        luggage: "6 Large Bags",
        description: "The gold standard for executive airport transfers and C-suite roadshows in Miami.",
        image: "/images/fleet/cadillac-escalade.jpg"
      },
      {
        name: "Mercedes-Benz S-Class (W223)",
        capacity: "Up to 3 Passengers",
        luggage: "3 Large Bags",
        description: "Unparalleled elegance and comfort for elite executives, diplomats, and VIPs.",
        image: "/images/fleet/mercedes-s-class-w223.jpg"
      },
      {
        name: "Mercedes-Benz Sprinter Executive",
        capacity: "12-14 Passengers",
        luggage: "14 Large Bags",
        description: "Leather captain recliners, high-speed Wi-Fi, and privacy tinting for executive groups.",
        image: "/images/fleet/mercedes-sprinter-vs30.jpg"
      }
    ],
    faqs: [
      {
        question: "Which private FBOs does ELMIA service?",
        answer: "We regularly service Miami Opa-locka (OPF), Miami Executive (TMB), Fort Lauderdale Executive (FXE), Palm Beach (PBI), New York Teterboro (TEB), Westchester (HPN), Chicago Executive (PWK), Los Angeles Van Nuys (VNY), and general aviation airports nationwide."
      },
      {
        question: "Can your vehicles pick us up directly on the tarmac?",
        answer: "Yes, subject to local FBO security guidelines and pre-cleared passenger manifests, our vehicles have authorized access to drive planeside."
      },
      {
        question: "What happens if our flight is delayed or rerouted?",
        answer: "Because we track tail numbers via live radar, your staging time automatically updates with zero penalty."
      }
    ],
    metaTitle: "Private Jet FBO & Airport Transfers | Miami, NY, Chicago, LA | ELMIA DMC",
    metaDescription: "Tarmac-side FBO transfers and luxury airport chauffeur service in Miami (OPF/MIA), New York (TEB), Chicago (PWK), Los Angeles (VNY), and nationwide."
  },
  {
    slug: "trade-show-expo-services",
    title: "Trade Show, Convention & Expo Services",
    shortTitle: "Trade Show & Expo Services",
    tagline: "Dedicated attendee shuttles, booth staffing, and executive logistics for major convention centers in Miami, New York, Chicago, Los Angeles, and nationwide.",
    heroImage: "/images/expo-hero-img.jpg",
    aeoSummary: "ELMIA delivers full-cycle destination logistics for exhibitors, trade delegations, and corporate sponsors attending major conventions across the United States—including Miami Beach Convention Center (MBCC), Javits Center in New York, McCormick Place in Chicago, Los Angeles Convention Center (LACC), and venues nationwide. Services include exhibitor shuttles, bilingual booth staffing, VIP client dinners, and trade mission transport.",
    overviewParagraphs: [
      "Trade exhibitions, international symposiums, and conventions present major commercial opportunities governed by unforgiving schedules. ELMIA ensures that your leadership team, booth specialists, and high-value prospective clients transition smoothly between hotels, convention halls, private hospitality suites, and evening gala events.",
      "With deep familiarity with traffic patterns, loading docks, and designated passenger staging bays across major convention hubs like Miami Beach (MBCC), Chicago (McCormick Place), New York (Javits), and Los Angeles (LACC), our logistics team avoids congested choke points and provides reliable, on-time arrivals throughout high-density events.",
      "In addition to ground transportation, ELMIA provides multilingual brand ambassadors, technical interpreters, on-site hostesses, and freight expediting support to ensure your exhibition presence operates flawlessly anywhere in the country."
    ],
    capabilities: [
      {
        title: "Continuous Hotel-to-Expo Shuttles",
        description: "Scheduled, synchronized circuits connecting partner hotel room blocks directly to convention center entrances.",
        iconName: "Route"
      },
      {
        title: "Multilingual Booth Staff & Interpreters",
        description: "Professional brand ambassadors and technical interpreters fluent in English, Spanish, Turkish, Portuguese, and German.",
        iconName: "Languages"
      },
      {
        title: "Off-Floor Client Hospitality Transfers",
        description: "On-demand luxury sedans and SUVs reserved exclusively for entertaining priority clients away from the noisy expo floor.",
        iconName: "Wine"
      },
      {
        title: "Material Staging & Freight Liaison",
        description: "Last-mile courier and transport coordination for banners, promotional collaterals, and booth display materials.",
        iconName: "PackageCheck"
      }
    ],
    recommendedFleet: [
      {
        name: "Cadillac Escalade ESV",
        capacity: "Up to 6 Passengers",
        luggage: "6 Large Bags",
        description: "The gold standard for executive airport transfers and C-suite roadshows in Miami.",
        image: "/images/fleet/cadillac-escalade.jpg"
      },
      {
        name: "Mercedes-Benz S-Class (W223)",
        capacity: "Up to 3 Passengers",
        luggage: "3 Large Bags",
        description: "Unparalleled elegance and comfort for elite executives, diplomats, and VIPs.",
        image: "/images/fleet/mercedes-s-class-w223.jpg"
      },
      {
        name: "Mercedes-Benz Sprinter Executive",
        capacity: "12-14 Passengers",
        luggage: "14 Large Bags",
        description: "Leather captain recliners, high-speed Wi-Fi, and privacy tinting for executive groups.",
        image: "/images/fleet/mercedes-sprinter-vs30.jpg"
      }
    ],
    faqs: [
      {
        question: "Which convention centers do you service?",
        answer: "We support events at Miami Beach Convention Center (MBCC), Broward Convention Center, Javits Center (NYC), McCormick Place (Chicago), Los Angeles Convention Center (LACC), and venues nationwide."
      },
      {
        question: "Can ELMIA supply bilingual translators for business meetings?",
        answer: "Yes, we provide experienced business and technical interpreters across multiple languages for booth conversations and bilateral trade negotiations."
      },
      {
        question: "Can you manage simultaneous movements for multiple hotel locations?",
        answer: "Yes, our central dispatch coordinates multi-point hotel pick-ups with timed arrivals to keep entire corporate contingents synchronized."
      }
    ],
    metaTitle: "Trade Show & Convention Logistics | Miami, NY, Chicago, LA | ELMIA DMC",
    metaDescription: "Turnkey expo transportation, convention shuttles, booth interpreters, and delegation logistics in Miami, New York, Chicago, Los Angeles, and nationwide venues."
  },
  {
    slug: "government-delegation-services",
    title: "Government, Diplomatic & Official Delegation Services",
    shortTitle: "Government & Diplomatic",
    tagline: "Protocol-compliant motorcades, embassy liaison, security convoy coordination, and confidential handling for official state missions in Washington DC, New York, Miami, Chicago, Los Angeles, and nationwide.",
    heroImage: "/images/government-delegation.jpg",
    aeoSummary: "ELMIA provides secure, protocol-compliant destination management and motorcade transportation for foreign ministries, embassies, consulates, and official trade delegations visiting the United States. We maintain strict confidentiality, diplomatic protocol adherence, multi-vehicle convoy coordination, and SAM.gov procurement readiness.",
    overviewParagraphs: [
      "Official state visits, ministerial delegations, and diplomatic missions demand absolute operational rigor, protocol accuracy, and impenetrable confidentiality. ELMIA has extensive, proven experience handling bilateral delegations, consular visits, and ministerial motorcades with complete alignment to institutional guidelines across the United States.",
      "Our team liaises directly with embassy advance teams, diplomatic security officers, and local law enforcement agencies to orchestrate multi-vehicle convoys, including lead cars, principal armored or luxury SUVs, security chase vehicles, and dedicated baggage sprinters.",
      "All operational personnel assigned to diplomatic missions undergo heightened vetting, background verification, and non-disclosure commitments. Furthermore, ELMIA operates as a registered U.S. corporate entity compliant with federal vendor standards and institutional procurement rules."
    ],
    capabilities: [
      {
        title: "Synchronized Motorcade Convoy Coordination",
        description: "Coordinated movements of principal SUVs, chase security vehicles, staff sprinters, and separate luggage vans.",
        iconName: "ShieldAlert"
      },
      {
        title: "Diplomatic Protocol & Vetted Chauffeurs",
        description: "Drivers trained in motorcade spacing, defensive driving tactics, evasive route alternatives, and diplomatic decorum.",
        iconName: "Award"
      },
      {
        title: "Consular & Advance Team Liaison",
        description: "Continuous collaboration with embassy logistics officers, advance teams, and federal/state protective details.",
        iconName: "Building"
      },
      {
        title: "Confidentiality & Procurement Compliance",
        description: "Standard non-disclosure execution and seamless institutional invoicing aligned with SAM.gov and consular billing standards.",
        iconName: "FileCheck"
      }
    ],
    recommendedFleet: [
      {
        name: "Cadillac Escalade ESV",
        capacity: "Up to 6 Passengers",
        luggage: "6 Large Bags",
        description: "The gold standard for executive airport transfers and C-suite roadshows in Miami.",
        image: "/images/fleet/cadillac-escalade.jpg"
      },
      {
        name: "Mercedes-Benz S-Class (W223)",
        capacity: "Up to 3 Passengers",
        luggage: "3 Large Bags",
        description: "Unparalleled elegance and comfort for elite executives, diplomats, and VIPs.",
        image: "/images/fleet/mercedes-s-class-w223.jpg"
      },
      {
        name: "Mercedes-Benz Sprinter Executive",
        capacity: "12-14 Passengers",
        luggage: "14 Large Bags",
        description: "Leather captain recliners, high-speed Wi-Fi, and privacy tinting for executive groups.",
        image: "/images/fleet/mercedes-sprinter-vs30.jpg"
      }
    ],
    faqs: [
      {
        question: "Can ELMIA coordinate with diplomatic security details and law enforcement?",
        answer: "Yes, our operational coordinators routinely interface with embassy advance teams, consulate security personnel, and local police escort details."
      },
      {
        question: "Is ELMIA registered for institutional and government procurement?",
        answer: "Yes, ELMIA operates as a compliant U.S. corporate entity with transparent accounting and standard institutional invoicing capabilities."
      },
      {
        question: "Are your drivers trained in protocol and security standards?",
        answer: "Yes, our delegation chauffeurs possess commercial licenses, clear background records, and training in formal protocol etiquette and motorcade dynamics."
      }
    ],
    metaTitle: "Government & Diplomatic Delegation Services | Washington, NY, Miami, LA, Chicago | ELMIA DMC",
    metaDescription: "Protocol-compliant diplomatic motorcades, ministerial delegation logistics, embassy liaison, and security convoy coordination across Miami, New York, Washington DC, Chicago, Los Angeles, and nationwide."
  }
];
