"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CheckCircle2, ChevronDown, Shield, Clock, Lock } from "lucide-react";
import { DMC_SERVICES } from "@/data/services";

function ProposalFormInner() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "Miami",
    service: DMC_SERVICES[0]?.title || "Miami Destination Management",
    groupSize: "1-3 VIPs",
    dates: "",
    notes: ""
  });

  useEffect(() => {
    if (interestParam) {
      setFormData(prev => ({
        ...prev,
        notes: `Interested in: ${interestParam}\n\n${prev.notes}`
      }));
    }
  }, [interestParam]);

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
          city: formData.city,
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
        setErrorMessage(data.error || "Submission could not be processed. Please try again or call our operations desk.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or contact operations directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative rounded-2xl bg-[#101912] border border-[#1f3323] p-6 sm:p-10 shadow-2xl overflow-hidden">
      {submitted ? (
        <div className="relative z-10 py-12 text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-[#18271c] border border-[#27422c] flex items-center justify-center mx-auto text-[#74b382] shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-white font-heading">
            Proposal Request Received
          </h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-[#8ac497] font-semibold">{formData.name}</span>. Your requirements have been logged at our Opa-locka Hangar 5 dispatch desk. An operations director will review your schedule and transmit an itemized proposal within 1-2 business days.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  city: "Miami",
                  service: DMC_SERVICES[0]?.title || "Miami Destination Management",
                  groupSize: "1-3 VIPs",
                  dates: "",
                  notes: ""
                });
              }}
              className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-[#18271c] hover:bg-[#203425] border border-[#28442e] transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {/* Invisible honeypot trap for automated spam crawlers */}
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="hp_fax_prop">Do not fill this field</label>
            <input
              type="text"
              id="hp_fax_prop"
              name="hp_fax_number"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Row 1: Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Full Name <span className="text-[#5fa36d]">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Marcus Sterling"
                className="w-full px-4 py-3.5 rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#18261c] focus:ring-1 focus:ring-[#3d7049]/40 text-white placeholder-gray-500 text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Corporate or Personal Email <span className="text-[#5fa36d]">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="m.sterling@corporate.com"
                className="w-full px-4 py-3.5 rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#18261c] focus:ring-1 focus:ring-[#3d7049]/40 text-white placeholder-gray-500 text-sm transition-all outline-none"
              />
            </div>
          </div>

          {/* Row 2: Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Direct Phone Number <span className="text-[#5fa36d]">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (786) 000-0000"
                className="w-full px-4 py-3.5 rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#18261c] focus:ring-1 focus:ring-[#3d7049]/40 text-white placeholder-gray-500 text-sm transition-all outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Company / Delegation Name
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Apex Global Hospitality"
                className="w-full px-4 py-3.5 rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#18261c] focus:ring-1 focus:ring-[#3d7049]/40 text-white placeholder-gray-500 text-sm transition-all outline-none"
              />
            </div>
          </div>

          {/* Row 3: Destination City & Service Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Destination City <span className="text-[#5fa36d]">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3.5 pr-10 appearance-none rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#101912] focus:ring-1 focus:ring-[#3d7049]/40 text-white text-sm transition-all outline-none cursor-pointer"
                >
                  <option value="Miami" className="bg-[#101912] text-white py-2">Miami &amp; South Florida</option>
                  <option value="New York" className="bg-[#101912] text-white py-2">New York / Tri-State</option>
                  <option value="Chicago" className="bg-[#101912] text-white py-2">Chicago</option>
                  <option value="Los Angeles" className="bg-[#101912] text-white py-2">Los Angeles / SoCal</option>
                  <option value="Nationwide" className="bg-[#101912] text-white py-2">Nationwide / Multiple Cities</option>
                  <option value="International" className="bg-[#101912] text-white py-2">International / Global</option>
                  <option value="Other" className="bg-[#101912] text-white py-2">Other (Please specify in notes)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Service Category <span className="text-[#5fa36d]">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3.5 pr-10 appearance-none rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#101912] focus:ring-1 focus:ring-[#3d7049]/40 text-white text-sm transition-all outline-none cursor-pointer"
                >
                  {DMC_SERVICES.map((s) => (
                    <option key={s.slug} value={s.title} className="bg-[#101912] text-white py-2">
                      {s.title}
                    </option>
                  ))}
                  <option value="Executive Ground Transportation" className="bg-[#101912] text-white py-2">Executive Ground Transportation &amp; Fleet</option>
                  <option value="Private Aviation & Yacht Charter" className="bg-[#101912] text-white py-2">Private Aviation &amp; Yacht Charters</option>
                  <option value="Signature Experiences" className="bg-[#101912] text-white py-2">Signature Experiences &amp; VIP Tours</option>
                  <option value="Multiple Integrated Services" className="bg-[#101912] text-white py-2">Comprehensive Turnkey DMC Services</option>
                  <option value="Other" className="bg-[#101912] text-white py-2">Other (Please specify in notes)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Estimated Group Size & Target Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Estimated Group Size <span className="text-[#5fa36d]">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  className="w-full px-4 py-3.5 pr-10 appearance-none rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#101912] focus:ring-1 focus:ring-[#3d7049]/40 text-white text-sm transition-all outline-none cursor-pointer"
                >
                  <option value="1-3 VIPs" className="bg-[#101912] text-white py-2">1-3 VIPs (Mercedes S-Class / Sedan)</option>
                  <option value="4-6 VIPs" className="bg-[#101912] text-white py-2">4-6 VIPs (Cadillac Escalade ESV / SUV)</option>
                  <option value="7-14 Guests" className="bg-[#101912] text-white py-2">7-14 Guests (Mercedes Sprinter Executive)</option>
                  <option value="15-35 Guests" className="bg-[#101912] text-white py-2">15-35 Guests (Executive Mini Coach)</option>
                  <option value="36-100+ Attendees" className="bg-[#101912] text-white py-2">36-100+ Attendees (Multiple Motorcoaches)</option>
                  <option value="100-500+ Large Summit" className="bg-[#101912] text-white py-2">100-500+ Large Summit Delegation</option>
                  <option value="Aviation/Yacht Only" className="bg-[#101912] text-white py-2">Private Jet / Yacht Charter (Varies)</option>
                  <option value="N/A" className="bg-[#101912] text-white py-2">Not Applicable (Consulting / Event Only)</option>
                  <option value="Other" className="bg-[#101912] text-white py-2">Other (Please specify in notes)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
                Target Dates or Travel Window
              </label>
              <input
                type="text"
                value={formData.dates}
                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                placeholder="e.g. October 12-16, 2026 or Flexible Q4"
                className="w-full px-4 py-3.5 rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#18261c] focus:ring-1 focus:ring-[#3d7049]/40 text-white placeholder-gray-500 text-sm transition-all outline-none"
              />
            </div>
          </div>

          {/* Row 5: Notes & Scope */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2">
              Itinerary Details &amp; Special Instructions
            </label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Provide flight arrivals, venue destinations, special VIP security protocols, or luggage transfer requirements..."
              className="w-full px-4 py-3.5 rounded-xl bg-[#142017] hover:bg-[#18261c] border border-[#223625] focus:border-[#3d7049] focus:bg-[#18261c] focus:ring-1 focus:ring-[#3d7049]/40 text-white placeholder-gray-500 text-sm transition-all outline-none resize-y"
            ></textarea>
          </div>

          {/* Error message banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-900/30 border border-red-700/50 text-red-200 text-xs text-center">
              {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-xl text-base font-semibold tracking-wide text-white bg-[#285735] hover:bg-[#1e4429] active:bg-[#183720] shadow-md transition-colors duration-200 flex items-center justify-center cursor-pointer border border-[#396946]"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing Manifest Request...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>Submit Proposal Request</span>
                  <Send className="w-4 h-4 ml-1.5 text-white/80" />
                </div>
              )}
            </button>
          </div>

          {/* Micro assurances */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 pt-3 border-t border-[#1f3323]">
            <div className="flex items-center space-x-1.5">
              <Lock className="w-3.5 h-3.5 text-[#74b382]" />
              <span>Strict Corporate NDA Privacy</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-[#74b382]" />
              <span>1-2 Business Days Turnaround</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Shield className="w-3.5 h-3.5 text-[#74b382]" />
              <span>$5M Commercial Liability</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default function ProposalForm() {
  return (
    <Suspense fallback={<div className="text-white text-center py-10">Loading secure form...</div>}>
      <ProposalFormInner />
    </Suspense>
  );
}
