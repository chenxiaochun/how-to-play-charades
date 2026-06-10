export const BLOG_SLUGS = [
  "online-free-word-guess-games",
  "charades-rules-for-beginners",
  "charades-vs-pictionary",
] as const;

export type BlogSlug = (typeof BLOG_SLUGS)[number];

export type BlogSection = {
  heading: string;
  paragraphs?: string[];
  subsections?: Array<{ heading: string; content: string }>;
  list?: string[];
  orderedList?: string[];
};

export type BlogPost = {
  slug: BlogSlug;
  meta: { title: string; description: string };
  excerpt: string;
  date: string;
  datePublished: string;
  dateModified: string;
  author: string;
  sections: BlogSection[];
  quote?: string;
  cta: string;
};

export type BlogMap = Record<BlogSlug, BlogPost>;

export function isBlogSlug(value: string): value is BlogSlug {
  return (BLOG_SLUGS as readonly string[]).includes(value);
}
