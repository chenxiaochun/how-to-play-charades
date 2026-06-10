import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import { buildWebPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    page: "about",
    title: dict.meta.about.title,
    description: dict.meta.about.description,
    path: "/about",
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "How to Play Charades",
    url: SITE_URL,
    description: dict.meta.about.description,
    sameAs: [],
  };

  const jsonLd = [
    buildWebPageJsonLd({
      locale,
      title: dict.meta.about.title,
      description: dict.meta.about.description,
      path: "/about",
    }),
    organizationJsonLd,
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.about },
          ]}
        />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-8 text-3xl font-bold text-[#2c3e50]">
            {dict.meta.about.title}
          </h1>
          {dict.about.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-3 border-l-4 border-[#667eea] pl-3 text-xl font-bold text-[#2c3e50]">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mb-3 text-gray-700">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <Link href={`/${locale}`} className="btn-primary">
            {dict.about.backHome}
          </Link>
          <p className="mt-8 text-right text-sm italic text-gray-500">
            {dict.about.lastUpdated}
          </p>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
