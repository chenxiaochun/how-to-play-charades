import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import type { Locale } from "@/lib/site";

type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  items: Crumb[];
  locale?: Locale;
};

export function Breadcrumb({ items, locale }: BreadcrumbProps) {
  return (
    <>
      {locale && <JsonLd data={buildBreadcrumbJsonLd(locale, items)} />}
      <nav aria-label="breadcrumb" className="mb-8 text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span>/</span>}
              {item.href ? (
                <Link href={item.href} className="text-[#667eea] hover:underline">
                  {item.label}
                </Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
