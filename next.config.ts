import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Core Pages
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      
      // Theme Dummy Pages
      { source: '/career', destination: '/', permanent: true },
      { source: '/team-details', destination: '/', permanent: true },
      { source: '/wishlist', destination: '/', permanent: true },
      { source: '/portfolio-grid', destination: '/', permanent: true },
      { source: '/portfolio-masonry', destination: '/', permanent: true },
      { source: '/portfolio-showcase', destination: '/', permanent: true },
      { source: '/service-1', destination: '/', permanent: true },
      { source: '/service-2', destination: '/', permanent: true },
      { source: '/service-3', destination: '/', permanent: true },
      { source: '/service-4', destination: '/', permanent: true },
      { source: '/sample-page', destination: '/', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
      { source: '/refund_returns', destination: '/', permanent: true },
      { source: '/privacy-policy', destination: '/', permanent: true }, // Add an actual privacy policy later if needed

      // Tours (from old portfolio slugs)
      { source: '/portfolio/american-legends', destination: '/experiences/american-legends', permanent: true },
      { source: '/portfolio/pearls-of-america', destination: '/experiences/pearls-of-america', permanent: true },
      { source: '/portfolio/coast-to-coast-america', destination: '/experiences/coast-to-coast-america', permanent: true },
      { source: '/portfolio/coast-to-coast-us-tour-12-days-11-nights', destination: '/experiences/coast-to-coast-america', permanent: true },
      { source: '/portfolio/western-united-states', destination: '/experiences/western-united-states', permanent: true },
      { source: '/portfolio/grand-america-tour', destination: '/experiences/grand-america-tour', permanent: true },
      { source: '/portfolio/east-coasts-of-america', destination: '/experiences/east-coasts-of-america', permanent: true },
      { source: '/portfolio/florida-dream', destination: '/experiences/florida-dream', permanent: true },
      { source: '/portfolio/western-usa-tour', destination: '/experiences/western-usa-tour', permanent: true },
      { source: '/portfolio/best-west', destination: '/experiences/best-west', permanent: true },

      // Services & VIP Programs (from old portfolio slugs)
      { source: '/portfolio/limousine-transfers', destination: '/services/executive-chauffeur-transportation', permanent: true },
      { source: '/portfolio/yacht-jet-charters', destination: '/vip-programs/private-yacht-charters', permanent: true },
      { source: '/portfolio/hotels-cruises-activities', destination: '/services/corporate-group-travel', permanent: true },
      { source: '/portfolio/expo-event-management', destination: '/services/trade-show-expo-services', permanent: true },
      { source: '/portfolio/logistics-supply-chain-services', destination: '/services', permanent: true },
      { source: '/portfolio/executive-chauffeur-transportation', destination: '/services/executive-chauffeur-transportation', permanent: true },
      { source: '/portfolio/airport-fbo-transfers', destination: '/services/airport-fbo-transfers', permanent: true },
      { source: '/portfolio/trade-show-expo-services', destination: '/services/trade-show-expo-services', permanent: true },
      { source: '/portfolio/government-delegation-services', destination: '/services/government-delegation-services', permanent: true },
      { source: '/portfolio/miami-destination-management-company', destination: '/services/miami-destination-management-company', permanent: true },
      { source: '/portfolio/corporate-group-travel', destination: '/services/corporate-group-travel', permanent: true },
      { source: '/portfolio/private-yacht-charters', destination: '/vip-programs/private-yacht-charters', permanent: true },
      { source: '/portfolio/vip-dining-nightlife', destination: '/vip-programs/vip-dining-nightlife', permanent: true },
      { source: '/portfolio/luxury-villa-rentals', destination: '/vip-programs/luxury-villa-rentals', permanent: true },
      { source: '/portfolio/custom-florida-excursions', destination: '/vip-programs', permanent: true },

      // Cities (from old portfolio slugs)
      { source: '/portfolio/miami', destination: '/services/miami-destination-management-company', permanent: true },
      { source: '/portfolio/orlando', destination: '/experiences/florida-dream', permanent: true },
      { source: '/portfolio/new-york', destination: '/experiences', permanent: true },
      { source: '/portfolio/washington', destination: '/experiences', permanent: true },
      { source: '/portfolio/boston', destination: '/experiences', permanent: true },
      { source: '/portfolio/chicago', destination: '/services', permanent: true },
      { source: '/portfolio/los-angeles', destination: '/experiences', permanent: true },
      { source: '/portfolio/san-francisco', destination: '/experiences', permanent: true },
      { source: '/portfolio/las-vegas', destination: '/experiences', permanent: true },

      // Catch-all for old demo posts & service templates
      { source: '/service/:slug', destination: '/services', permanent: true },
      { source: '/experience/:slug', destination: '/experiences', permanent: true },
    ];
  },
};

export default nextConfig;
