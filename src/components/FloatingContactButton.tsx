"use client";

import Link from "next/link";
import Image from "next/image";

export default function FloatingContactButton() {
  const OPEN_CHAT_URL = process.env.NEXT_PUBLIC_KAKAO_OPEN_CHAT || "";

  return (
    <Link
      href={OPEN_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-4 z-50 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow-lg ring-1 ring-black/5 backdrop-blur transition hover:scale-[1.02] active:scale-95"
    >
      <Image src="/favicon.svg" alt="문의하기" width={22} height={22} priority />

      <span className="text-sm font-medium text-gray-800">문의하기</span>
    </Link>
  );
}
