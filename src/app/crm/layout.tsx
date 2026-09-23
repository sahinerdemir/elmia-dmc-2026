import type { Metadata } from "next";
import CRMSidebar from "@/components/crm/CRMSidebar";

export const metadata: Metadata = {
  title: "ELMIA Operations CRM | Lead Management Portal",
  description: "Internal restricted CRM portal for ELMIA DMC operations desk.",
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function CRMLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f4f7f4] font-sans">
      <CRMSidebar />
      {/* pt-16 for mobile top app bar, pb-20 for mobile bottom navigation */}
      <main className="flex-1 min-w-0 overflow-y-auto pt-16 pb-20 md:pt-0 md:pb-0">
        {children}
      </main>
    </div>
  );
}
