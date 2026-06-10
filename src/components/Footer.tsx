import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import type { Locale } from "@/lib/site";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: FooterProps) {
  const links = [
    { href: `/${locale}/blog`, label: dict.nav.blog },
    { href: `/${locale}/rules`, label: dict.nav.rules },
    { href: `/${locale}/tips`, label: dict.nav.tips },
    { href: `/${locale}/user-statement`, label: dict.nav.userStatement },
    { href: `/${locale}/privacy-policy`, label: dict.nav.privacyPolicy },
  ];

  const guides = [
    { href: `/${locale}/guides`, label: dict.footer.guides.allGuides },
    {
      href: `/${locale}/charades-for-kids`,
      label: dict.footer.guides.charadesForKids,
    },
    {
      href: `/${locale}/charades-words`,
      label: dict.footer.guides.charadesWords,
    },
    {
      href: `/${locale}/charades-party-ideas`,
      label: dict.footer.guides.charadesParty,
    },
    {
      href: `/${locale}/charades-for-adults`,
      label: dict.footer.guides.charadesForAdults,
    },
    {
      href: `/${locale}/charades-themes`,
      label: dict.footer.guides.charadesThemes,
    },
    {
      href: `/${locale}/christmas-charades`,
      label: dict.footer.guides.christmasCharades,
    },
  ];

  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#2c3e50] px-4 py-8 text-center text-white">
      <p className="mb-2">{dict.footer.copyright}</p>
      <p className="mx-auto mb-4 max-w-2xl text-sm text-white/80">
        {dict.footer.description}
      </p>
      <nav className="mb-4 flex flex-wrap justify-center gap-4 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[#a5b4fc] transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <p className="mb-2 text-xs uppercase tracking-wide text-white/60">
        {dict.footer.guidesTitle}
      </p>
      <nav className="flex flex-wrap justify-center gap-4 text-sm">
        {guides.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-[#a5b4fc] transition hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
