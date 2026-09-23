"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ServiceFAQ } from "@/data/services";

interface FAQAccordionProps {
  faqs: ServiceFAQ[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  faqs,
  title = "Frequently Asked Questions",
  subtitle = "Authoritative answers for corporate planners, travel directors, and executive advance teams."
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  };

  return (
    <div className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#285735] tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-sm sm:text-base text-[#666666]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-[#f9fbf9] border-[#285735] shadow-sm"
                  : "bg-white border-[#eaeaea] hover:border-[#285735]/40"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full py-5 px-6 flex items-center justify-between text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-base sm:text-lg font-semibold text-[#222222] pr-4">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                    isOpen
                      ? "bg-[#285735] border-[#285735] text-white rotate-180"
                      : "bg-[#f4f7f4] border-gray-200 text-[#285735]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#555555] leading-relaxed border-t border-gray-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
