import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Plane, Award, Users, ChevronRight } from "lucide-react";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "About ELMIA | USA Destination Management Company & Executive Fleet",
  description: "Learn about ELMIA DMC. Nationwide destination management company with 30+ years of global travel and logistics experience (founded in 1994), headquartered at Miami Opa-locka Executive Airport (OPF Hangar 5) with key hubs in New York, Chicago, and Los Angeles.",
  alternates: {
    canonical: "https://elmiadmc.com/about"
  },
  keywords: [
    "About ELMIA DMC",
    "Destination Management Company Miami",
    "USA Corporate Travel Logistics",
    "Opa-locka Hangar 5 Dispatch",
    "Executive Delegations Ground Transport",
    "Miami New York Chicago Los Angeles DMC"
  ]
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Header banner */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 flex flex-col justify-center bg-[#0e1710] border-b border-[#1a3320] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/slide-luxury.jpg"
            alt="About ELMIA DMC - USA Destination Management Company & Executive Fleet"
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
              <Link href="/" className="hover:text-[#61CE70] transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/40" />
              <span className="text-[#61CE70] font-semibold">About Us</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
                Nationwide DMC | Miami, New York, Chicago, Los Angeles
              </h1>
              <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal">
                Headquartered at Miami Opa-locka Executive Airport (OPF Hangar 5) with active operational hubs in New York, Chicago, Los Angeles, and full nationwide service, ELMIA bridges international corporate travel agencies, sovereign delegations, and enterprise organizers with premier ground infrastructure across the United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy & History Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735]">
              <Award className="w-4 h-4 text-[#285735]" />
              <span>Our Foundation &amp; Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1a3822] tracking-tight">
              A Purpose-Built DMC for Nationwide Reach
            </h2>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              Operating as <strong className="text-[#285735]">Elegant Miami Adventures LLC (ELMIA DMC)</strong>, our leadership traces its roots back to 1994, bringing over three decades (30+ years) of global destination management, diplomatic delegation handling, and private aviation ground handling experience.
            </p>
            <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
              While our operational headquarters and airside facilities are anchored in Miami (OPF Hangar 5), our full-service infrastructure extends across premier U.S. event corridors: New York, Chicago, Los Angeles, and nationwide. Corporate meeting planners, international state ministries, and VIP travelers require a licensed, on-the-ground operational authority capable of managing complex hotel contracts, multi-city movements, air traffic manifests, tarmac security protocols, and 24/7 emergency dispatch anywhere in the country.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#f8faf8] border border-[#e7ede7] shadow-sm">
                <div className="text-2xl font-bold text-[#1a3822] mb-1">Miami OPF</div>
                <div className="text-xs text-[#666666]">Headquarters &amp; Airside Staging at Hangar 5</div>
              </div>
              <div className="p-4 rounded-xl bg-[#f8faf8] border border-[#e7ede7] shadow-sm">
                <div className="text-2xl font-bold text-[#285735] mb-1">4 Hubs + USA</div>
                <div className="text-xs text-[#666666]">Miami, New York, Chicago, Los Angeles &amp; Nationwide</div>
              </div>
            </div>
          </div>

          <div className="relative h-[460px] rounded-2xl overflow-hidden border border-[#e7ede7] shadow-md">
            <Image
              src="/images/company-img.jpg"
              alt="ELMIA DMC Executive Team & Operations Headquarters at Opa-locka Hangar 5"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#e7ede7] shadow-md">
              <div className="text-xs font-bold text-[#1a3822]">Operations Desk: Opa-locka Hangar 5</div>
              <div className="text-[11px] text-[#666666] mt-0.5">24/7 Dedicated Logistics and Flight Synchronization</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles Grid */}
      <section className="py-20 bg-[#f8faf8] border-t border-[#e7ede7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735] mb-2">
              <Shield className="w-4 h-4 text-[#285735]" />
              <span>Operational Commitments</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1a3822] tracking-tight">
              The Four Pillars of ELMIA Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-xl border border-[#e7ede7] bg-white p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center text-[#285735]">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a3822]">Duty of Care</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Exceeding statutory insurance mandates, background-checking all personnel, and maintaining secondary contingency vehicles for every major program.
              </p>
            </div>

            <div className="rounded-xl border border-[#e7ede7] bg-white p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center text-[#285735]">
                <Plane className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a3822]">Tarmac Proximity</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Direct physical staging inside Hangar 5 at Miami Opa-locka Executive Airport enables instantaneous flight-line dispatch and planeside pickups.
              </p>
            </div>

            <div className="rounded-xl border border-[#e7ede7] bg-white p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center text-[#285735]">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a3822]">Dedicated Lead</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                No anonymous call centers. Every corporate account is paired with a Senior Project Lead with direct cell phone and radio access.
              </p>
            </div>

            <div className="rounded-xl border border-[#e7ede7] bg-white p-6 space-y-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-lg bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center text-[#285735]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1a3822]">Consolidated Billing</h3>
              <p className="text-xs text-[#555555] leading-relaxed">
                Transparent itemized invoices, corporate procurement compliance, and single-source financial reconciliation for complex itineraries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Contact RFP */}
      <CTABanner title="Ready to Experience" highlight="ELMIA Excellence?" subtitle="Partner with America’s trusted DMC partner. From Miami, New York, Chicago, and Los Angeles to nationwide itineraries, our executive team delivers surgical precision." />
    </div>
  );
}
