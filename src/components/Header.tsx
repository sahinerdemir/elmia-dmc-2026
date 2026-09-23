"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Menu, X, ArrowRight, Plus, Minus, ChevronRight, Mail, MapPin } from "lucide-react";
import { DMC_SERVICES } from "@/data/services";
import { VIP_PROGRAMS } from "@/data/vipPrograms";
import { EXPERIENCES } from "@/data/experiences";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [vipOpen, setVipOpen] = useState(false);
  const [experiencesOpen, setExperiencesOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [fleetOpen, setFleetOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setVipOpen(false);
    setExperiencesOpen(false);
    setEventsOpen(false);
    setFleetOpen(false);
  }

  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !isScrolled && !mobileMenuOpen;

  return (
    <>
      {/* 1. Top Micro Bar (Exact live site replica: elementor-191) */}
      <div className="relative z-50 bg-[#285735] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-normal">
          <div className="flex items-center space-x-6 text-white/90">
            <a
              href="tel:+17866777333"
              className="hover:text-white transition-colors flex items-center font-medium"
            >
              +1 (786) 677-7333
            </a>
            <span className="text-white/40">•</span>
            <a
              href="mailto:info@elmiadmc.com"
              className="hover:text-white transition-colors"
            >
              info@elmiadmc.com
            </a>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-2.5 text-white/90 text-xs">
            <span className="text-white/80 font-medium">Follow us:</span>
            <div className="flex items-center space-x-2">
              <a
                href="https://www.instagram.com/elmiadmc/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#61CE70] transition-colors p-0.5"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@elmiadmc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#61CE70] transition-colors p-0.5"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/elmiadmc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#61CE70] transition-colors p-0.5"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/elmiadmc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#61CE70] transition-colors p-0.5"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@elmiadmc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#61CE70] transition-colors p-0.5"
                aria-label="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.83c0 1.9-.4 3.8-1.52 5.34-1.28 1.76-3.3 2.91-5.46 3.09-2.3.19-4.69-.53-6.43-2.05-1.84-1.6-2.84-3.99-2.7-6.42.14-2.48 1.48-4.78 3.55-6.05 1.58-.97 3.47-1.39 5.31-1.21v4.18c-.89-.25-1.86-.21-2.7.19-.89.43-1.55 1.25-1.78 2.21-.3 1.2.09 2.51.98 3.37.89.87 2.2 1.18 3.41.84 1.05-.3 1.85-1.15 2.1-2.2.16-.67.19-1.37.19-2.06V.02h.01z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Header (Overlay over Hero with 30px top/bottom padding and 60% black fade, Sticky header untouched) */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-gradient-to-b from-black/65 via-black/30 to-transparent pt-[30px] pb-[30px] text-white"
            : isScrolled
            ? "bg-white shadow-md py-3 border-b border-gray-100 text-[#222222]"
            : "bg-white py-4 border-b border-gray-100 shadow-[0px_10px_15px_0px_rgba(0,0,0,0.03)] text-[#222222]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 flex items-center justify-between">
          {/* Authentic Logo (White logo on dark hero overlay, default brand colors on white/scrolled) */}
          <Link href="/" className="flex items-center">
            <div className="relative h-11 w-48 sm:w-52">
              {/* White Logo for transparent/dark hero banner */}
              <Image
                src="/images/elmia-dmc-logo-white.png"
                alt="ELMIA DMC - Destination Management Company"
                fill
                priority
                unoptimized
                className={`object-contain object-left transition-opacity duration-300 ${
                  isTransparent && !mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
              {/* Default Emerald Green Logo for light background / scrolled state / mobile menu */}
              <Image
                src="/images/elmia-dmc-logo.png"
                alt="ELMIA DMC - Destination Management Company"
                fill
                priority
                unoptimized
                className={`object-contain object-left transition-opacity duration-300 ${
                  isTransparent && !mobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />
            </div>
          </Link>

          {/* Desktop Nav Menu */}
          <nav className="hidden lg:flex items-center space-x-7 text-[17px] font-medium font-heading">
            <Link
              href="/about"
              className={`transition-colors py-2 ${
                isTransparent
                  ? "text-white/85 hover:text-white"
                  : pathname === "/about"
                  ? "text-[#285735] font-semibold"
                  : "text-[#333333] hover:text-[#285735]"
              }`}
            >
              Company
            </Link>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className={`flex items-center py-2 transition-colors ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : pathname.startsWith("/services")
                    ? "text-[#285735] font-semibold"
                    : "text-[#333333] hover:text-[#285735]"
                }`}
              >
                Services
              </Link>

              {servicesOpen && (
                <div className="absolute top-full left-0 w-84 pt-2 z-50">
                  <div className="rounded-xl shadow-2xl p-2 border border-gray-100 bg-white text-[#333333]">
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#285735] border-b border-gray-100 mb-1">
                      Our DMC Solutions
                    </div>
                    {DMC_SERVICES.map((s) => {
                      const isActive = pathname === `/services/${s.slug}`;
                      return (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-[#eaf4ec] text-[#285735] font-semibold"
                              : "text-[#444444] hover:bg-[#f4f7f4] hover:text-[#285735]"
                          }`}
                        >
                          <span className="truncate pr-2">{s.title}</span>
                          {isActive && <span className="text-[#285735] font-bold">→</span>}
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/services"
                        className="flex items-center justify-between px-3 py-2 text-xs text-[#285735] font-semibold hover:underline"
                      >
                        <span>View All Services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* VIP Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setVipOpen(true)}
              onMouseLeave={() => setVipOpen(false)}
            >
              <Link
                href="/vip-programs"
                className={`flex items-center py-2 transition-colors ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : pathname.startsWith("/vip-programs")
                    ? "text-[#285735] font-semibold"
                    : "text-[#333333] hover:text-[#285735]"
                }`}
              >
                VIP Programs
              </Link>

              {vipOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="rounded-xl shadow-2xl p-2 border border-gray-100 bg-white text-[#333333]">
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#285735] border-b border-gray-100 mb-1">
                      Concierge Programs
                    </div>
                    {VIP_PROGRAMS.map((p) => {
                      const isActive = pathname === `/vip-programs/${p.slug}`;
                      return (
                        <Link
                          key={p.slug}
                          href={`/vip-programs/${p.slug}`}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-[#eaf4ec] text-[#285735] font-semibold"
                              : "text-[#444444] hover:bg-[#f4f7f4] hover:text-[#285735]"
                          }`}
                        >
                          <span className="truncate pr-2">{p.title}</span>
                          {isActive && <span className="text-[#285735] font-bold">→</span>}
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/vip-programs"
                        className="flex items-center justify-between px-3 py-2 text-xs text-[#285735] font-semibold hover:underline"
                      >
                        <span>View All Programs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Experiences Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setExperiencesOpen(true)}
              onMouseLeave={() => setExperiencesOpen(false)}
            >
              <Link
                href="/experiences"
                className={`flex items-center py-2 transition-colors ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : pathname.startsWith("/experiences")
                    ? "text-[#285735] font-semibold"
                    : "text-[#333333] hover:text-[#285735]"
                }`}
              >
                Experiences
              </Link>

              {experiencesOpen && (
                <div className="absolute top-full left-0 w-80 pt-2 z-50">
                  <div className="rounded-xl shadow-2xl p-2 border border-gray-100 bg-white text-[#333333]">
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#285735] border-b border-gray-100 mb-1">
                      Curated Tours
                    </div>
                    {EXPERIENCES.map((e) => {
                      const isActive = pathname === `/experiences/${e.slug}`;
                      return (
                        <Link
                          key={e.slug}
                          href={`/experiences/${e.slug}`}
                          className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-[#eaf4ec] text-[#285735] font-semibold"
                              : "text-[#444444] hover:bg-[#f4f7f4] hover:text-[#285735]"
                          }`}
                        >
                          <span className="truncate pr-2">{e.title}</span>
                          {isActive && <span className="text-[#285735] font-bold">→</span>}
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/experiences"
                        className="flex items-center justify-between px-3 py-2 text-xs text-[#285735] font-semibold hover:underline"
                      >
                        <span>View All Experiences</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Fleet Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setFleetOpen(true)}
              onMouseLeave={() => setFleetOpen(false)}
            >
              <Link
                href="/fleet"
                className={`flex items-center py-2 transition-colors ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : pathname === "/fleet"
                    ? "text-[#285735] font-semibold"
                    : "text-[#333333] hover:text-[#285735]"
                }`}
              >
                Fleet
              </Link>

              {fleetOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 z-50">
                  <div className="rounded-xl shadow-2xl p-2 border border-gray-100 bg-white text-[#333333]">
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#285735] border-b border-gray-100 mb-1">
                      Our Vehicles
                    </div>
                    {[
                      { title: "Executive Black Car Fleet", id: "executive-black-car-fleet" },
                      { title: "VIP Sprinter Fleet", id: "sprinter-executive" },
                      { title: "Private Jet Charters", id: "private-aviation-fleet" },
                      { title: "Luxury Yacht Charters", id: "luxury-yachts" }
                    ].map((item) => (
                      <Link
                        key={item.id}
                        href={`/fleet#${item.id}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all text-[#444444] hover:bg-[#f4f7f4] hover:text-[#285735]"
                      >
                        <span className="truncate pr-2">{item.title}</span>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/fleet"
                        className="flex items-center justify-between px-3 py-2 text-xs text-[#285735] font-semibold hover:underline"
                      >
                        <span>View Entire Fleet</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Events Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setEventsOpen(true)}
              onMouseLeave={() => setEventsOpen(false)}
            >
              <Link
                href="/events"
                className={`flex items-center py-2 transition-colors ${
                  isTransparent
                    ? "text-white/85 hover:text-white"
                    : pathname.startsWith("/events")
                    ? "text-[#285735] font-semibold"
                    : "text-[#333333] hover:text-[#285735]"
                }`}
              >
                Events
              </Link>

              {eventsOpen && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="rounded-xl shadow-2xl p-2 border border-gray-100 bg-white text-[#333333]">
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#285735] border-b border-gray-100 mb-1">
                      Priority Cities
                    </div>
                    {["Miami", "New York", "Chicago", "Los Angeles", "Las Vegas"].map((city) => (
                      <Link
                        key={city}
                        href={`/events?city=${encodeURIComponent(city)}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all text-[#444444] hover:bg-[#f4f7f4] hover:text-[#285735]"
                      >
                        <span className="truncate pr-2">{city}</span>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <Link
                        href="/events"
                        className="flex items-center justify-between px-3 py-2 text-xs text-[#285735] font-semibold hover:underline"
                      >
                        <span>Nationwide (All)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className={`transition-colors py-2 ${
                isTransparent
                  ? "text-white/85 hover:text-white"
                  : pathname === "/contact"
                  ? "text-[#285735] font-semibold"
                  : "text-[#333333] hover:text-[#285735]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/request-proposal"
              className={`inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                isTransparent
                  ? "text-white bg-[#285735] hover:bg-[#1e4329] border border-white/20 shadow-lg shadow-black/20"
                  : "text-white bg-[#285735] hover:bg-[#1e4329] shadow-md shadow-[#285735]/20 hover:shadow-[#285735]/40"
              }`}
            >
              Request Proposal
              <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link
              href="/request-proposal"
              className={`text-[12px] font-bold tracking-wide uppercase transition-colors px-1 ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-[#285735] hover:text-[#1e4329]"
              }`}
            >
              Request a Proposal
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none transition-colors ${
                isTransparent
                  ? "text-white hover:text-white/80"
                  : "text-gray-700 hover:text-[#285735]"
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#f4f7f4] backdrop-blur-xl pt-24 px-5 sm:px-8 overflow-y-auto pb-16">
          <div className="flex flex-col space-y-[5px] max-w-lg mx-auto font-heading">
            {/* Primary Link: Company */}
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3.5 rounded-xl text-lg font-semibold transition-all flex items-center justify-between bg-white ${
                pathname === "/about"
                  ? "text-[#285735]"
                  : "text-[#1a3822] hover:bg-white/80"
              }`}
            >
              <span>Company</span>
              <ChevronRight className={`w-4 h-4 ${pathname === "/about" ? "text-[#285735]" : "text-gray-400"}`} />
            </Link>

            {/* Accordion: Our Services */}
            <div className="rounded-xl bg-white overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setServicesOpen(!servicesOpen)}
                className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                aria-expanded={servicesOpen}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg font-semibold text-[#1a3822]">
                    Our Services
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#285735]/10 text-[#285735]">
                    {DMC_SERVICES.length}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    servicesOpen ? "bg-[#285735] text-white shadow-sm" : "bg-[#eaf4ec] text-[#285735]"
                  }`}
                >
                  {servicesOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {servicesOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-[#edf2ed] flex flex-col space-y-1">
                  {DMC_SERVICES.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        pathname === `/services/${s.slug}`
                          ? "bg-[#285735] text-white font-medium shadow-sm"
                          : "text-[#444444] hover:text-[#285735] hover:bg-[#f4f7f4]"
                      }`}
                    >
                      <span className="truncate pr-2">{s.title}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          pathname === `/services/${s.slug}` ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-xs font-bold text-[#285735] hover:text-[#1e4329] flex items-center gap-1 transition-colors mt-1"
                  >
                    <span>Explore All Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: VIP Programs */}
            <div className="rounded-xl bg-white overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setVipOpen(!vipOpen)}
                className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                aria-expanded={vipOpen}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg font-semibold text-[#1a3822]">
                    VIP Programs
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#285735]/10 text-[#285735]">
                    {VIP_PROGRAMS.length}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    vipOpen ? "bg-[#285735] text-white shadow-sm" : "bg-[#eaf4ec] text-[#285735]"
                  }`}
                >
                  {vipOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {vipOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-[#edf2ed] flex flex-col space-y-1">
                  {VIP_PROGRAMS.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/vip-programs/${p.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        pathname === `/vip-programs/${p.slug}`
                          ? "bg-[#285735] text-white font-medium shadow-sm"
                          : "text-[#444444] hover:text-[#285735] hover:bg-[#f4f7f4]"
                      }`}
                    >
                      <span className="truncate pr-2">{p.title}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          pathname === `/vip-programs/${p.slug}` ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </Link>
                  ))}
                  <Link
                    href="/vip-programs"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-xs font-bold text-[#285735] hover:text-[#1e4329] flex items-center gap-1 transition-colors mt-1"
                  >
                    <span>Explore All VIP Programs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Experiences & Tours */}
            <div className="rounded-xl bg-white overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setExperiencesOpen(!experiencesOpen)}
                className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                aria-expanded={experiencesOpen}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg font-semibold text-[#1a3822]">
                    Experiences &amp; Tours
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#285735]/10 text-[#285735]">
                    {EXPERIENCES.length}
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    experiencesOpen ? "bg-[#285735] text-white shadow-sm" : "bg-[#eaf4ec] text-[#285735]"
                  }`}
                >
                  {experiencesOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {experiencesOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-[#edf2ed] flex flex-col space-y-1">
                  {EXPERIENCES.map((e) => (
                    <Link
                      key={e.slug}
                      href={`/experiences/${e.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        pathname === `/experiences/${e.slug}`
                          ? "bg-[#285735] text-white font-medium shadow-sm"
                          : "text-[#444444] hover:text-[#285735] hover:bg-[#f4f7f4]"
                      }`}
                    >
                      <span className="truncate pr-2">{e.title}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          pathname === `/experiences/${e.slug}` ? "text-white" : "text-gray-400"
                        }`}
                      />
                    </Link>
                  ))}
                  <Link
                    href="/experiences"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-xs font-bold text-[#285735] hover:text-[#1e4329] flex items-center gap-1 transition-colors mt-1"
                  >
                    <span>Explore All Experiences</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Fleet */}
            <div className="rounded-xl bg-white overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setFleetOpen(!fleetOpen)}
                className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                aria-expanded={fleetOpen}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg font-semibold text-[#1a3822]">
                    Our Fleet
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    fleetOpen ? "bg-[#285735] text-white shadow-sm" : "bg-[#eaf4ec] text-[#285735]"
                  }`}
                >
                  {fleetOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {fleetOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-[#edf2ed] flex flex-col space-y-1">
                  {[
                    { title: "Executive Black Car Fleet", id: "executive-black-car-fleet" },
                    { title: "VIP Sprinter Fleet", id: "sprinter-executive" },
                    { title: "Private Jet Charters", id: "private-aviation-fleet" },
                    { title: "Luxury Yacht Charters", id: "luxury-yachts" }
                  ].map((item) => (
                    <Link
                      key={item.id}
                      href={`/fleet#${item.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between text-[#444444] hover:text-[#285735] hover:bg-[#f4f7f4]"
                    >
                      <span className="truncate pr-2">{item.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    </Link>
                  ))}
                  <Link
                    href="/fleet"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-xs font-bold text-[#285735] hover:text-[#1e4329] flex items-center gap-1 transition-colors mt-1"
                  >
                    <span>View Entire Fleet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Events */}
            <div className="rounded-xl bg-white overflow-hidden transition-all">
              <button
                type="button"
                onClick={() => setEventsOpen(!eventsOpen)}
                className="w-full flex items-center justify-between p-3.5 text-left transition-colors hover:bg-gray-50/50 cursor-pointer"
                aria-expanded={eventsOpen}
              >
                <div className="flex items-center space-x-2.5">
                  <span className="text-lg font-semibold text-[#1a3822]">
                    Events
                  </span>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                    eventsOpen ? "bg-[#285735] text-white shadow-sm" : "bg-[#eaf4ec] text-[#285735]"
                  }`}
                >
                  {eventsOpen ? (
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {eventsOpen && (
                <div className="px-3 pb-3 pt-1 border-t border-[#edf2ed] flex flex-col space-y-1">
                  {["Miami", "New York", "Chicago", "Los Angeles", "Las Vegas"].map((city) => (
                    <Link
                      key={city}
                      href={`/events?city=${encodeURIComponent(city)}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-2 px-3 rounded-lg text-sm transition-colors flex items-center justify-between text-[#444444] hover:text-[#285735] hover:bg-[#f4f7f4]"
                    >
                      <span className="truncate pr-2">{city}</span>
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    </Link>
                  ))}
                  <Link
                    href="/events"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 rounded-lg text-xs font-bold text-[#285735] hover:text-[#1e4329] flex items-center gap-1 transition-colors mt-1"
                  >
                    <span>Nationwide (All)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>

            {/* Primary Link: Contact Us */}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className={`p-3.5 rounded-xl text-lg font-semibold transition-all flex items-center justify-between bg-white ${
                pathname === "/contact"
                  ? "text-[#285735]"
                  : "text-[#1a3822] hover:bg-white/80"
              }`}
            >
              <span>Contact Us</span>
              <ChevronRight className={`w-4 h-4 ${pathname === "/contact" ? "text-[#285735]" : "text-gray-400"}`} />
            </Link>

            {/* Footer Contact Info */}
            <div className="pt-6 space-y-3">
              <a
                href="tel:+17866777333"
                className="w-full flex items-center justify-center p-3.5 rounded-xl bg-[#285735] hover:bg-[#1e4329] text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
              >
                <Phone className="w-4 h-4 mr-2 text-[#61CE70]" />
                <span>Call Operations: +1 (786) 677-7333</span>
              </a>

              {/* Follow Us Social Media Links */}
              <div className="p-3 rounded-xl bg-white flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1a3822] tracking-wide">
                  Follow us:
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.instagram.com/elmiadmc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/company/elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
                    aria-label="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01v8.83c0 1.9-.4 3.8-1.52 5.34-1.28 1.76-3.3 2.91-5.46 3.09-2.3.19-4.69-.53-6.43-2.05-1.84-1.6-2.84-3.99-2.7-6.42.14-2.48 1.48-4.78 3.55-6.05 1.58-.97 3.47-1.39 5.31-1.21v4.18c-.89-.25-1.86-.21-2.7.19-.89.43-1.55 1.25-1.78 2.21-.3 1.2.09 2.51.98 3.37.89.87 2.2 1.18 3.41.84 1.05-.3 1.85-1.15 2.1-2.2.16-.67.19-1.37.19-2.06V.02h.01z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2 px-1 pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#285735]" />
                  OPF Hangar 5, Miami, FL
                </span>
                <a
                  href="mailto:info@elmiadmc.com"
                  className="flex items-center gap-1.5 hover:text-[#285735] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#285735]" />
                  info@elmiadmc.com
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
