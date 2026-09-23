import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, ShieldCheck, ChevronRight } from "lucide-react";
import GeneralContactForm from "@/components/GeneralContactForm";

export const metadata: Metadata = {
  title: "Contact Operations Desk | ELMIA USA Destination Management",
  description: "Get in touch with ELMIA DMC operations desk. 24/7 corporate dispatch across Miami, New York, Chicago, Los Angeles, and nationwide. Headquarters at Miami Opa-locka Airport (OPF Hangar 5).",
  alternates: {
    canonical: "https://elmiadmc.com/contact"
  },
  keywords: [
    "contact ELMIA DMC",
    "Miami DMC operations desk",
    "Opa-locka airport hangar 5",
    "USA corporate travel dispatch",
    "24/7 DMC phone support",
    "luxury ground transportation inquiry"
  ]
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Banner */}
      <section className="relative pt-14 pb-10 sm:pt-16 sm:pb-12 flex flex-col justify-center bg-[#0e1710] border-b border-[#1a3320] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/contact-hero-img.jpg"
            alt="ELMIA DMC Operations Desk and 24/7 Corporate Dispatch"
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
              <span className="text-[#61CE70] font-semibold">Contact Operations</span>
            </nav>

            <div className="max-w-3xl">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-tight mb-3 font-heading">
                Contact ELMIA DMC Operations
              </h1>
              <p className="text-sm sm:text-lg text-white/80 leading-relaxed font-normal">
                Available 24 hours a day, 7 days a week for immediate flight-line staging, emergency schedule changes, and corporate RFP coordination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Cards & Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Col: Contact Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-[#e7ede7] bg-[#f8faf8] p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#1a3822] border-b border-[#e7ede7] pb-4">
                Operational Headquarters
              </h2>

              <div className="space-y-6 text-sm">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#285735] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1a3822]">Physical Base & Office</div>
                    <div className="text-[#555555] mt-1 text-xs leading-relaxed">
                      Miami Opa-locka Executive Airport (OPF)<br />
                      Hangar 5, Suite 128<br />
                      Opa-locka, FL 33054
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-[#285735] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1a3822]">24/7 Operations Desk</div>
                    <a
                      href="tel:+17866777333"
                      className="text-[#285735] hover:underline mt-1 text-xs block font-bold"
                    >
                      +1 (786) 677-7333
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#285735] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1a3822]">Electronic Dispatch & RFPs</div>
                    <a
                      href="mailto:info@elmiadmc.com"
                      className="text-[#555555] hover:text-[#285735] mt-1 text-xs block font-medium"
                    >
                      info@elmiadmc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#285735] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#1a3822]">Dispatch Hours</div>
                    <div className="text-[#555555] mt-1 text-xs">
                      Active 24/7/365 with live human flight-tracking coordinators.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Hubs Card */}
            <div className="rounded-2xl border border-[#b8dfbf] bg-[#eaf4ec] p-6 text-xs text-[#285735] space-y-2 shadow-sm">
              <div className="flex items-center font-bold uppercase tracking-wider text-[#1a3822]">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-[#285735]" />
                Primary Hubs &amp; Nationwide Network
              </div>
              <p className="leading-relaxed text-[#2d5f3b]">
                Headquarters &amp; Airside Staging at Miami Opa-locka (OPF Hangar 5). Active executive ground transportation and event logistics hubs in New York, Chicago, Los Angeles, and nationwide throughout all 50 states.
              </p>
            </div>
          </div>

          {/* Right Col: Interactive Proposal Request Form */}
          <div className="lg:col-span-7">
            <GeneralContactForm 
              title="Send Us a Message"
              subtitle="Use the form below for general inquiries, feedback, or support requests. For VIP and corporate proposals, please use our Request Proposal page."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
