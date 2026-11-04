import type { MetadataRoute } from "next";
import { readDb } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hookinterstellar.com";
  const db = readDb();

  const staticRoutes = [
    "",
    "/about",
    "/business",
    "/technology",
    "/ecosystem",
    "/insights",
    "/space-ideas",
    "/partnership",
    "/contact",
    "/privacy",
    "/terms",
    "/community-rules",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const businessRoutes = db.businessGroups.map((g) => ({
    url: `${baseUrl}/business/${g.slug}`,
    lastModified: new Date(),
  }));

  const insightRoutes = db.articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      url: `${baseUrl}/insights/${a.slug}`,
      lastModified: new Date(a.updatedAt),
    }));

  return [...staticRoutes, ...businessRoutes, ...insightRoutes];
}
