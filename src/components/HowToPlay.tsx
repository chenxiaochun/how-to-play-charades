import type { Dictionary } from "@/lib/i18n/types";

type HowToPlayProps = {
  dict: Dictionary;
};

export function HowToPlay({ dict }: HowToPlayProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg md:p-10">
      <h2 className="mb-8 text-center text-2xl font-bold text-[#2c3e50] md:text-3xl">
        {dict.howToPlay.title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.howToPlay.steps.map((step, index) => (
          <div key={step.title} className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] text-lg font-bold text-white">
              {index + 1}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#2c3e50]">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
