import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { EXPERIENCES } from "@/data/experiences";

export default function ExperiencesFeaturedSection() {
  return (
    <section className="py-24 bg-[#f8faf8] border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#285735] mb-2">
              TOURS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#222222] tracking-tight">
              Experiences
            </h2>
            <p className="mt-2 text-base text-[#666666] max-w-2xl">
              From the high-stakes luxury of Eagles in Las Vegas to coast-to-coast grand expeditions and Florida coastal odysseys.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <Link
              href="/experiences"
              className="inline-flex items-center text-xs font-bold text-[#285735] hover:text-[#1e4329] transition-colors"
            >
              <span>Explore All Tour Itineraries</span>
              <ArrowRight className="ml-1 w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Featured Tours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {EXPERIENCES.slice(0, 3).map((exp) => (
            <div
              key={exp.slug}
              className="rounded-2xl border border-[#e7ede7] bg-white overflow-hidden hover:border-[#285735] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <Image
                  src={exp.heroImage}
                  alt={`${exp.title} - Curated USA Tour Experience by ELMIA DMC`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-[#285735] shadow-sm">
                    {exp.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center space-x-4 text-xs text-[#666666] mb-2">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                      {exp.destination}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#222222] group-hover:text-[#285735] transition-colors line-clamp-2 leading-snug">
                    <Link href={`/experiences/${exp.slug}`}>
                      {exp.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm text-[#555555] mt-2 line-clamp-2 leading-relaxed">
                    {exp.highlights.slice(0, 2).join(" • ")}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/experiences/${exp.slug}`}
                    className="inline-flex items-center text-xs font-bold text-[#285735] hover:text-[#1e4329] transition-colors"
                  >
                    <span>View Day-by-Day Itinerary</span>
                    <ArrowRight className="ml-1.5 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
