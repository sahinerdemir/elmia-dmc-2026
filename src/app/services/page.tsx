import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight } from "lucide-react";
import { DMC_SERVICES } from "@/data/services";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "DMC Solutions & Corporate Services | ELMIA DMC Miami",
  description: "Explore ELMIA's 6 core B2B destination management solutions: corporate group travel, executive chauffeur services, airport FBO transfers, trade show expo logistics, and diplomatic delegations.",
  alternates: {
    canonical: "https://elmiadmc.com/services"
  },
  keywords: [
    "DMC Solutions USA",
    "Corporate Group Travel Miami",
    "Executive Chauffeur Transportation",
    "Airport FBO Tarmac Transfers",
    "Diplomatic Delegation Logistics",
    "Miami Destination Management Company"
  ]
};

const SERVICE_SUMMARIES: Record<string, string> = {
  "miami-destination-management-company":
    "Comprehensive ground management for corporate incentive summits, high-profile galas, and tailored itineraries. From exclusive venue buyouts to on-site directors, we deliver turnkey event architecture across Miami, New York, Chicago, Los Angeles, and nationwide.",
  "corporate-group-travel":
    "Synchronized group transportation and logistics for enterprise summits and trade exhibitions. We coordinate executive bus fleets, flight manifest tracking, and dedicated dispatch with zero operational friction.",
  "executive-chauffeur-transportation":
    "White-glove chauffeur transit featuring late-model Cadillac Escalades and Mercedes-Benz S-Class sedans. Tailored for C-suite roadshows and VIP travelers requiring utmost privacy, safety, and discretion.",
  "luxury-accommodations-villas":
    "Proprietary access to Five-Star hotel room blocks, private waterfront estates, and luxury villa buyouts nationwide. Complete procurement management with dedicated concierge and security staging.",
  "airport-fbo-tarmac-logistics":
    "Specialized airside coordination with active TSA and FBO tarmac badges across Signature, Atlantic, and Sheltair. Direct planeside staging for immediate, seamless arrivals and departures.",
  "government-delegation-services":
    "High-protocol transit for sovereign state delegations and international summits. Armored motorcades, secure diplomatic convoys, and seasoned personnel with strict confidentiality."
};

export default function ServicesIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header - Clean White */}
      <section className="pt-12 sm:pt-16 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-[#777777] mb-3 sm:mb-4">
            <Link href="/" className="hover:text-[#285735] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#cccccc]" />
            <span className="text-[#285735] font-semibold">DMC Solutions</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#1a3822] tracking-tight leading-tight mb-3 font-heading">
              Our 6 Core DMC Solutions
            </h1>
            <p className="text-sm sm:text-lg text-[#555555] leading-relaxed font-normal">
              Designed from the ground up to deliver surgical precision, discretion, and duty-of-care across Miami, New York, Chicago, Los Angeles, and nationwide across the United States.
            </p>
          </div>
        </div>
      </section>

      {/* Z-Pattern Alternating Showcase Sections */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 sm:space-y-24">
        {DMC_SERVICES.map((s, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={s.slug}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              {/* Image Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="relative h-80 sm:h-[420px] w-full rounded-3xl overflow-hidden border border-[#e7ede7] shadow-xl group bg-gray-100">
                  <Image
                    src={s.heroImage}
                    alt={`${s.title} - ELMIA Destination Management Solution`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#285735]">
                    {s.shortTitle}
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a3822] font-heading tracking-tight leading-tight">
                    <Link
                      href={`/services/${s.slug}`}
                      className="font-heading hover:text-[#285735] transition-colors"
                    >
                      {s.title}
                    </Link>
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                  {SERVICE_SUMMARIES[s.slug] || s.tagline}
                </p>

                {/* CTA Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg group cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(s.title)}`}
                    className="inline-flex items-center px-6 py-3.5 rounded-full bg-white hover:bg-[#f0f4f0] text-[#285735] border border-[#b8dfbf] text-xs font-bold tracking-wide transition-all shadow-xs cursor-pointer"
                  >
                    <span>Request Proposal</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Bottom Conversion Banner */}
      <CTABanner
        title="Ready to Architect Your Next"
        highlight="Corporate Experience?"
        subtitle="Comprehensive logistics, flawless execution, and zero operational friction. Request a custom RFP response for your upcoming Miami event or roadshow."
      />
    </div>
  );
}
