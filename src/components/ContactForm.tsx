"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Phone, Clock, ChevronDown } from "lucide-react";
import { DMC_SERVICES } from "@/data/services";

interface ContactFormProps {
  initialService?: string;
  title?: string;
  subtitle?: string;
}

export default function ContactForm({
  initialService = "",
  title = "Request a Confidential B2B Proposal",
  subtitle = "Our Opa-locka Hangar 5 dispatch team delivers detailed proposals and vehicle manifests within 1-2 business days."
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: initialService || DMC_SERVICES[0].title,
    groupSize: "1-3 VIPs",
    dates: "",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formLoadedAt] = useState<number>(() => Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: "proposal",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          groupSize: formData.groupSize,
          dates: formData.dates,
          notes: formData.notes,
          hp_fax_number: honeypot,
          _ts: formLoadedAt
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Submission could not be processed. Please try again or call operations.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or call operations directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e5ece5] bg-white p-8 sm:p-12 shadow-xl">
      {(title || subtitle) && (
        <div className="max-w-3xl mx-auto text-center mb-10">
          {title && (
            <h3 className="text-2xl sm:text-3xl font-bold text-[#285735] tracking-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-[#666666]">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {submitted ? (
        <div className="max-w-md mx-auto py-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#eaf4ec] border border-[#285735] flex items-center justify-center mx-auto text-[#285735]">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="text-2xl font-bold text-[#222222]">Proposal Request Received</h4>
          <p className="text-sm text-[#555555]">
            Thank you, <span className="text-[#285735] font-semibold">{formData.name}</span>. An ELMIA Senior Operations Director will contact you within 1-2 business days with customized routing and rates.
          </p>
          <div className="pt-4">
            <a
              href="tel:+17866777333"
              className="inline-flex items-center text-xs font-semibold text-[#285735] hover:underline"
            >
              <Phone className="w-3.5 h-3.5 mr-1" />
              Need immediate dispatch? Call +1 (786) 677-7333
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          {/* Invisible honeypot trap for automated spam bots */}
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="hp_fax_contact">Do not fill this field</label>
            <input
              type="text"
              id="hp_fax_contact"
              name="hp_fax_number"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Marcus Vance"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Corporate Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. mvance@corporation.com"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Company or Delegation Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Global Holdings"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Service Required *
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 pr-10 appearance-none rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                >
                  {DMC_SERVICES.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Signature Experiences">Signature Experiences & Tour Packages</option>
                  <option value="Private Aviation & Yacht Charter">Private Aviation & Yacht Charters</option>
                  <option value="Multiple Integrated Services">Multiple Integrated DMC Services</option>
                  <option value="Other">Other (Please specify in notes)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Estimated Group Size
              </label>
              <div className="relative">
                <select
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  className="w-full px-4 py-3 pr-10 appearance-none rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
                >
                  <option value="1-3 VIPs">1-3 VIPs (Mercedes S-Class)</option>
                  <option value="4-6 VIPs">4-6 VIPs (Cadillac Escalade ESV)</option>
                  <option value="7-14 Guests">7-14 Guests (Mercedes Sprinter Executive)</option>
                  <option value="15-35 Guests">15-35 Guests (Executive Mini Coach)</option>
                  <option value="36-100+ Attendees">36-100+ Attendees (Multiple Coaches)</option>
                  <option value="100-500+ Large Summit">100-500+ Large Summit Delegation</option>
                  <option value="Other">Other (Please specify in notes)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
              Proposed Dates & Itinerary Scope
            </label>
            <input
              type="text"
              value={formData.dates}
              onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
              placeholder="e.g. October 14-18, 2026 | Miami Beach & Brickell"
              className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
              Specific Requirements or Notes
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Provide flight details, FBO preferences, special protocol needs, or venue requirements..."
              className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
            ></textarea>
          </div>

          {errorMessage && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center text-xs text-[#666666] space-x-2">
              <Clock className="w-4 h-4 text-[#285735]" />
              <span>Direct Dispatch Guarantee: Response within 1-2 business days</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-white bg-[#285735] hover:bg-[#1e4329] shadow-lg shadow-[#285735]/25 hover:shadow-[#285735]/40 transition-all duration-200 flex items-center justify-center cursor-pointer ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              <Send className={`w-4 h-4 mr-2 ${isSubmitting ? "animate-spin" : ""}`} />
              {isSubmitting ? "Submitting..." : "Submit RFP Request"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
