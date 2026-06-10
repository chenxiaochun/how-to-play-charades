import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import { buildItemListJsonLd, buildWebPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { TOPIC_SLUGS, getTopic } from "@/lib/topics";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    page: "home",
    title: dict.meta.guides.title,
    description: dict.meta.guides.description,
    path: "/guides",
  });
}

export default async function GuidesPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const topics = TOPIC_SLUGS.map((slug) => ({ slug, ...getTopic(locale, slug) }));

  const jsonLd = [
    buildWebPageJsonLd({
      locale,
      title: dict.meta.guides.title,
      description: dict.meta.guides.description,
      path: "/guides",
    }),
    buildItemListJsonLd(
      dict.guides.hubTitle,
      topics.map((topic) => topic.breadcrumb),
    ),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.guides },
          ]}
        />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-4 text-3xl font-bold text-[#2c3e50] md:text-4xl">
            {dict.guides.hubTitle}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            {dict.guides.hubIntro}
          </p>
          <ul className="space-y-4">
            {topics.map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/${locale}/${topic.slug}`}
                  className="block rounded-xl border border-gray-100 bg-[#f8f9fa] p-5 transition hover:border-[#667eea]/30 hover:shadow-md"
                >
                  <h2 className="mb-2 text-xl font-semibold text-[#2c3e50]">
                    {topic.breadcrumb}
                  </h2>
                  <p className="text-gray-600">{topic.meta.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link href={`/${locale}#game`} className="btn-primary">
              {dict.nav.playNow}
            </Link>
          </div>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
