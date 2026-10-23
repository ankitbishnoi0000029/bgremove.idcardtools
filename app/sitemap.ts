import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["/", "/about", "/blog", "/privacy", "/terms"];
  const blogPaths = getAllPosts().map((post) => `/blog/${post.slug}`);

  return [...staticPaths, ...blogPaths].map((path) => ({
    url: `${SITE_URL}${path}`,
  }));
}
