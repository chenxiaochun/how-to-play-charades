import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/TopicPage";
import { isValidLocale } from "@/lib/i18n/types";
import { buildMetadata } from "@/lib/metadata";
import { getTopic, type TopicSlug } from "@/lib/topics";

type PageProps = { params: Promise<{ locale: string }> };

export function createTopicPage(slug: TopicSlug) {
  async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale } = await params;
    if (!isValidLocale(locale)) return {};
    const topic = getTopic(locale, slug);
    return buildMetadata({
      locale,
      page: "home",
      title: topic.meta.title,
      description: topic.meta.description,
      path: `/${slug}`,
    });
  }

  async function Page({ params }: PageProps) {
    const { locale } = await params;
    if (!isValidLocale(locale)) notFound();
    return <TopicPage locale={locale} slug={slug} />;
  }

  return { generateMetadata, default: Page };
}
