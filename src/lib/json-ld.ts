import { SITE_URL } from "@/lib/site";

type BreadcrumbInput = {
  label: string;
  href?: string;
};

export function buildBreadcrumbJsonLd(
  locale: string,
  items: BreadcrumbInput[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `${SITE_URL}${item.href}` }
        : {}),
    })),
  };
}

export function buildItemListJsonLd(name: string, items: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item,
    })),
  };
}

export function buildWebPageJsonLd({
  locale,
  title,
  description,
  path,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}/${locale}${path}`,
    inLanguage: locale === "zh" ? "zh-CN" : "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "How to Play Charades",
      url: SITE_URL,
    },
  };
}
