import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isValidLocale } from "@/lib/i18n/types";
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
    page: "userStatement",
    title: dict.meta.userStatement.title,
    description: dict.meta.userStatement.description,
    path: "/user-statement",
  });
}

export default async function UserStatementPage({ params }: PageProps) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} showActions={false} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <Breadcrumb
          items={[
            { label: dict.breadcrumb.home, href: `/${locale}` },
            { label: dict.breadcrumb.userStatement },
          ]}
        />
        <article className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
          <h1 className="mb-8 text-3xl font-bold text-[#2c3e50]">
            {dict.meta.userStatement.title}
          </h1>
          {dict.userStatement.sections.map((section) => (
            <section key={section.heading} className="mb-8">
              <h2 className="mb-3 border-l-4 border-[#667eea] pl-3 text-xl font-bold text-[#2c3e50]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p key={p} className="mb-3 text-gray-700">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="list-disc space-y-2 pl-6 text-gray-700">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <Link href={`/${locale}`} className="btn-primary">
            {dict.userStatement.backHome}
          </Link>
          <p className="mt-8 text-right text-sm italic text-gray-500">
            {dict.userStatement.lastUpdated}
          </p>
        </article>
      </main>
      <Footer locale={locale} dict={dict} />
    </>
  );
}
