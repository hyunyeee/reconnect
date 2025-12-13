"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import MatchRegisterForm from "@/components/form/MatchRegisterForm";
import { useMatchInfo } from "@/hooks/query/useMatch";

export default function MatchGate() {
  const router = useRouter();
  const { data: infoRes, isLoading, isFetching, isError, error } = useMatchInfo();

  const ready = !isLoading && !isFetching;

  const noRequest = ready && infoRes?.success === false && infoRes?.code === "MATCH_002";
  const hasInfo = ready && infoRes?.success === true && !!infoRes.data;

  const matched = hasInfo ? infoRes!.data.matched : undefined;

  useEffect(() => {
    if (!ready) return;
    if (isError) return; // 에러 아래 UI로 처리

    if (noRequest) return; // 폼 렌더

    if (matched === false) {
      router.replace("/waiting");
      return;
    }

    if (matched === true) {
      router.replace("/success");
    }
  }, [ready, isError, noRequest, matched, router]);

  // ----- UI 렌더링 -----
  if (!ready) {
    return (
      <p className="mt-10 text-center text-sm text-gray-500">매칭 정보를 불러오는 중이에요...</p>
    );
  }

  // MATCH_002는 에러가 아니라 정상 플로우(등록 안 함)
  if (noRequest) {
    return <MatchRegisterForm />;
  }

  // 네트워크/서버 error
  if (isError && error?.code !== "MATCH_002") {
    return (
      <p className="mt-10 text-center text-sm text-red-600">
        서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.
      </p>
    );
  }

  return null;
}
