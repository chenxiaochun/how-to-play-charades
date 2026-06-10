import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { TipsList } from "@/components/TipsList";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import { buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/json-ld";
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
    page: "tips",
    title: dict.meta.tips.title,
    description: dict.meta.tips.description,
    path: "/tips",
  });
}

export default async function TipsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const breadcrumbItems = [
    { label: dict.breadcrumb.home, href: `/${locale}` },
    { label: dict.breadcrumb.tips },
  ];

  const jsonLd = [
    buildWebPageJsonLd({
      locale,
      title: dict.meta.tips.title,
      description: dict.meta.tips.description,
      path: "/tips",
    }),
    buildItemListJsonLd(dict.tips.title, dict.tips.items),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb locale={locale} items={breadcrumbItems} />
        <h1 className="mb-8 text-3xl font-bold text-[#2c3e50] md:text-4xl">
          {dict.meta.tips.title}
        </h1>
        <TipsList dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
