import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Calendar, MapPin, ArrowRight, ChevronRight } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Signature Travel Experiences & VIP Tours | ELMIA DMC Miami",
  description: "Curated luxury travel itineraries across the United States: Eagles Las Vegas VIP, Florida Dream, Pearls of America Coast-to-Coast, and Western USA Horizons.",
  alternates: {
    canonical: "https://elmiadmc.com/experiences"
  },
  keywords: [
    "USA Luxury Tours",
    "Coast to Coast America Tour",
    "American Legends VIP Tour",
    "Florida Dream Luxury Itinerary",
    "Curated Travel Experiences USA",
    "ELMIA DMC"
  ]
};

export default function ExperiencesIndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Header - Clean White */}
      <section className="pt-12 sm:pt-16 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-xs text-[#777777] mb-3 sm:mb-4">
            <Link href="/" className="hover:text-[#285735] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#cccccc]" />
            <span className="text-[#285735] font-semibold">Experiences</span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-[#1a3822] tracking-tight leading-tight mb-3 font-heading">
              Bespoke Experiences &amp; VIP Tours
            </h1>
            <p className="text-sm sm:text-lg text-[#555555] leading-relaxed font-normal">
              Carefully crafted travel packages featuring Five-Star luxury accommodations, private aviation, Michelin dining, and white-glove executive chauffeur transit across the United States.
            </p>
          </div>
        </div>
      </section>

      {/* Catalog Intro & Experiences Bento Grid */}
      <section className="pt-8 sm:pt-12 pb-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* 1. Flagship Featured Bento Card (Option 4) */}
        {EXPERIENCES.length > 0 && (() => {
          const featured = EXPERIENCES[0];
          return (
            <div className="mb-10 sm:mb-12">
              <Link
                href={`/experiences/${featured.slug}`}
                className="group relative block w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[540px] rounded-3xl overflow-hidden border border-[#1b3d24]/60 shadow-xl hover:shadow-2xl hover:border-[#61CE70]/60 transition-all duration-500 bg-[#0e1710]"
              >
                {/* Background Image with Zoom */}
                <Image
                  src={featured.heroImage}
                  alt={`${featured.title} - Flagship USA Tour by ELMIA DMC`}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Multi-layered Cinematic Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 group-hover:via-black/60 transition-all duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent hidden lg:block" />

                {/* Content Overlay */}
                <div className="relative z-10 h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[540px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
                  {/* Top Bar */}
                  <div className="flex items-center justify-end">
                    <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium text-white shadow-md">
                      <Calendar className="w-3.5 h-3.5 text-[#61CE70]" />
                      <span>{featured.duration}</span>
                    </div>
                  </div>

                  {/* Bottom Information & CTA */}
                  <div className="mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-6">
                    <div className="max-w-3xl space-y-3">
                      <div className="flex items-center space-x-1.5 text-[10px] font-bold uppercase tracking-wider text-[#61CE70]">
                        <MapPin className="w-3 h-3 text-[#61CE70] shrink-0" />
                        <span>{featured.subtitle}</span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-white font-normal tracking-tight group-hover:text-[#61CE70] transition-colors leading-tight">
                        {featured.title}
                      </h3>
                    </div>

                    {/* CTA Button */}
                    <div className="shrink-0 pt-2 lg:pt-0">
                      <div className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#61CE70] group-hover:bg-[#52be61] text-[#0e1710] font-bold text-sm tracking-wide shadow-xl transition-all duration-300">
                        <span>Explore Complete Itinerary</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })()}

        {/* 2. Cinematic Dark Card Grid for Remaining Tours (Option 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EXPERIENCES.slice(1).map((exp) => (
            <Link
              key={exp.slug}
              href={`/experiences/${exp.slug}`}
              className="group relative block rounded-2xl overflow-hidden min-h-[460px] sm:min-h-[490px] border border-[#1b3d24]/40 shadow-lg hover:shadow-2xl hover:border-[#61CE70]/60 transition-all duration-500 bg-[#0e1710]"
            >
              {/* Card Full-Bleed Image */}
              <Image
                src={exp.heroImage}
                alt={`${exp.title} - Curated USA Tour Experience by ELMIA DMC`}
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Cinematic Multi-Stop Dark Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25 group-hover:via-black/65 transition-all duration-500" />

              {/* Content Inside Card */}
              <div className="relative z-10 h-full min-h-[460px] sm:min-h-[490px] flex flex-col justify-between p-6 sm:p-7">
                {/* Top Bar */}
                <div className="flex items-center justify-end">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#61CE70]/40 text-[#61CE70] text-[11px] font-medium flex items-center space-x-1.5 shadow-sm">
                    <Calendar className="w-3 h-3 text-[#61CE70]" />
                    <span>{exp.duration}</span>
                  </span>
                </div>

                {/* Bottom Details & Action */}
                <div className="space-y-3 pt-6">
                  {/* Destination / States */}
                  <div className="flex items-center space-x-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#61CE70]">
                    <MapPin className="w-3 h-3 text-[#61CE70] shrink-0" />
                    <span className="truncate">{exp.subtitle}</span>
                  </div>

                  {/* Title (+4px) */}
                  <h3 className="text-2xl sm:text-[28px] font-heading text-white font-normal group-hover:text-[#61CE70] transition-colors leading-snug">
                    {exp.title}
                  </h3>

                  {/* Bottom Action Bar */}
                  <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                    <span className="text-xs font-bold text-white group-hover:text-[#61CE70] transition-colors">
                      View Detailed Itinerary
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#61CE70] text-white group-hover:text-[#0e1710] flex items-center justify-center transition-all duration-300 border border-white/20 group-hover:border-[#61CE70] shadow-sm">
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom RFP Form */}
      <CTABanner title="Design Your Signature" highlight="American Journey" subtitle="Whether traversing the Rockies or exploring coastal cities, our Operations Desk will craft a fully private, turnkey itinerary tailored to your dates and guest count." />
    </div>
  );
}
