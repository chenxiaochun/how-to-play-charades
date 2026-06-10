import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALES,
  PREFERRED_LOCALE_COOKIE,
  type Locale,
} from "@/lib/site";

function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(PREFERRED_LOCALE_COOKIE)?.value;
  if (cookie === "en" || cookie === "zh") return cookie;

  const accept = request.headers.get("accept-language") ?? "";
  if (/\bzh(-|_|$)/i.test(accept)) return "zh";

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    const locale = resolveLocale(request);
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|opengraph-image|icon|apple-icon|ads.txt|robots.txt|sitemap.xml).*)",
  ],
};
