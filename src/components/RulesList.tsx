import type { Dictionary } from "@/lib/i18n/types";

type RulesListProps = {
  dict: Dictionary;
};

export function RulesList({ dict }: RulesListProps) {
  const { rules } = dict;

  return (
    <>
      <p className="mb-8 text-lg leading-relaxed text-gray-700">{rules.intro}</p>

      <section className="rounded-2xl bg-[#f8f9fa] p-6 md:p-8">
        <h2 className="mb-4 text-xl font-bold text-[#2c3e50]">{rules.title}</h2>
        <ul className="space-y-3">
          {rules.items.map((rule) => (
            <li
              key={rule}
              className="relative pl-5 text-gray-700 before:absolute before:left-0 before:text-[#667eea] before:content-['•']"
            >
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold text-[#2c3e50] md:text-2xl">
          {rules.gestures.heading}
        </h2>
        <p className="mb-4 leading-relaxed text-gray-700">{rules.gestures.intro}</p>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[320px] text-left text-sm text-gray-700">
            <thead className="bg-[#f8f9fa] text-[#2c3e50]">
              <tr>
                <th className="px-4 py-3 font-semibold">{rules.gestures.gestureColumn}</th>
                <th className="px-4 py-3 font-semibold">{rules.gestures.meaningColumn}</th>
              </tr>
            </thead>
            <tbody>
              {rules.gestures.rows.map((row) => (
                <tr key={row.gesture} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium">{row.gesture}</td>
                  <td className="px-4 py-3">{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold text-[#2c3e50] md:text-2xl">
          {rules.exampleRounds.heading}
        </h2>
        <p className="mb-6 leading-relaxed text-gray-700">{rules.exampleRounds.intro}</p>
        <div className="space-y-6">
          {rules.exampleRounds.rounds.map((round) => (
            <article
              key={round.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="mb-1 font-semibold text-[#2c3e50]">{round.title}</h3>
              <p className="mb-3 text-sm font-medium text-[#667eea]">
                {rules.exampleRounds.wordLabel}:{" "}
                <span className="text-gray-800">{round.word}</span>
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-gray-700">
                {round.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-3 text-xl font-bold text-[#2c3e50] md:text-2xl">
          {rules.scoring.heading}
        </h2>
        {rules.scoring.paragraphs.map((p) => (
          <p key={p} className="mb-3 leading-relaxed text-gray-700">
            {p}
          </p>
        ))}
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          {rules.scoring.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-8">
        {rules.faq.map((item) => (
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
