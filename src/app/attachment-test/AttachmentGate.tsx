"use client";

import { useState } from "react";

import AttachmentResultClient from "@/app/attachment-test/result/AttachmentResultClient";
import { useAttachmentResult } from "@/hooks/query/useAttachment";
import AttachmentQuestionClient from "./AttachmentQuestionClient";

export default function AttachmentGate() {
  const { data, isLoading, isError } = useAttachmentResult();
  const [mode, setMode] = useState<"auto" | "question">("auto");

  if (isLoading) {
    return <p className="mt-10 text-center text-sm text-gray-500">결과를 확인하는 중이에요...</p>;
  }

  if (isError) {
    return <p className="mt-10 text-center text-sm text-red-500">결과를 불러올 수 없습니다.</p>;
  }

  const hasResult = !!data?.data && data.data.length > 0;

  //  결과가 있고, 아직 다시하기를 누르지 않은 경우
  if (hasResult && mode === "auto") {
    return <AttachmentResultClient onRetry={() => setMode("question")} />;
  }

  //  결과 없거나 / 다시하기 누른 경우
  return <AttachmentQuestionClient />;
}
