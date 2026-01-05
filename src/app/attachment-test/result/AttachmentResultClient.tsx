"use client";

import { Heart, Shield } from "lucide-react";
import { useAttachmentResult } from "@/hooks/query/useAttachment";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ProgressBar";
import { BackHeader } from "@/components/layout/BackHeader";

interface AttachmentResultClientProps {
  onRetry: () => void;
}

export default function AttachmentResultClient({ onRetry }: AttachmentResultClientProps) {
  const { data, isLoading, isError } = useAttachmentResult();

  if (isLoading) {
    return <p className="text-center text-sm text-gray-500">결과 분석 중...</p>;
  }

  if (isError || !data) {
    return <p className="text-center text-sm text-gray-500">결과를 불러올 수 없습니다.</p>;
  }

  // 결과 없는 경우
  if (data.data.length === 0) {
    return (
      <div className="mx-auto max-w-md space-y-6 px-4 py-20 text-center">
        <p className="text-sm text-gray-600">아직 애착 유형 분석 결과가 없습니다.</p>
        <Button className="bg-main-pink w-full text-white hover:bg-[#A41847]" onClick={onRetry}>
          애착 유형 테스트 시작하기
        </Button>
      </div>
    );
  }

  const result = data.data[0];

  return (
    <div className="mx-auto max-w-md space-y-10 px-4 py-10">
      <BackHeader backHref="/" />

      <h1 className="text-center text-2xl font-bold tracking-tight">나의 애착 유형</h1>

      <div className="bg-main-pink/10 rounded-2xl px-6 py-7 text-center">
        <Heart className="text-main-pink mx-auto mb-3 size-6" />
        <p className="text-sm text-gray-600">당신의 애착 유형</p>
        <p className="text-main-pink mt-1 text-xl font-bold">{result.resultType}</p>
      </div>

      <div className="bg-main-pink/5 relative rounded-2xl px-6 py-5">
        <span className="bg-main-pink absolute -top-2 left-6 rounded-full px-3 py-0.5 text-xs font-medium text-white">
          유형 해설
        </span>
        <p className="pt-4 text-sm leading-relaxed text-gray-700">{result.resultDescription}</p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800">
            <Heart className="text-main-pink size-4" />
            불안형 성향
          </div>
          <ProgressBar current={result.anxiousScore} total={5} />
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800">
            <Shield className="size-4 text-gray-600" />
            회피형 성향
          </div>
          <ProgressBar current={result.avoidantScore} total={5} />
        </div>
      </div>

      {/* 다시하기 */}
      <Button variant="outline" className="w-full" onClick={onRetry}>
        테스트 다시하기
      </Button>

      <p className="text-center text-xs text-gray-400">
        이 결과는 지금의 마음과 관계 흐름을 이해하기 위한 참고 자료입니다.
      </p>
    </div>
  );
}
