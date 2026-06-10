import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/site";

type SiteNavProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteNav({ locale, dict }: SiteNavProps) {
  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/rules`, label: dict.nav.rules },
    { href: `/${locale}/tips`, label: dict.nav.tips },
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}#game`, label: dict.nav.playNow },
  ];

  return (
    <nav
      aria-label="Main navigation"
      className="border-b border-white/20 bg-[#5a6fd6]/90 backdrop-blur-sm"
    >
      <ul className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1 px-4 py-2 text-sm font-semibold text-white">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-full px-4 py-2 transition hover:bg-white/15"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
