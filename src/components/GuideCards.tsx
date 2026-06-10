import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/types";
import { TOPIC_SLUGS, getTopic } from "@/lib/topics";
import type { Locale } from "@/lib/site";

type GuideCardsProps = {
  locale: Locale;
  dict: Dictionary;
};

export function GuideCards({ locale, dict }: GuideCardsProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
      <h2 className="mb-2 text-2xl font-bold text-[#2c3e50]">
        {dict.guides.sectionTitle}
      </h2>
      <p className="mb-6 text-gray-600">{dict.guides.sectionDescription}</p>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOPIC_SLUGS.map((slug) => {
          const topic = getTopic(locale, slug);
          return (
            <li key={slug}>
              <Link
                href={`/${locale}/${slug}`}
                className="block h-full rounded-xl border border-gray-100 bg-[#f8f9fa] p-5 transition hover:border-[#667eea]/30 hover:shadow-md"
              >
                <h3 className="mb-2 font-semibold text-[#2c3e50]">
                  {topic.breadcrumb}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {topic.meta.description}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 text-center">
        <Link href={`/${locale}/guides`} className="text-[#667eea] font-semibold hover:underline">
          {dict.guides.viewAll}
        </Link>
      </div>
    </section>
  );
}
