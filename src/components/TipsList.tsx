import type { Dictionary } from "@/lib/i18n/types";

type TipsListProps = {
  dict: Dictionary;
};

export function TipsList({ dict }: TipsListProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-md md:p-8">
      <h2 className="mb-4 text-2xl font-bold text-[#2c3e50]">{dict.tips.title}</h2>
      <ul className="space-y-3">
        {dict.tips.items.map((tip) => (
          <li key={tip} className="relative pl-5 text-gray-700 before:absolute before:left-0 before:text-[#667eea] before:content-['•']">
            {tip}
          </li>
        ))}
      </ul>
    </section>
  );
}
