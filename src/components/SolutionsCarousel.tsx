import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { DMC_SERVICES } from "@/data/services";

export default function SolutionsCarousel() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#f8faf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
            SERVICES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
            Our DMC Solutions
          </h2>
          <p className="mt-3 text-base text-[#666666]">
            Comprehensive destination management, executive chauffeur transportation, airport FBO transfers, and official delegation logistics across Miami, New York, Chicago, Los Angeles, and nationwide.
          </p>
        </div>

        {/* 6 Clean B2B Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DMC_SERVICES.map((s, idx) => (
            <div
              key={s.slug}
              className="group rounded-2xl overflow-hidden bg-white border border-[#e7ede7] shadow-sm hover:shadow-xl hover:border-[#285735] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                <Image
                  src={s.heroImage}
                  alt={`${s.title} - ELMIA DMC Destination Management Solution`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-[#285735] shadow-sm">
                    Solution 0{idx + 1}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#285735] transition-colors leading-snug">
                    <Link href={`/services/${s.slug}`}>
                      {s.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[#666666] mt-3 leading-relaxed line-clamp-3">
                    {s.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex items-center text-xs font-bold text-[#285735] hover:text-[#1e4329] group-hover:translate-x-1 transition-all"
                  >
                    <span>Learn More & RFP</span>
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
