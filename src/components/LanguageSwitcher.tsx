"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HREFLANG,
  LOCALE_LABELS,
  PREFERRED_LOCALE_COOKIE,
  type Locale,
} from "@/lib/site";

type LanguageSwitcherProps = {
  locale: Locale;
};

function setLocalePreference(lang: Locale) {
  document.cookie = `${PREFERRED_LOCALE_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const rest = pathname.replace(/^\/(en|zh)/, "") || "";

  return (
    <div className="flex gap-2 rounded-full bg-white/20 p-2 backdrop-blur-md">
      {(["en", "zh"] as const).map((lang) => (
        <Link
          key={lang}
          href={`/${lang}${rest}`}
          onClick={() => setLocalePreference(lang)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            locale === lang ? "bg-white/30 shadow-sm" : "hover:bg-white/20"
          }`}
          hrefLang={HREFLANG[lang]}
        >
          {LOCALE_LABELS[lang]}
        </Link>
      ))}
    </div>
  );
}
