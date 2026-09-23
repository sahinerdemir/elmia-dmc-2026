"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, ChevronDown } from "lucide-react";

interface GeneralContactFormProps {
  title?: string;
  subtitle?: string;
}

export default function GeneralContactForm({
  title = "Get in Touch",
  subtitle = "Have a question, feedback, or need general assistance? Drop us a message below and our team will get back to you shortly."
}: GeneralContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    topic: "General Inquiry",
    message: ""
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
          category: "contact",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          topic: formData.topic,
          message: formData.message,
          hp_fax_number: honeypot,
          _ts: formLoadedAt
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || "Message could not be sent. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or contact operations directly.");
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
          <h4 className="text-2xl font-bold text-[#222222]">Message Received</h4>
          <p className="text-sm text-[#555555]">
            Thank you, <span className="text-[#285735] font-semibold">{formData.name}</span>. Our team has received your message and will review it shortly.
          </p>
          <div className="pt-3">
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  topic: "General Inquiry",
                  message: ""
                });
              }}
              className="px-6 py-2.5 rounded-full text-xs font-bold text-[#285735] bg-[#eaf4ec] hover:bg-[#d8edd9] transition-all"
            >
              Send Another Message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
          {/* Invisible honeypot trap for automated spam bots */}
          <div className="absolute -left-[9999px] opacity-0 pointer-events-none" aria-hidden="true" tabIndex={-1}>
            <label htmlFor="hp_fax_general">Do not fill this field</label>
            <input
              type="text"
              id="hp_fax_general"
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
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
                Topic *
              </label>
              <div className="relative">
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] focus:outline-none focus:border-[#285735] focus:bg-white text-sm appearance-none transition-all cursor-pointer"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Executive Transportation">Executive Transportation</option>
                  <option value="Corporate Event Logistics">Corporate Event Logistics</option>
                  <option value="VIP Concierge Services">VIP Concierge Services</option>
                  <option value="Partnership Inquiry">Partnership Inquiry</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#444444] mb-2">
              Your Message *
            </label>
            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can we help you today?"
              className="w-full px-4 py-3 rounded-xl bg-[#f8faf8] border border-gray-200 text-[#222222] placeholder-gray-400 focus:outline-none focus:border-[#285735] focus:bg-white text-sm transition-all"
            ></textarea>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-center">
              {errorMessage}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold tracking-wide text-white bg-[#285735] hover:bg-[#1e4329] shadow-lg shadow-[#285735]/25 hover:shadow-[#285735]/40 transition-all duration-200 flex items-center justify-center cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending Message...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </div>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
