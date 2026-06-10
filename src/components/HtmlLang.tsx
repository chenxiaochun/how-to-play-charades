"use client";

import { useEffect } from "react";
import { HTML_LANG, type Locale } from "@/lib/site";

type HtmlLangProps = {
  locale: Locale;
};

export function HtmlLang({ locale }: HtmlLangProps) {
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  return null;
}
