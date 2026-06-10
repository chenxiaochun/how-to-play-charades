import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TopicPage } from "@/components/TopicPage";
import { isValidLocale } from "@/lib/i18n/types";
import { buildMetadata } from "@/lib/metadata";
import { getTopic } from "@/lib/topics";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const topic = getTopic(locale, "charades-words");
  return buildMetadata({
    locale,
    page: "home",
    title: topic.meta.title,
    description: topic.meta.description,
    path: "/charades-words",
  });
}

export default async function CharadesWordsPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <TopicPage locale={locale} slug="charades-words" />;
}
