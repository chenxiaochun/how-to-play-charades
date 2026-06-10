import type { MetadataRoute } from "next";
import { LOCALES, SITE_URL } from "@/lib/site";

const paths = ["", "/blog", "/rules", "/tips", "/user-statement"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-10");

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : ("monthly" as const),
      priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`]),
        ),
      },
    })),
  );
}
