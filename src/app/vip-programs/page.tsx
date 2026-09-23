import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { VIP_PROGRAMS } from "@/data/vipPrograms";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "VIP Lifestyle & Concierge Programs | ELMIA DMC Miami",
  description: "Bespoke Miami VIP concierge services: private yacht charters, luxury villa buyouts, Michelin dining reservations, F1 paddock access, and executive protection.",
  alternates: {
    canonical: "https://elmiadmc.com/vip-programs"
  },
  keywords: [
    "VIP Lifestyle Programs",
    "Private Yacht Charter Miami",
    "Miami Luxury Villa Rentals",
    "VIP Nightlife Miami Beach",
    "Executive Protection Florida",
    "ELMIA DMC"
  ]
};

export default function VIPProgramsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header - Clean White */}
      <section className="pt-12 sm:pt-16 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-[#777777] mb-3 sm:mb-4">
            <Link href="/" className="hover:text-[#285735] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#cccccc]" />
            <span className="text-[#285735] font-semibold">VIP Lifestyle Programs</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#1a3822] tracking-tight leading-tight mb-3 font-heading">
              VIP Lifestyle &amp; Bespoke Hospitality Programs
            </h1>
            <p className="text-sm sm:text-lg text-[#555555] leading-relaxed font-normal">
              Curated for discerning executives, family offices, and VIP guests seeking extraordinary access across Miami, New York, Chicago, Los Angeles, and premier destinations nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Z-Pattern Alternating Showcase Sections */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16 sm:space-y-24">
        {VIP_PROGRAMS.map((prog, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              key={prog.slug}
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
                    src={prog.image}
                    alt={`${prog.title} - ELMIA VIP Lifestyle Program`}
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
                    Private Concierge
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1a3822] font-heading tracking-tight leading-tight">
                    <Link
                      href={`/vip-programs/${prog.slug}`}
                      className="font-heading hover:text-[#285735] transition-colors"
                    >
                      {prog.title}
                    </Link>
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#285735] font-semibold">
                  {prog.subtitle}
                </p>

                <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                  {prog.description}
                </p>

                {/* CTA Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href={`/vip-programs/${prog.slug}`}
                    className="inline-flex items-center px-6 py-3.5 rounded-full bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-bold tracking-wide transition-all shadow-md hover:shadow-lg group cursor-pointer"
                  >
                    <span>Explore Program</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(prog.title)}`}
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

      <CTABanner
        title="Elevate Your Next"
        highlight="VIP Summit"
        subtitle="Exclusive mansion buyouts, private golf tournaments, and sommelier-led dining. Let our destination architects draft a bespoke proposal for your delegation."
      />
    </div>
  );
}
