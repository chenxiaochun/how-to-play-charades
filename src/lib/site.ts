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

/** Curated word count per language (5 categories × 3 difficulties × 10 words). */
export const WORD_COUNT = 150;
