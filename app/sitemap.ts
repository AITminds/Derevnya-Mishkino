import type { MetadataRoute } from "next";
import { siteContent } from "@/data/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteContent.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
