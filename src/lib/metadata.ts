import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, type Locale } from "@/lib/site";

type PageKey = "home" | "blog" | "userStatement" | "rules" | "tips" | "notFound";

export function buildMetadata({
  locale,
  page,
  title,
  description,
  path,
  type = "website",
}: {
  locale: Locale;
  page: PageKey;
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const canonical = `${SITE_URL}/${locale}${path}`;
  const languages: Record<string, string> = {
    en: `${SITE_URL}/en${path}`,
    zh: `${SITE_URL}/zh${path}`,
    "x-default": `${SITE_URL}/en${path}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "zh" ? "zh_CN" : "en_US",
      type,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
    robots:
      page === "notFound"
        ? { index: false, follow: true }
        : {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}
