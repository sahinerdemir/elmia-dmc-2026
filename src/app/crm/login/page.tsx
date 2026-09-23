"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Lock, AlertCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsLoggingIn(true);

    try {
      const res = await fetch("/api/crm/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();
      if (data.success) {
        router.push("/crm");
        router.refresh();
      } else {
        setAuthError(data.error || "Authentication failed.");
      }
    } catch {
      setAuthError("A network error occurred.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0c1810] flex items-center justify-center p-4">
      {/* Ambient background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#285735] opacity-20 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#111b13] rounded-3xl p-8 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#285735]" />
          
          <div className="flex flex-col items-center mb-10">
            <div className="w-32 h-14 relative mb-6">
              <Image
                src="/images/elmia-dmc-logo.png"
                alt="ELMIA DMC"
                fill
                className="object-contain filter brightness-0 invert opacity-90"
              />
            </div>
            <h1 className="text-2xl font-bold text-white text-center font-heading">
              Operations Desk
            </h1>
            <p className="text-[#a0a0a0] text-sm text-center mt-2">
              Secure CRM portal for authorized personnel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#a0a0a0] mb-2">
                Master Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-[#285735]" />
                </div>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#0c1810] border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-[#285735] focus:border-[#285735] transition-all text-sm"
                  placeholder="Enter administrative password"
                  autoFocus
                />
              </div>
            </div>

            {authError && (
              <div className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg text-xs font-medium border border-red-400/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center space-x-2 bg-[#285735] hover:bg-[#346c43] text-white py-3.5 rounded-xl font-bold text-sm transition-colors disabled:opacity-70"
            >
              <span>{isLoggingIn ? "Authenticating..." : "Secure Login"}</span>
              {!isLoggingIn && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
