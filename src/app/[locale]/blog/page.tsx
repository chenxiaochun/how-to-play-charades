import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
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
    page: "blog",
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    path: "/blog",
    type: "article",
  });
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const url = `${SITE_URL}/${locale}/blog`;

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: dict.meta.blog.title,
    description: dict.meta.blog.description,
    datePublished: "2024-05-15",
    dateModified: "2024-05-15",
    author: { "@type": "Organization", name: dict.blog.author },
    publisher: {
      "@type": "Organization",
      name: "How to Play Charades",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${SITE_URL}/opengraph-image`],
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    isAccessibleForFree: true,
  };

  return (
    <>
      <JsonLd data={blogJsonLd} />
      <Header locale={locale} dict={dict} showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.blog },
          ]}
        />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <header className="mb-8 border-b border-gray-200 pb-6 text-center">
            <h1 className="mb-4 text-3xl font-bold text-[#2c3e50] md:text-4xl">
              {dict.meta.blog.title}
            </h1>
            <p className="font-semibold text-[#667eea]">{dict.blog.date}</p>
            <p className="text-gray-600">{dict.blog.author}</p>
          </header>

          {dict.blog.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-[#2c3e50]">{section.heading}</h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mb-4 leading-relaxed text-gray-700">
                  {p}
                </p>
              ))}
              {section.subsections?.map((sub) => (
                <div key={sub.heading} className="mb-4 rounded-xl bg-[#f8f9fa] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-[#667eea]">{sub.heading}</h3>
                  <p className="text-gray-700">{sub.content}</p>
                </div>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.orderedList && (
                <ol className="list-decimal space-y-2 pl-6 text-gray-700">
                  {section.orderedList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              )}
            </section>
          ))}

          <blockquote className="my-8 border-l-4 border-[#667eea] pl-4 italic text-gray-600">
            {dict.blog.quote}
          </blockquote>

          <div className="text-center">
            <Link href={`/${locale}#game`} className="btn-primary">
              {dict.blog.cta}
            </Link>
          </div>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
