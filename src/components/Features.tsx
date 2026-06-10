import type { Dictionary } from "@/lib/i18n/types";

type FeaturesProps = {
  dict: Dictionary;
};

export function Features({ dict }: FeaturesProps) {
  return (
    <section>
      <h2 className="mb-8 text-center text-2xl font-bold text-[#2c3e50] md:text-3xl">
        {dict.features.title}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {dict.features.items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 text-4xl" aria-hidden="true">
              {item.icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#2c3e50]">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
