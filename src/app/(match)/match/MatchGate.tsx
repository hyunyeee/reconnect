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

    // 이미 요청했고 매칭 안 됨
    if (matched === false) {
      if (isEditMode) return; // 수정은 유저 의도
      router.replace(`/waiting/${channel}`);
      return;
    }

    // 매칭 완료
    if (matched === true) {
      router.replace(`/success/${channel}`);
    }
  }, [ready, isError, noRequest, matched, isEditMode, router, channel]);

  if (!ready) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">매칭 정보를 불러오는 중이에요...</p>
    );
  }

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
