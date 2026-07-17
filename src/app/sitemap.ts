import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { blogPosts } from "@/app/blog/posts";
import { PHASE_SLUGS } from "@/app/careers/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/capabilities", priority: 0.9, changeFrequency: "monthly" },
    { path: "/capabilities/ai-orchestration", priority: 0.8, changeFrequency: "monthly" },
    { path: "/capabilities/data-engineering", priority: 0.8, changeFrequency: "monthly" },
    { path: "/capabilities/operational-redesign", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/process", priority: 0.7, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
    { path: "/value-calculator", priority: 0.7, changeFrequency: "monthly" },
    { path: "/careers", priority: 0.8, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const careersEntries: MetadataRoute.Sitemap = PHASE_SLUGS.map((slug) => ({
    url: `${SITE_URL}/careers/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => {
    const parsed = new Date(post.date);
    return {
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticEntries, ...careersEntries, ...blogEntries];
}
