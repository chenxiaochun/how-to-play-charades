import type { Locale } from "@/lib/site";
import en from "./en";
import zh from "./zh";
import type { TopicContent, TopicSlug } from "./types";

const topics: Record<Locale, Record<TopicSlug, TopicContent>> = { en, zh };

export function getTopic(locale: Locale, slug: TopicSlug): TopicContent {
  return topics[locale][slug];
}

export { TOPIC_SLUGS, type TopicSlug, type TopicContent } from "./types";
export { isTopicSlug } from "./types";
