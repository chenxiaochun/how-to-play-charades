import Link from "next/link";

type ContentPreviewProps = {
  title: string;
  items: string[];
  readMoreLabel: string;
  href: string;
  previewCount?: number;
};

export function ContentPreview({
  title,
  items,
  readMoreLabel,
  href,
  previewCount = 3,
}: ContentPreviewProps) {
  const preview = items.slice(0, previewCount);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md md:p-8">
      <h2 className="mb-4 text-2xl font-bold text-[#2c3e50]">{title}</h2>
      <ul className="mb-6 space-y-3">
        {preview.map((item) => (
          <li
            key={item}
            className="relative pl-5 text-gray-700 before:absolute before:left-0 before:text-[#667eea] before:content-['•']"
          >
            {item}
          </li>
        ))}
      </ul>
      <Link href={href} className="text-[#667eea] font-semibold hover:underline">
        {readMoreLabel} →
      </Link>
    </section>
  );
}
