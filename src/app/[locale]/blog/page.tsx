import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { getAllBlogPosts } from "@/lib/blog";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
import { buildWebPageJsonLd } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    page: "blog",
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    path: "/blog",
  });
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const posts = getAllBlogPosts(locale);

  const jsonLd = buildWebPageJsonLd({
    locale,
    title: dict.meta.blog.title,
    description: dict.meta.blog.description,
    path: "/blog",
  });

  return (
    <>
      <JsonLd data={jsonLd} />
      <Header locale={locale} dict={dict} variant="subpage" showActions={false} />
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <Breadcrumb
          locale={locale}
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.blog },
          ]}
        />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-4 text-3xl font-bold text-[#2c3e50] md:text-4xl">
            {dict.blogIndex.hubTitle}
          </h1>
          <p className="mb-8 text-lg leading-relaxed text-gray-700">
            {dict.blogIndex.hubIntro}
          </p>
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block rounded-xl border border-gray-100 bg-[#f8f9fa] p-5 transition hover:border-[#667eea]/30 hover:shadow-md"
                >
                  <h2 className="mb-2 text-xl font-semibold text-[#2c3e50]">
                    {post.meta.title}
                  </h2>
                  <p className="mb-2 text-sm font-medium text-[#667eea]">{post.date}</p>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[#667eea]">
                    {dict.blogIndex.readMore} →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
