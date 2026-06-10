import type { MetadataRoute } from "next";
import { BLOG_SLUGS } from "@/lib/blog";
import { TOPIC_SLUGS } from "@/lib/topics";
import { HREFLANG, LOCALES, SITE_URL } from "@/lib/site";

const staticPaths = [
  "",
  "/blog",
  "/about",
  "/rules",
  "/tips",
  "/guides",
  "/user-statement",
  "/privacy-policy",
] as const;

const paths = [
  ...staticPaths,
  ...BLOG_SLUGS.map((slug) => `/blog/${slug}`),
  ...TOPIC_SLUGS.map((slug) => `/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-06-12");

  return LOCALES.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified,
      changeFrequency: path === "" ? "weekly" : ("monthly" as const),
      priority:
        path === ""
          ? 1
          : path === "/blog" || path.startsWith("/blog/")
            ? 0.8
            : 0.75,
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
