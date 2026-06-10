import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { DEFAULT_LOCALE } from "@/lib/site";

export default function NotFound() {
  const dict = getDictionary(DEFAULT_LOCALE);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-bold text-[#667eea]">404</p>
      <h1 className="mt-4 text-2xl font-bold text-[#2c3e50]">{dict.notFound.title}</h1>
      <p className="mt-4 max-w-md text-gray-600">{dict.notFound.message}</p>
      <Link href={`/${DEFAULT_LOCALE}`} className="btn-primary mt-8">
        {dict.notFound.backHome}
      </Link>
    </main>
  );
}
