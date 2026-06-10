import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostPage } from "@/components/BlogPostPage";
import { BLOG_SLUGS, getBlogPost, isBlogSlug } from "@/lib/blog";
import { isValidLocale } from "@/lib/i18n/types";
import { buildMetadata } from "@/lib/metadata";
import { LOCALES } from "@/lib/site";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    BLOG_SLUGS.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || !isBlogSlug(slug)) return {};
  const post = getBlogPost(locale, slug);
  return buildMetadata({
    locale,
    page: "blog",
    title: post.meta.title,
    description: post.meta.description,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogSlugPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isValidLocale(locale) || !isBlogSlug(slug)) notFound();
  return <BlogPostPage locale={locale} post={getBlogPost(locale, slug)} />;
}
