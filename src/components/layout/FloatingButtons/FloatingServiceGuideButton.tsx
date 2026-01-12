"use client";

import Link from "next/link";
import { Info } from "lucide-react";

export default function FloatingServiceGuideButton() {
  return (
    <Link
      href="/service-guide"
      className="bg-main-pink/10 ring-main-pink/30 hover:bg-main-pink/15 inline-flex w-fit items-center gap-2 rounded-full px-4 py-[7px] shadow-sm ring-1 backdrop-blur transition"
    >
      <Info className="text-main-pink size-4" />
      <span className="text-main-pink text-sm font-medium">서비스 안내</span>
    </Link>
  );
}
