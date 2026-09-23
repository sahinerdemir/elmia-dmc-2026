import type { Metadata } from "next";
import "./globals.css";
import SiteLayoutWrapper from "@/components/SiteLayoutWrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://elmiadmc.com"),
  title: {
    default: "USA Destination Management & Executive Chauffeur Services - ELMIA",
    template: "%s | ELMIA DMC"
  },
  description: "ELMIA provides premier destination management, executive chauffeured transit, and VIP summit logistics across Miami, New York, Chicago, and Los Angeles.",
  keywords: [
    "USA DMC",
    "Destination Management Company USA",
    "Miami DMC",
    "New York DMC",
    "Chicago DMC",
    "Los Angeles DMC",
    "Corporate Travel Logistics",
    "Executive Chauffeur Fleet",
    "Opa-locka FBO transfers",
    "Convention Center Logistics",
    "Diplomatic motorcades USA",
    "Private aviation ground transportation",
    "B2B Travel Partner USA"
  ],
  authors: [{ name: "ELMIA DMC (Elegant Miami Adventures LLC)" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://elmiadmc.com",
    title: "USA Destination Management & Executive Chauffeur Services - ELMIA",
    description: "ELMIA provides premier destination management, executive chauffeured transit, and VIP summit logistics across Miami, New York, Chicago, and Los Angeles.",
    siteName: "ELMIA",
    images: [
      {
        url: "/images/elmia-dmc-logo.png",
        width: 1024,
        height: 248,
        alt: "ELMIA DMC - Miami, New York, Chicago, Los Angeles & Nationwide"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "USA Destination Management & Executive Chauffeur Services - ELMIA",
    description: "ELMIA provides premier destination management, executive chauffeured transit, and VIP summit logistics across Miami, New York, Chicago, and Los Angeles.",
    images: ["/images/elmia-dmc-logo.png"]
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png"
  },
  alternates: {
    canonical: "https://elmiadmc.com"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://elmiadmc.com/#website",
        "url": "https://elmiadmc.com/",
        "name": "ELMIA Destination Management Company",
        "alternateName": ["ELMIA DMC", "ELMIA USA", "ELMIA Executive Transportation"],
        "description": "USA Destination Management Company specializing in corporate travel, executive motorcades, VIP hospitality, and airport FBO tarmac transfers across Miami, New York, Chicago, Los Angeles, and nationwide.",
        "publisher": {
          "@id": "https://elmiadmc.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://elmiadmc.com/#organization",
        "name": "ELMIA (Elegant Miami Adventures LLC)",
        "legalName": "Elegant Miami Adventures LLC",
        "url": "https://elmiadmc.com/",
        "logo": "https://elmiadmc.com/images/elmia-dmc-logo.png",
        "email": "info@elmiadmc.com",
        "telephone": "+1-786-677-7333",
        "description": "ELMIA is a premier full-service Destination Management Company (DMC) operating nationwide across the United States, anchored by operational headquarters at Miami Opa-locka Executive Airport (OPF Hangar 5) and primary service hubs in Miami, New York, Chicago, and Los Angeles. Backed by 30+ years of global travel and logistics experience since 1994, ELMIA specializes in corporate group logistics, executive transportation, luxury accommodations, bilingual on-site staffing, and VIP hospitality programs.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Miami Opa-locka Exec. Jet Airport Hangar 5 Suite 128",
          "addressLocality": "Opa-locka",
          "addressRegion": "FL",
          "postalCode": "33054",
          "addressCountry": "US"
        },
        "sameAs": [
          "https://www.instagram.com/elmiadmc/",
          "https://www.youtube.com/@elmiadmc",
          "https://www.linkedin.com/company/elmiadmc",
          "https://www.facebook.com/elmiadmc",
          "https://www.tiktok.com/@elmiadmc"
        ],
        "founder": {
          "@type": "Person",
          "name": "Mehmet Leblebicioğlu",
          "jobTitle": "Managing Director"
        },
        "knowsAbout": [
          "Destination Management Company",
          "Corporate Event Transportation",
          "Airport FBO Tarmac Logistics",
          "Diplomatic Protocol Delegations",
          "Executive Chauffeur Service",
          "Private Jet Ground Handling",
          "Luxury Yacht Charters",
          "Armored Vehicle Motorcade",
          "Miami Opa-locka Airport OPF Hangar 5"
        ]
      },
      {
        "@type": "TravelAgency",
        "@id": "https://elmiadmc.com/#localbusiness",
        "name": "ELMIA Destination Management Company",
        "url": "https://elmiadmc.com/",
        "telephone": "+1-786-677-7333",
        "priceRange": "$$$",
        "image": "https://elmiadmc.com/images/elmia-dmc-logo.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Miami Opa-locka Exec. Jet Airport Hangar 5 Suite 128",
          "addressLocality": "Opa-locka",
          "addressRegion": "FL",
          "postalCode": "33054",
          "addressCountry": "US"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.9073,
          "longitude": -80.2784
        },
        "hasMap": "https://maps.app.goo.gl/vmuJrmMSSH8Efbvx5",
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        },
        "currenciesAccepted": "USD",
        "paymentAccepted": "Credit Card, Bank Wire Transfer, Corporate Invoicing",
        "areaServed": [
          {
            "@type": "City",
            "name": "Miami",
            "containedInPlace": { "@type": "State", "name": "Florida" }
          },
          {
            "@type": "City",
            "name": "New York",
            "containedInPlace": { "@type": "State", "name": "New York" }
          },
          {
            "@type": "City",
            "name": "Chicago",
            "containedInPlace": { "@type": "State", "name": "Illinois" }
          },
          {
            "@type": "City",
            "name": "Los Angeles",
            "containedInPlace": { "@type": "State", "name": "California" }
          },
          {
            "@type": "Country",
            "name": "United States"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://elmiadmc.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is ELMIA DMC and what services does it provide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ELMIA DMC (Elegant Miami Adventures LLC) is a premier full-service Destination Management Company headquartered at Miami Opa-locka Executive Airport (OPF Hangar 5) with dedicated operational hubs in New York, Chicago, and Los Angeles. ELMIA provides executive chauffeured ground transportation, high-volume corporate summit logistics, diplomatic and state delegation motorcades, FBO planeside tarmac handling, luxury yacht charters, and VIP concierge services across all 50 US states."
            }
          },
          {
            "@type": "Question",
            "name": "Does ELMIA DMC provide direct tarmac plane-side pickup at Miami private jet FBOs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. ELMIA chauffeurs hold active TSA airside security badges and ramp permits enabling direct planeside tarmac staging at Signature Flight Support, Atlantic Aviation, Fontainebleau Aviation, and Sheltair across Miami Opa-locka (OPF), Miami International (MIA), Fort Lauderdale (FLL), and Palm Beach (PBI)."
            }
          },
          {
            "@type": "Question",
            "name": "Which cities and states are covered by ELMIA DMC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "While headquartered at Miami Opa-locka Airport (OPF Hangar 5) in South Florida, ELMIA maintains primary operational hubs and executive fleets in New York, Chicago, and Los Angeles, providing turnkey nationwide destination management and event transportation across all 50 states."
            }
          },
          {
            "@type": "Question",
            "name": "What commercial licensing, credentials, and insurance does ELMIA maintain?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ELMIA operates in strict compliance with the US Department of Transportation (USDOT) safety regulations, carries $5,000,000+ in commercial auto liability and general carrier insurance, enforces strict NDAs for VIP and diplomatic missions, and is fully compliant with Florida Seller of Travel and SAM.gov federal procurement standards."
            }
          },
          {
            "@type": "Question",
            "name": "What vehicles are featured in ELMIA's executive fleet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ELMIA's fleet consists of pristine late-model Cadillac Escalade ESVs, Mercedes-Benz S-Class sedans, custom Jet Class Mercedes Sprinters (8-14 passengers), executive mini-coaches (24-38 passengers), full-size 55-passenger motorcoaches, and armored Chevrolet Suburbans (B6/B7 level) upon request."
            }
          },
          {
            "@type": "Question",
            "name": "How can corporate planners and travel directors request a proposal?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Clients can submit their itinerary, passenger count, and vehicle preferences via the online Request Proposal form at elmiadmc.com/request-proposal or contact the 24/7 Operations Desk directly at +1 (786) 677-7333 or info@elmiadmc.com for itemized proposals delivered within 1-2 business days."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300;400;500;600;700;800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans antialiased bg-white text-[#333333] min-h-screen flex flex-col">
        <SiteLayoutWrapper>
          {children}
        </SiteLayoutWrapper>
      </body>
    </html>
  );
}
