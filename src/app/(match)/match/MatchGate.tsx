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
  const matched = hasInfo ? infoRes.data.matched : undefined;

  useEffect(() => {
    if (!ready || isError) return;

    // 매칭 완료 → success
    if (matched === true) {
      router.replace(`/success/${channel}`);
      return;
    }

    // 요청은 있지만 매칭 전 & edit 아님 → waiting
    if (matched === false && !isEditMode) {
      router.replace(`/waiting/${channel}`);
    }
  }, [ready, matched, isEditMode, isError, router, channel]);

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

  // 에러
  if (isError && error?.code !== "MATCH_002") {
    return (
      <p className="mt-10 text-center text-sm text-red-600">
        서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  return null;
}
