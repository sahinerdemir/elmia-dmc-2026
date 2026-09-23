import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Car, 
  Hotel, 
  Ticket, 
  Utensils, 
  ChevronRight,
  Sparkles,
  Info,
  Clock
} from "lucide-react";
import { MAJOR_EVENTS, getEventBySlug } from "@/data/events";
import CTABanner from "@/components/CTABanner";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return MAJOR_EVENTS.map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Event Not Found | ELMIA DMC",
    };
  }

  return {
    title: event.metaTitle,
    description: event.metaDescription,
    keywords: [
      `${event.title} guide`,
      `${event.title} dates`,
      `${event.title} VIP tickets`,
      `${event.title} corporate travel`,
      `${event.city} major events 2026`,
      "executive chauffeur USA"
    ],
    alternates: {
      canonical: `https://elmiadmc.com/events/${event.slug}`,
    },
    openGraph: {
      title: event.metaTitle,
      description: event.metaDescription,
      url: `https://elmiadmc.com/events/${event.slug}`,
      siteName: "ELMIA DMC",
      images: [
        {
          url: event.heroImage,
          width: 1400,
          height: 875,
          alt: `${event.title} in ${event.city}`,
        },
      ],
      type: "article",
    },
  };
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Schema.org Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Event",
        "@id": `https://elmiadmc.com/events/${event.slug}#event`,
        "name": event.title,
        "description": event.overview,
        "startDate": "2026-01-01",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": event.venue,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": event.city,
            "addressCountry": "US"
          }
        },
        "organizer": {
          "@type": "Organization",
          "name": event.title,
          "url": event.officialUrl
        }
      },
      {
        "@type": "Service",
        "@id": `https://elmiadmc.com/events/${event.slug}#service`,
        "name": `Corporate Hospitality & Logistics for ${event.title}`,
        "provider": {
          "@type": "Organization",
          "name": "ELMIA DMC & Executive Chauffeur Services",
          "url": "https://elmiadmc.com"
        },
        "areaServed": event.city,
        "description": `Turnkey corporate travel, VIP passes, hotel blocks, and executive chauffeur fleets for ${event.title} in ${event.city}.`,
        "serviceType": "Destination Management & Executive Ground Logistics"
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#2d3748]">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative w-full -mt-[104px] overflow-hidden bg-[#0c1810] text-white">
        <div className="relative w-full min-h-[520px] sm:min-h-[580px] flex flex-col justify-end px-6 sm:px-12 lg:px-16 pt-36 pb-14 sm:pb-18 max-w-7xl mx-auto">
          {/* Hero Photography with Warm Editorial Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src={event.heroImage}
              alt={`${event.title} - ${event.city}`}
              fill
              priority
              className="object-cover object-center filter brightness-90 contrast-105 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1810] via-[#0c1810]/70 to-black/30" />
          </div>

          <div className="relative z-10 max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-xs text-white/60 mb-5">
              <Link href="/" className="hover:text-[#74b382] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <Link href="/events" className="hover:text-[#74b382] transition-colors">Events</Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-white/80">{event.city}</span>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-[#74b382] font-medium">{event.title}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#74b382] text-[#0c1810] shadow-sm">
                {event.city}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-gray-200 border border-white/15">
                {event.category}
              </span>
            </div>

            {/* Title & Tagline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white font-heading leading-[1.12] mb-3">
              {event.title}
            </h1>

            <p className="text-base sm:text-xl text-gray-200 font-light leading-relaxed max-w-3xl">
              {event.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN EDITORIAL BODY & SIDEBAR */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT 8 COLS: THE EVENT CHRONICLE & HIGHLIGHTS */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Event Overview */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#285735] block mb-2">
                  Event Profile &amp; Scale
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading leading-snug mb-4">
                  The Story of {event.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  {event.overview}
                </p>
              </div>

              {/* The Atmosphere & Sensory Experience (What it feels like) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#f8faf8] border border-[#e5ece5]">
                <div className="flex items-center space-x-2 text-[#285735] font-bold text-xs uppercase tracking-widest mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>The Atmosphere &amp; Setting</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">
                  What It Feels Like on the Ground
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  {event.atmosphere}
                </p>
              </div>

              {/* Signature Highlights */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#285735] block mb-2">
                  Key Moments &amp; Program
                </span>
                <h3 className="text-2xl font-bold text-gray-900 font-heading mb-6">
                  Signature Elements of {event.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {event.highlights.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl border border-gray-200/90 bg-white hover:border-gray-300 transition-all shadow-sm"
                    >
                      <span className="text-xs font-bold text-[#285735] block mb-1">
                        0{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-gray-900 mb-1.5 font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Attend */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 font-heading mb-3">
                  Why Industry Leaders Attend
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {event.whyAttend}
                </p>
              </div>

              {/* Practical Intelligence & Traffic Dynamics */}
              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/70 flex items-start space-x-3.5">
                <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1">
                    On-Site Logistics &amp; Travel Intelligence
                  </h4>
                  <p className="text-xs text-amber-900/90 leading-relaxed">
                    {event.practicalTips}
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT 4 COLS: STICKY COORDINATES & CONSULTATION SIDEBAR */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                
                {/* Event Coordinates Brief */}
                <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block border-b border-gray-100 pb-2">
                    Event Coordinates
                  </span>

                  <div className="space-y-4 text-xs">
                    <div>
                      <span className="text-gray-400 block mb-0.5">Primary Venue</span>
                      <span className="font-bold text-gray-900 flex items-start text-sm">
                        <MapPin className="w-4 h-4 text-[#285735] mr-1.5 shrink-0 mt-0.5" />
                        {event.venue}
                      </span>
                    </div>

                    <div>
                      <span className="text-gray-400 block mb-1">Recommended Fleet Staging</span>
                      <div className="flex flex-wrap gap-1.5">
                        {event.recommendedFleet.map((v, i) => (
                          <span key={i} className="px-2.5 py-1 bg-gray-100 rounded-md text-[11px] font-medium text-gray-800">
                            {v}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ONLY ONE CLEAN OFFICIAL WEBSITE LINK */}
                  <div className="pt-3 border-t border-gray-100">
                    <a
                      href={event.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold transition-colors border border-gray-200"
                    >
                      <span>Official Event Website</span>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                    </a>
                  </div>
                </div>

                {/* Delegation Consultation Card */}
                <div className="p-6 rounded-3xl bg-[#0c1810] text-white space-y-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#74b382]">
                    Delegation Planning
                  </span>
                  <h3 className="text-lg font-bold font-heading">
                    Attending with a Corporate Delegation?
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    ELMIA coordinates pre-contracted hotel blocks, continuous black car standby, and executive accreditation for groups visiting {event.city}.
                  </p>
                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(event.title)}`}
                    className="w-full inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#74b382] hover:bg-[#5da06c] text-[#0c1810] font-bold text-xs tracking-wide transition-all shadow-md"
                  >
                    <span>Inquire for Delegation Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DISCREET TURNKEY FACILITATION BY ELMIA */}
      <section className="py-16 sm:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#285735]">
              Executive Support Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 font-heading tracking-tight mt-1">
              How ELMIA Supports Attending Delegations
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              When senior executives, VIP clients, or international trade missions attend {event.title}, ELMIA operates as a quiet, white-glove extension of your team.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {event.services.map((svc, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#285735] bg-[#285735]/10 px-2.5 py-1 rounded-full inline-block mb-3">
                    {svc.badge}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-2 font-heading">
                    {svc.category}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">
                    {svc.summary}
                  </p>

                  <ul className="border-t border-gray-100 pt-3 mb-5 space-y-2 text-xs text-gray-700">
                    {svc.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#285735] mr-1.5 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(event.title + ' - ' + svc.category)}`}
                    className="group w-full inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white text-xs font-semibold transition-all"
                  >
                    <span>Request Service</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. LEGAL DISCLAIMER */}
      <section className="py-6 bg-white border-t border-gray-100 text-gray-400 text-[11px] text-center">
        <div className="max-w-4xl mx-auto px-4 leading-normal">
          <p>
            <strong>Disclaimer:</strong> ELMIA DMC is an independent destination management and executive ground logistics company. ELMIA is not the official organizer or ticket agent of {event.title}. All trademarks, registered logos, and event titles belong solely to their respective owners.
          </p>
        </div>
      </section>

      {/* 5. BOTTOM CTA BANNER */}
      <CTABanner
        title={`Planning to Attend`}
        highlight={event.title}
        subtitle={`Connect with our ${event.city} operations desk for a tailored corporate schedule, hotel allocations, and executive fleet manifest.`}
        interest={event.title}
      />
    </div>
  );
}
