import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ShieldCheck, Plane, CheckCircle2, ChevronRight } from "lucide-react";
import CTABanner from "@/components/CTABanner";

export const metadata: Metadata = {
  title: "Operational Credentials & Compliance | ELMIA DMC Miami",
  description: "Review ELMIA's regulatory credentials, DOT compliance, FBO tarmac security clearance, diplomatic protocol readiness, and commercial insurance coverage.",
  alternates: {
    canonical: "https://elmiadmc.com/credentials"
  },
  keywords: [
    "DOT compliance Miami DMC",
    "TSA tarmac security badge FBO",
    "Miami Opa-locka Hangar 5 operations",
    "diplomatic protocol delegation USA",
    "commercial auto liability insurance DMC",
    "Florida Seller of Travel ELMIA",
    "SAM.gov federal procurement DMC"
  ]
};

export default function CredentialsPage() {
  const complianceItems = [
    {
      title: "US Department of Transportation (DOT)",
      description: "Operated in strict compliance with federal motor carrier safety regulations, commercial driver duty-hour limitations, and scheduled fleet inspections."
    },
    {
      title: "TSA Airside & FBO Tarmac Security Badges",
      description: "Direct airside credentials enabling our chauffeurs and vehicles to stage planeside at Signature Flight Support, Atlantic Aviation, Fontainebleau, and Sheltair across OPF, MIA, FLL, and PBI."
    },
    {
      title: "Diplomatic Protocol & State Mission Readiness",
      description: "Proven track record coordinating with foreign ministries, embassies, consulates, and security advance teams with strict non-disclosure enforcement."
    },
    {
      title: "SAM.gov Federal Procurement Registration",
      description: "Registered U.S. corporate entity with transparent accounting, active CAGE code readiness, and capability to execute institutional procurement contracts."
    },
    {
      title: "Commercial Auto Liability Insurance ($5M+ Coverage)",
      description: "Maintaining comprehensive commercial auto liability and general carrier insurance policies exceeding statutory local and federal thresholds."
    },
    {
      title: "Florida Seller of Travel Compliance",
      description: "Fully compliant with Florida Department of Agriculture and Consumer Services regulatory mandates for destination management and travel services."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 flex flex-col justify-center bg-[#0e1710] border-b border-[#1a3320] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/flag-img.jpg"
            alt="ELMIA DMC Official US Operating Licenses and Diplomatic Credentials"
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
              <span className="text-[#61CE70] font-semibold">Operational Credentials</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
                Operational Credentials & Protocol Standards
              </h1>
              <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal">
                In high-stakes corporate travel and sovereign state delegations, operational legitimacy is non-negotiable. Explore ELMIA&apos;s licenses, airport badges, and safety compliance benchmarks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {complianceItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#e7ede7] bg-white p-6 sm:p-8 hover:border-[#285735] hover:shadow-md transition-all space-y-4 shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center text-[#285735]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-[#1a3822] leading-snug">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#555555] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hangar 5 Operational Base Detail */}
      <section className="py-20 bg-[#f8faf8] border-t border-[#e7ede7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735]">
                <Plane className="w-4 h-4 text-[#285735]" />
                <span>Physical Operations Facility</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1a3822] tracking-tight">
                Physical Operations at Miami Opa-locka Hangar 5
              </h2>
              <p className="text-sm sm:text-base text-[#555555] leading-relaxed">
                Unlike intermediary brokers who work remotely, ELMIA maintains an operational desk and vehicle staging base directly at Miami Opa-locka Executive Airport (OPF Hangar 5).
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[#444444]">
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#285735] mr-2 shrink-0" />
                  <span>Immediate access to private jet runways and FBO dispatch terminals</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#285735] mr-2 shrink-0" />
                  <span>Secure vehicle holding compounds for high-security motorcades</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="w-4 h-4 text-[#285735] mr-2 shrink-0" />
                  <span>Direct phone line to senior dispatchers 24 hours a day, 365 days a year</span>
                </li>
              </ul>
            </div>

            <div className="relative h-[380px] rounded-2xl overflow-hidden border border-[#e7ede7] shadow-md">
              <Image
                src="/images/jet-img.jpg"
                alt="ELMIA DMC Airside Operations at Opa-locka Airport Hangar 5"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* RFP Form */}
      <CTABanner title="Partner With a Proven" highlight="Logistics Leader" subtitle="Experience the peace of mind that comes with $5M liability coverage, full licensing, and three decades of zero-incident operations since 1994. Request a proposal today." />
    </div>
  );
}
