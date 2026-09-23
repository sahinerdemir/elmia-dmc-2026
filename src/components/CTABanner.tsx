import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  title?: string;
  highlight?: string;
  subtitle?: string;
  interest?: string;
}

export default function CTABanner({
  title = "Ready to Architect Your Next",
  highlight = "VIP Experience?",
  subtitle = "From complex multi-vehicle roadshows to exclusive private mansion buyouts, ELMIA’s Opa-locka Hangar 5 dispatch team delivers precision itineraries and comprehensive proposals within 1-2 business days.",
  interest
}: CTABannerProps) {
  const proposalHref = interest 
    ? `/request-proposal?interest=${encodeURIComponent(interest)}` 
    : "/request-proposal";

  return (
    <section className="relative py-24 bg-[#0e1710] overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#285735] opacity-20 rounded-full blur-[100px] transform translate-x-1/3 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#285735] opacity-20 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/2"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight mx-auto flex flex-col items-center justify-center space-y-2">
          <span className="block">{title}</span>
          <span className="block text-[#74b382] leading-tight text-center">{highlight}</span>
        </h2>
        
        <p className="text-[#a0a0a0] text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={proposalHref}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0e1710] font-bold text-sm tracking-wide shadow-xl hover:bg-gray-100 transition-all duration-300"
          >
            Request a Proposal
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <a
            href="tel:+17866777333"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-transparent border border-white/20 text-white font-bold text-sm tracking-wide hover:bg-white/5 transition-all duration-300"
          >
            Call +1 (786) 677-7333
          </a>
        </div>
      </div>
    </section>
  );
}
