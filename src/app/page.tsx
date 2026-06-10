import { permanentRedirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/site";

export default function RootPage() {
  permanentRedirect(`/${DEFAULT_LOCALE}`);
}
