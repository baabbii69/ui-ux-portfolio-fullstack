import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { projectSlugsQuery } from "@/sanity/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yohanes-alemu.vercel.app";

  // Fetch all published project slugs
  const slugs: string[] = await client.fetch(projectSlugsQuery);

  const projectUrls = slugs.map((slug) => ({
    url: `${baseUrl}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Spread all dynamically generated project pages
    ...projectUrls,
  ];
}
