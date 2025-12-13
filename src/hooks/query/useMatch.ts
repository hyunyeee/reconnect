"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import type { ApiError, ApiResponse } from "@/types/api";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";

export interface MatchRequestPayload {
  targetPhone: string;
  targetInsta: string;
  targetName: string;
  requesterDesire: number;
}

export const useMatchRequest = () => {
  const router = useRouter();

  return useMutation<ApiResponse<ApiResponse<null>>, ApiError, MatchRequestPayload>({
    mutationFn: async (payload) => {
      return await apiClient<ApiResponse<ApiResponse<null>>>(API.MATCH.REQUEST, {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    onSuccess: (res) => {
      toast.success("매칭 요청 완료", {
        description: res.data?.message ?? "성공적으로 요청되었습니다.",
      });

      router.push("/");
    },
    onError: (err) => {
      toast.error("매칭 요청 실패", {
        description: err.message ?? "요청 중 오류가 발생했습니다.",
      });
    },
  });
};

export interface MatchInfo {
  targetPhone: string;
  targetInsta: string;
  targetName: string;
  requesterDesire: number;
  matched: boolean;
  matchMessage: string | null;
}

export const useMatchInfo = (enabled = true) => {
  return useQuery<ApiResponse<MatchInfo>, ApiError>({
    queryKey: ["match-info"],
    queryFn: async () =>
      await apiClient<ApiResponse<MatchInfo>>(API.MATCH.REQUEST, {
        method: "GET",
      }),

    enabled,

    staleTime: 0,
    gcTime: 0,

    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: false,
  });
};

export const useMatchResult = () => {
  return useQuery<ApiResponse<string>, ApiError>({
    queryKey: ["match-result"],
    queryFn: async () =>
      await apiClient<ApiResponse<string>>(API.MATCH.RESULT, {
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
