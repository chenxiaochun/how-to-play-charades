import Link from "next/link";
import { AdUnit } from "@/components/AdUnit";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import type { BlogPost } from "@/lib/blog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SITE_URL, type Locale } from "@/lib/site";

type BlogPostPageProps = {
  locale: Locale;
  post: BlogPost;
};

export function BlogPostPage({ locale, post }: BlogPostPageProps) {
  const dict = getDictionary(locale);
  const url = `${SITE_URL}/${locale}/blog/${post.slug}`;
  const breadcrumbItems = [
    { label: dict.breadcrumb.home, href: `/${locale}` },
    { label: dict.breadcrumb.blog, href: `/${locale}/blog` },
    { label: post.meta.title },
  ];

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: { "@type": "Organization", name: post.author },
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
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb locale={locale} items={breadcrumbItems} />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <header className="mb-8 border-b border-gray-200 pb-6">
            <h1 className="mb-4 text-3xl font-bold text-[#2c3e50] md:text-4xl">
              {post.meta.title}
            </h1>
            <p className="font-semibold text-[#667eea]">{post.date}</p>
            <p className="text-gray-600">{post.author}</p>
          </header>

          <AdUnit
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE}
            label={dict.ad.label}
          />

          {post.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-4 text-2xl font-bold text-[#2c3e50]">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mb-4 leading-relaxed text-gray-700">
                  {p}
                </p>
              ))}
              {section.subsections?.map((sub) => (
                <div key={sub.heading} className="mb-4 rounded-xl bg-[#f8f9fa] p-5">
                  <h3 className="mb-2 text-lg font-semibold text-[#667eea]">
                    {sub.heading}
                  </h3>
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

          {post.quote && (
            <blockquote className="my-8 border-l-4 border-[#667eea] pl-4 italic text-gray-600">
              {post.quote}
            </blockquote>
          )}

          <div className="text-center">
            <Link href={`/${locale}#game`} className="btn-primary">
              {post.cta}
            </Link>
          </div>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
