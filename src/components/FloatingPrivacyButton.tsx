"use client";

import Link from "next/link";

export default function FloatingPrivacyButton() {
  return (
    <Link
      href="/privacy-safe"
      className="fixed bottom-[88px] left-4 z-40 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-md ring-1 ring-black/5 backdrop-blur transition hover:scale-[1.02] active:scale-95"
    >
      <span className="text-sm">🔒</span>
      <span className="text-xs font-medium text-gray-700">개인정보 보호 안내</span>
    </Link>
  );
}
