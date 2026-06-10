"use client";

import { useEffect, useState } from "react";
import { GoogleAdSense } from "@/components/GoogleAdSense";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { CONSENT_EVENT, hasConsentCookie } from "@/lib/consent";

export function ConsentScripts() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const sync = () => setConsented(hasConsentCookie());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!consented) return null;

  return (
    <>
      <GoogleAnalytics />
      <GoogleAdSense />
    </>
  );
}
