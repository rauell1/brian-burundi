import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/login"] },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
