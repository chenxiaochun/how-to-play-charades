import type { Dictionary } from "@/lib/i18n/types";

type RulesListProps = {
  dict: Dictionary;
};

export function RulesList({ dict }: RulesListProps) {
  return (
    <section className="rounded-2xl bg-[#f8f9fa] p-6 md:p-8">
      <h2 className="mb-4 text-2xl font-bold text-[#2c3e50]">{dict.rules.title}</h2>
      <ul className="space-y-3">
        {dict.rules.items.map((rule) => (
          <li key={rule} className="relative pl-5 text-gray-700 before:absolute before:left-0 before:text-[#667eea] before:content-['•']">
            {rule}
          </li>
        ))}
      </ul>
    </section>
  );
}
