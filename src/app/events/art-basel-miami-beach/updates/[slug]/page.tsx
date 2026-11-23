import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Shield,
  Tag,
  Phone,
  Compass,
  FileText
} from "lucide-react";
import {
  ART_BASEL_UPDATES,
  getArtBaselUpdateBySlug,
  getAllArtBaselUpdates
} from "@/data/artBaselUpdates";
import ContactForm from "@/components/ContactForm";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ART_BASEL_UPDATES.map((update) => ({
    slug: update.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const update = getArtBaselUpdateBySlug(slug);

  if (!update) {
    return {
      title: "Update Not Found | Art Basel Miami Beach 2026",
    };
  }

  const metaTitle = `${update.title} | Art Basel Miami Beach 2026 Daily Bulletin | ELMIA DMC`;
  const metaDescription = update.excerpt;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      "Art Basel Miami Beach 2026",
      "Art Basel Miami daily updates",
      "Miami Art Week 2026 news",
      update.category,
      "VIP Art Basel access",
      "executive chauffeur Miami Beach",
      "Miami Beach Convention Center logistics"
    ],
    alternates: {
      canonical: `https://www.elmiadmc.com/events/art-basel-miami-beach/updates/${update.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://www.elmiadmc.com/events/art-basel-miami-beach/updates/${update.slug}`,
      siteName: "ELMIA DMC",
      images: [
        {
          url: update.coverImage,
          width: 1400,
          height: 875,
          alt: update.title,
        },
      ],
      type: "article",
      publishedTime: update.publishDateISO,
    },
  };
}

