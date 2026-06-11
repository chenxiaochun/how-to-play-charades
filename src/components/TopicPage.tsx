import Link from "next/link";
import { AdUnit } from "@/components/AdUnit";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { getTopic, type TopicSlug } from "@/lib/topics";
import { SITE_URL, type Locale } from "@/lib/site";

type TopicPageProps = {
  locale: Locale;
  slug: TopicSlug;
};

export function TopicPage({ locale, slug }: TopicPageProps) {
  const dict = getDictionary(locale);
  const topic = getTopic(locale, slug);
  const url = `${SITE_URL}/${locale}/${slug}`;
  const breadcrumbItems = [
    { label: dict.breadcrumb.home, href: `/${locale}` },
    { label: dict.breadcrumb.guides, href: `/${locale}/guides` },
    { label: topic.breadcrumb },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: topic.meta.title,
    description: topic.meta.description,
    url,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    author: { "@type": "Organization", name: "How to Play Charades" },
    datePublished: "2026-06-10",
    dateModified: "2026-06-12",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb locale={locale} items={breadcrumbItems} />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-4 text-3xl font-bold text-[#2c3e50] md:text-4xl">
            {topic.heading}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">{topic.intro}</p>

          <AdUnit
            slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_ARTICLE}
            label={dict.ad.label}
          />

          {topic.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-3 text-xl font-bold text-[#2c3e50]">
                {section.heading}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p} className="mb-3 leading-relaxed text-gray-700">
                  {p}
                </p>
              ))}
              {section.orderedList && (
                <ol className="list-decimal space-y-2 pl-6 text-gray-700">
                  {section.orderedList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              )}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.wordGrids?.map((grid) => (
                <div key={grid.label} className="mb-4">
                  <h3 className="mb-2 font-semibold text-[#2c3e50]">{grid.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {grid.words.map((word) => (
                      <span
                        key={word}
                        className="rounded-full bg-[#f0f4ff] px-3 py-1 text-sm text-gray-700"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {section.table && (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full min-w-[280px] text-left text-sm text-gray-700">
                    <thead className="bg-[#f8f9fa] text-[#2c3e50]">
                      <tr>
                        {section.table.headers.map((header) => (
                          <th key={header} className="px-4 py-3 font-semibold">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")} className="border-t border-gray-100">
                          {row.map((cell) => (
                            <td key={cell} className="px-4 py-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}

          <div className="mt-8 text-center">
            <Link href={`/${locale}#game`} className="btn-primary">
              {topic.cta}
            </Link>
          </div>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
