import { notFound } from "next/navigation";
import { HtmlLang } from "@/components/HtmlLang";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import { LOCALES, type Locale } from "@/lib/site";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  getDictionary(locale as Locale);

  return (
    <>
      <HtmlLang locale={locale as Locale} />
      {children}
    </>
  );
}
