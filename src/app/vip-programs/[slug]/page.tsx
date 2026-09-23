import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Phone
} from "lucide-react";
import { VIP_PROGRAMS } from "@/data/vipPrograms";
import CTABanner from "@/components/CTABanner";
import FloatingProposalButton from "@/components/FloatingProposalButton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return VIP_PROGRAMS.map((prog) => ({
    slug: prog.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = VIP_PROGRAMS.find((p) => p.slug === slug);
  if (!program) return {};

  return {
    title: `${program.title} | VIP Concierge | ELMIA DMC`,
    description: program.description,
    alternates: {
      canonical: `https://elmiadmc.com/vip-programs/${program.slug}`
    },
    keywords: [
      program.title,
      program.subtitle,
      "VIP Concierge Miami",
      "Luxury Lifestyle USA",
      "Bespoke Hospitality Program",
      "ELMIA DMC"
    ],
    openGraph: {
      title: `${program.title} | VIP Concierge | ELMIA DMC`,
      description: program.description,
      url: `https://elmiadmc.com/vip-programs/${program.slug}`,
      images: [{ url: program.heroImage }]
    }
  };
}

export default async function VIPProgramDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const program = VIP_PROGRAMS.find((p) => p.slug === slug);
  if (!program) {
    notFound();
  }

  const vipSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://elmiadmc.com/vip-programs/${program.slug}#service`,
    "url": `https://elmiadmc.com/vip-programs/${program.slug}`,
    "name": program.title,
    "serviceType": "VIP Lifestyle Concierge & Exclusive Access",
    "description": program.description,
    "areaServed": [
      { "@type": "City", "name": "Miami" },
      { "@type": "City", "name": "New York" },
      { "@type": "City", "name": "Chicago" },
      { "@type": "City", "name": "Los Angeles" },
      { "@type": "Country", "name": "United States" }
    ],
    "provider": {
      "@type": "TravelAgency",
      "@id": "https://elmiadmc.com/#localbusiness",
      "name": "ELMIA DMC (Elegant Miami Adventures LLC)",
      "url": "https://elmiadmc.com",
      "telephone": "+1-786-677-7333",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Miami Opa-locka Exec. Jet Airport Hangar 5 Suite 128",
        "addressLocality": "Opa-locka",
        "addressRegion": "FL",
        "postalCode": "33054",
        "addressCountry": "US"
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(vipSchema) }}
      />
      {/* 1. HERO BANNER */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 overflow-hidden bg-[#0e1710] border-b border-[#1a3320]">
        <div className="absolute inset-0 z-0">
          <Image
            src={program.heroImage}
            alt={`${program.title} - ELMIA DMC VIP Lifestyle Program`}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1710] via-[#0e1710]/70 to-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top: Breadcrumb, H1 Title & Subtitle */}
          <div>
            <nav className="flex items-center space-x-2 text-xs text-white/70 mb-4">
              <Link href="/" className="hover:text-[#61CE70] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <Link href="/vip-programs" className="hover:text-[#61CE70] transition-colors">
                VIP Programs
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-[#61CE70] font-medium truncate">
                {program.title.split("-")[0].trim()}
              </span>
            </nav>

            <div className="max-w-4xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
                {program.title}
              </h1>

              <p className="text-sm sm:text-lg text-[#82d68e] leading-relaxed font-normal">
                {program.subtitle}
              </p>
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
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3822] tracking-tight mb-6">
                Program Overview & Strategic Focus
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-[#555555] leading-relaxed">
                {program.overviewParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            {/* H2: Curated Program Highlights */}
            {program.highlights && program.highlights.length > 0 && (
              <div>
                <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#285735]" />
                  <span>Distinctive Features</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1a3822] tracking-tight mb-6">
                  Signature Access & Capabilities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {program.highlights.map((h, i) => (
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
            )}

            {/* H2: Inclusions & VIP Privileges */}
            {program.inclusions && program.inclusions.length > 0 && (
              <div className="pt-6 border-t border-[#e7ede7]">
                <div className="rounded-2xl border border-[#b8dfbf] bg-[#f8faf8] p-6 sm:p-8 space-y-4 shadow-sm">
                  <h2 className="text-xl font-bold text-[#1a3822] flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-[#285735] mr-2" />
                    Program Inclusions & Logistics
                  </h2>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#444444]">
                    {program.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <span className="text-[#285735] font-bold">•</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
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
                  {program.title.split("-")[0].trim()}
                </h3>
              </div>

              <div className="space-y-3 text-xs border-y border-[#e7ede7] py-4">
                <div className="flex justify-between gap-4">
                  <span className="text-[#666666] shrink-0">Format:</span>
                  <span className="font-bold text-[#285735] text-right">Fully Private & Bespoke</span>
                </div>
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex justify-between gap-4">
                    <span className="font-bold text-[#222222] text-right">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <a
                  href={`/request-proposal?interest=${encodeURIComponent(program.title)}`}
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
                  <span>Call VIP Desk</span>
                </a>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-[#777777]">
                  Tailor-made adjustments available for group size, duration, and specific security requirements.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner interest={program.title} />
      <FloatingProposalButton />
    </div>
  );
}
