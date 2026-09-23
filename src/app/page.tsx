import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, ArrowUpRight, ArrowRight, Star } from "lucide-react";
import ProgramsCarousel from "@/components/ProgramsCarousel";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata = {
  title: "USA Destination Management & Executive Chauffeur Services - ELMIA",
  description:
    "ELMIA provides premier destination management, executive chauffeured transit, and VIP summit logistics across Miami, New York, Chicago, and Los Angeles.",
  alternates: {
    canonical: "https://elmiadmc.com"
  },
  keywords: [
    "Miami DMC",
    "USA Destination Management Company",
    "Executive Chauffeur Miami",
    "New York Corporate Transport",
    "Chicago Convention Logistics",
    "Los Angeles Executive Travel",
    "VIP Private Aviation Transit",
    "Opa-locka Hangar 5 Dispatch",
    "Diplomatic Motorcades USA",
    "Luxury Sprinter Van Rental",
    "Cadillac Escalade Chauffeur",
    "Art Basel VIP Transport"
  ]
};

const TOURS = [
  {
    title: "American Legends",
    category: "Tours",
    image: "/images/tours/new-york-thumb.jpg",
    slug: "american-legends"
  },
  {
    title: "Pearls of America",
    category: "Tours",
    image: "/images/tours/washington-thumb.jpg",
    slug: "pearls-of-america"
  },
  {
    title: "Coast to Coast America 16 Days 15 Nights",
    category: "Tours",
    image: "/images/tours/miami-thumbnail2.jpg",
    slug: "coast-to-coast-america"
  },
  {
    title: "Coast to Coast US Tour 14 Days 13 Nights",
    category: "Tours",
    image: "/images/tours/miami-thumbnail2.jpg",
    slug: "coast-to-coast-us-tour"
  },
  {
    title: "Western United States",
    category: "Tours",
    image: "/images/tours/los-angeles-thumb.jpg",
    slug: "western-united-states"
  },
  {
    title: "Grand America Tour",
    category: "Tours",
    image: "/images/tours/new-york-thumb.jpg",
    slug: "grand-america-tour"
  },
  {
    title: "East Coasts of America",
    category: "Tours",
    image: "/images/tours/orlando-thumb.jpg",
    slug: "east-coasts-of-america"
  },
  {
    title: "Florida Dream",
    category: "Tours",
    image: "/images/tours/miami-thumbnail2.jpg",
    slug: "florida-dream-miami-orlando"
  },
  {
    title: "Western USA Tour",
    category: "Tours",
    image: "/images/tours/san-francisco-thumb.jpg",
    slug: "western-usa-tour"
  },
  {
    title: "Best West",
    category: "Tours",
    image: "/images/tours/las-vegas-thumb.jpg",
    slug: "best-west"
  }
];

const PROGRAMS = [
  {
    title: "Private Yacht Charters",
    category: "VIP Programs",
    image: "/images/yacht-img.jpg",
    slug: "private-yacht-charters"
  },
  {
    title: "VIP Dining & Nightlife Access",
    category: "VIP Programs",
    image: "/images/slide-experience.jpg",
    slug: "vip-dining-nightlife"
  },
  {
    title: "Luxury Villa & Estate Buyouts",
    category: "VIP Programs",
    image: "/images/luxury-villa-buyout.jpg",
    slug: "luxury-villa-rentals"
  },
  {
    title: "Custom Florida Excursions",
    category: "VIP Programs",
    image: "/images/slide-luxury.jpg",
    slug: "custom-florida-excursions"
  },
  {
    title: "Private Aviation & Helipad Transfers",
    category: "VIP Programs",
    image: "/images/jet-hero-img.jpg",
    slug: "private-aviation-transfers"
  },
  {
    title: "Marquee Global Events & Paddock Access",
    category: "VIP Programs",
    image: "/images/vip-f1-hospitality.jpg",
    slug: "marquee-global-events"
  },
  {
    title: "Executive Protection & Diplomatic Security",
    category: "VIP Programs",
    image: "/images/executive-protection.jpg",
    slug: "executive-protection"
  }
];

