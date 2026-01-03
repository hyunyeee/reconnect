"use client";

import { useRouter } from "next/navigation";
import AttachmentResultClient from "@/app/attachment-test/result/AttachmentResultClient";

export default function AttachmentResultPageClient() {
  const router = useRouter();

  return <AttachmentResultClient onRetry={() => router.replace("/attachment-test")} />;
}
