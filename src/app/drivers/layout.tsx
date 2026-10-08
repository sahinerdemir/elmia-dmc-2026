import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chauffeur & Driver Careers | Join ELMIA DMC Fleet Network",
  description: "Apply to become an executive chauffeur with ELMIA DMC. Join our premium fleet operating across Miami, New York, Chicago, and Los Angeles. Competitive pay, elite VIP clientele, and professional growth.",
  alternates: {
    canonical: "https://www.elmiadmc.com/drivers"
  },
  openGraph: {
    title: "Chauffeur & Driver Careers | Join ELMIA DMC Fleet Network",
    description: "Apply to become an executive chauffeur with ELMIA DMC across Miami, New York, Chicago, and Los Angeles.",
    url: "https://www.elmiadmc.com/drivers",
    type: "website"
  },
  keywords: [
    "chauffeur jobs Miami",
    "executive driver careers",
    "VIP chauffeur hiring",
    "limo driver job New York",
    "ELMIA DMC driver application",
    "FBO tarmac chauffeur jobs",
    "commercial chauffeur Florida"
  ]
};

export default function DriversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
