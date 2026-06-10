export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://how-to-play-charades.com";

export const SITE_NAME = "How to Play Charades";

export const LOCALES = ["en", "zh"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  zh: "中文",
};

export const HREFLANG: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

export const HTML_LANG: Record<Locale, string> = {
  en: "en-US",
  zh: "zh-CN",
};

export const PREFERRED_LOCALE_COOKIE = "preferred-locale";
