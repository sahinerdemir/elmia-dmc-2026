import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { 
  ShieldCheck, 
  Plane, 
  Clock, 
  Phone, 
  ChevronRight, 
} from "lucide-react";
import ProposalForm from "@/components/ProposalForm";

export const metadata: Metadata = {
  title: "Request a Proposal | ELMIA USA Destination Management",
  description: "Request an itemized proposal for corporate summits, executive chauffeured transit, VIP aviation ground logistics, or private villa buyouts in Miami, New York, Chicago, Los Angeles, and nationwide.",
  alternates: {
    canonical: "https://elmiadmc.com/request-proposal"
  },
  keywords: [
    "request proposal DMC",
    "Miami corporate event quotation",
    "VIP chauffeur proposal USA",
    "destination management RFP",
    "FBO tarmac staging quote",
    "private summit logistics quote"
  ]
};

export default function RequestProposalPage() {
  return (
    <div className="relative min-h-screen bg-[#0b140e] text-white selection:bg-[#285735] selection:text-white overflow-hidden">
      {/* Immersive Background Image with Dignified Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/request-proposal-bg.jpg"
          alt="ELMIA Opa-locka Hangar 5 Executive Ground Fleet & Aviation"
          fill
          priority
          className="object-cover object-center filter brightness-[0.75]"
        />
        {/* Layered deep forest and dark vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b140e]/90 via-[#0b140e]/85 to-[#0b140e]" />
      </div>

      {/* Main Centered Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-16 pb-16 sm:pb-20">
        
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center justify-center space-x-2 text-xs text-white/60 mb-4">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-white/30" />
          <span className="text-gray-300 font-medium">Request Proposal</span>
        </nav>

        {/* Centered Headline Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-[#74b382] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#74b382]" />
            <span>VIP Client &amp; Delegation Dispatch</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight font-heading mb-3">
            Request a Custom Proposal
          </h1>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            Submit your itinerary details, guest count, and vehicle preferences. Our Opa-locka Hangar 5 dispatch team will deliver an itemized quotation within 1-2 business days.
          </p>
        </div>

        {/* Executive Form Card */}
        <div className="w-full">
          <ProposalForm />
        </div>

        {/* Credibility & Guarantee Badges Under the Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 sm:mt-10">
          <div className="p-5 rounded-2xl bg-[#111b13] border border-[#1f3323] shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#18271c] border border-[#27422c] flex items-center justify-center text-[#74b382] shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">1-2 Business Days Turnaround</h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Fully itemized proposal with transparent vehicle manifests and pricing.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111b13] border border-[#1f3323] shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#18271c] border border-[#27422c] flex items-center justify-center text-[#74b382] shrink-0 mt-0.5">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">Direct FBO Tarmac Access</h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Authorized airside staging at OPF Hangar 5, Signature, Atlantic, and Fontainebleau.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#111b13] border border-[#1f3323] shadow-sm flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#18271c] border border-[#27422c] flex items-center justify-center text-[#74b382] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">$5,000,000 Liability Coverage</h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Full DOT credentials, commercial insurance, and strict NDA confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* 24/7 Operations Hotline Callout */}
        <div className="mt-4 p-5 rounded-2xl bg-[#111b13] border border-[#1f3323] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start space-x-2 text-xs font-semibold text-[#8ac497]">
              <span className="w-2 h-2 rounded-full bg-[#3d8350]" />
              <span>Operations Desk Live 24/7</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              Need immediate flightline staging or same-day emergency coordination?
            </div>
          </div>
          <a
            href="tel:+17866777333"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#285735] hover:bg-[#1e4429] border border-[#396946] text-xs font-semibold text-white transition-colors whitespace-nowrap shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5 text-white/80" />
            Call +1 (786) 677-7333
          </a>
        </div>

      </div>
    </div>
  );
}
