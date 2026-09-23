import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Shield, CheckCircle2, ArrowRight } from "lucide-react";
import { DMC_SERVICES } from "@/data/services";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5] text-[#4b5563] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1 & 2: Brand Info & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm text-[#4b5563] leading-relaxed pr-6">
              ELMIA is a premier Destination Management Company (DMC) headquartered at Miami Opa-locka Executive Airport (Hangar 5). Delivering executive chauffeured transit, high-volume summit logistics, and bespoke VIP experiences across Miami, New York, Chicago, Los Angeles, and nationwide across the United States.
            </p>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#f2f7f3] border border-[#d6e5d8] text-xs text-[#285735] font-medium">
              <Shield className="w-3.5 h-3.5 text-[#285735] shrink-0" />
              <span>30+ Years of Global DMC Excellence (Est. 1994)</span>
            </div>

            <div className="space-y-2.5 pt-2 text-xs text-[#4b5563]">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#285735] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/vmuJrmMSSH8Efbvx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#285735] transition-colors"
                >
                  Miami Opa-locka Executive Airport (OPF), Hangar 5, Suite 128, Opa-locka, FL 33054
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#285735] shrink-0" />
                <a href="tel:+17866777333" className="hover:text-[#285735] transition-colors font-medium">
                  +1 (786) 677-7333
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#285735] shrink-0" />
                <a href="mailto:info@elmiadmc.com" className="hover:text-[#285735] transition-colors font-medium">
                  info@elmiadmc.com
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-[#112015] block mb-2">
                  Follow us:
                </span>
                <div className="flex items-center space-x-2">
                  <a
                    href="https://www.instagram.com/elmiadmc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-md bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@elmiadmc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-md bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
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
                    className="w-7 h-7 rounded-md bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
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
                    className="w-7 h-7 rounded-md bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
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
                    className="w-7 h-7 rounded-md bg-[#f4f7f4] hover:bg-[#285735] text-[#285735] hover:text-white flex items-center justify-center transition-all"
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

          {/* Col 3: DMC Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#112015] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4b5563]">
              <li>
                <Link
                  href="/services"
                  className="font-semibold text-[#285735] hover:underline flex items-center"
                >
                  <span>All DMC Services</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </li>
              {DMC_SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-[#285735] transition-colors"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Experiences & VIP Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#112015] mb-4">
              Experiences & VIP
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4b5563]">
              <li>
                <Link 
                  href="/experiences" 
                  className="font-semibold text-[#285735] hover:underline flex items-center"
                >
                  <span>All Signature Tours</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link 
                  href="/vip-programs" 
                  className="font-semibold text-[#285735] hover:underline flex items-center"
                >
                  <span>VIP Lifestyle Programs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link href="/experiences/american-legends" className="hover:text-[#285735] transition-colors">
                  American Legends
                </Link>
              </li>
              <li>
                <Link href="/experiences/pearls-of-america" className="hover:text-[#285735] transition-colors">
                  Pearls of America
                </Link>
              </li>
              <li>
                <Link href="/experiences/florida-dream-miami-orlando" className="hover:text-[#285735] transition-colors">
                  Florida Dream (Miami & Orlando)
                </Link>
              </li>
              <li>
                <Link href="/experiences/coast-to-coast-america" className="hover:text-[#285735] transition-colors">
                  Coast to Coast America
                </Link>
              </li>
              <li>
                <Link href="/experiences/western-usa-tour" className="hover:text-[#285735] transition-colors">
                  Western USA Tour
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company, Fleet & Conversion */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#112015] mb-4">
              ELMIA DMC
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4b5563]">
              <li>
                <Link href="/about" className="hover:text-[#285735] transition-colors">
                  Company
                </Link>
              </li>
              <li>
                <Link href="/fleet" className="hover:text-[#285735] transition-colors">
                  Executive Fleet
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#285735] transition-colors font-semibold text-[#285735]">
                  Major Events
                </Link>
              </li>
              <li>
                <Link href="/credentials" className="hover:text-[#285735] transition-colors">
                  Operational Credentials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#285735] transition-colors">
                  Contact Operations Desk
                </Link>
              </li>
            </ul>

            <div className="mt-6 p-3 rounded-lg bg-[#f7faf8] border border-[#e2ede4] space-y-1.5 text-[11px] text-[#4b5563]">
              <div className="flex items-center text-[#285735] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-[#285735]" />
                Licensed Commercial Carrier
              </div>
              <p className="text-[10px] text-[#6b7280]">
                US Department of Transportation & FBO Airside Credentials.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Hubs & Strategic Scope */}
        <div className="py-4 border-t border-[#eaeaea] flex flex-wrap items-center justify-between gap-3 text-xs text-[#555555]">
          <div className="flex items-center space-x-2 font-semibold text-[#1a3822]">
            <span className="w-2 h-2 rounded-full bg-[#285735]" />
            <span>Primary Operational Hubs:</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-medium text-[#444444]">
            <span>Miami (HQ &amp; OPF Hangar 5)</span>
            <span>•</span>
            <span>New York</span>
            <span>•</span>
            <span>Chicago</span>
            <span>•</span>
            <span>Los Angeles</span>
            <span>•</span>
            <span className="text-[#285735] font-bold">Nationwide Coverage Across All 50 States</span>
          </div>
        </div>

        {/* Bottom copyright & quick strategic navigation */}
        <div className="pt-6 border-t border-[#eaeaea] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6b7280] space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} Elegant Miami Adventures LLC (ELMIA DMC). All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 font-medium">
            <Link href="/" className="hover:text-[#285735] transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-[#285735] transition-colors">
              About
            </Link>
            <Link href="/services" className="hover:text-[#285735] transition-colors">
              Services
            </Link>
            <Link href="/experiences" className="hover:text-[#285735] transition-colors">
              Experiences
            </Link>
            <Link href="/vip-programs" className="hover:text-[#285735] transition-colors">
              VIP Programs
            </Link>
            <Link href="/fleet" className="hover:text-[#285735] transition-colors">
              Fleet
            </Link>
            <Link href="/credentials" className="hover:text-[#285735] transition-colors">
              Credentials
            </Link>
            <Link href="/request-proposal" className="text-[#285735] font-bold hover:underline transition-colors">
              Request Proposal
            </Link>
            <Link href="/contact" className="hover:text-[#285735] transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