const SERVICES = [
  {
    title: "Destination Management (DMC)",
    category: "Services",
    image: "/images/miami-hero.jpg",
    slug: "miami-destination-management-company"
  },
  {
    title: "Corporate & Group Travel",
    category: "Services",
    image: "/images/business-hero-img.jpg",
    slug: "corporate-group-travel"
  },
  {
    title: "Executive Chauffeur & Transfers",
    category: "Services",
    image: "/images/limousine-hero-img.jpg",
    slug: "executive-chauffeur-transportation"
  },
  {
    title: "Airport & Private Jet FBO Transfers",
    category: "Services",
    image: "/images/jet-img.jpg",
    slug: "airport-fbo-transfers"
  },
  {
    title: "Trade Show & Convention Services",
    category: "Services",
    image: "/images/expo-img.jpg",
    slug: "trade-show-expo-services"
  },
  {
    title: "Government & Delegation Services",
    category: "Services",
    image: "/images/government-delegation.jpg",
    slug: "government-delegation-services"
  }
];

const PARTNER_LOGOS = [
  {
    name: "Republic of Türkiye Ministry of Foreign Affairs",
    src: "/images/logos/mfa.png",
    description: "Official diplomatic delegation, consular logistics & state protocol convoys."
  },
  {
    name: "Republic of Azerbaijan Ministry of Foreign Affairs",
    src: "/images/logos/azerbaijan-mfa.png",
    description: "Bilateral state visits, diplomatic mission logistics & executive protocol transit."
  },
  {
    name: "G20 Summit",
    src: "/images/logos/g20.png",
    description: "Head of state motorcades, bilateral summit logistics & executive transit."
  },
  {
    name: "Formula 1",
    src: "/images/logos/f1.svg",
    description: "Paddock Club access, VIP team logistics & trackside luxury chauffeur transit."
  },
  {
    name: "World Travel Expo",
    src: "/images/logos/wte.webp",
    description: "International tourism ministry delegations & premier exhibition transit."
  },
  {
    name: "Americas Food & Beverage",
    src: "/images/logos/afb.png",
    description: "Official trade mission delegations & executive corporate hospitality."
  },
  {
    name: "World Economic Forum",
    src: "/images/logos/wef.svg",
    description: "Global leader summits, private aviation transfers & diplomatic motorcades."
  },
  {
    name: "United Nations",
    src: "/images/logos/un.svg",
    description: "Ministerial delegation coordination, diplomatic escorts & protocol liaison."
  },
  {
    name: "NATO Summit",
    src: "/images/logos/nato.png",
    description: "Armored motorcades, secure defense delegation transit & tactical logistics."
  },
  {
    name: "FIFA World Cup",
    src: "/images/logos/fifa.svg",
    description: "National team transport, FIFA VIP delegation coordination & stadium access."
  },
  {
    name: "Art Basel",
    src: "/images/logos/artbasel.png",
    description: "Ultra-VIP collector hospitality, luxury villa transfers & private yacht charters."
  },
  {
    name: "Miami Open",
    src: "/images/logos/miamiopen.png",
    description: "Player entourage transportation, sponsor executive transit & suite access."
  },
  {
    name: "CES Las Vegas",
    src: "/images/logos/ces-cta.png",
    description: "Tech leadership summits, corporate fleet buyouts & keynote hospitality."
  },
  {
    name: "COP Climate Summits",
    src: "/images/logos/cop28.png",
    description: "Government ministerial convoys & sustainable luxury fleet operations."
  },
  {
    name: "Web Summit",
    src: "/images/logos/websummit.png",
    description: "Venture capital executive groups & premier technology keynote delegations."
  },
  {
    name: "Bloomberg",
    src: "/images/logos/bloomberg.svg",
    description: "Global financial leadership forums & media executive transfers."
  },
  {
    name: "Sundance Film Festival",
    src: "/images/logos/sundance.png",
    description: "A-list talent transit, premiere private shuttles & estate hospitality."
  },
  {
    name: "SXSW",
    src: "/images/logos/sxsw.png",
    description: "Creative industry executives, festival hospitality & private chauffeur transit."
  },
  {
    name: "TED Conference",
    src: "/images/logos/ted.svg",
    description: "Keynote speaker delegation coordination & VIP attendee experiences."
  },
  {
    name: "Cannes Lions",
    src: "/images/logos/cannes.png",
    description: "Brand leadership delegations, coastal yacht transfers & executive chauffeuring."
  }
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#444444]">
      {/* 1. HERO SECTION (Full-Width Edge-to-Edge, Overlaid by Header) */}
      <section className="relative w-full -mt-[104px] overflow-hidden bg-white">
        <div className="relative w-full min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] rounded-t-none rounded-b-[44px] sm:rounded-b-[68px] lg:rounded-b-[88px] overflow-hidden flex flex-col justify-end px-6 sm:px-12 lg:px-16 pt-32 sm:pt-40 pb-12 sm:pb-16 bg-[#0e1710]">
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              poster="/images/hero-video-poster.jpg"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-55"
            >
              <source src="/videos/elmia-hero-20s.mp4" type="video/mp4" />
            </video>
            {/* Natural gradient for bottom text readability, completely transparent at top under header */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Left Hero Title */}
            <div className="max-w-3xl text-white">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] tracking-tight text-white font-heading">
                <span className="block text-xs sm:text-sm font-semibold tracking-widest text-[#61CE70] uppercase mb-3 sm:mb-4 font-heading">
                  USA Destination Management &amp; Executive Chauffeur Services
                </span>
                Experience world-class journeys with comfort, elegance, and privacy.
              </h1>
            </div>

            {/* Right Mehmet Customer Service Card (Glassmorphism) */}
            <div className="relative overflow-hidden bg-white/[0.08] backdrop-blur-xl rounded-[24px] p-4 sm:p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] flex items-center space-x-4 max-w-[340px] w-full shrink-0 border border-white/20">
              {/* Subtle top reflection line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-[18px] overflow-hidden shrink-0 border border-white/25 shadow-md">
                <Image
                  src="/images/mehmet-leblebicioglu.jpg"
                  alt="Mehmet Leblebicioğlu - ELMIA Senior Operations & Dispatch Director"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1.5 mb-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#61CE70] animate-pulse shrink-0" />
                  <span className="text-xs text-white/75 font-medium tracking-wide">
                    Customer Service
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-normal text-white leading-tight font-heading truncate">
                  Mehmet
                </div>
                <a
                  href="tel:+17866777333"
                  className="inline-flex items-center px-3.5 py-1.5 rounded-full border border-white/30 hover:border-[#61CE70] bg-white/[0.06] hover:bg-[#61CE70]/10 text-white hover:text-[#61CE70] text-xs font-medium tracking-wide transition-all duration-200 mt-2 group"
                >
                  <Phone className="w-3 h-3 mr-1.5 text-[#61CE70] group-hover:scale-110 transition-transform" />
                  <span>Call now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ELMIA’S VISION SECTION */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto w-full">
        <RevealOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <span className="block text-xs font-semibold tracking-widest text-[#285735] uppercase mb-4 font-heading">
                ELMIA’S VISION &amp; REACH
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#111111] leading-[1.2] tracking-tight font-heading">
                Premier Destination Management: Miami, New York, Chicago, Los Angeles &amp; Nationwide
              </h2>
            </div>
            <div className="lg:col-span-5 pt-2">
              <p className="text-base sm:text-lg text-[#666666] leading-relaxed">
                We combine premium travel, flawless event planning, and personalized experiences for clients who expect more. Headquartered in Miami with primary operational hubs in New York, Chicago, and Los Angeles, ELMIA provides turnkey destination management, executive transportation, event logistics, and on-site support across the entire United States.
              </p>
            </div>
          </div>
        </RevealOnScroll>

        {/* Primary Hubs & Nationwide Operational Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
          <RevealOnScroll delay={0}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faf8] h-full">
              <div className="text-lg sm:text-xl font-bold text-[#285735] font-heading">Miami</div>
              <div className="text-xs text-[#666666] mt-1">Headquarters &amp; OPF Hangar 5</div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={60}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faf8] h-full">
              <div className="text-lg sm:text-xl font-bold text-[#285735] font-heading">New York</div>
              <div className="text-xs text-[#666666] mt-1">Finance, Corporate &amp; UN Corridors</div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faf8] h-full">
              <div className="text-lg sm:text-xl font-bold text-[#285735] font-heading">Chicago</div>
              <div className="text-xs text-[#666666] mt-1">Midwest Commerce &amp; McCormick Place</div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={180}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faf8] h-full">
              <div className="text-lg sm:text-xl font-bold text-[#285735] font-heading">Los Angeles</div>
              <div className="text-xs text-[#666666] mt-1">Entertainment &amp; Pacific Aviation Hubs</div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="col-span-2 md:col-span-1" delay={240}>
            <div className="p-4 sm:p-5 rounded-2xl bg-[#eaf4ec] h-full">
              <div className="text-lg sm:text-xl font-bold text-[#285735] font-heading">Nationwide</div>
              <div className="text-xs text-[#285735]/80 mt-1">All 50 States Across the USA</div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 3. FOUR HIGHLIGHT BOXES */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Box 1: 30+ Years */}
          <RevealOnScroll className="lg:col-span-3 flex flex-col h-full" delay={0}>
            <div className="bg-white rounded-[24px] border border-[#e5e5e5] p-8 flex flex-col justify-between shadow-sm min-h-[360px] h-full">
              <div>
                <div className="border-b border-[#e5e5e5] pb-6">
                  <div className="text-5xl sm:text-6xl font-normal text-[#111111] font-heading">
                    30<span className="text-[#285735]">+</span>
                  </div>
                  <div className="text-sm font-semibold text-[#111111] mt-1 font-heading">
                    Years of experience
                  </div>
                </div>
                <p className="text-sm text-[#666666] leading-relaxed mt-6">
                  30+ Years of Global Travel & Hospitality Experience. Founded in 1994.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#285735] text-white text-sm font-semibold hover:bg-[#1e4329] transition-colors w-fit mt-6"
              >
                Who we are!
              </Link>
            </div>
          </RevealOnScroll>

          {/* Box 2: Large Escalade Card */}
          <RevealOnScroll className="lg:col-span-6 flex flex-col h-full" delay={100}>
            <Link
              href="/fleet"
              className="relative rounded-[24px] overflow-hidden flex flex-col justify-end p-8 sm:p-10 shadow-md min-h-[360px] h-full group block cursor-pointer"
            >
              <Image
                src="/images/escalade-interior.jpg"
                alt="Licensed private chauffeur service and executive motorcade fleet in Miami and nationwide"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent group-hover:from-black/90 transition-colors" />
              
              <div className="relative z-10 text-white max-w-xl">
                <h3 className="text-xl sm:text-2xl font-normal leading-snug mb-3 font-heading group-hover:text-white/95 transition-colors">
                  Combine luxury, privacy, and punctuality with our licensed private chauffeur service.
                </h3>
                <div className="flex items-center justify-between gap-4 pt-1">
                  <p className="text-sm text-gray-300 font-light">
                    We have considered every detail for you!
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold text-white tracking-wide border border-white/20 shrink-0 group-hover:bg-[#285735] group-hover:border-[#285735] transition-all">
                    Explore Fleet <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          </RevealOnScroll>

          {/* Box 3 & Box 4: Instagram & Impressions (stacked) */}
          <RevealOnScroll className="lg:col-span-3 flex flex-col gap-6 h-full" delay={200}>
            {/* Box 3: Social Media Follow Us */}
            <div className="bg-white rounded-[20px] border border-[#e5e5e5] p-6 flex flex-col justify-between shadow-sm flex-1">
              <div>
                <span className="text-xs text-[#999999] block mb-1">Official Channels</span>
                <h3 className="text-lg font-bold text-[#111111] font-heading">Follow Us</h3>
              </div>

              <div className="pt-6">
                <div className="grid grid-cols-5 gap-2 sm:gap-2.5 w-full">
                  <a
                    href="https://www.instagram.com/elmiadmc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square w-full rounded-2xl bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all shadow-xs group"
                    aria-label="Instagram"
                    title="Instagram"
                  >
                    <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square w-full rounded-2xl bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all shadow-xs group"
                    aria-label="YouTube"
                    title="YouTube"
                  >
                    <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square w-full rounded-2xl bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all shadow-xs group"
                    aria-label="LinkedIn"
                    title="LinkedIn"
                  >
                    <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square w-full rounded-2xl bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all shadow-xs group"
                    aria-label="Facebook"
                    title="Facebook"
                  >
                    <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="aspect-square w-full rounded-2xl bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all shadow-xs group"
                    aria-label="TikTok"
                    title="TikTok"
                  >
                    <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.83c0 1.9-.4 3.8-1.52 5.34-1.28 1.76-3.3 2.91-5.46 3.09-2.3.19-4.69-.53-6.43-2.05-1.84-1.6-2.84-3.99-2.7-6.42.14-2.48 1.48-4.78 3.55-6.05 1.58-.97 3.47-1.39 5.31-1.21v4.18c-.89-.25-1.86-.21-2.7.19-.89.43-1.55 1.25-1.78 2.21-.3 1.2.09 2.51.98 3.37.89.87 2.2 1.18 3.41.84 1.05-.3 1.85-1.15 2.1-2.2.16-.67.19-1.37.19-2.06V.02h.01z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Box 4: Google Reviews */}
            <div className="bg-white rounded-[20px] border border-[#e5e5e5] p-6 flex flex-col justify-between shadow-sm flex-1">
              <div>
                <span className="text-xs text-[#999999] block mb-1">Reviews</span>
                <h3 className="text-lg font-bold text-[#111111] font-heading">Google Rating</h3>
                
                <div className="mt-3 flex items-center gap-3">
                  <span className="text-3xl font-extrabold text-[#111111] font-heading leading-none">5.0</span>
                  <div>
                    <div className="flex items-center gap-0.5 text-[#FBBC04] mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC04] text-[#FBBC04]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#777777] font-medium block">48+ Verified Reviews</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=ELMIA+DMC+Miami+Opa-locka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between text-sm font-semibold text-[#285735] hover:text-[#1e4329] pt-4 border-t border-[#f0f0f0] group"
              >
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-2 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  Google Reviews
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. TOURS (EXPERIENCES) SECTION - Exact elmiadmc.com layout 5 style */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto w-full">
        <RevealOnScroll>
          <div>
            <span className="block text-sm font-normal tracking-widest text-[#111111] uppercase mb-3 font-heading">
              TOURS
            </span>
            <div className="w-full h-px bg-[#e5e5e5] mb-6" />
            <h2 className="text-3xl sm:text-5xl font-normal text-[#111111] mb-10 font-heading">
              Experiences
            </h2>
          </div>
        </RevealOnScroll>

        {/* 3 columns on desktop: exactly col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12 as in elmiadmc.com */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top 5 Experience Cards */}
          {TOURS.slice(0, 5).map((tour, idx) => (
            <RevealOnScroll key={idx} delay={idx * 60} className="h-full">
              <div
                className="relative rounded-[20px] overflow-hidden group min-h-[380px] sm:min-h-[420px] h-full bg-[#111111] flex flex-col justify-end shadow-sm"
              >
                {/* Full Featured Image */}
                <Image
                  src={tour.image}
                  alt={`${tour.title} - Curated USA Tour Experience by ELMIA DMC`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Exact Dark Gradient Overlay as on elmiadmc.com */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-[2] transition-opacity duration-300 group-hover:opacity-95" />

                {/* Text Content at Bottom Left */}
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="text-xs uppercase tracking-wider text-white/75 font-normal mb-2 font-heading">
                    {tour.category}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-normal text-white leading-tight tracking-tight group-hover:text-[#61CE70] transition-colors">
                    {tour.title}
                  </h3>
                </div>

                {/* Clickable Overlay Link */}
                <Link
                  href={`/experiences/${tour.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={tour.title}
                />
              </div>
            </RevealOnScroll>
          ))}

          {/* 6th Card: Brand Green Gradient 'View All Experiences' Card */}
          <RevealOnScroll delay={300} className="h-full">
            <div className="relative rounded-[20px] overflow-hidden group min-h-[380px] sm:min-h-[420px] h-full bg-gradient-to-br from-[#102315] via-[#1b3d24] to-[#346f44] flex flex-col justify-between p-6 sm:p-8 border border-[#2d623b]/60 shadow-lg hover:shadow-2xl hover:border-[#61CE70]/80 transition-all duration-500">
              {/* Subtle glow orb */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-[#61CE70]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Top Bar: Total Count Badge */}
              <div className="relative z-10 flex items-center justify-end">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-[#61CE70]/40 text-[#61CE70] text-xs font-bold tracking-wide shadow-sm">
                  {TOURS.length} Curated Tours
                </span>
              </div>

              {/* Content & Call to Action */}
              <div className="relative z-10 space-y-4">
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-normal text-white leading-tight tracking-tight group-hover:text-[#82d68e] transition-colors">
                    View All Experiences
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed mt-2 font-normal">
                    Explore all {TOURS.length} private American itineraries from Coast to Coast to Western Wonders.
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2.5 px-5 py-3 rounded-full bg-transparent border border-white text-white font-bold text-xs uppercase tracking-wider transition-all duration-300 group-hover:border-[#61CE70] group-hover:text-[#61CE70]">
                    <span>Explore All Tours</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Clickable Overlay Link */}
              <Link
                href="/experiences"
                className="absolute inset-0 z-20"
                aria-label="View All Experiences"
              />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 5. PROGRAMS SECTION - Carousel */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto w-full">
        <RevealOnScroll>
          <div>
            <span className="block text-sm font-normal tracking-widest text-[#111111] uppercase mb-3 font-heading">
              PROGRAMS
            </span>
            <div className="w-full h-px bg-[#e5e5e5] mb-6" />
            <h2 className="text-3xl sm:text-5xl font-normal text-[#111111] mb-10 font-heading">
              VIP Experiences &amp; Luxury Lifestyle
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <ProgramsCarousel items={PROGRAMS} visibleCount={4} linkPrefix="vip-programs" />
        </RevealOnScroll>
      </section>

      {/* 6. SERVICES SECTION - Exact elmiadmc.com layout 5 style */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto w-full">
        <RevealOnScroll>
          <div>
            <span className="block text-sm font-normal tracking-widest text-[#111111] uppercase mb-3 font-heading">
              SERVICES
            </span>
            <div className="w-full h-px bg-[#e5e5e5] mb-6" />
            <h2 className="text-3xl sm:text-5xl font-normal text-[#111111] mb-10 font-heading">
              Our DMC Solutions
            </h2>
          </div>
        </RevealOnScroll>

        {/* 3 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => (
            <RevealOnScroll key={idx} delay={idx * 60} className="h-full">
              <div
                className="relative rounded-[20px] overflow-hidden group min-h-[380px] sm:min-h-[420px] h-full bg-[#111111] flex flex-col justify-end shadow-sm"
              >
                {/* Full Featured Image */}
                <Image
                  src={s.image}
                  alt={`${s.title} - Destination Management Solution by ELMIA DMC`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />

                {/* Exact Dark Gradient Overlay as on elmiadmc.com */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-[2] transition-opacity duration-300 group-hover:opacity-95" />

                {/* Text Content at Bottom Left */}
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="text-xs uppercase tracking-wider text-white/75 font-normal mb-2 font-heading">
                    {s.category}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-normal text-white leading-tight tracking-tight group-hover:text-[#61CE70] transition-colors">
                    {s.title}
                  </h3>
                </div>

                {/* Clickable Overlay Link */}
                <Link
                  href={`/services/${s.slug}`}
                  className="absolute inset-0 z-20"
                  aria-label={s.title}
                />
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* 7. TRUSTED BY / MARQUEE SECTION */}
      <section className="py-20 sm:py-24 bg-white overflow-hidden flex flex-col items-center">
        <RevealOnScroll>
          <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#285735] font-heading mb-4">
              Trusted by Global Leaders & World-Class Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide exclusive destination management and transportation for the world's most prestigious organizations and global summits.
            </p>
          </div>
        </RevealOnScroll>

        {/* Marquee Container */}
        <div className="w-full relative py-4 mb-12 flex overflow-hidden group select-none">
          {/* Gradient Masks for fading edges */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Track 1 */}
          <div className="flex shrink-0 animate-marquee items-stretch gap-6 pr-6 py-4">
            {PARTNER_LOGOS.map((logo, idx) => (
              <div 
                key={`t1-${idx}`} 
                className="w-[260px] sm:w-[290px] flex-shrink-0"
              >
                <div className="h-full bg-[#fcfdfc] hover:bg-white rounded-[20px] border border-[#e5e9e5] hover:border-[#285735]/40 p-5 sm:p-6 flex flex-col items-center justify-between text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(40,87,53,0.12)] transition-all duration-300 hover:-translate-y-1 group/card">
                  {/* Top: Logo */}
                  <div className="h-14 sm:h-16 w-full flex items-center justify-center mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={`${logo.name} - Official Delegation & Event Partner`}
                      className="object-contain max-h-full max-w-[150px] transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="w-full flex flex-col items-center">
                    {/* Reference Name */}
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#111111] tracking-tight mb-1.5 group-hover/card:text-[#285735] transition-colors line-clamp-2 leading-snug h-10 sm:h-11 flex items-center justify-center">
                      {logo.name}
                    </h4>

                    {/* Short Description */}
                    <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed line-clamp-2">
                      {logo.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Track 2 (Seamless loop continuation) */}
          <div className="flex shrink-0 animate-marquee items-stretch gap-6 pr-6 py-4" aria-hidden="true">
            {PARTNER_LOGOS.map((logo, idx) => (
              <div 
                key={`t2-${idx}`} 
                className="w-[260px] sm:w-[290px] flex-shrink-0"
              >
                <div className="h-full bg-[#fcfdfc] hover:bg-white rounded-[20px] border border-[#e5e9e5] hover:border-[#285735]/40 p-5 sm:p-6 flex flex-col items-center justify-between text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_28px_rgba(40,87,53,0.12)] transition-all duration-300 hover:-translate-y-1 group/card">
                  {/* Top: Logo */}
                  <div className="h-14 sm:h-16 w-full flex items-center justify-center mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.src}
                      alt={`${logo.name} - Official Delegation & Event Partner`}
                      className="object-contain max-h-full max-w-[150px] transition-transform duration-300 group-hover/card:scale-105"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="w-full flex flex-col items-center">
                    {/* Reference Name */}
                    <h4 className="font-heading text-sm sm:text-base font-bold text-[#111111] tracking-tight mb-1.5 group-hover/card:text-[#285735] transition-colors line-clamp-2 leading-snug h-10 sm:h-11 flex items-center justify-center">
                      {logo.name}
                    </h4>

                    {/* Short Description */}
                    <p className="text-[11px] sm:text-xs text-[#666666] leading-relaxed line-clamp-2">
                      {logo.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <RevealOnScroll delay={100}>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#285735] text-white hover:bg-[#1e4329] font-bold text-sm tracking-wider uppercase shadow-lg transition-all transform hover:scale-105"
          >
            <span>Contact Us Today</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </RevealOnScroll>
      </section>
    </div>
  );
}
