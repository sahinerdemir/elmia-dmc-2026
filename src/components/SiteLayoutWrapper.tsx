"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

export default function SiteLayoutWrapper({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCrmRoute = pathname?.startsWith("/crm");

  if (isCrmRoute) {
    return <main className="flex-1 w-full min-h-screen">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <CookieConsent />
    </>
  );
}
