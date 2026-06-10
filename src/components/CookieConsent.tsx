"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONSENT_COOKIE = "cookie-consent";

type CookieConsentProps = {
  locale: string;
  message: string;
  acceptLabel: string;
  privacyLabel: string;
  privacyHref: string;
};

export function CookieConsent({
  locale,
  message,
  acceptLabel,
  privacyLabel,
  privacyHref,
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = document.cookie.includes(`${CONSENT_COOKIE}=1`);
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    document.cookie = `${CONSENT_COOKIE}=1;path=/;max-age=31536000;SameSite=Lax`;
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg md:p-6"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-gray-700">
          {message}{" "}
          <Link
            href={privacyHref}
            className="font-semibold text-[#667eea] hover:underline"
            hrefLang={locale}
          >
            {privacyLabel}
          </Link>
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn-primary shrink-0 px-6 py-2 text-sm"
        >
          {acceptLabel}
        </button>
      </div>
    </div>
  );
}
