"use client";

import Link from "next/link";

export default function FloatingPrivacyButton() {
  return (
    <Link
      href="/privacy-safe"
      className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-[7px] shadow-md ring-1 ring-black/5 backdrop-blur transition hover:shadow-lg"
    >
      <span className="text-sm">🔒</span>
      <span className="text-sm font-medium text-gray-700">개인정보 보호 안내</span>
    </Link>
  );
}
