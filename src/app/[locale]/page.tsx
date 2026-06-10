import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CharadesGame } from "@/components/CharadesGame";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HowToPlay } from "@/components/HowToPlay";
import { JsonLd } from "@/components/JsonLd";
import { AdUnit } from "@/components/AdUnit";
import { ContentPreview } from "@/components/ContentPreview";
import { GuideCards } from "@/components/GuideCards";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { WORD_COUNT } from "@/lib/word-database";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    page: "home",
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    path: "",
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const homeUrl = `${SITE_URL}/${locale}`;

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: dict.howToPlay.title,
    description: dict.meta.home.description,
    step: dict.howToPlay.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "How to Play Charades",
    url: homeUrl,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    description: dict.meta.home.description,
  };

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: dict.breadcrumb.charades,
    url: `${homeUrl}#game`,
    applicationCategory: "GameApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: `Free online charades with ${WORD_COUNT}+ curated words.`,
  };

  return (
    <>
      <JsonLd data={[webSiteJsonLd, howToJsonLd, gameJsonLd]} />
      <Header locale={locale} dict={dict} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.charades },
          ]}
        />
        <div className="space-y-12">
          <HowToPlay dict={dict} />
          <ContentPreview
            title={dict.rules.title}
            items={dict.rules.items}
            readMoreLabel={dict.homePreview.readMoreRules}
            href={`/${locale}/rules`}
          />
          <ContentPreview
            title={dict.tips.title}
            items={dict.tips.items}
            readMoreLabel={dict.homePreview.readMoreTips}
            href={`/${locale}/tips`}
          />
          <Features dict={dict} />
          <GuideCards locale={locale} dict={dict} />
          <AdUnit label={dict.ad.label} />
          <CharadesGame locale={locale} dict={dict} />
        </div>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
