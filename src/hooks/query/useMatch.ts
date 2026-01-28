"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import type { ApiError, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export type MatchChannel = "insta" | "tiktok";

export interface MatchRequestPayload {
  targetPhone: string;
  targetName: string;
  requesterDesire: number;

  // channel 별로 하나만 사용
  targetInsta?: string;
  targetTiktok?: string;
}

export interface MatchInfo {
  targetPhone: string;
  targetName: string;
  requesterDesire: number;

  targetInsta?: string;
  targetTiktok?: string;

  matched: boolean;
  matchMessage: string | null;
}

/* =========================
 * 내부 유틸
 * ========================= */

const getMatchAPI = (channel: MatchChannel) => {
  return channel === "insta" ? API.MATCH.INSTA : API.MATCH.TIKTOK;
};

/* =========================
 * 매칭 요청
 * ========================= */

export const useMatchRequest = (channel: MatchChannel) => {
  const router = useRouter();

  return useMutation<ApiResponse<null>, ApiError, MatchRequestPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<null>>(getMatchAPI(channel).REQUEST, {
        method: "POST",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      toast.success("매칭 요청 완료");
      router.push("/waiting");
    },

    onError: (err) => {
      toast.error("매칭 요청 실패", {
        description: err.message ?? "요청 중 오류가 발생했습니다.",
      });
    },
  });
};

/* =========================
 * 매칭 정보 조회
 * ========================= */

export const useMatchInfo = (channel: MatchChannel) => {
  return useQuery<ApiResponse<MatchInfo>, ApiError>({
    queryKey: ["match-info", channel],

    queryFn: () =>
      apiClient<ApiResponse<MatchInfo>>(getMatchAPI(channel).REQUEST, {
        method: "GET",
      }),

    staleTime: 0,
    gcTime: 0,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: false,
  });
};

/* =========================
 * 매칭 정보 수정
 * ========================= */

export const useMatchUpdate = (channel: MatchChannel) => {
  return useMutation<ApiResponse<void>, ApiError, MatchRequestPayload>({
    mutationFn: (payload) =>
      apiClient<ApiResponse<void>>(getMatchAPI(channel).REQUEST, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),

    onSuccess: () => {
      toast.success("매칭 정보가 수정되었습니다.");
    },

    onError: (err) => {
      toast.error("매칭 정보 수정 실패", {
        description: err.message ?? "요청 중 오류가 발생했습니다.",
      });
    },
  });
};

/* =========================
 * 매칭 결과 (공통)
 * ========================= */

export const useMatchResult = (channel: MatchChannel) => {
  return useQuery<ApiResponse<string>, ApiError>({
    queryKey: ["match-result", channel],

    queryFn: () =>
      apiClient<ApiResponse<string>>(getMatchAPI(channel).RESULT, {
        method: "GET",
      }),

    staleTime: 0,
    gcTime: 0,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: false,
  });
};
