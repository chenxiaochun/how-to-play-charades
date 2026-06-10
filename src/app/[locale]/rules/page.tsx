import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { RulesList } from "@/components/RulesList";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import {
  buildFaqJsonLd,
  buildItemListJsonLd,
  buildWebPageJsonLd,
} from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    page: "rules",
    title: dict.meta.rules.title,
    description: dict.meta.rules.description,
    path: "/rules",
  });
}

export default async function RulesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const breadcrumbItems = [
    { label: dict.breadcrumb.home, href: `/${locale}` },
    { label: dict.breadcrumb.rules },
  ];

  const jsonLd = [
    buildWebPageJsonLd({
      locale,
      title: dict.meta.rules.title,
      description: dict.meta.rules.description,
      path: "/rules",
    }),
    buildItemListJsonLd(dict.rules.title, dict.rules.items),
    buildFaqJsonLd(dict.rules.faq),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb locale={locale} items={breadcrumbItems} />
        <h1 className="mb-8 text-3xl font-bold text-[#2c3e50] md:text-4xl">
          {dict.meta.rules.title}
        </h1>
        <RulesList dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
