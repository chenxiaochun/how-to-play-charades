"use client";

import { useEffect, useRef } from "react";

const AD_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "ca-pub-3519124760724427";

type AdUnitProps = {
  slot?: string;
  className?: string;
  label?: string;
};

export function AdUnit({ slot, className = "", label = "Advertisement" }: AdUnitProps) {
  const initialized = useRef(false);
  const adSlot = slot ?? process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (!adSlot || initialized.current) return;
    initialized.current = true;
    try {
      const win = window as Window & { adsbygoogle?: unknown[] };
      (win.adsbygoogle = win.adsbygoogle || []).push({});
    } catch {
      // AdSense may be blocked by consent or ad blockers.
    }
  }, [adSlot]);

  if (!adSlot) return null;

  return (
    <aside
      className={`my-8 flex flex-col items-center ${className}`}
      aria-label={label}
    >
      <p className="mb-2 text-xs uppercase tracking-wide text-gray-400">{label}</p>
      <ins
        className="adsbygoogle block w-full max-w-3xl"
        style={{ display: "block", minHeight: 90 }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
