export const CONSENT_COOKIE = "cookie-consent";

export const CONSENT_EVENT = "cookie-consent";

export function hasConsentCookie(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie.includes(`${CONSENT_COOKIE}=1`);
}
