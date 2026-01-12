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
      className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-4 py-[7px] shadow-md ring-1 ring-black/5 backdrop-blur transition hover:shadow-lg"
    >
      <Image src="/logo.svg" alt="문의하기" width={16} height={16} />
      <span className="text-sm font-medium text-gray-800">문의하기</span>
    </Link>
  );
}
