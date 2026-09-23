import { MetadataRoute } from "next";
import { DMC_SERVICES } from "@/data/services";
import { VIP_PROGRAMS } from "@/data/vipPrograms";
import { EXPERIENCES } from "@/data/experiences";
import { MAJOR_EVENTS } from "@/data/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://elmiadmc.com";
  const now = new Date();

  // Core Landing & Service Hub Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/request-proposal`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vip-programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/experiences`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fleet`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/credentials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // Dynamic DMC Services (6 core offerings)
  const serviceRoutes: MetadataRoute.Sitemap = DMC_SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic VIP Programs (7 bespoke lifestyle & hospitality tracks)
  const vipRoutes: MetadataRoute.Sitemap = VIP_PROGRAMS.map((prog) => ({
    url: `${baseUrl}/vip-programs/${prog.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Curated Tour Experiences (10 itineraries across USA)
  const experienceRoutes: MetadataRoute.Sitemap = EXPERIENCES.map((exp) => ({
    url: `${baseUrl}/experiences/${exp.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Dynamic Major Events (20 Marquee US Summits & Galas)
  const eventRoutes: MetadataRoute.Sitemap = MAJOR_EVENTS.map((ev) => ({
    url: `${baseUrl}/events/${ev.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.88,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...vipRoutes,
    ...experienceRoutes,
    ...eventRoutes,
  ];
}
