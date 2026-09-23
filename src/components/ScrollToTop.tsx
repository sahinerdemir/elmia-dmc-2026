"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      }
      if (scrollTop > 120) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Scroll to Top button (Appears smoothly above WhatsApp on scroll) */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer ${
          visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-90 pointer-events-none"
        } bg-[#0e1710] hover:bg-[#1b3d24] text-white border border-white/20 hover:scale-105 relative group`}
      >
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 46 46">
          <circle
            cx="23"
            cy="23"
            r={radius}
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="2.5"
            fill="none"
          />
          <circle
            cx="23"
            cy="23"
            r={radius}
            stroke="#61CE70"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100"
          />
        </svg>
        <ArrowUp className="w-4 h-4 text-white relative z-10 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* WhatsApp Floating Chat Button (Permanently visible) */}
      <a
        href="https://wa.me/17866777333?text=Hello%20ELMIA%20DMC%20Team%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ELMIA DMC on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 relative group cursor-pointer"
      >
        {/* Subtle Online Pulse Indicator */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#20ba59] border-2 border-white"></span>
        </span>

        {/* WhatsApp Official Vector Icon */}
        <svg className="w-6 h-6 fill-white drop-shadow-sm" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.19.52-1.08 1-1.52 1.06-.41.06-.94.08-2.69-.64-2.1-1.07-3.48-3.23-3.59-3.37-.1-.15-.86-1.14-.86-2.18s.54-1.55.73-1.76c.19-.21.42-.26.56-.26.14 0 .28 0 .4.01.13.01.3-.05.47.37.18.44.61 1.5.67 1.61.05.11.09.24.01.38-.07.15-.11.23-.22.36-.11.13-.23.28-.33.38-.11.11-.23.23-.1.45.13.22.56.92 1.21 1.5 1.05.94 1.78 1.23 2.03 1.35.25.12.4.11.55-.06.15-.17.65-.76.82-.97.17-.21.34-.18.57-.1.23.08 1.48.7 1.73.83.25.13.42.2.48.3.06.11.06.63-.13 1.15" />
        </svg>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#0e1710] text-white text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg border border-white/10">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}
