import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://elmiadmc.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/crm", "/crm/*", "/api/", "/api/*"],
      },
      {
        userAgent: [
          "Googlebot",
          "Bingbot",
          "Slurp",
          "DuckDuckBot",
          "Baiduspider",
          "YandexBot",
        ],
        allow: "/",
        disallow: ["/crm", "/crm/*", "/api/", "/api/*"],
      },
      {
        // Explicitly welcome AI Search & LLM Citation Crawlers
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "OAI-SearchBot",
          "cohere-ai",
        ],
        allow: "/",
        disallow: ["/crm", "/crm/*", "/api/", "/api/*"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
