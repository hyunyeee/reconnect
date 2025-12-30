"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;

    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    window.gtag("config", "G-FD8Q76DJ1N", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}
