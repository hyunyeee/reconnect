"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import MatchRegisterForm from "@/components/form/MatchRegisterForm";
import { useMatchInfo, MatchChannel } from "@/hooks/query/useMatch";
import { toMatchFormData } from "@/utils/matchFormMapper";

interface Props {
  channel: MatchChannel;
}

export default function MatchGate({ channel }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEditMode = searchParams.get("mode") === "edit";

  const { data: infoRes, isLoading, isFetching, isError, error } = useMatchInfo(channel);

  const ready = !isLoading && !isFetching;

  const noRequest = ready && infoRes?.success === false && infoRes?.code === "MATCH_002";

  const hasInfo = ready && infoRes?.success === true && !!infoRes.data;

  const matched = hasInfo ? infoRes!.data.matched : undefined;

  useEffect(() => {
    if (!ready) return;
    if (isError) return;

    // 아직 요청 없음 → 등록 폼
    if (noRequest) return;

    // 매칭 완료 상태에서는 edit 진입 차단
    if (matched === true) {
      router.replace(`/success/${channel}`);
      return;
    }

    // 매칭은 안 됐지만, edit이 아닌 경우 → waiting
    if (matched === false && !isEditMode) {
      router.replace(`/waiting/${channel}`);
      return;
    }

    // matched === false && isEditMode → 아래에서 edit 폼 렌더
  }, [ready, isError, noRequest, matched, isEditMode, router, channel]);

  // 최초 등록
  if (noRequest) {
    return <MatchRegisterForm mode="create" channel={channel} />;
  }

  // 수정
  if (matched === false && isEditMode && infoRes?.data) {
    return (
      <MatchRegisterForm
        mode="edit"
        channel={channel}
        defaultValues={toMatchFormData(infoRes.data, channel)}
      />
    );
  }

  if (isError && error?.code !== "MATCH_002") {
    return (
      <p className="mt-10 text-center text-sm text-red-600">
        서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  return null;
}
