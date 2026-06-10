export const TOPIC_SLUGS = [
  "charades-for-kids",
  "charades-words",
  "charades-party-ideas",
  "charades-for-adults",
  "charades-themes",
  "christmas-charades",
  "halloween-charades",
  "team-building-charades",
] as const;

export type TopicSlug = (typeof TOPIC_SLUGS)[number];

export type TopicContent = {
  meta: { title: string; description: string };
  breadcrumb: string;
  heading: string;
  intro: string;
  sections: Array<{
    heading: string;
    paragraphs?: string[];
    list?: string[];
  }>;
  cta: string;
};

export type TopicMap = Record<TopicSlug, TopicContent>;

export function isTopicSlug(value: string): value is TopicSlug {
  return (TOPIC_SLUGS as readonly string[]).includes(value);
}
