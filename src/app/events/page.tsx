import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Calendar, MapPin, Sparkles, Shield, Compass, ArrowRight } from "lucide-react";
import EventsClient from "./EventsClient";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "America's Major Events & Summits | Trade Missions, Expos & VIP Calendar",
  description: "The definitive guide to the nation's premier B2B expos, trade missions, tech summits, and corporate gatherings across Miami, New York, Chicago, Los Angeles, and Las Vegas.",
  keywords: [
    "Miami major events",
    "New York corporate summits",
    "Chicago convention calendar",
    "Los Angeles VIP events",
    "Las Vegas trade shows",
    "CES Las Vegas",
    "F1 Miami guide",
    "Art Basel Miami",
    "UN General Assembly",
    "US Open Tennis",
    "World of Concrete"
  ],
  alternates: {
    canonical: "https://elmiadmc.com/events"
  }
};

export default function EventsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfa] text-[#2d3748]">
      
      {/* 1. EDITORIAL HEADER & HERO */}
      <section className="relative w-full -mt-[104px] overflow-hidden bg-[#0c1810] text-white">
        <div className="relative w-full min-h-[460px] sm:min-h-[500px] flex flex-col justify-end px-6 sm:px-12 lg:px-16 pt-36 pb-24 sm:pb-28 max-w-7xl mx-auto">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 z-0 opacity-25">
            <Image
              src="/images/events/art-basel-miami-beach.jpg"
              alt="Major US Events Calendar"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white font-heading leading-[1.12] mb-4">
              America’s Marquee <br className="hidden sm:inline" />
              <span className="text-[#61CE70]">Expos, Summits &amp; Trade Missions</span>
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto font-normal">
              An authoritative curation of the United States’ most influential B2B expositions, trade shows, and VIP sporting summits across Miami, New York, Chicago, Los Angeles, and Las Vegas.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MAIN DIRECTORY BODY WITH INTERACTIVE CITY TABS */}
      <section className="relative pb-14 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
        <EventsClient />
      </section>

      {/* 3. DISCREET TURNKEY FACILITATION BRIEF */}
      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#285735]">
              Executive Delegation Operations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-heading mt-1">
              Private Hospitality &amp; Ground Coordination
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
              When corporate leadership, sovereign delegations, or private groups attend marquee American events, ELMIA serves as an independent, single-source operational partner.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80">
              <span className="text-[11px] font-bold text-[#285735] uppercase tracking-wider block mb-1">Pillar 01</span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">VIP Accreditation</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct pass procurement, Paddock Club suites, and executive badge delivery to your hotel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80">
              <span className="text-[11px] font-bold text-[#285735] uppercase tracking-wider block mb-1">Pillar 02</span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Pre-Contracted Hotels</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Secured 5-star hotel blocks and private villa buyouts guaranteed before citywide sell-outs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80">
              <span className="text-[11px] font-bold text-[#285735] uppercase tracking-wider block mb-1">Pillar 03</span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Permitted Chauffeurs</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Continuous Cadillac Escalade and Sprinter staging holding official venue drop-off permits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200/80">
              <span className="text-[11px] font-bold text-[#285735] uppercase tracking-wider block mb-1">Pillar 04</span>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Curated Entertaining</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Michelin-starred private dining rooms and sunset charter yachts for hosting elite clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL BOTTOM BANNER */}
      <CTABanner
        title="Coordinating Travel for a"
        highlight="Major US Summit?"
        subtitle="Avoid peak surge rates and sold-out hotel blocks. Connect with our dedicated operations team for an itemized delegation itinerary and vehicle allocation."
        interest="Major Events Directory"
      />
    </div>
  );
}
