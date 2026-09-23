import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { VIP_PROGRAMS } from "@/data/vipPrograms";

export default function VIPProgramsSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
            PROGRAMS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            VIP Experiences & Luxury Lifestyle
          </h2>
          <p className="mt-3 text-base text-[#666666]">
            Distinct from B2B transportation, our VIP lifestyle concierge division provides private yachts, luxury estate buyouts, and elite Miami access.
          </p>
        </div>

        {/* 4 Distinct White Cards with subtle shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VIP_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="rounded-2xl border border-[#e7ede7] bg-white overflow-hidden hover:border-[#285735] hover:shadow-xl transition-all duration-300 shadow-sm group flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={prog.image}
                  alt={`${prog.title} - ELMIA DMC VIP Program`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#285735] px-3 py-1 rounded-full bg-white/95 shadow-sm">
                    VIP Concierge
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#222222] group-hover:text-[#285735] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-xs text-[#285735] font-semibold mt-1">
                    {prog.subtitle}
                  </p>
                  <p className="text-sm text-[#555555] mt-3 leading-relaxed">
                    {prog.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                    {prog.highlights.slice(0, 3).map((h, i) => (
                      <div key={i} className="flex items-center text-xs text-[#444444]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#285735] mr-2 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(prog.title)}`}
                    className="inline-flex items-center text-xs font-bold text-[#285735] group-hover:translate-x-1 transition-all"
                  >
                    <span>Request Private Inquiry</span>
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
