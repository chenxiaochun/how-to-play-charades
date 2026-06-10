import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/site";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { SiteNav } from "./SiteNav";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
  showActions?: boolean;
};

export function Header({ locale, dict, showActions = true }: HeaderProps) {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[#667eea] to-[#764ba2] text-center text-white">
      <div className="relative px-4 py-10">
        <div className="absolute right-5 top-5">
          <LanguageSwitcher locale={locale} />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl">{dict.header.title}</h1>
        <p className="mb-8 text-base md:text-lg">{dict.header.subtitle}</p>
        {showActions && (
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href="#game" className="btn-primary">
              {dict.nav.playNow}
            </a>
            <a href={`/${locale}/rules`} className="btn-secondary">
              {dict.nav.viewRules}
            </a>
          </div>
        )}
        </div>
      </div>
      <SiteNav locale={locale} dict={dict} />
    </header>
  );
}
