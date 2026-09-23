import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Users, Briefcase, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import { FLEET_VEHICLES } from "@/data/fleet";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Executive Fleet Specifications & Capacity | ELMIA DMC Miami",
  description: "Explore ELMIA's late-model executive black fleet: Cadillac Escalade ESVs, Mercedes-Benz S-Class, Jet Class Sprinters, private aviation network, and luxury yacht charters.",
  alternates: {
    canonical: "https://elmiadmc.com/fleet"
  },
  keywords: [
    "Cadillac Escalade ESV chauffeur",
    "Mercedes-Benz S-Class Miami",
    "VIP Jet Class Sprinter rental",
    "executive black car fleet",
    "armored vehicle motorcade USA",
    "private jet charter Miami FBO",
    "luxury yacht charter Biscayne Bay",
    "ELMIA fleet specifications"
  ]
};

export default function FleetPage() {
  const groundFleet = FLEET_VEHICLES.filter((v) => v.category !== "Aviation & Maritime");
  const airAndSea = FLEET_VEHICLES.filter((v) => v.category === "Aviation & Maritime");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 flex flex-col justify-center bg-[#0e1710] border-b border-[#1a3320] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/car-hero-img.jpg"
            alt="ELMIA Executive Luxury Vehicle Fleet - Cadillac Escalade, Mercedes S-Class, Sprinter"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1710] via-[#0e1710]/70 to-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top: Breadcrumbs, Title & Description */}
          <div>
            <nav className="flex items-center space-x-2 text-xs text-white/70 mb-4">
              <Link href="/" className="hover:text-[#61CE70] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-[#61CE70] font-semibold">Our Fleet</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
                Our Executive Fleet &amp; Specifications
              </h1>
              <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal">
                Every vehicle in our black-car and executive transit fleet is commercially licensed, late-model, meticulously detailed, and equipped with executive amenities for seamless travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Executive Ground Fleet Section */}
      <section id="executive-black-car-fleet" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-24">
        <div className="mb-12 border-b border-[#e7ede7] pb-6 sm:pb-8">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#285735]" />
            <span>Chauffeur Transit Specifications</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-normal text-[#1a3822] font-heading tracking-tight">
            Executive Black Car &amp; VIP Sprinter Fleet
          </h2>
          <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-2xl">
            Pristine late-model Cadillac Escalade ESVs, Mercedes-Benz S-Class sedans, and custom Jet Class Sprinters equipped with executive hospitality amenities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groundFleet.map((v) => (
            <div
              key={v.id}
              id={v.id}
              className="rounded-2xl border border-[#e7ede7] bg-white overflow-hidden hover:border-[#285735] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm scroll-mt-28"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                <Image
                  src={v.image}
                  alt={`${v.name} - Executive Ground Chauffeur Transportation Fleet`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#285735] border border-[#b8dfbf] shadow-sm">
                    {v.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#1a3822] group-hover:text-[#285735] transition-colors leading-snug">
                    {v.name}
                  </h3>

                  <div className="flex items-center space-x-3 text-xs text-[#555555] my-3">
                    <div className="flex items-center bg-[#f8faf8] px-3 py-1.5 rounded-lg border border-[#e7ede7]">
                      <Users className="w-4 h-4 mr-1.5 text-[#285735]" />
                      <span>Capacity: <strong className="text-[#1a3822]">{v.passengers} Pax</strong></span>
                    </div>
                    <div className="flex items-center bg-[#f8faf8] px-3 py-1.5 rounded-lg border border-[#e7ede7]">
                      <Briefcase className="w-4 h-4 mr-1.5 text-[#285735]" />
                      <span>Luggage: <strong className="text-[#1a3822]">{v.luggage} Bags</strong></span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mt-4">
                    {v.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#f0f4f0]">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2.5">
                      Key Vehicle Amenities:
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {v.features.map((f, fi) => (
                        <div key={fi} className="flex items-start text-xs text-[#444444]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#285735] mr-2 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#f0f4f0] flex items-center justify-between">
                  <span className="text-xs text-[#777777]">
                    Commercially Licensed
                  </span>
                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(v.name)}`}
                    className="px-5 py-2.5 rounded-full bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    Reserve Vehicle
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Aviation & Maritime Partner Network */}
      <section className="py-16 sm:py-20 bg-[#f8faf8] border-t border-[#e7ede7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="mb-12 border-b border-[#e7ede7] pb-6 sm:pb-8">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#285735]" />
              <span>Air &amp; Sea Charter Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-normal text-[#1a3822] font-heading tracking-tight">
              Private Jet &amp; Luxury Yacht Charters
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-2 max-w-2xl">
              On-demand global private flight coordination via Miami FBOs and bespoke maritime charters across Biscayne Bay, Key Biscayne, and the Bahamas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {airAndSea.map((v) => (
              <div
                key={v.id}
                id={v.id}
                className="rounded-2xl border border-[#e7ede7] bg-white overflow-hidden hover:border-[#285735] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm scroll-mt-28"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
                  <Image
                    src={v.image}
                    alt={`${v.name} - Luxury Aviation & Maritime Charter`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-[#285735] border border-[#b8dfbf] shadow-sm">
                      {v.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1a3822] group-hover:text-[#285735] transition-colors leading-snug">
                      {v.name}
                    </h3>

                    <div className="flex items-center space-x-3 text-xs text-[#555555] my-3">
                      <div className="flex items-center bg-[#f8faf8] px-3 py-1.5 rounded-lg border border-[#e7ede7]">
                        <Users className="w-4 h-4 mr-1.5 text-[#285735]" />
                        <span>Capacity: <strong className="text-[#1a3822]">Up to {v.passengers} Guests</strong></span>
                      </div>
                      <div className="flex items-center bg-[#f8faf8] px-3 py-1.5 rounded-lg border border-[#e7ede7]">
                        <Briefcase className="w-4 h-4 mr-1.5 text-[#285735]" />
                        <span>Cargo/Luggage: <strong className="text-[#1a3822]">{v.luggage} Items</strong></span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#555555] leading-relaxed mt-4">
                      {v.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-[#f0f4f0]">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#777777] mb-2.5">
                        Charter Amenities &amp; Services:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {v.features.map((f, fi) => (
                          <div key={fi} className="flex items-start text-xs text-[#444444]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#285735] mr-2 mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#f0f4f0] flex items-center justify-between">
                    <span className="text-xs text-[#777777]">
                      Part 135 &amp; USCG Certified
                    </span>
                    <Link
                      href={`/request-proposal?interest=${encodeURIComponent(v.name)}`}
                      className="px-5 py-2.5 rounded-full bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      Request Charter Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Standards Section */}
      <section className="py-20 bg-white border-t border-[#e7ede7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#b8dfbf] bg-[#f8faf8] p-8 sm:p-12 shadow-sm">
            <div className="max-w-3xl">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735] mb-2">
                <ShieldCheck className="w-4 h-4 text-[#285735]" />
                <span>Maintenance &amp; Chauffeur Protocol</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3822] tracking-tight mb-4">
                Pristine Condition Standards
              </h2>
              <p className="text-sm text-[#555555] leading-relaxed">
                All vehicles undergo multi-point mechanical inspections prior to dispatch. Chauffeurs are non-smoking, commercially licensed, vetted via background screenings, and trained in executive hospitality etiquette, VIP non-disclosure, and evasive driving techniques.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom RFP Form */}
      <CTABanner title="Secure Your Premium" highlight="Transportation" subtitle="From a single S-Class transfer to a coordinated 10-Sprinter motorcade, request a comprehensive vehicle manifest and quote from our dispatch team today." />
    </div>
  );
}
