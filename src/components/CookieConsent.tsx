"use client";

import React, { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const consent = localStorage.getItem("elmia_cookie_consent");
      if (!consent) {
        const timer = setTimeout(() => {
          setVisible(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access fallback (e.g. private browsing restrictions)
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("elmia_cookie_consent", "accepted");
    } catch {
      // Ignore storage errors
    }
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("elmia_cookie_consent", "declined");
    } catch {
      // Ignore storage errors
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie consent"
      className="fixed bottom-5 sm:bottom-6 left-5 sm:left-6 z-[60] max-w-sm w-[calc(100%-2.5rem)] sm:w-[350px] transition-all duration-300"
    >
      <div className="bg-white/95 backdrop-blur-md border border-[#e2ede4] rounded-2xl p-4 sm:p-5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] text-[#222222]">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-[#285735] shrink-0 mt-0.5" />
          <div className="space-y-2.5">
            <p className="text-xs text-[#555555] leading-relaxed font-normal">
              We use essential cookies to optimize site navigation, ensure secure dispatch, and analyze site performance.
            </p>
            <div className="flex items-center gap-4 pt-0.5">
              <button
                type="button"
                onClick={handleAccept}
                className="text-xs font-bold text-[#285735] hover:text-[#1b3d24] underline underline-offset-4 cursor-pointer py-1 transition-colors"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleDecline}
                className="text-xs text-[#777777] hover:text-[#333333] underline underline-offset-4 cursor-pointer py-1 transition-colors"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
