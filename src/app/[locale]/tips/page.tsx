import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TipsList } from "@/components/TipsList";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
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

  return (
    <>
      <Header locale={locale} dict={dict} showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.tips },
          ]}
        />
        <TipsList dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
