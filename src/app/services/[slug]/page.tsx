import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  Phone,
  ArrowRight,
  Compass,
  Building2,
  Users,
  Crown,
  PlaneTakeoff,
  ShieldCheck,
  FileSpreadsheet,
  Hotel,
  Bus,
  Utensils,
  Car,
  Shield,
  Clock,
  Lock,
  Plane,
  Handshake,
  Radar,
  Sparkles,
  Route,
  Languages,
  Wine,
  PackageCheck,
  ShieldAlert,
  Award,
  Building,
  FileCheck,
  Briefcase
} from "lucide-react";
import { DMC_SERVICES } from "@/data/services";
import FAQAccordion from "@/components/FAQAccordion";
import CTABanner from "@/components/CTABanner";
import FloatingProposalButton from "@/components/FloatingProposalButton";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  Building2,
  Users,
  Crown,
  PlaneTakeoff,
  ShieldCheck,
  FileSpreadsheet,
  Hotel,
  Bus,
  Utensils,
  Car,
  Shield,
  Clock,
  Lock,
  Plane,
  Handshake,
  Radar,
  Sparkles,
  Route,
  Languages,
  Wine,
  PackageCheck,
  ShieldAlert,
  Award,
  Building,
  FileCheck
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DMC_SERVICES.map((s) => ({
    slug: s.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = DMC_SERVICES.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} | ELMIA DMC`,
    description: service.metaDescription,
    alternates: {
      canonical: `https://elmiadmc.com/services/${service.slug}`
    },
    keywords: [
      service.title,
      service.shortTitle,
      "Miami DMC",
      "USA Destination Management",
      "Executive Chauffeur Logistics",
      "ELMIA DMC"
    ],
    openGraph: {
      title: `${service.title} | ELMIA DMC`,
      description: service.metaDescription,
      url: `https://elmiadmc.com/services/${service.slug}`,
      images: [{ url: service.heroImage }]
    }
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = DMC_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `https://elmiadmc.com/services/${service.slug}#service`,
        "url": `https://elmiadmc.com/services/${service.slug}`,
        "name": service.title,
        "serviceType": service.title,
        "description": service.aeoSummary,
        "areaServed": [
          { "@type": "City", "name": "Miami" },
          { "@type": "City", "name": "New York" },
          { "@type": "City", "name": "Chicago" },
          { "@type": "City", "name": "Los Angeles" },
          { "@type": "Country", "name": "United States" }
        ],
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": `${service.shortTitle} Capabilities`,
          "itemListElement": service.capabilities.map((c, i) => ({
            "@type": "Offer",
            "position": i + 1,
            "itemOffered": {
              "@type": "Service",
              "name": c.title,
              "description": c.description
            }
          }))
        },
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
      },
      ...(service.faqs && service.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `https://elmiadmc.com/services/${service.slug}#faq`,
              "mainEntity": service.faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }
          ]
        : [])
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
      />

      {/* 1. HERO BANNER */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 overflow-hidden bg-[#0e1710] border-b border-[#1a3320]">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.heroImage}
            alt={`${service.title} - ELMIA DMC Service Overview`}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1710] via-[#0e1710]/70 to-black/75" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Top: Breadcrumb, H1 Title & Tagline */}
          <div>
            <nav className="flex items-center space-x-2 text-xs text-white/70 mb-4">
              <Link href="/" className="hover:text-[#61CE70] transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <Link href="/services" className="hover:text-[#61CE70] transition-colors">
                Services
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-[#61CE70] truncate font-semibold">
                {service.title}
              </span>
            </nav>

            <div className="max-w-4xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
                {service.title}
              </h1>

              <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal">
                {service.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW & STRATEGIC VALUE */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[#285735]">
              <span className="w-2 h-2 rounded-full bg-[#285735]" />
              <span>Overview &amp; Core Capabilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#1a3822] tracking-tight font-heading">
              Strategic Destination Management for Corporate &amp; Group Buyers
            </h2>

            <div className="space-y-5 text-[#555555] text-base leading-relaxed pt-2">
              {service.overviewParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Side Overview Card */}
          <div className="lg:col-span-4 rounded-2xl border border-[#e7ede7] bg-[#f8faf8] p-6 sm:p-8 space-y-5 shadow-sm">
            <h3 className="text-lg font-bold text-[#222222] border-b border-gray-200 pb-3">
              Operations Desk Overview
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Command Center</div>
                <div className="font-semibold text-[#222222] mt-0.5">Miami Opa-locka (OPF Hangar 5)</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Service Territory</div>
                <div className="font-semibold text-[#222222] mt-0.5">Miami, FLL, Palm Beach & Orlando</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Flight Manifest Integration</div>
                <div className="font-semibold text-[#285735] mt-0.5">Live Radar & Tail Number Sync</div>
              </div>
              <div>
                <div className="text-gray-500 uppercase tracking-wider text-[10px] font-bold">Compliance</div>
                <div className="font-semibold text-[#222222] mt-0.5">Corporate Master Service Agreements & NDAs</div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <a
                href="tel:+17866777333"
                className="w-full py-3 px-4 rounded-xl bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-semibold flex items-center justify-center transition-colors shadow-sm"
              >
                <Phone className="w-3.5 h-3.5 mr-2" />
                Call Operations: +1 (786) 677-7333
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY CAPABILITIES GRID */}
      <section className="py-20 bg-[#f8faf8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
              KEY CAPABILITIES
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
              Engineered for Surgical Precision
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#666666]">
              Every facet of this solution is designed to eliminate risk and streamline operations for corporate teams and travel agencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.capabilities.map((cap, idx) => {
              const IconComponent = iconMap[cap.iconName] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#e7ede7] bg-white p-6 hover:border-[#285735] hover:shadow-md transition-all space-y-3 shadow-sm group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center text-[#285735] group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#285735] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. RECOMMENDED FLEET */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
              RECOMMENDED FLEET
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#222222] tracking-tight">
              Tailored Ground Transit Equipment
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#666666]">
              The primary vehicle classes deployed for this solution across Miami, New York, Chicago, Los Angeles, and nationwide markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.recommendedFleet.map((v, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#e7ede7] bg-white overflow-hidden hover:border-[#285735] hover:shadow-md transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={v.image}
                    alt={`${v.name} - Executive Fleet for ${service.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#285735] transition-colors">
                      {v.name}
                    </h3>
                    <div className="flex items-center space-x-4 my-2 text-xs text-[#666666]">
                      <span className="flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                        {v.capacity}
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                        {v.luggage}
                      </span>
                    </div>
                    <p className="text-xs text-[#555555] leading-relaxed">
                      {v.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <Link
                      href={`/request-proposal?interest=${encodeURIComponent(service.title)}`}
                      className="text-xs font-bold text-[#285735] hover:underline inline-flex items-center"
                    >
                      <span>Request Proposal</span>
                      <ArrowRight className="ml-1 w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION SECTION */}
      <section className="py-20 bg-[#f8faf8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQAccordion
            faqs={service.faqs}
            title={`Frequently Asked Questions: ${service.title}`}
            subtitle="Straightforward answers on logistics, dispatch protocols, and procurement terms."
          />
        </div>
      </section>

      <CTABanner interest={service.title} />
      <FloatingProposalButton />
    </div>
  );
}
