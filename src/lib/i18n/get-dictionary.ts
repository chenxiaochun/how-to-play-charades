import type { Locale } from "@/lib/site";
import type { Dictionary } from "./types";
import en from "./en";
import zh from "./zh";

const dictionaries: Record<Locale, Dictionary> = { en, zh };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
