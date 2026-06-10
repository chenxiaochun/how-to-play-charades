import type { Dictionary } from "@/lib/i18n/types";

type RulesListProps = {
  dict: Dictionary;
};

export function RulesList({ dict }: RulesListProps) {
  return (
    <>
      <section className="rounded-2xl bg-[#f8f9fa] p-6 md:p-8">
        <ul className="space-y-3">
          {dict.rules.items.map((rule) => (
            <li
              key={rule}
              className="relative pl-5 text-gray-700 before:absolute before:left-0 before:text-[#667eea] before:content-['•']"
            >
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-8">
        {dict.rules.faq.map((item) => (
          <article key={item.question}>
            <h2 className="mb-3 text-xl font-semibold text-[#2c3e50] md:text-2xl">
              {item.question}
            </h2>
            <p className="leading-relaxed text-gray-700">{item.answer}</p>
          </article>
        ))}
      </section>
    </>
  );
}
