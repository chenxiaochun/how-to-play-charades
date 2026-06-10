import type { Locale } from "@/lib/site";
import en from "./en";
import zh from "./zh";
import type { BlogMap, BlogPost, BlogSlug } from "./types";

const posts: Record<Locale, BlogMap> = { en, zh };

export function getBlogPost(locale: Locale, slug: BlogSlug): BlogPost {
  return posts[locale][slug];
}

export function getAllBlogPosts(locale: Locale): BlogPost[] {
  return Object.values(posts[locale]).sort(
    (a, b) => b.datePublished.localeCompare(a.datePublished),
  );
}

export { BLOG_SLUGS, type BlogSlug, type BlogPost } from "./types";
export { isBlogSlug } from "./types";
