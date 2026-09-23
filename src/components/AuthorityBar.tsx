import React from "react";
import { Plane, ShieldCheck, Clock, Award } from "lucide-react";

export default function AuthorityBar() {
  const items = [
    {
      icon: Plane,
      title: "Miami Opa-locka Hangar 5",
      subtitle: "On-field private aviation base & staging"
    },
    {
      icon: Award,
      title: "30+ Years Global Mastery",
      subtitle: "Excellence in travel & hospitality since 1994"
    },
    {
      icon: Clock,
      title: "24/7 Live Dispatch Desk",
      subtitle: "Dedicated senior logistics directors"
    },
    {
      icon: ShieldCheck,
      title: "Fully Licensed & Insured",
      subtitle: "US DOT & FBO security compliance"
    }
  ];

  return (
    <div className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-xl shadow-black/5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-start space-x-4 ${
                  idx > 0 ? "pt-4 sm:pt-0 sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#eaf4ec] border border-[#b8dfbf] flex items-center justify-center shrink-0 text-[#285735]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#222222] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