export default async function ArtBaselUpdatePage({ params }: PageProps) {
  const { slug } = await params;
  const update = getArtBaselUpdateBySlug(slug);

  if (!update) {
    notFound();
  }

  const allUpdates = getAllArtBaselUpdates();
  const currentIndex = allUpdates.findIndex((u) => u.slug === update.slug);
  const prevUpdate = currentIndex > 0 ? allUpdates[currentIndex - 1] : null;
  const nextUpdate = currentIndex < allUpdates.length - 1 ? allUpdates[currentIndex + 1] : null;

  // Schema.org Article + Event JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `https://www.elmiadmc.com/events/art-basel-miami-beach/updates/${update.slug}#article`,
        "headline": update.title,
        "description": update.excerpt,
        "image": [`https://www.elmiadmc.com${update.coverImage}`],
        "datePublished": update.publishDateISO,
        "dateModified": update.publishDateISO,
        "author": {
          "@type": "Organization",
          "name": "ELMIA DMC Editorial Desk",
          "url": "https://www.elmiadmc.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "ELMIA DMC",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.elmiadmc.com/images/logo.jpg"
          }
        },
        "mainEntityOfPage": `https://www.elmiadmc.com/events/art-basel-miami-beach/updates/${update.slug}`
      },
      {
        "@type": "Event",
        "@id": "https://www.elmiadmc.com/events/art-basel-miami-beach#event",
        "name": "Art Basel Miami Beach 2026",
        "startDate": "2026-12-02",
        "endDate": "2026-12-06",
        "location": {
          "@type": "Place",
          "name": "Miami Beach Convention Center",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1901 Convention Center Dr",
            "addressLocality": "Miami Beach",
            "addressRegion": "FL",
            "postalCode": "33139",
            "addressCountry": "US"
          }
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#fafbfa] text-[#2d3748]">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative w-full -mt-[104px] overflow-hidden bg-[#0c1810] text-white">
        <div className="relative w-full min-h-[480px] sm:min-h-[540px] flex flex-col justify-end px-6 sm:px-12 lg:px-16 pt-36 pb-14 sm:pb-18 max-w-7xl mx-auto">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 z-0 opacity-30">
            <Image
              src={update.coverImage}
              alt={update.title}
              fill
              priority
              className="object-cover object-center filter brightness-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1810] via-[#0c1810]/70 to-black/40" />
          </div>

          <div className="relative z-10 max-w-4xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-2 text-xs text-white/60 mb-5 flex-wrap">
              <Link href="/" className="hover:text-[#74b382] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <Link href="/events" className="hover:text-[#74b382] transition-colors">Events</Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <Link href="/events/art-basel-miami-beach" className="hover:text-[#74b382] transition-colors">
                Art Basel Miami Beach
              </Link>
              <ChevronRight className="w-3 h-3 text-white/40" />
              <span className="text-[#61CE70] font-medium">Daily Bulletin</span>
            </nav>

            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#285735] text-[#82d68e] border border-[#3e7e50] shadow-sm">
                {update.countdownLabel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-gray-200 border border-white/15 flex items-center">
                <Tag className="w-3 h-3 mr-1.5 text-[#61CE70]" />
                {update.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-gray-200 border border-white/15 flex items-center">
                <Calendar className="w-3 h-3 mr-1.5 text-[#61CE70]" />
                {update.publishDate}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md text-gray-200 border border-white/15 flex items-center">
                <Clock className="w-3 h-3 mr-1.5 text-[#61CE70]" />
                {update.readTime}
              </span>
            </div>

            {/* Main Title & Subtitle */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white font-heading leading-[1.18] mb-3">
              {update.title}
            </h1>

            <p className="text-base sm:text-lg text-[#82d68e] font-light leading-relaxed max-w-3xl">
              {update.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL ARTICLE BODY + SIDEBAR */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* LEFT 8 COLUMNS: ARTICLE CONTENT */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* Back Link */}
              <div>
                <Link
                  href="/events/art-basel-miami-beach"
                  className="inline-flex items-center text-xs font-bold text-[#285735] hover:text-[#1b3d24] transition-colors group"
                >
                  <ArrowLeft className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to Art Basel Miami Beach Event Guide</span>
                </Link>
              </div>

              {/* Lead Excerpt */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e2eae2] shadow-sm">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-normal italic border-l-4 border-[#285735] pl-5">
                  &ldquo;{update.excerpt}&rdquo;
                </p>
              </div>

              {/* Highlights Checklist */}
              {update.highlights && update.highlights.length > 0 && (
                <div className="p-6 rounded-2xl bg-[#f2f7f2] border border-[#d3e5d3]">
                  <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-[#285735] mb-3">
                    <Sparkles className="w-4 h-4 text-[#285735]" />
                    <span>Key Dispatch Highlights</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-800">
                    {update.highlights.map((h, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[#285735] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Body Sections */}
              <div className="space-y-8">
                {update.content.map((sec, idx) => (
                  <div key={idx} className="space-y-4">
                    {sec.sectionTitle && (
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 font-heading tracking-tight mt-6">
                        {sec.sectionTitle}
                      </h2>
                    )}
                    {sec.paragraphs.map((para, pIdx) => (
                      <p key={pIdx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                        {para}
                      </p>
                    ))}
                    {sec.callout && (
                      <div className="p-5 rounded-xl bg-[#fffcf5] border border-[#f0e3c0] text-gray-800 my-4 shadow-sm">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#926014] block mb-1">
                          {sec.callout.title}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {sec.callout.text}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaway Card */}
              <div className="p-6 rounded-2xl bg-[#0c1810] text-white border border-[#1b3d24]">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#61CE70] block mb-1">
                  Executive Brief &amp; Takeaway
                </span>
                <h3 className="text-lg font-semibold text-white mb-2 font-heading">
                  The Bottom Line for Patrons
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {update.keyTakeaway}
                </p>
              </div>

              {/* Next / Prev Navigation */}
              <div className="pt-6 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevUpdate ? (
                  <Link
                    href={`/events/art-basel-miami-beach/updates/${prevUpdate.slug}`}
                    className="p-4 rounded-xl border border-gray-200 bg-white hover:border-[#285735] hover:shadow-sm transition-all group"
                  >
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider block mb-1 flex items-center">
                      <ArrowLeft className="w-3 h-3 mr-1 group-hover:-translate-x-0.5 transition-transform" />
                      Previous Dispatch ({prevUpdate.countdownLabel})
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#285735] transition-colors line-clamp-1">
                      {prevUpdate.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextUpdate && (
                  <Link
                    href={`/events/art-basel-miami-beach/updates/${nextUpdate.slug}`}
                    className="p-4 rounded-xl border border-gray-200 bg-white hover:border-[#285735] hover:shadow-sm transition-all text-right group"
                  >
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider block mb-1 flex items-center justify-end">
                      Next Dispatch ({nextUpdate.countdownLabel})
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-[#285735] transition-colors line-clamp-1">
                      {nextUpdate.title}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {/* RIGHT 4 COLUMNS: STICKY SIDEBAR */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Contextual VIP Service Card */}
              <div className="sticky top-28 rounded-2xl border border-[#b8dfbf] bg-white p-6 sm:p-7 space-y-5 shadow-md">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#f2f7f2] border border-[#d3e5d3] text-xs font-bold uppercase tracking-wider text-[#285735]">
                  <Shield className="w-3.5 h-3.5 text-[#285735]" />
                  <span>ELMIA VIP Operations</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1a3822] leading-snug">
                    {update.serviceCTA.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                    {update.serviceCTA.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Event:</span>
                    <span className="font-bold text-gray-900">Art Basel Miami Beach 2026</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Dates:</span>
                    <span className="font-bold text-[#285735]">Dec 2 – Dec 6, 2026</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span className="text-gray-500">Venue:</span>
                    <span className="font-bold text-gray-900 truncate ml-2">Miami Beach Conv. Center</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Fleet Availability:</span>
                    <span className="font-bold text-emerald-700">Escalade / Sprinter / Maybach</span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href="#dispatch-inquiry"
                    className="w-full py-3.5 px-5 rounded-full bg-[#285735] hover:bg-[#1e4329] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-all shadow-md cursor-pointer"
                  >
                    <span>{update.serviceCTA.buttonText}</span>
                    <ArrowRight className="ml-1.5 w-4 h-4" />
                  </a>

                  <a
                    href="tel:+17866777333"
                    className="w-full py-2.5 px-5 rounded-full bg-white hover:bg-[#f4f7f4] border border-[#b8dfbf] text-[#285735] text-xs font-bold flex items-center justify-center transition-colors shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 mr-2 text-[#285735]" />
                    <span>Call +1 (786) 677-7333</span>
                  </a>
                </div>

                {/* Series Navigation List */}
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-3">
                    All Dispatches in this Series ({allUpdates.length})
                  </span>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs">
                    {allUpdates.map((u) => {
                      const isActive = u.slug === update.slug;
                      return (
                        <Link
                          key={u.id}
                          href={`/events/art-basel-miami-beach/updates/${u.slug}`}
                          className={`block p-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-[#285735] text-white font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] opacity-80 mb-0.5">
                            <span>{u.countdownLabel}</span>
                            <span>{u.publishDate.split(",")[0]}</span>
                          </div>
                          <span className="line-clamp-1">{u.title}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INQUIRY / RFP FORM SECTION */}
      <section id="dispatch-inquiry" className="py-16 sm:py-20 bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm
            initialService={`Art Basel 2026: ${update.serviceCTA.serviceName}`}
            title={`Art Basel Miami Beach: Request ${update.serviceCTA.serviceName}`}
            subtitle="Coordinate your executive vehicle fleet, airport tarmac transfers, or private hospitality suite with ELMIA's dedicated destination architects."
          />
        </div>
      </section>
    </div>
  );
}
