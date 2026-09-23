import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ExternalLink,
  ChevronRight,
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  Star,
  Hotel,
  Utensils,
  ArrowRight,
  Clock,
  Sparkles,
  Phone
} from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import CTABanner from "@/components/CTABanner";
import FloatingProposalButton from "@/components/FloatingProposalButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return EXPERIENCES.map((exp) => ({
    slug: exp.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const experience = EXPERIENCES.find((e) => e.slug === slug);
  if (!experience) return {};

  return {
    title: experience.metaTitle,
    description: experience.metaDescription,
    alternates: {
      canonical: `https://elmiadmc.com/experiences/${experience.slug}`
    },
    keywords: [
      experience.title,
      experience.destination,
      "USA DMC VIP tour",
      "curated luxury experience",
      "private group itinerary USA",
      "ELMIA DMC",
      "luxury travel USA"
    ],
    openGraph: {
      title: experience.metaTitle,
      description: experience.metaDescription,
      url: `https://elmiadmc.com/experiences/${experience.slug}`,
      images: [{ url: experience.heroImage }]
    }
  };
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const experience = EXPERIENCES.find((e) => e.slug === slug);

  if (!experience) {
    notFound();
  }

  // Schema for TouristTrip / TourReservation
  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": experience.title,
    "description": experience.subtitle,
    "touristType": ["VIP", "Corporate", "Luxury"],
    "itinerary": {
      "@type": "ItemList",
      "numberOfItems": experience.itinerary.length,
      "itemListElement": experience.itinerary.map((item, idx) => ({
        "@type": "ListItem",
        "position": idx + 1,
        "item": {
          "@type": "TouristAttraction",
          "name": item.title,
          "description": item.description
        }
      }))
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "ELMIA DMC (Elegant Miami Adventures LLC)",
      "url": "https://elmiadmc.com",
      "telephone": "+1-786-677-7333"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tripSchema) }}
      />

      {/* 1. HERO BANNER */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 bg-[#0e1710] border-b border-[#1a3320] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={experience.heroImage}
            alt={`${experience.title} - Curated Luxury Tour by ELMIA DMC`}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1710] via-[#0e1710]/70 to-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-xs text-white/70 mb-4">
            <Link href="/" className="hover:text-[#74b382] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <Link href="/experiences" className="hover:text-[#74b382] transition-colors">
              Experiences
            </Link>
            <ChevronRight className="w-3 h-3 text-white/40" />
            <span className="text-[#74b382] font-medium truncate">
              {experience.title.split("-")[0].trim()}
            </span>
          </nav>

          <div className="max-w-4xl">
            {/* H1 Heading in White */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.15] mb-3 font-heading">
              {experience.title}
            </h1>

            {/* Route Subtitle in Light Green */}
            <p className="text-sm sm:text-lg text-[#82d68e] leading-relaxed font-normal mb-5">
              {experience.subtitle}
            </p>

            {/* Meta Tags directly under subtitle */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#1b3d24]/90 border border-[#2e623b] text-xs font-bold text-[#74b382] uppercase tracking-wider shadow-sm">
                {experience.category}
              </span>
              <span className="flex items-center text-xs text-white/90 bg-white/10 backdrop-blur-sm px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/15">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#74b382]" />
                {experience.duration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & HIGHLIGHTS */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* H2: Program Overview */}
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735] mb-2">
                <span className="w-2 h-2 rounded-full bg-[#285735]" />
                <span>Executive Experience Brief</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3822] tracking-tight mb-4">
                Program Overview & Strategic Focus
              </h2>
              <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
                {experience.overview}
              </p>
            </div>

            {/* H2: Curated Program Highlights */}
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#285735]" />
                <span>Distinctive Features</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3822] tracking-tight mb-6">
                Curated Program Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experience.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#f8faf8] border border-[#e7ede7] flex items-start space-x-3 shadow-sm"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#285735] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#222222] font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* H2: Day-by-Day Curated Itinerary */}
            <div>
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735] mb-2">
                <Clock className="w-3.5 h-3.5 text-[#285735]" />
                <span>Chronological Itinerary</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3822] tracking-tight mb-8">
                Day-by-Day Curated Itinerary
              </h2>

              {/* Timeline Container */}
              <div className="relative pl-6 sm:pl-8 border-l-2 border-[#b8dfbf] space-y-10">
                {experience.itinerary.map((day) => (
                  <div key={day.day} className="relative group">
                    {/* Timeline Node Badge */}
                    <div className="absolute -left-[33px] sm:-left-[41px] top-0 w-8 h-8 rounded-full bg-[#285735] border-2 border-white text-white flex items-center justify-center text-xs font-bold shadow-md">
                      {day.day}
                    </div>

                    <div className="rounded-2xl border border-[#e7ede7] bg-white p-6 sm:p-8 hover:border-[#285735] hover:shadow-md transition-all space-y-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f0f4f0] pb-3">
                        {/* Strict H3 Heading for Each Day */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#1a3822] group-hover:text-[#285735] transition-colors">
                          Day {day.day}: {day.title}
                        </h3>
                        <span className="text-xs text-[#285735] bg-[#eaf4ec] px-3 py-1 rounded-full border border-[#b8dfbf] font-semibold flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {day.location}
                        </span>
                      </div>

                      <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                        {day.description}
                      </p>

                      {/* Day Highlights */}
                      {day.highlights && day.highlights.length > 0 && (
                        <div className="pt-2">
                          <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2">
                            Key Activities & Venues:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {day.highlights.map((dh, dhi) => (
                              <span
                                key={dhi}
                                className="px-2.5 py-1 rounded-lg bg-[#f4f7f4] text-xs text-[#333333] border border-[#e0ece0] font-medium"
                              >
                                {dh}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Meals & Hotel Info */}
                      {(day.meals || day.hotel) && (
                        <div className="pt-3 border-t border-[#f0f4f0] flex flex-wrap gap-4 text-xs text-[#666666]">
                          {day.meals && (
                            <div className="flex items-center">
                              <Utensils className="w-3.5 h-3.5 mr-1.5 text-[#285735]" />
                              <span>{day.meals}</span>
                            </div>
                          )}
                          {day.hotel && (
                            <div className="flex items-center">
                              <Hotel className="w-3.5 h-3.5 mr-1.5 text-[#285735]" />
                              <span>{day.hotel}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* H2: Inclusions & VIP Privileges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-[#e7ede7]">
              <div className="rounded-2xl border border-[#b8dfbf] bg-[#f8faf8] p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#1a3822] flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-[#285735] mr-2" />
                  Inclusions & VIP Privileges
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-[#444444]">
                  {experience.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#285735] font-bold">•</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* H2: Exclusions */}
              <div className="rounded-2xl border border-[#e7ede7] bg-white p-6 sm:p-8 space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-[#555555] flex items-center">
                  <XCircle className="w-5 h-5 text-gray-400 mr-2" />
                  Exclusions & Options
                </h2>
                <ul className="space-y-3 text-xs sm:text-sm text-[#666666]">
                  {experience.exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-gray-400 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* H2: Accommodations & 5★ Partners */}
            {experience.accommodations && experience.accommodations.length > 0 && (
              <div className="pt-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3822] tracking-tight mb-6">
                  Selected Five-Star Accommodations
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {experience.accommodations.map((acc, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-[#e7ede7] bg-white p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#285735] font-bold uppercase tracking-wider">
                          {acc.city}
                        </span>
                        <div className="flex text-amber-500">
                          {[...Array(acc.stars)].map((_, si) => (
                            <Star key={si} className="w-3.5 h-3.5 fill-amber-500" />
                          ))}
                        </div>
                      </div>
                      {acc.link ? (
                        <a href={acc.link} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-[#1a3822] hover:text-[#285735] hover:underline flex items-center group">
                          {acc.name}
                          <ExternalLink className="w-4 h-4 ml-1.5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-50 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
                        </a>
                      ) : (
                        <h3 className="text-lg font-bold text-[#1a3822]">
                          {acc.name}
                        </h3>
                      )}
                      <p className="text-xs text-[#555555] leading-relaxed">
                        {acc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar Action Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-28 rounded-2xl border border-[#b8dfbf] bg-[#f8faf8] p-6 sm:p-8 space-y-6 shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#285735]">
                  Private Program Booking
                </span>
                <h3 className="text-2xl font-bold text-[#1a3822] mt-1">
                  {experience.title.split("-")[0].trim()}
                </h3>
              </div>

              <div className="space-y-3 text-xs border-y border-[#e7ede7] py-4">
                <div className="flex justify-between gap-4">
                  <span className="text-[#666666] shrink-0">Duration:</span>
                  <span className="font-bold text-[#222222] text-right">{experience.duration}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666666] shrink-0">Destination:</span>
                  <span className="font-bold text-[#222222] text-right">{experience.destination}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666666] shrink-0">Format:</span>
                  <span className="font-bold text-[#285735] text-right">Fully Private & Bespoke</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#666666] shrink-0">Vehicle Standard:</span>
                  <span className="font-bold text-[#222222] text-right">Mercedes Sprinter / Escalade</span>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`/request-proposal?interest=${encodeURIComponent(experience.title)}`}
                  className="w-full py-4 px-6 rounded-full bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all shadow-md cursor-pointer"
                >
                  <span>Request Proposal</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>

                <a
                  href="tel:+17866777333"
                  className="w-full py-3 px-6 rounded-full bg-white hover:bg-[#f0f4f0] border border-[#b8dfbf] text-[#285735] text-xs font-bold flex items-center justify-center transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 mr-2 text-[#285735]" />
                  <span>Call Operations Desk</span>
                </a>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#777777]">
                  Tailor-made adjustments available for group size and flight dates.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner interest={experience.title} />
      <FloatingProposalButton />
    </div>
  );
}
