import type { MetadataRoute } from "next";
import { HREFLANG, LOCALES, SITE_URL } from "@/lib/site";

const paths = [
  "",
  "/blog",
  "/rules",
  "/tips",
  "/guides",
  "/user-statement",
  "/privacy-policy",
  "/charades-for-kids",
  "/charades-words",
  "/charades-party-ideas",
  "/charades-for-adults",
  "/charades-themes",
  "/christmas-charades",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-10");

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : ("monthly" as const),
      priority: path === "" ? 1 : path === "/blog" ? 0.8 : 0.75,
      alternates: {
        languages: {
          "x-default": `${SITE_URL}/en${path}`,
          ...Object.fromEntries(
            LOCALES.map((l) => [HREFLANG[l], `${SITE_URL}/${l}${path}`]),
          ),
        },
      },
    })),
  );
}
