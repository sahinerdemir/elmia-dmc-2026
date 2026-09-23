"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  Sparkles,
  Layers
} from "lucide-react";
import { MAJOR_EVENTS, MajorEvent } from "@/data/events";

function EventsGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCity = searchParams.get("city") || "All";
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);

  useEffect(() => {
    const city = searchParams.get("city");
    if (city && city !== selectedCity) {
      setSelectedCity(city);
    }
  }, [searchParams]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    router.push(`/events${city === "All" ? "" : `?city=${encodeURIComponent(city)}`}`, { scroll: false });
  };

  const cities = ["All", "Miami", "New York", "Chicago", "Los Angeles", "Las Vegas"];

  const filteredEvents = selectedCity === "All" 
    ? MAJOR_EVENTS 
    : MAJOR_EVENTS.filter((e) => e.city === selectedCity);

  return (
    <div>
      {/* Glassmorphism City Filter (Moved up into Hero visually using negative margin) */}
      <div className="relative -mt-10 sm:-mt-12 mx-auto mb-12 sm:mb-16 flex justify-center w-full px-2 sm:px-0">
        <div className="flex items-center flex-nowrap overflow-x-auto no-scrollbar max-w-full gap-2 p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl scroll-smooth">
          {cities.map((city) => {
            const count = city === "All" 
              ? MAJOR_EVENTS.length 
              : MAJOR_EVENTS.filter(e => e.city === city).length;
            const isActive = selectedCity === city;

            return (
              <button
                key={city}
                onClick={() => handleCityChange(city)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1.5 sm:space-x-2 shrink-0 whitespace-nowrap active:scale-95 ${
                  isActive
                    ? "bg-[#74b382] text-[#0c1810] shadow-lg scale-105"
                    : "bg-transparent hover:bg-white/10 text-white border border-transparent hover:border-white/20"
                }`}
              >
                <span>{city}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-[#0c1810]/20 text-[#0c1810]" : "bg-white/10 text-white/70"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Grid of 20 Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredEvents.map((event) => (
          <article
            key={event.slug}
            className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-gray-200/80 hover:border-gray-400/80 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            {/* Top Media Frame */}
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-900">
                <Image
                  src={event.heroImage}
                  alt={`${event.title} - ${event.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* City & Category Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-black/65 backdrop-blur-md text-white border border-white/15">
                    {event.city}
                  </span>
                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-gray-900 shadow-sm">
                    {event.category}
                  </span>
                </div>

              </div>

              {/* Text Content */}
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#285735] mr-1.5 shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#285735] transition-colors leading-snug font-heading mb-2.5">
                  <Link href={`/events/${event.slug}`}>
                    {event.title}
                  </Link>
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                  {event.overview}
                </p>

                {/* Highlights teaser */}
                <div className="border-t border-gray-100 pt-3 space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-gray-400 block mb-1">
                    Event Highlights
                  </span>
                  {event.highlights.slice(0, 2).map((h, i) => (
                    <div key={i} className="text-xs text-gray-700 flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#285735] mr-2 mt-1.5 shrink-0" />
                      <span className="line-clamp-1 font-medium">{h.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between text-xs">
              <a
                href={event.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 transition-colors flex items-center font-medium"
              >
                <span>Official Site</span>
                <ExternalLink className="w-3 h-3 ml-1 text-gray-400" />
              </a>

              <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center font-bold text-[#285735] hover:text-[#1b3d24] group-hover:translate-x-0.5 transition-all"
              >
                <span>Full Guide &amp; Details</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function EventsClient() {
  return (
    <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center text-gray-400">Loading events...</div>}>
      <EventsGrid />
    </Suspense>
  );
}
