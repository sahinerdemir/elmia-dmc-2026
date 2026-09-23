import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Users, Briefcase, ArrowRight, ShieldCheck } from "lucide-react";
import { FLEET_VEHICLES } from "@/data/fleet";

export default function FleetSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#285735] mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 text-[#285735] mr-1.5" />
              <span>OUR FLEET</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              Executive Chauffeur Vehicles
            </h2>
            <p className="mt-2 text-base text-[#666666] max-w-2xl">
              Impeccably maintained late-model luxury SUVs, executive sedans, and executive jet Sprinters operated by commercially vetted chauffeurs.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/fleet"
              className="inline-flex items-center text-xs font-bold text-[#285735] hover:text-[#1e4329] transition-colors"
            >
              <span>View Full Fleet Specifications</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FLEET_VEHICLES.slice(0, 3).map((v) => (
            <div
              key={v.id}
              className="rounded-2xl border border-[#e7ede7] bg-white overflow-hidden hover:border-[#285735] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                <Image
                  src={v.image}
                  alt={`${v.name} - ELMIA Luxury Executive Fleet`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 text-[11px] font-bold text-[#285735] shadow-sm">
                    {v.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-[#222222] group-hover:text-[#285735] transition-colors">
                    {v.name}
                  </h3>

                  <div className="flex items-center space-x-4 my-2 text-xs text-[#666666]">
                    <span className="flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                      {v.passengers} Pax
                    </span>
                    <span className="flex items-center">
                      <Briefcase className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                      {v.luggage} Bags
                    </span>
                  </div>

                  <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                    {v.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap gap-1.5">
                    {v.features.slice(0, 3).map((f, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#f4f7f4] text-[10px] text-[#285735] font-medium"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/request-proposal?interest=${encodeURIComponent(v.name)}`}
                    className="text-xs font-bold text-[#285735] hover:underline inline-flex items-center"
                  >
                    <span>Reserve for Delegation</span>
                    <ArrowRight className="ml-1 w-3.5 h-3.5" />
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
